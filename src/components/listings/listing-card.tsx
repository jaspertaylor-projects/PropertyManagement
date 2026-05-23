import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Maximize, Car, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ListingWithImages } from "@/lib/db/types";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function ListingCard({ listing }: { listing: ListingWithImages }) {
  const primaryImage =
    listing.listing_images?.find((img) => img.is_primary) ||
    listing.listing_images?.[0];

  return (
    <Link href={`/rentals/${listing.slug}`} className="group block">
      <Card className="overflow-hidden border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt_text || listing.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No Image
            </div>
          )}

          {/* Price badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 text-foreground backdrop-blur-sm shadow-md text-base font-bold px-3 py-1 hover:bg-white/90">
              {formatPrice(listing.price)}
              <span className="text-xs font-normal text-muted-foreground ml-1">/mo</span>
            </Badge>
          </div>

          {/* Status badges */}
          {listing.featured && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:from-amber-500 hover:to-orange-500">
                Featured
              </Badge>
            </div>
          )}

          {listing.pets_allowed && (
            <div className="absolute bottom-3 right-3">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white/90">
                🐾 Pets OK
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-lg leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
            {listing.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">
              {listing.neighborhood
                ? `${listing.neighborhood} · ${listing.city}`
                : `${listing.address_line_1}, ${listing.city}`}
            </span>
          </div>

          {/* Facts */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              {listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms} Bed`}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {listing.bathrooms} Bath
            </span>
            {listing.square_feet && (
              <span className="flex items-center gap-1">
                <Maximize className="h-4 w-4" />
                {listing.square_feet.toLocaleString()} ft²
              </span>
            )}
            {listing.parking && (
              <span className="flex items-center gap-1 hidden sm:flex">
                <Car className="h-4 w-4" />
                Parking
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          {/* CTA */}
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-1 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200 transition-colors"
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

/** Skeleton placeholder for loading state */
export function ListingCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] bg-muted animate-pulse" />
      <CardContent className="p-4 space-y-3">
        <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        <div className="flex gap-4">
          <div className="h-4 bg-muted rounded animate-pulse w-16" />
          <div className="h-4 bg-muted rounded animate-pulse w-16" />
          <div className="h-4 bg-muted rounded animate-pulse w-16" />
        </div>
        <div className="h-8 bg-muted rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}
