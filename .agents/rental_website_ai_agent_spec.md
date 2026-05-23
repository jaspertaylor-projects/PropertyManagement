# AI Agent Build Spec: Super-Polished MVP Rental Website with Property Manager Login

## 1. Project Summary

Build a polished, modern rental-property website inspired by legacy real-estate rental listing pages, but with a cleaner UX, responsive design, and a password-protected property manager area. The MVP should be implementation-ready and should include the architecture, UI, database schema, protected admin routes, and placeholders/stubs for harder future integrations.

The first version does **not** need to include payment processing, full tenant application workflows, document uploads, MLS/IDX sync, background checks, or deep accounting integrations. However, the codebase should be structured so those features can be added cleanly later.

The goal is to create a highly presentable MVP that can be shown to property managers, real-estate operators, or potential partners as a credible product direction.

---

## 2. Product Goal

Create a rental-property website where visitors can browse available rental listings and inquire/apply, while property managers can log in to manage listings in a protected dashboard.

The MVP should feel polished enough to demo publicly and serious enough to shop around to property managers.

Core value proposition:

> A modern rental listing and property management web presence that replaces outdated static PHP real-estate pages with a clean, fast, mobile-friendly, admin-manageable experience.

---

## 3. Target Users

### 3.1 Public Visitors / Prospective Tenants

Visitors need to:

- Browse available rental listings.
- Filter by price, bedrooms, neighborhood, and availability.
- View listing details, photos, amenities, and rental terms.
- Contact the property manager.
- Click an “Apply” call-to-action, even if the application workflow is initially stubbed.
- View trust-building company/contact information.

### 3.2 Property Managers

Property managers need to:

- Log in securely.
- View all listings.
- Create a listing.
- Edit a listing.
- Publish/unpublish listings.
- Upload or attach property images.
- Mark listings as available, pending, rented, or archived.
- See tenant inquiries.

### 3.3 Future Tenants / Applicants

Not required for MVP, but the architecture should allow tenants to later:

- Apply online.
- Upload documents.
- Pay application fees.
- Pay rent.
- Track application status.

---

## 4. MVP Scope

### 4.1 Must Build Now

The MVP must include:

1. Public marketing/rental website.
2. Rental listing index page.
3. Rental listing detail pages.
4. Search/filter/sort experience.
5. Responsive mobile-first design.
6. Password-protected property manager login.
7. Property manager dashboard.
8. Listing CRUD: create, read, update, archive/publish.
9. Image support for listings.
10. Inquiry/contact form.
11. Apply button with stubbed application flow.
12. Clean seed data for demo listings.
13. Deployment-ready setup.

### 4.2 Stub for Later

Create UI placeholders, routes, schema notes, or empty service modules for:

- Online rental applications.
- Tenant document uploads.
- ACH/rent payment processing.
- Credit/debit card convenience payments.
- Background/credit checks.
- Lease signing.
- Property manager billing.
- MLS/IDX/listing feed imports.
- Tenant portal.
- Maintenance requests.
- Multi-property owner accounts.

These should not be fully implemented in the MVP, but the codebase should clearly indicate where they will live.

---

## 5. Recommended Tech Stack

Use a modern, maintainable stack that an AI agent can build quickly and future developers can understand.

### 5.1 Frontend

- Next.js with App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide icons

### 5.2 Backend / Data

Preferred MVP option:

- Supabase Postgres
- Supabase Auth
- Supabase Storage for listing images
- Row Level Security enabled

Alternative acceptable option:

- Next.js API routes
- Prisma
- PostgreSQL
- Auth.js / NextAuth
- S3-compatible storage

### 5.3 Deployment

- Vercel for web app hosting
- Supabase hosted project for database/auth/storage

### 5.4 Forms / Email

For MVP:

- Resend, Postmark, or Formspree for inquiry notification emails

The app should persist inquiries in the database even if email delivery fails.

---

## 6. Design Direction

The site should not look like an old template site. It should feel like a polished modern rental/property-management product.

### 6.1 Visual Style

- Clean, premium, real-estate oriented.
- Light background with strong typography.
- High-quality listing cards.
- Large image previews.
- Rounded cards.
- Clear calls-to-action.
- Mobile-first spacing.
- Professional but not overly corporate.

### 6.2 Brand Placeholder

Use a neutral placeholder brand unless a real brand is provided.

Suggested placeholder:

- Brand name: Harbor Rental Group
- Tagline: Modern rental homes, professionally managed.

All branding should be easy to replace from one config file or theme file.

### 6.3 Core Pages

Public pages:

- `/` Home
- `/rentals` Rental listings
- `/rentals/[slug]` Listing detail
- `/about` About/property management intro
- `/contact` Contact page
- `/apply` Stub application page
- `/login` Property manager login

Protected manager pages:

- `/manager` Dashboard overview
- `/manager/listings` Listing management
- `/manager/listings/new` Create listing
- `/manager/listings/[id]/edit` Edit listing
- `/manager/inquiries` Inquiry inbox
- `/manager/settings` Basic account/company settings placeholder

Future stub pages:

- `/tenant` Tenant portal placeholder
- `/manager/payments` Payments placeholder
- `/manager/applications` Applications placeholder
- `/manager/maintenance` Maintenance placeholder

---

## 7. Public Website Requirements

### 7.1 Home Page

The home page should include:

- Hero section with strong headline and CTA.
- Search entry point for rentals.
- Featured rental listings.
- Trust section for property management.
- “For renters” and “For property owners” sections.
- Contact CTA.

Suggested hero copy:

> Find your next rental with a property manager who keeps things simple.

Primary CTA:

- View Rentals

Secondary CTA:

- Contact Property Manager

### 7.2 Rentals Index Page

Route: `/rentals`

Must include:

- Page title and intro.
- Search input.
- Filters:
  - Min price
  - Max price
  - Bedrooms
  - Bathrooms
  - Neighborhood
  - Availability status
  - Pets allowed
  - Parking
- Sort options:
  - Newest
  - Price low to high
  - Price high to low
  - Bedrooms
- Listing card grid.
- Empty state if no listings match.
- Loading/skeleton states.

Listing cards must show:

- Main image
- Price
- Title
- Address/neighborhood
- Beds
- Baths
- Square footage
- Parking
- Availability
- Short description
- View details CTA

### 7.3 Listing Detail Page

Route: `/rentals/[slug]`

Must include:

- Image gallery.
- Price.
- Address.
- Beds, baths, square footage, parking.
- Full description.
- Amenities.
- Lease terms.
- Availability date.
- Pet policy.
- Map placeholder.
- Inquiry form.
- Apply CTA.
- Related/nearby listings section if available.

The map can be a static placeholder in MVP. Do not implement paid map APIs unless needed.

### 7.4 Inquiry Form

The inquiry form should collect:

- Name
- Email
- Phone
- Desired move-in date
- Message
- Listing ID

On submit:

- Save inquiry to database.
- Send notification email to configured property manager email.
- Show confirmation state.

Spam prevention:

- Honeypot field.
- Basic rate limit or TODO comment for rate limiting.

### 7.5 Apply Page Stub

Route: `/apply`

This page should not implement a full application system yet.

It should include:

- Explanation that online applications are coming soon or handled externally.
- Optional external application link configuration.
- Contact CTA.

The page should be designed as if it will later become a full application flow.

---

## 8. Property Manager Login and Protected Dashboard

### 8.1 Authentication

The property manager section must be password protected.

Preferred implementation:

- Supabase Auth email/password login.
- Protected routes using middleware or server-side session checks.
- Only authenticated manager users can access `/manager/*` routes.

For MVP, role handling can be simple:

- A user must be authenticated.
- Optionally, a `profiles.role = 'manager'` check should be included.

Do not hardcode admin passwords in the repository.

Environment variables should be used for all secrets.

### 8.2 Login Page

Route: `/login`

Must include:

- Email field
- Password field
- Sign in button
- Error state
- Loading state
- Redirect to `/manager` after successful login

Optional:

- Password reset link if Supabase Auth is configured for it.

### 8.3 Manager Dashboard

Route: `/manager`

Must include:

- Summary cards:
  - Active listings
  - Rented listings
  - Pending listings
  - New inquiries
- Recent inquiries list
- Recent listings list
- Quick actions:
  - Add listing
  - View inquiries
  - Edit settings

### 8.4 Listing Management

Route: `/manager/listings`

Must include:

- Table/list of all listings.
- Search.
- Filters by status.
- Edit button.
- Publish/unpublish/archive actions.
- New listing button.

### 8.5 Create/Edit Listing Form

Routes:

- `/manager/listings/new`
- `/manager/listings/[id]/edit`

Fields:

- Title
- Slug
- Status: draft, available, pending, rented, archived
- Price
- Deposit
- Address line 1
- Address line 2
- City
- State
- ZIP
- Neighborhood
- Bedrooms
- Bathrooms
- Square footage
- Parking count/type
- Pets allowed
- Furnished
- Available date
- Lease term
- Description
- Amenities
- Image upload/management
- Featured listing toggle

Validation:

- Required fields must be enforced.
- Price, beds, baths, square footage must be numeric.
- Slug must be unique.
- Status must use fixed enum values.

### 8.6 Inquiry Inbox

Route: `/manager/inquiries`

Must include:

- List of inquiries.
- Filter by listing.
- Filter by read/unread.
- Inquiry detail view.
- Mark as read/unread.
- Show related listing link.

Replying from the dashboard can be stubbed for later.

---

## 9. Data Model

Use these core tables.

### 9.1 `listings`

Fields:

```sql
id uuid primary key default gen_random_uuid(),
title text not null,
slug text unique not null,
status text not null check (status in ('draft', 'available', 'pending', 'rented', 'archived')),
price integer not null,
deposit integer,
address_line_1 text not null,
address_line_2 text,
city text not null,
state text not null,
zip text not null,
neighborhood text,
bedrooms numeric not null,
bathrooms numeric not null,
square_feet integer,
parking text,
pets_allowed boolean default false,
furnished boolean default false,
available_date date,
lease_terms text,
description text not null,
amenities text[] default '{}',
featured boolean default false,
created_at timestamptz default now(),
updated_at timestamptz default now()
```

### 9.2 `listing_images`

```sql
id uuid primary key default gen_random_uuid(),
listing_id uuid references listings(id) on delete cascade,
url text not null,
alt_text text,
sort_order integer default 0,
is_primary boolean default false,
created_at timestamptz default now()
```

### 9.3 `inquiries`

```sql
id uuid primary key default gen_random_uuid(),
listing_id uuid references listings(id) on delete set null,
name text not null,
email text not null,
phone text,
desired_move_in_date date,
message text,
status text not null default 'new' check (status in ('new', 'read', 'archived')),
created_at timestamptz default now()
```

### 9.4 `profiles`

```sql
id uuid primary key references auth.users(id) on delete cascade,
email text not null,
role text not null default 'manager' check (role in ('manager', 'admin')),
created_at timestamptz default now()
```

### 9.5 Future Tables to Stub

Create TODO files or commented schema sections for:

- `applications`
- `application_documents`
- `payments`
- `leases`
- `maintenance_requests`
- `owners`
- `properties`
- `units`

The MVP can treat each listing as a standalone rental unit, but the future model should anticipate separate property/unit structures.

---

## 10. Security Requirements

### 10.1 Authentication

- Property manager routes must not be accessible without login.
- Auth state should be checked server-side where possible.
- Do not rely only on client-side hiding.

### 10.2 Authorization

- Public visitors can read only published/available listings.
- Managers can read and write listing data.
- Inquiries should not be public.
- Storage uploads should be restricted to authenticated manager users.

### 10.3 Environment Variables

Use `.env.local` for:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
PROPERTY_MANAGER_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

Do not expose service-role keys to the browser.

### 10.4 Row Level Security

Enable RLS on all Supabase tables.

Minimum policies:

- Public can select listings where `status = 'available'`.
- Public can select listing images for available listings.
- Public can insert inquiries.
- Authenticated manager/admin can manage listings, listing images, and inquiries.

---

## 11. Future Integrations: Implementation-Ready Stubs

The agent should create a `/lib/integrations` directory with clean placeholder modules.

Suggested files:

```txt
/lib/integrations/payments.ts
/lib/integrations/applications.ts
/lib/integrations/background-checks.ts
/lib/integrations/lease-signing.ts
/lib/integrations/listing-imports.ts
/lib/integrations/email.ts
```

Each file should export a typed interface and throw a clear `NotImplementedError` or return mock data.

### 11.1 Payments Stub

Future payment options should prioritize ACH/eCheck.

Stub should anticipate:

- ACH rent payments
- Optional tenant-paid card convenience fee
- Application fee collection
- Payment status webhooks

Suggested providers to leave as config options:

- Stripe ACH
- Plaid + ACH processor
- Property-management-specific payment provider

### 11.2 Applications Stub

Future application system should anticipate:

- Applicant profile
- Co-applicants
- Employment/income details
- Rental history
- References
- Document upload
- Application fee
- Background check
- Status tracking

### 11.3 Listing Imports Stub

Future import system should anticipate:

- CSV import
- MLS/IDX import
- Manual import from legacy PHP pages
- Third-party property manager feed

---

## 12. AI Agent Implementation Instructions

The AI agent should produce production-quality code, not a throwaway prototype.

### 12.1 General Coding Rules

- Use TypeScript throughout.
- Use server components where appropriate.
- Keep business logic in `/lib`.
- Keep UI components reusable.
- Avoid hardcoded demo data except in seed files.
- Validate form inputs with Zod.
- Use clean loading and error states.
- Use accessible form labels and semantic HTML.
- Keep styling consistent through shared components.

### 12.2 Suggested Folder Structure

```txt
/app
  /(public)
    page.tsx
    rentals/page.tsx
    rentals/[slug]/page.tsx
    about/page.tsx
    contact/page.tsx
    apply/page.tsx
  /(auth)
    login/page.tsx
  /manager
    layout.tsx
    page.tsx
    listings/page.tsx
    listings/new/page.tsx
    listings/[id]/edit/page.tsx
    inquiries/page.tsx
    settings/page.tsx
/components
  /layout
  /listings
  /forms
  /manager
  /ui
/lib
  /supabase
  /db
  /auth
  /validations
  /integrations
  /email
/supabase
  migrations/
  seed.sql
```

### 12.3 Seed Data

Include 8–12 realistic demo listings.

Each listing should have:

- Price
- Address/neighborhood
- Beds/baths
- Description
- Amenities
- Availability status
- 3–6 placeholder images

Use legally safe placeholder images from a configured placeholder source, or include instructions for adding real images later.

### 12.4 UX Quality Bar

The MVP should include:

- Skeleton loading states.
- Empty states.
- Error states.
- Toast confirmations for dashboard actions.
- Responsive mobile nav.
- Sticky inquiry CTA on listing detail pages for mobile.
- Clean dashboard sidebar.
- Breadcrumbs in manager area.

---

## 13. Acceptance Criteria

The MVP is complete when all of the following are true:

### Public Site

- A visitor can open the home page.
- A visitor can browse available rentals.
- A visitor can filter/sort listings.
- A visitor can view a listing detail page.
- A visitor can submit an inquiry.
- A visitor sees a polished confirmation after inquiry submission.
- The site works well on desktop and mobile.

### Manager Area

- A manager can log in.
- Unauthenticated users cannot access `/manager/*`.
- A manager can create a listing.
- A manager can edit a listing.
- A manager can publish/unpublish/archive a listing.
- A manager can upload or attach listing images.
- A manager can view submitted inquiries.
- A manager can mark inquiries as read/archived.

### Technical

- Database migrations are included.
- Seed data is included.
- Environment variable example is included.
- README setup instructions are included.
- App deploys successfully to Vercel.
- No secrets are committed.
- TypeScript build passes.
- Basic linting passes.

---

## 14. Non-Goals for MVP

Do not spend MVP time on:

- Full rent payment processing.
- Tenant portal authentication.
- Background checks.
- Lease generation/signing.
- Owner accounting dashboards.
- Maintenance request workflows.
- Complex multi-tenant SaaS billing.
- Full MLS/IDX compliance.
- Native mobile apps.

These should be represented as clean future modules or placeholder pages only.

---

## 15. Suggested README Content

The generated project should include a README with:

1. Project overview.
2. Tech stack.
3. Local setup.
4. Environment variables.
5. Supabase setup.
6. How to run migrations.
7. How to seed demo data.
8. How to create a manager account.
9. How to deploy to Vercel.
10. Roadmap for future integrations.

---

## 16. Suggested Development Order for AI Agent

1. Scaffold Next.js app with TypeScript and Tailwind.
2. Install shadcn/ui and base components.
3. Create database schema/migrations.
4. Create Supabase client/server helpers.
5. Build public layout, header, footer, and home page.
6. Build rental listing cards and rentals page.
7. Build listing detail page.
8. Build inquiry form and database insert.
9. Add email notification integration.
10. Add auth and login page.
11. Protect manager routes.
12. Build manager dashboard.
13. Build listing CRUD forms.
14. Build inquiry inbox.
15. Add seed data.
16. Add future integration stubs.
17. Polish responsive design.
18. Add README and deployment instructions.
19. Run typecheck/lint/build.
20. Fix build errors.

---

## 17. Demo Script

Use this script when showing the MVP to property managers or potential partners:

1. Open the home page and show the polished brand presentation.
2. Click “View Rentals.”
3. Filter listings by price and bedrooms.
4. Open a listing detail page.
5. Show photos, rental facts, amenities, and inquiry form.
6. Submit a sample inquiry.
7. Log in as property manager.
8. Show dashboard metrics.
9. Open listing manager.
10. Edit a listing and change its status.
11. Show inquiry inbox with the submitted inquiry.
12. Briefly show future placeholders: applications, payments, maintenance, tenant portal.

---

## 18. Final MVP Positioning

This should be presented as:

> A polished rental listing and property management front office MVP with a secure manager dashboard, designed to replace outdated property-rental pages and evolve into a full rent/application/payment platform.

The hard integrations should be clearly planned, but not overbuilt in version one.
