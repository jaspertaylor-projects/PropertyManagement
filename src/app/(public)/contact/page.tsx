import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/config";
import { InquiryForm } from "@/components/forms/inquiry-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Harbor Rental Group. We are here to help with your rental needs.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
        <p className="mt-3 text-muted-foreground">
          Have a question about a rental or our services? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Phone, title: "Phone", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}` },
              { icon: Mail, title: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
              { icon: MapPin, title: "Office", value: `${siteConfig.contact.address}\n${siteConfig.contact.city}, ${siteConfig.contact.state} ${siteConfig.contact.zip}`, href: null },
              { icon: Clock, title: "Hours", value: "Mon–Fri: 9am–6pm\nSat: 10am–4pm\nSun: Closed", href: null },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-pre-line">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{item.value}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map placeholder */}
          <Card>
            <CardContent className="p-0">
              <div className="aspect-[4/3] rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-sm">
                <div className="text-center space-y-2">
                  <MapPin className="h-8 w-8 mx-auto opacity-50" />
                  <p>Interactive map coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div>
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
