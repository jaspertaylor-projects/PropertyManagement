"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { ListingFormData, InquiryFormData } from "@/lib/validations";

// ─── Listing Actions ─────────────────────────────────────────

export async function getPublicListings(filters?: {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  neighborhood?: string;
  pets?: boolean;
  parking?: boolean;
  sort?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("listings")
    .select("*, listing_images(*)")
    .eq("status", "available");

  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,neighborhood.ilike.%${filters.search}%,address_line_1.ilike.%${filters.search}%`
    );
  }
  if (filters?.minPrice) query = query.gte("price", filters.minPrice);
  if (filters?.maxPrice) query = query.lte("price", filters.maxPrice);
  if (filters?.bedrooms) query = query.gte("bedrooms", filters.bedrooms);
  if (filters?.bathrooms) query = query.gte("bathrooms", filters.bathrooms);
  if (filters?.neighborhood)
    query = query.eq("neighborhood", filters.neighborhood);
  if (filters?.pets) query = query.eq("pets_allowed", true);

  switch (filters?.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "bedrooms":
      query = query.order("bedrooms", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getFeaturedListings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*, listing_images(*)")
    .eq("status", "available")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) throw error;
  return data;
}

export async function getListingBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*, listing_images(*)")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getRelatedListings(
  listingId: string,
  neighborhood: string | null
) {
  const supabase = await createClient();
  let query = supabase
    .from("listings")
    .select("*, listing_images(*)")
    .eq("status", "available")
    .neq("id", listingId)
    .limit(3);

  if (neighborhood) {
    query = query.eq("neighborhood", neighborhood);
  }

  const { data, error } = await query;
  if (error) return [];
  return data;
}

export async function getNeighborhoods() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listings")
    .select("neighborhood")
    .eq("status", "available")
    .not("neighborhood", "is", null);

  if (error) return [];
  const unique = [...new Set(data?.map((d) => d.neighborhood).filter(Boolean))];
  return unique as string[];
}

// ─── Inquiry Actions ─────────────────────────────────────────

export async function submitInquiry(formData: InquiryFormData) {
  // Honeypot check
  if (formData.website && formData.website.length > 0) {
    return { success: false, error: "Spam detected" };
  }

  const supabase = await createClient();
  const { website: _honeypot, ...cleanData } = formData;

  const { error } = await supabase.from("inquiries").insert(cleanData);

  if (error) {
    return { success: false, error: error.message };
  }

  // TODO: Send email notification via Resend/Postmark
  // await sendInquiryNotification(cleanData);

  return { success: true };
}

// ─── Manager: Listing CRUD ───────────────────────────────────

export async function getAllListings(filters?: {
  search?: string;
  status?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("listings")
    .select("*, listing_images(*)")
    .order("created_at", { ascending: false });

  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,address_line_1.ilike.%${filters.search}%`
    );
  }
  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getListingById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*, listing_images(*)")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function createListing(formData: ListingFormData) {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("listings")
    .insert(formData)
    .select()
    .single();

  if (error) return { success: false, error: error.message, data: null };

  revalidatePath("/manager/listings");
  revalidatePath("/rentals");
  return { success: true, error: null, data };
}

export async function updateListing(id: string, formData: ListingFormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("listings")
    .update(formData)
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/manager/listings");
  revalidatePath("/rentals");
  revalidatePath(`/rentals/${formData.slug}`);
  return { success: true, error: null };
}

export async function updateListingStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("listings")
    .update({ status })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/manager/listings");
  revalidatePath("/rentals");
  return { success: true, error: null };
}

export async function deleteListing(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("listings").delete().eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/manager/listings");
  revalidatePath("/rentals");
  return { success: true, error: null };
}

// ─── Manager: Image Actions ─────────────────────────────────

export async function addListingImage(
  listingId: string,
  url: string,
  altText?: string,
  isPrimary?: boolean
) {
  const supabase = await createClient();
  const { error } = await supabase.from("listing_images").insert({
    listing_id: listingId,
    url,
    alt_text: altText || null,
    is_primary: isPrimary || false,
  });

  if (error) return { success: false, error: error.message };

  revalidatePath("/manager/listings");
  return { success: true, error: null };
}

export async function deleteListingImage(imageId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("listing_images")
    .delete()
    .eq("id", imageId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/manager/listings");
  return { success: true, error: null };
}

// ─── Manager: Inquiry Actions ────────────────────────────────

export async function getInquiries(filters?: {
  listingId?: string;
  status?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("inquiries")
    .select("*, listing:listings(id, title, slug)")
    .order("created_at", { ascending: false });

  if (filters?.listingId) query = query.eq("listing_id", filters.listingId);
  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function updateInquiryStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/manager/inquiries");
  return { success: true, error: null };
}

// ─── Manager: Dashboard Stats ────────────────────────────────

export async function getDashboardStats() {
  const supabase = await createClient();

  const [listings, inquiries] = await Promise.all([
    supabase.from("listings").select("status"),
    supabase.from("inquiries").select("status"),
  ]);

  const listingData = listings.data || [];
  const inquiryData = inquiries.data || [];

  return {
    active: listingData.filter((l) => l.status === "available").length,
    rented: listingData.filter((l) => l.status === "rented").length,
    pending: listingData.filter((l) => l.status === "pending").length,
    draft: listingData.filter((l) => l.status === "draft").length,
    newInquiries: inquiryData.filter((i) => i.status === "new").length,
    totalInquiries: inquiryData.length,
  };
}
