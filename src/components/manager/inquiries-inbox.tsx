"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Mail, MailOpen, Archive, ExternalLink,
  Loader2, ChevronDown, ChevronUp, MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { getInquiries, updateInquiryStatus } from "@/lib/db/actions";
import { toast } from "sonner";
import type { InquiryWithListing } from "@/lib/db/types";

export function InquiriesInbox() {
  const [inquiries, setInquiries] = useState<InquiryWithListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getInquiries({ status: statusFilter });
      setInquiries((data as InquiryWithListing[]) || []);
    } catch {
      setInquiries([]);
    }
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => { const t = setTimeout(fetch, 0); return () => clearTimeout(t); }, [fetch]);

  const handleStatus = async (id: string, status: string) => {
    const result = await updateInquiryStatus(id, status);
    if (result.success) {
      toast.success(status === "read" ? "Marked as read" : status === "new" ? "Marked as unread" : "Archived");
      fetch();
    } else {
      toast.error(result.error || "Failed to update");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inquiries</h1>
        <p className="text-sm text-muted-foreground">Manage tenant inquiries and messages</p>
      </div>

      <div className="flex gap-3">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="new">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : inquiries.length > 0 ? (
        <div className="space-y-3">
          {inquiries.map((inquiry) => (
            <Card
              key={inquiry.id}
              className={`transition-all ${inquiry.status === "new" ? "border-l-4 border-l-blue-500" : ""}`}
            >
              <CardContent className="p-4">
                {/* Header */}
                <button
                  onClick={() => setExpanded(expanded === inquiry.id ? null : inquiry.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      {inquiry.status === "new" && (
                        <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                      )}
                      <h3 className="font-medium text-sm">{inquiry.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {inquiry.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {inquiry.email} · {new Date(inquiry.created_at).toLocaleDateString()}
                      {inquiry.listing && (
                        <> · Re: {inquiry.listing.title}</>
                      )}
                    </p>
                  </div>
                  {expanded === inquiry.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </button>

                {/* Expanded content */}
                {expanded === inquiry.id && (
                  <div className="mt-4 pt-4 border-t border-border/40 space-y-4 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Email:</span>{" "}
                        <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">{inquiry.email}</a>
                      </div>
                      {inquiry.phone && (
                        <div>
                          <span className="text-muted-foreground">Phone:</span>{" "}
                          <a href={`tel:${inquiry.phone}`} className="text-blue-600 hover:underline">{inquiry.phone}</a>
                        </div>
                      )}
                      {inquiry.desired_move_in_date && (
                        <div>
                          <span className="text-muted-foreground">Move-in:</span>{" "}
                          {new Date(inquiry.desired_move_in_date).toLocaleDateString()}
                        </div>
                      )}
                      {inquiry.listing && (
                        <div>
                          <span className="text-muted-foreground">Listing:</span>{" "}
                          <Link href={`/rentals/${inquiry.listing.slug}`} className="text-blue-600 hover:underline inline-flex items-center gap-1" target="_blank">
                            {inquiry.listing.title} <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      )}
                    </div>

                    {inquiry.message && (
                      <div className="bg-muted/50 rounded-lg p-4 text-sm leading-relaxed">
                        {inquiry.message}
                      </div>
                    )}

                    <div className="flex gap-2">
                      {inquiry.status === "new" && (
                        <Button size="sm" variant="outline" onClick={() => handleStatus(inquiry.id, "read")}>
                          <MailOpen className="h-3 w-3 mr-1" /> Mark Read
                        </Button>
                      )}
                      {inquiry.status === "read" && (
                        <Button size="sm" variant="outline" onClick={() => handleStatus(inquiry.id, "new")}>
                          <Mail className="h-3 w-3 mr-1" /> Mark Unread
                        </Button>
                      )}
                      {inquiry.status !== "archived" && (
                        <Button size="sm" variant="outline" onClick={() => handleStatus(inquiry.id, "archived")}>
                          <Archive className="h-3 w-3 mr-1" /> Archive
                        </Button>
                      )}
                      <a href={`mailto:${inquiry.email}`}>
                        <Button size="sm" variant="outline">
                          <Mail className="h-3 w-3 mr-1" /> Reply via Email
                        </Button>
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-3">
          <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground/50" />
          <p className="text-muted-foreground">No inquiries found</p>
        </div>
      )}
    </div>
  );
}
