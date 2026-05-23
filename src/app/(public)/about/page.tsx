import type { Metadata } from "next";
import { Shield, Users, Award, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Harbor Rental Group and our approach to professional property management.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          About {siteConfig.name}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          We&apos;re a modern property management company committed to making renting simple, transparent, and enjoyable for both tenants and property owners.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { icon: Shield, title: "Integrity", desc: "Honest, transparent dealings with every tenant and owner." },
          { icon: Users, title: "Community", desc: "Building strong neighborhoods through quality management." },
          { icon: Award, title: "Excellence", desc: "Setting the standard for professional property care." },
          { icon: Heart, title: "Care", desc: "Treating every property as if it were our own home." },
        ].map((v) => (
          <Card key={v.title} className="text-center">
            <CardContent className="p-6 space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-cyan-50 text-blue-600">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">Our Story</h2>
        <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
          <p>
            Founded with the mission to modernize rental property management, {siteConfig.name} combines technology with personalized service to create a better experience for everyone involved.
          </p>
          <p>
            We believe that renting a home should be a straightforward, positive experience. That&apos;s why we&apos;ve built our business around transparency, responsiveness, and quality. From the first listing you browse to the day you move in, we&apos;re here to make the process seamless.
          </p>
          <p>
            For property owners, we offer comprehensive management services that protect your investment and maximize returns. Our team handles everything from tenant screening and lease management to maintenance coordination and financial reporting.
          </p>
        </div>
      </div>
    </div>
  );
}
