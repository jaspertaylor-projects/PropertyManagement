"use client";

import { useState, useEffect, useCallback } from "react";
import { Home } from "lucide-react";
import { ListingCard, ListingCardSkeleton } from "@/components/listings/listing-card";
import { ListingFilters, type FilterValues } from "@/components/listings/listing-filters";
import { getPublicListings, getNeighborhoods } from "@/lib/db/actions";
import type { ListingWithImages } from "@/lib/db/types";

export function RentalsClient() {
  const [listings, setListings] = useState<ListingWithImages[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "any",
    bathrooms: "any",
    neighborhood: "any",
    pets: false,
    parking: false,
    sort: "newest",
  });

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPublicListings({
        search: filters.search || undefined,
        minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
        bedrooms:
          filters.bedrooms !== "any" ? parseInt(filters.bedrooms) : undefined,
        bathrooms:
          filters.bathrooms !== "any" ? parseInt(filters.bathrooms) : undefined,
        neighborhood:
          filters.neighborhood !== "any" ? filters.neighborhood : undefined,
        pets: filters.pets || undefined,
        sort: filters.sort,
      });
      setListings(data || []);
    } catch {
      setListings([]);
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    const timeout = setTimeout(fetchListings, 300);
    return () => clearTimeout(timeout);
  }, [fetchListings]);

  useEffect(() => {
    getNeighborhoods()
      .then(setNeighborhoods)
      .catch(() => setNeighborhoods([]));
  }, []);

  return (
    <div className="space-y-8">
      <ListingFilters
        neighborhoods={neighborhoods}
        filters={filters}
        onFilterChange={setFilters}
      />

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-muted-foreground">
          {listings.length} {listings.length === 1 ? "property" : "properties"}{" "}
          found
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ListingCardSkeleton key={i} />
          ))}
        </div>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="text-center py-16 space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Home className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No listings found</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Try adjusting your filters or search terms to find available
            rentals.
          </p>
        </div>
      )}
    </div>
  );
}
