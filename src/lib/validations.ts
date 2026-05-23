import { z } from "zod";

export const listingSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  status: z.enum(["draft", "available", "pending", "rented", "archived"]),
  price: z.coerce.number().min(0, "Price must be positive"),
  deposit: z.coerce.number().min(0).nullable().optional(),
  address_line_1: z.string().min(1, "Address is required"),
  address_line_2: z.string().nullable().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP is required"),
  neighborhood: z.string().nullable().optional(),
  bedrooms: z.coerce.number().min(0, "Must be 0 or more"),
  bathrooms: z.coerce.number().min(0, "Must be 0 or more"),
  square_feet: z.coerce.number().min(0).nullable().optional(),
  parking: z.string().nullable().optional(),
  pets_allowed: z.boolean().default(false),
  furnished: z.boolean().default(false),
  available_date: z.string().nullable().optional(),
  lease_terms: z.string().nullable().optional(),
  description: z.string().min(1, "Description is required"),
  amenities: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export type ListingFormData = z.infer<typeof listingSchema>;

export const inquirySchema = z.object({
  listing_id: z.string().uuid().nullable().optional(),
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Valid email is required"),
  phone: z.string().max(20).nullable().optional(),
  desired_move_in_date: z.string().nullable().optional(),
  message: z.string().min(1, "Message is required").max(2000),
  // Honeypot field — should be empty
  website: z.string().max(0, "Bot detected").optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Valid email is required"),
  phone: z.string().max(20).nullable().optional(),
  message: z.string().min(1, "Message is required").max(2000),
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
