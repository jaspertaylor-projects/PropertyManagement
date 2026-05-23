"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { createListing, updateListing } from "@/lib/db/actions";
import { toast } from "sonner";
import type { Listing } from "@/lib/db/types";

interface ListingFormProps {
  listing?: Listing;
  mode: "create" | "edit";
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function ListingForm({ listing, mode }: ListingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [amenityInput, setAmenityInput] = useState("");
  const [formData, setFormData] = useState({
    title: listing?.title || "",
    slug: listing?.slug || "",
    status: listing?.status || "draft",
    price: listing?.price?.toString() || "",
    deposit: listing?.deposit?.toString() || "",
    address_line_1: listing?.address_line_1 || "",
    address_line_2: listing?.address_line_2 || "",
    city: listing?.city || "",
    state: listing?.state || "",
    zip: listing?.zip || "",
    neighborhood: listing?.neighborhood || "",
    bedrooms: listing?.bedrooms?.toString() || "0",
    bathrooms: listing?.bathrooms?.toString() || "1",
    square_feet: listing?.square_feet?.toString() || "",
    parking: listing?.parking || "",
    pets_allowed: listing?.pets_allowed || false,
    furnished: listing?.furnished || false,
    available_date: listing?.available_date || "",
    lease_terms: listing?.lease_terms || "",
    description: listing?.description || "",
    amenities: listing?.amenities || [],
    featured: listing?.featured || false,
  });

  const updateField = (key: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key === "title" && mode === "create") {
      setFormData((prev) => ({ ...prev, slug: generateSlug(value as string) }));
    }
  };

  const addAmenity = () => {
    if (amenityInput.trim() && !formData.amenities.includes(amenityInput.trim())) {
      updateField("amenities", [...formData.amenities, amenityInput.trim()]);
      setAmenityInput("");
    }
  };

  const removeAmenity = (amenity: string) => {
    updateField("amenities", formData.amenities.filter((a) => a !== amenity));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: formData.title,
      slug: formData.slug,
      status: formData.status as "draft" | "available" | "pending" | "rented" | "archived",
      price: parseInt(formData.price) || 0,
      deposit: formData.deposit ? parseInt(formData.deposit) : null,
      address_line_1: formData.address_line_1,
      address_line_2: formData.address_line_2 || null,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      neighborhood: formData.neighborhood || null,
      bedrooms: parseFloat(formData.bedrooms) || 0,
      bathrooms: parseFloat(formData.bathrooms) || 0,
      square_feet: formData.square_feet ? parseInt(formData.square_feet) : null,
      parking: formData.parking || null,
      pets_allowed: formData.pets_allowed,
      furnished: formData.furnished,
      available_date: formData.available_date || null,
      lease_terms: formData.lease_terms || null,
      description: formData.description,
      amenities: formData.amenities,
      featured: formData.featured,
    };

    try {
      if (mode === "create") {
        const result = await createListing(payload);
        if (result.success) {
          toast.success("Listing created!");
          router.push("/manager/listings");
        } else {
          toast.error(result.error || "Failed to create");
        }
      } else if (listing) {
        const result = await updateListing(listing.id, payload);
        if (result.success) {
          toast.success("Listing updated!");
          router.push("/manager/listings");
        } else {
          toast.error(result.error || "Failed to update");
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Basic Info */}
      <Card>
        <CardHeader><CardTitle className="text-base">Basic Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
              <Input id="title" value={formData.title} onChange={(e) => updateField("title", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug <span className="text-destructive">*</span></Label>
              <Input id="slug" value={formData.slug} onChange={(e) => updateField("slug", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(v) => updateField("status", v ?? "draft")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader><CardTitle className="text-base">Pricing & Terms</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Monthly Rent ($) <span className="text-destructive">*</span></Label>
              <Input id="price" type="number" value={formData.price} onChange={(e) => updateField("price", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">Deposit ($)</Label>
              <Input id="deposit" type="number" value={formData.deposit} onChange={(e) => updateField("deposit", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="available_date">Available Date</Label>
              <Input id="available_date" type="date" value={formData.available_date} onChange={(e) => updateField("available_date", e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lease_terms">Lease Terms</Label>
            <Input id="lease_terms" value={formData.lease_terms} onChange={(e) => updateField("lease_terms", e.target.value)} placeholder="e.g., 12 months minimum" />
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader><CardTitle className="text-base">Location</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address_line_1">Address Line 1 <span className="text-destructive">*</span></Label>
            <Input id="address_line_1" value={formData.address_line_1} onChange={(e) => updateField("address_line_1", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address_line_2">Address Line 2</Label>
            <Input id="address_line_2" value={formData.address_line_2} onChange={(e) => updateField("address_line_2", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City <span className="text-destructive">*</span></Label>
              <Input id="city" value={formData.city} onChange={(e) => updateField("city", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State <span className="text-destructive">*</span></Label>
              <Input id="state" value={formData.state} onChange={(e) => updateField("state", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP <span className="text-destructive">*</span></Label>
              <Input id="zip" value={formData.zip} onChange={(e) => updateField("zip", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Neighborhood</Label>
              <Input id="neighborhood" value={formData.neighborhood} onChange={(e) => updateField("neighborhood", e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card>
        <CardHeader><CardTitle className="text-base">Property Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms <span className="text-destructive">*</span></Label>
              <Input id="bedrooms" type="number" step="1" min="0" value={formData.bedrooms} onChange={(e) => updateField("bedrooms", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms <span className="text-destructive">*</span></Label>
              <Input id="bathrooms" type="number" step="0.5" min="0" value={formData.bathrooms} onChange={(e) => updateField("bathrooms", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="square_feet">Sq Ft</Label>
              <Input id="square_feet" type="number" value={formData.square_feet} onChange={(e) => updateField("square_feet", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parking">Parking</Label>
              <Input id="parking" value={formData.parking} onChange={(e) => updateField("parking", e.target.value)} placeholder="e.g., 1 garage spot" />
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Switch id="pets_allowed" checked={formData.pets_allowed} onCheckedChange={(v) => updateField("pets_allowed", v)} />
              <Label htmlFor="pets_allowed" className="cursor-pointer">Pets Allowed</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="furnished" checked={formData.furnished} onCheckedChange={(v) => updateField("furnished", v)} />
              <Label htmlFor="furnished" className="cursor-pointer">Furnished</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="featured" checked={formData.featured} onCheckedChange={(v) => updateField("featured", v)} />
              <Label htmlFor="featured" className="cursor-pointer">Featured Listing</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader><CardTitle className="text-base">Description</CardTitle></CardHeader>
        <CardContent>
          <Textarea
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={6}
            placeholder="Describe the property in detail..."
            required
          />
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader><CardTitle className="text-base">Amenities</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              placeholder="Add amenity..."
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addAmenity(); } }}
            />
            <Button type="button" variant="outline" onClick={addAmenity} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((a) => (
                <Badge key={a} variant="secondary" className="text-sm gap-1">
                  {a}
                  <button type="button" onClick={() => removeAmenity(a)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex gap-3">
        <Button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {mode === "create" ? "Create Listing" : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
