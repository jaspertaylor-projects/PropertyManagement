import Link from "next/link";
import type { Metadata } from "next";
import {
  Building2, MessageSquare, Plus, ArrowRight,
  TrendingUp, Clock, CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDashboardStats, getAllListings, getInquiries } from "@/lib/db/actions";

export const metadata: Metadata = { title: "Dashboard" };

export default async function ManagerDashboardPage() {
  let stats = { active: 0, rented: 0, pending: 0, draft: 0, newInquiries: 0, totalInquiries: 0 };
  let recentListings: Awaited<ReturnType<typeof getAllListings>> = [];
  let recentInquiries: Awaited<ReturnType<typeof getInquiries>> = [];

  try {
    [stats, recentListings, recentInquiries] = await Promise.all([
      getDashboardStats(),
      getAllListings().then((l) => l.slice(0, 5)),
      getInquiries().then((i) => i.slice(0, 5)),
    ]);
  } catch {
    // Supabase not configured
  }

  const statCards = [
    { label: "Active Listings", value: stats.active, icon: Building2, color: "text-green-600", bg: "bg-green-50" },
    { label: "Rented", value: stats.rented, icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending", value: stats.pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "New Inquiries", value: stats.newInquiries, icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Welcome back. Here&apos;s what&apos;s happening.</p>
        </div>
        <Link href="/manager/listings/new">
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
            <Plus className="mr-2 h-4 w-4" /> New Listing
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-3xl font-bold mt-1">{s.value}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/manager/listings/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">Add Listing</p>
                <p className="text-xs text-muted-foreground">Create a new rental</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/manager/inquiries">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">View Inquiries</p>
                <p className="text-xs text-muted-foreground">{stats.newInquiries} unread</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/manager/listings">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 group-hover:bg-green-100 transition-colors">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">Manage Listings</p>
                <p className="text-xs text-muted-foreground">Edit & publish</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Listings */}
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Listings</CardTitle>
            <Link href="/manager/listings" className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentListings.length > 0 ? (
              <div className="space-y-3">
                {recentListings.map((listing) => (
                  <Link key={listing.id} href={`/manager/listings/${listing.id}/edit`} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent transition-colors">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{listing.title}</p>
                      <p className="text-xs text-muted-foreground">${listing.price}/mo</p>
                    </div>
                    <Badge variant={listing.status === "available" ? "default" : "secondary"} className="shrink-0 text-xs">
                      {listing.status}
                    </Badge>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">No listings yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Inquiries</CardTitle>
            <Link href="/manager/inquiries" className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentInquiries.length > 0 ? (
              <div className="space-y-3">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent transition-colors">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate flex items-center gap-2">
                        {inquiry.status === "new" && <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
                        {inquiry.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {inquiry.listing ? inquiry.listing.title : "General inquiry"}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">No inquiries yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
