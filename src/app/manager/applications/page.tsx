import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Applications" };

export default function ManagerApplicationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
      <Card>
        <CardContent className="p-12 text-center space-y-4">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground/40" />
          <h2 className="text-lg font-semibold">Coming Soon</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Online rental applications with tenant screening, document uploads, and background checks are planned for a future release.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
