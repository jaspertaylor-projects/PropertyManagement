import type { Metadata } from "next";
import { RentalsClient } from "@/components/listings/rentals-client";

export const metadata: Metadata = {
  title: "Available Rentals",
  description:
    "Browse available rental properties managed by Harbor Rental Group. Filter by price, bedrooms, neighborhood, and more.",
};

export default function RentalsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Available Rentals
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find your next home from our professionally managed properties.
        </p>
      </div>

      <RentalsClient />
    </div>
  );
}
