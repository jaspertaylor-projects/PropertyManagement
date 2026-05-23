import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ListingForm } from "@/components/manager/listing-form";

export const metadata: Metadata = { title: "Create Listing" };

export default function NewListingPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/manager/listings" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3">
          <ArrowLeft className="h-4 w-4" /> Back to Listings
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Create Listing</h1>
        <p className="text-sm text-muted-foreground">Add a new rental property</p>
      </div>
      <ListingForm mode="create" />
    </div>
  );
}
