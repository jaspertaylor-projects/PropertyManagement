"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitInquiry } from "@/lib/db/actions";
import { toast } from "sonner";

interface InquiryFormProps {
  listingId?: string;
  listingTitle?: string;
}

export function InquiryForm({ listingId, listingTitle }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      listing_id: listingId || null,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || null,
      desired_move_in_date:
        (formData.get("desired_move_in_date") as string) || null,
      message: formData.get("message") as string,
      website: formData.get("website") as string, // honeypot
    };

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.email) newErrors.email = "Email is required";
    if (!data.message) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const result = await submitInquiry(data);
      if (result.success) {
        setSubmitted(true);
        toast.success("Inquiry sent successfully!");
      } else {
        toast.error(result.error || "Failed to send inquiry");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="p-6 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-green-900">Inquiry Sent!</h3>
          <p className="text-sm text-green-700">
            Thank you for your interest
            {listingTitle && ` in "${listingTitle}"`}. Our property manager will
            get back to you within 24 hours.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSubmitted(false)}
            className="mt-2"
          >
            Send Another Inquiry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">
          {listingTitle ? "Inquire About This Property" : "Send Us a Message"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot — hidden from real users */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <Input name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inquiry-name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="inquiry-name"
                name="name"
                placeholder="Your full name"
                required
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="inquiry-email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="inquiry-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inquiry-phone">Phone</Label>
              <Input
                id="inquiry-phone"
                name="phone"
                type="tel"
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inquiry-movein">Desired Move-In Date</Label>
              <Input
                id="inquiry-movein"
                name="desired_move_in_date"
                type="date"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiry-message">
              Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="inquiry-message"
              name="message"
              placeholder="Tell us about yourself and what you're looking for..."
              rows={4}
              required
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Inquiry
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
