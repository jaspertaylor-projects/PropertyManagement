-- ============================================================================
-- Harbor Rental Group — Initial Database Schema
-- ============================================================================

-- 1. Listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'available', 'pending', 'rented', 'archived')),
  price integer NOT NULL,
  deposit integer,
  address_line_1 text NOT NULL,
  address_line_2 text,
  city text NOT NULL,
  state text NOT NULL,
  zip text NOT NULL,
  neighborhood text,
  bedrooms numeric NOT NULL,
  bathrooms numeric NOT NULL,
  square_feet integer,
  parking text,
  pets_allowed boolean DEFAULT false,
  furnished boolean DEFAULT false,
  available_date date,
  lease_terms text,
  description text NOT NULL,
  amenities text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 2. Listing images table
CREATE TABLE IF NOT EXISTS listing_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE,
  url text NOT NULL,
  alt_text text,
  sort_order integer DEFAULT 0,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 3. Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  desired_move_in_date date,
  message text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at timestamptz DEFAULT now()
);

-- 4. Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'manager' CHECK (role IN ('manager', 'admin')),
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- Row Level Security Policies
-- ============================================================================

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Listings: public can read available listings
CREATE POLICY "Public can view available listings"
  ON listings FOR SELECT
  USING (status = 'available');

-- Listings: authenticated managers can do everything
CREATE POLICY "Managers can manage all listings"
  ON listings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Listing images: public can view images for available listings
CREATE POLICY "Public can view images for available listings"
  ON listing_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM listings
      WHERE listings.id = listing_images.listing_id
      AND listings.status = 'available'
    )
  );

-- Listing images: managers can manage all images
CREATE POLICY "Managers can manage all listing images"
  ON listing_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Inquiries: public can insert inquiries
CREATE POLICY "Public can submit inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

-- Inquiries: managers can read/manage all inquiries
CREATE POLICY "Managers can manage inquiries"
  ON inquiries FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Profiles: managers can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Profiles: managers can update own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- Indexes
-- ============================================================================

CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_slug ON listings(slug);
CREATE INDEX idx_listings_featured ON listings(featured);
CREATE INDEX idx_listings_price ON listings(price);
CREATE INDEX idx_listing_images_listing_id ON listing_images(listing_id);
CREATE INDEX idx_inquiries_listing_id ON inquiries(listing_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);

-- ============================================================================
-- Storage bucket for listing images
-- ============================================================================
-- Run this in the Supabase SQL editor or via the dashboard:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('listing-images', 'listing-images', true);
