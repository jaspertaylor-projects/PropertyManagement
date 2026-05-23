import type { Metadata } from "next";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = { title: "Tenant Portal" };

export default function TenantPortalPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-12 text-center space-y-6">
              <Users className="h-16 w-16 mx-auto text-muted-foreground/40" />
              <div>
                <h1 className="text-2xl font-bold">Tenant Portal</h1>
                <p className="mt-2 text-muted-foreground">Coming Soon</p>
              </div>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                A dedicated tenant portal is in development. Soon you&apos;ll be able to pay rent online, submit maintenance requests, view lease documents, and track application status.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link href="/rentals">
                  <Button>
                    Browse Rentals <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">Contact Us</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
