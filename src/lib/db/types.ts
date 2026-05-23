/**
 * Database type definitions matching the Supabase schema.
 */

export type ListingStatus =
  | "draft"
  | "available"
  | "pending"
  | "rented"
  | "archived";

export type InquiryStatus = "new" | "read" | "archived";

export type UserRole = "manager" | "admin";

export interface Listing {
  id: string;
  title: string;
  slug: string;
  status: ListingStatus;
  price: number;
  deposit: number | null;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  zip: string;
  neighborhood: string | null;
  bedrooms: number;
  bathrooms: number;
  square_feet: number | null;
  parking: string | null;
  pets_allowed: boolean;
  furnished: boolean;
  available_date: string | null;
  lease_terms: string | null;
  description: string;
  amenities: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ListingImage {
  id: string;
  listing_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface Inquiry {
  id: string;
  listing_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  desired_move_in_date: string | null;
  message: string | null;
  status: InquiryStatus;
  created_at: string;
  listing?: Listing;
}

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

/** Listing with its images attached */
export interface ListingWithImages extends Listing {
  listing_images: ListingImage[];
}

/** Inquiry with related listing info */
export interface InquiryWithListing extends Omit<Inquiry, 'listing'> {
  listing: Pick<Listing, "id" | "title" | "slug"> | null;
}
