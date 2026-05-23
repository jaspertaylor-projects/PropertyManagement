"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Search, MoreHorizontal, Eye, Pencil, Archive, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllListings, updateListingStatus } from "@/lib/db/actions";
import { toast } from "sonner";
import type { ListingWithImages } from "@/lib/db/types";

const statusColors: Record<string, string> = {
  available: "bg-green-100 text-green-800",
  draft: "bg-gray-100 text-gray-800",
  pending: "bg-amber-100 text-amber-800",
  rented: "bg-blue-100 text-blue-800",
  archived: "bg-red-100 text-red-800",
};

export function ListingsManager() {
  const [listings, setListings] = useState<ListingWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllListings({
        search: search || undefined,
        status: statusFilter,
      });
      setListings(data || []);
    } catch {
      setListings([]);
    }
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => {
    const t = setTimeout(fetch, 300);
    return () => clearTimeout(t);
  }, [fetch]);

  const handleStatusChange = async (id: string, status: string) => {
    const result = await updateListingStatus(id, status);
    if (result.success) {
      toast.success(`Listing ${status === "archived" ? "archived" : "updated to " + status}`);
      fetch();
    } else {
      toast.error(result.error || "Failed to update");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Listings</h1>
          <p className="text-sm text-muted-foreground">Manage your rental properties</p>
        </div>
        <Link href="/manager/listings/new">
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
            <Plus className="mr-2 h-4 w-4" /> New Listing
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rented">Rented</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Listing table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : listings.length > 0 ? (
        <div className="space-y-3">
          {listings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-medium text-sm truncate">{listing.title}</h3>
                    <Badge className={`${statusColors[listing.status]} text-xs shrink-0`} variant="secondary">
                      {listing.status}
                    </Badge>
                    {listing.featured && (
                      <Badge className="bg-amber-100 text-amber-800 text-xs shrink-0" variant="secondary">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ${listing.price}/mo · {listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms} bed`} · {listing.bathrooms} bath · {listing.neighborhood || listing.city}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/rentals/${listing.slug}`} target="_blank">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/manager/listings/${listing.id}/edit`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-muted transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {listing.status !== "available" && (
                        <DropdownMenuItem onClick={() => handleStatusChange(listing.id, "available")}>
                          Publish
                        </DropdownMenuItem>
                      )}
                      {listing.status === "available" && (
                        <DropdownMenuItem onClick={() => handleStatusChange(listing.id, "draft")}>
                          Unpublish
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleStatusChange(listing.id, "pending")}>
                        Mark Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(listing.id, "rented")}>
                        Mark Rented
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(listing.id, "archived")} className="text-destructive">
                        <Archive className="h-4 w-4 mr-2" /> Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-3">
          <p className="text-muted-foreground">No listings found</p>
          <Link href="/manager/listings/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Your First Listing
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
