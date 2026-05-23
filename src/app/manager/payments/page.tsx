import type { Metadata } from "next";
import { CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Payments" };

export default function ManagerPaymentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
      <Card>
        <CardContent className="p-12 text-center space-y-4">
          <CreditCard className="h-12 w-12 mx-auto text-muted-foreground/40" />
          <h2 className="text-lg font-semibold">Coming Soon</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Online rent payments via ACH and credit/debit card, application fee collection, and payment tracking are planned for a future release.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
