import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Bed, Bath, Maximize, Car, MapPin, Calendar, DollarSign,
  PawPrint, Sofa, ArrowLeft, CheckCircle2, Map,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getListingBySlug, getRelatedListings } from "@/lib/db/actions";
import { ImageGallery } from "@/components/listings/image-gallery";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { ListingCard } from "@/components/listings/listing-card";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return { title: "Listing Not Found" };
  return {
    title: listing.title,
    description: listing.description.slice(0, 160),
  };
}

export default async function ListingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let listing;
  try {
    listing = await getListingBySlug(slug);
  } catch {
    notFound();
  }
  if (!listing) notFound();

  let related: Awaited<ReturnType<typeof getRelatedListings>> = [];
  try {
    related = await getRelatedListings(listing.id, listing.neighborhood);
  } catch { /* ignore */ }

  const facts = [
    { icon: Bed, label: listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms} Bedrooms`, value: null },
    { icon: Bath, label: `${listing.bathrooms} Bathrooms`, value: null },
    listing.square_feet ? { icon: Maximize, label: `${listing.square_feet.toLocaleString()} sq ft`, value: null } : null,
    listing.parking ? { icon: Car, label: listing.parking, value: null } : null,
    { icon: PawPrint, label: listing.pets_allowed ? "Pets Allowed" : "No Pets", value: null },
    { icon: Sofa, label: listing.furnished ? "Furnished" : "Unfurnished", value: null },
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Link href="/rentals" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Rentals
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <ImageGallery images={listing.listing_images || []} />

          {/* Title & Price */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">{listing.title}</h1>
                <p className="mt-1 flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {listing.address_line_1}
                  {listing.address_line_2 && `, ${listing.address_line_2}`},{" "}
                  {listing.city}, {listing.state} {listing.zip}
                </p>
                {listing.neighborhood && (
                  <Badge variant="secondary" className="mt-2">{listing.neighborhood}</Badge>
                )}
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">{formatPrice(listing.price)}<span className="text-base font-normal text-muted-foreground">/mo</span></p>
                {listing.deposit && (
                  <p className="text-sm text-muted-foreground mt-1">
                    <DollarSign className="inline h-3 w-3" /> {formatPrice(listing.deposit)} deposit
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Property Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {facts.map((fact) => fact && (
              <div key={fact.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <fact.icon className="h-5 w-5 text-blue-600 shrink-0" />
                <span className="text-sm font-medium">{fact.label}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3">About This Property</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{listing.description}</p>
          </div>

          {/* Amenities */}
          {listing.amenities && listing.amenities.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {listing.amenities.map((amenity: string) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lease Terms */}
          {listing.lease_terms && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Lease Terms</h2>
              <p className="text-muted-foreground">{listing.lease_terms}</p>
            </div>
          )}

          {/* Availability */}
          {listing.available_date && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-blue-50 border border-blue-100">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Available from {new Date(listing.available_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>
          )}

          {/* Map Placeholder */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Map className="h-5 w-5" /> Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/9] rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-sm border border-dashed border-border">
                <div className="text-center space-y-2">
                  <Map className="h-8 w-8 mx-auto opacity-50" />
                  <p>Interactive map coming soon</p>
                  <p className="text-xs">{listing.address_line_1}, {listing.city}, {listing.state} {listing.zip}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sticky inquiry form */}
          <div className="lg:sticky lg:top-24">
            <InquiryForm listingId={listing.id} listingTitle={listing.title} />

            <div className="mt-4">
              <Link href="/apply">
                <Button variant="outline" className="w-full" size="lg">
                  Apply for This Property
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Listings */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Nearby Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <ListingCard key={r.id} listing={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
