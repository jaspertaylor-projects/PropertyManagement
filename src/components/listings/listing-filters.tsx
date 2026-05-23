"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export interface FilterValues {
  search: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  neighborhood: string;
  pets: boolean;
  parking: boolean;
  sort: string;
}

interface ListingFiltersProps {
  neighborhoods: string[];
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
}

export function ListingFilters({
  neighborhoods,
  filters,
  onFilterChange,
}: ListingFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const update = (key: keyof FilterValues, value: string | boolean) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const activeFilterCount = [
    filters.minPrice,
    filters.maxPrice,
    filters.bedrooms !== "any" && filters.bedrooms,
    filters.bathrooms !== "any" && filters.bathrooms,
    filters.neighborhood !== "any" && filters.neighborhood,
    filters.pets,
    filters.parking,
  ].filter(Boolean).length;

  const clearFilters = () => {
    onFilterChange({
      search: filters.search,
      minPrice: "",
      maxPrice: "",
      bedrooms: "any",
      bathrooms: "any",
      neighborhood: "any",
      pets: false,
      parking: false,
      sort: filters.sort,
    });
  };

  return (
    <div className="space-y-4">
      {/* Search bar + sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, neighborhood, or address..."
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-blue-600 text-white hover:bg-blue-600 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          <Select
            value={filters.sort}
            onValueChange={(v) => update("sort", v ?? "newest")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="bedrooms">Most Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Expandable filters panel */}
      {showFilters && (
        <div className="rounded-xl border border-border/50 bg-card p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </h3>
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-3 w-3 mr-1" /> Clear all
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Range */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Min Price
              </Label>
              <Input
                type="number"
                placeholder="$0"
                value={filters.minPrice}
                onChange={(e) => update("minPrice", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Max Price
              </Label>
              <Input
                type="number"
                placeholder="No max"
                value={filters.maxPrice}
                onChange={(e) => update("maxPrice", e.target.value)}
              />
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Bedrooms
              </Label>
              <Select
                value={filters.bedrooms}
                onValueChange={(v) => update("bedrooms", v ?? "any")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="0">Studio</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bathrooms */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Bathrooms
              </Label>
              <Select
                value={filters.bathrooms}
                onValueChange={(v) => update("bathrooms", v ?? "any")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Neighborhood */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Neighborhood
              </Label>
              <Select
                value={filters.neighborhood}
                onValueChange={(v) => update("neighborhood", v ?? "any")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {neighborhoods.map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Toggles */}
            <div className="space-y-4 sm:col-span-2 lg:col-span-3 flex items-end gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={filters.pets}
                  onCheckedChange={(v) => update("pets", v)}
                  id="pets-filter"
                />
                <Label htmlFor="pets-filter" className="text-sm cursor-pointer">
                  🐾 Pets Allowed
                </Label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
