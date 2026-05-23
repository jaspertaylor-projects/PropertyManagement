import Link from "next/link";
import {
  Search,
  Shield,
  Home,
  Wrench,
  Users,
  ArrowRight,
  Star,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/config";
import { getFeaturedListings } from "@/lib/db/actions";
import { ListingCard } from "@/components/listings/listing-card";

export default async function HomePage() {
  let featuredListings: Awaited<ReturnType<typeof getFeaturedListings>> = [];
  try {
    featuredListings = await getFeaturedListings();
  } catch {
    // Supabase not configured yet — show page without listings
  }

  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }} />
        </div>
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm mb-6 border border-white/10">
              <Star className="h-4 w-4 text-amber-400" />
              <span>Professionally Managed Rental Homes</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
              Find your next rental with a manager who{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                keeps things simple
              </span>
            </h1>
            <p className="mt-6 text-lg text-blue-100/80 max-w-2xl leading-relaxed">
              {siteConfig.tagline} Browse our available properties, schedule
              viewings, and move in with confidence.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/rentals">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500 shadow-lg shadow-blue-500/25 text-base px-8"
                >
                  <Search className="mr-2 h-5 w-5" />
                  View Rentals
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 text-base px-8 bg-transparent"
                >
                  Contact Property Manager
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Listings ─────────────────────────────── */}
      {featuredListings.length > 0 && (
        <section className="py-16 sm:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Featured Rentals
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Hand-picked properties available now
                </p>
              </div>
              <Link
                href="/rentals"
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                View all listings
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/rentals">
                <Button variant="outline">
                  View All Listings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Trust / Why Us ────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-muted/30 border-y border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight">
              Why {siteConfig.name}?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              We combine modern technology with hands-on property management to
              give tenants and owners the best experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Trusted Management",
                desc: "Licensed, insured, and committed to transparent operations.",
              },
              {
                icon: Wrench,
                title: "24/7 Maintenance",
                desc: "Responsive maintenance team for urgent and routine repairs.",
              },
              {
                icon: Home,
                title: "Quality Homes",
                desc: "Every property meets our standards before being listed.",
              },
              {
                icon: Users,
                title: "Personal Service",
                desc: "Dedicated property managers who know you by name.",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="border-border/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-cyan-50 text-blue-600">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── For Renters / For Owners ─────────────────────── */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Renters */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm text-blue-700 font-medium">
                <Home className="h-4 w-4" />
                For Renters
              </div>
              <h3 className="text-2xl font-bold">
                Find your perfect home, hassle-free
              </h3>
              <ul className="space-y-3">
                {[
                  "Browse all available rentals online",
                  "Schedule viewings at your convenience",
                  "Simple, transparent application process",
                  "Responsive maintenance support",
                  "Secure online rent payments (coming soon)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/rentals">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white mt-2">
                  Browse Rentals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* For Property Owners */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-sm text-amber-700 font-medium">
                <Building2 className="h-4 w-4" />
                For Property Owners
              </div>
              <h3 className="text-2xl font-bold">
                Professional management, maximum returns
              </h3>
              <ul className="space-y-3">
                {[
                  "Comprehensive tenant screening",
                  "Online listing and marketing",
                  "Rent collection and accounting",
                  "Regular property inspections",
                  "Legal compliance and eviction support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button variant="outline" className="mt-2">
                  Partner With Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to find your next home?
          </h2>
          <p className="mt-4 text-lg text-blue-100/90">
            Get in touch with our team today. We&apos;re here to help you find
            the perfect rental.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/rentals">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg text-base px-8"
              >
                View Rentals
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-base px-8 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
