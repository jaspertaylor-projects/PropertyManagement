import type { Metadata } from "next";
import { Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Maintenance" };

export default function ManagerMaintenancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Maintenance Requests</h1>
      <Card>
        <CardContent className="p-12 text-center space-y-4">
          <Wrench className="h-12 w-12 mx-auto text-muted-foreground/40" />
          <h2 className="text-lg font-semibold">Coming Soon</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Tenant-submitted maintenance requests with priority levels, photo uploads, assignment tracking, and resolution management are planned for a future release.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
