import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getListingById } from "@/lib/db/actions";
import { ListingForm } from "@/components/manager/listing-form";

export const metadata: Metadata = { title: "Edit Listing" };

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let listing;
  try {
    listing = await getListingById(id);
  } catch {
    notFound();
  }
  if (!listing) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/manager/listings" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3">
          <ArrowLeft className="h-4 w-4" /> Back to Listings
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Edit Listing</h1>
        <p className="text-sm text-muted-foreground">{listing.title}</p>
      </div>
      <ListingForm mode="edit" listing={listing} />
    </div>
  );
}
