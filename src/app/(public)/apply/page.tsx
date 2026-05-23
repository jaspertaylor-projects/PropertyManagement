import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight, Mail, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply for a rental property with Harbor Rental Group.",
};

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6">
          <FileText className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Apply for a Rental
        </h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Online applications are coming soon! In the meantime, please contact us directly to begin the application process.
        </p>
      </div>

      {/* What to expect */}
      <Card className="mb-8">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">What to Expect</h2>
          <div className="space-y-3">
            {[
              "Submit your application with basic personal and employment info",
              "Provide references from previous landlords",
              "Authorize a background and credit check",
              "Pay a one-time application fee",
              "Receive a decision within 48-72 hours",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                  {i + 1}
                </div>
                <span className="text-sm text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card className="mb-8">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">Requirements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Valid government-issued ID",
              "Proof of income (pay stubs or tax returns)",
              "Rental history (2+ years preferred)",
              "Credit score of 620+",
              "No prior evictions",
              "References from past landlords",
            ].map((req) => (
              <div key={req} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-muted-foreground">{req}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 text-center space-y-4 border border-blue-100">
        <Clock className="h-6 w-6 text-blue-600 mx-auto" />
        <h3 className="font-semibold text-lg">Ready to Apply?</h3>
        <p className="text-sm text-muted-foreground">
          Contact our team to start the application process. We&apos;ll guide you through every step.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              <Mail className="mr-2 h-4 w-4" /> Contact Us to Apply
            </Button>
          </Link>
          <Link href="/rentals">
            <Button variant="outline">
              Browse Rentals <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
