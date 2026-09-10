# Property Management Website Demo

An interactive website mockup built to help sell custom website design and development services to property management companies.

This project gives prospective clients a concrete example of what a new website could look like and how it could support their rental business. It combines a public rental website with a manager dashboard, providing a starting point for sales presentations, design feedback, and discussions about a client's requirements.

**Live site:** [https://property-management-tawny-alpha.vercel.app](https://property-management-tawny-alpha.vercel.app)

The current demo uses **H2O Watermark** branding and sample rental listings. It is a prototype for evaluating a proposed website, with working core features and placeholders for future services. A client launch would require its own content, configuration, integrations, and acceptance testing.

## Purpose

The goal is to help property managers see the value of investing in a new website through a hands-on demonstration:

- **Present properties clearly.** Show rental photography, pricing, amenities, and availability in a consistent layout.
- **Make browsing easier.** Let prospective tenants search, filter, and compare rentals across desktop and mobile screens.
- **Provide a direct inquiry path.** Connect property pages to an inquiry form and a manager inbox.
- **Demonstrate day-to-day updates.** Show how staff could maintain listings and change availability through a dashboard.
- **Define a client project.** Use the demo to discuss branding, content, workflows, and which additional features a property manager actually needs.

The demo is intended for property managers, rental agencies, and real estate operators considering a new or redesigned website.

## Project URLs

| Environment | Website | Manager login | Manager dashboard |
| --- | --- | --- | --- |
| Hosted demo | [Website](https://property-management-tawny-alpha.vercel.app) | [Login](https://property-management-tawny-alpha.vercel.app/login) | [Dashboard](https://property-management-tawny-alpha.vercel.app/manager) |
| Local development | [Website](http://localhost:3000) | [Login](http://localhost:3000/login) | [Dashboard](http://localhost:3000/manager) |

The hosted demo runs on Vercel. Its homepage was verified on September 8, 2026. Local URLs require the development server to be running; use the port printed by Next.js if port 3000 is occupied.

Manager access uses Supabase email/password authentication. See the shared demo account below and [demo preparation and account access](human-to-do.md) for setup notes.

## Management portal demo login

| Detail | Value |
| --- | --- |
| Login page | [Open the management portal login](https://property-management-tawny-alpha.vercel.app/login) |
| Email | `anonymous@aloha.com` |
| Password | `opportunity` |
| Dashboard | [Open the management dashboard](https://property-management-tawny-alpha.vercel.app/manager) |

**Setup pending:** These are the requested shared demo credentials. Account creation and live sign-in have not yet been confirmed because Supabase requests are timing out. See [account access notes](human-to-do.md#access-notes) for the current status.

This shared account is intended for exploring the property management mockup with sample data. Its credentials are published intentionally for demonstrations; private client accounts and backend API secrets are managed separately.

## Demonstration scope

The following features are implemented in the codebase. Confirm the manager account and test the intended workflow before a guided client presentation.

| Area | Included in the prototype |
| --- | --- |
| Public website | Home, about, contact, and rental pages with responsive layouts |
| Rental discovery | Search, filtering, sorting, and featured properties |
| Property details | Photo galleries, descriptions, pricing, amenities, and inquiry forms |
| Listing management | Create and edit listings; change publication and availability status |
| Inquiry management | Save inquiries and review, mark as read, or archive them in the manager inbox |
| Manager access | Email/password login and authenticated dashboard routes |

Online applications, tenant accounts, maintenance requests, payments, background checks, lease signing, and listing imports are future development areas. Their pages or integration modules are placeholders. Email delivery is also unfinished, and company settings are currently configured through environment variables rather than the dashboard.

These features can inform a proposal, but are not included as completed functionality in the current demo.

## Presenting the demo

1. Start with the homepage to introduce the proposed brand presentation and rental browsing experience.
2. Browse the rental catalog and open a property to show its photos, details, and inquiry form.
3. With a verified demo manager account, demonstrate listing updates and the inquiry inbox using sample data.
4. Discuss how the design, content, and workflows would change for the prospect's business, then agree on the scope of a potential build.

Sample properties, prices, inquiries, and images illustrate the experience and should not be presented as verified rental inventory. Use fictional contact details for demonstration submissions.

## Tech stack

Next.js provides the public website, manager interface, and server actions. Supabase is the main backend for data and authentication, with Storage available for property images. Vercel hosts the application.

| Layer | Technology |
| --- | --- |
| Application | Next.js 16.2.6 with App Router and server actions |
| Interface and language | React 19.2.4, TypeScript 5 |
| Styling and components | Tailwind CSS 4, shadcn/ui, Base UI |
| Backend | Supabase PostgreSQL, Auth, and Storage; Supabase JS 2 and SSR helpers |
| Supporting libraries | Zod 4, Lucide React, Sonner, date-fns 4 |
| Development tools | npm, ESLint 9 |
| Hosting | Vercel |

The database stores listings, image references, inquiries, and user profiles. The seed data uses Unsplash image URLs. Resend is a planned email integration.

Versions reflect [package.json](package.json); [package-lock.json](package-lock.json) records resolved dependencies.

## Local development

### 1. Install dependencies

```bash
npm ci
```

### 2. Prepare a demo database

Use a Supabase project intended for development or demonstrations. For a new database, run [the initial schema](supabase/migrations/001_initial_schema.sql), followed by [the sample data](supabase/seed.sql), in the Supabase SQL editor. The seed creates sample listings, images, and inquiries; it does not create a login account.

If hosting property images in Supabase Storage, create a public bucket named `listing-images`.

### 3. Configure the environment

Create `.env.local` in the repository root with your project values:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_secret_or_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME="H2O Watermark"
NEXT_PUBLIC_COMPANY_EMAIL=your_demo_contact_email
PROPERTY_MANAGER_EMAIL=your_manager_notification_email
```

Keep backend secret keys and private account passwords in your local environment or hosting configuration. The shared demo login above is intentionally public. The manager notification address does not create a login account, and setting it does not enable email delivery.

### 4. Start the application

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000). To demonstrate the manager area, follow the [account setup steps](human-to-do.md#confirm-manageradmin-access).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Build the application |
| `npm start` | Serve a completed build locally |

## Branding and deployment

Company defaults and environment variable mappings are defined in [src/lib/config.ts](src/lib/config.ts). Use these settings as the starting point for adapting the demo to a prospective client's brand. Some package names and page copy still use the original **Harbor Rental Group** name and would also need updating for a client build.

The existing demo is deployed on Vercel. For a separate demo deployment, import the repository as a Next.js project, configure its Supabase and company environment variables, and set `NEXT_PUBLIC_SITE_URL` to that deployment's URL. Configure the corresponding site and authentication redirect URLs in Supabase.

Local `.env.local` values and Vercel environment values are managed separately. A localhost setting in the repository's local environment does not describe the hosted demo.

See [human-to-do.md](human-to-do.md) for presentation preparation, account access notes, and considerations when turning the prototype into a client project.
