import type { Metadata } from "next";
import { Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Settings" };

export default function ManagerSettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your company and account settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Settings className="h-4 w-4" /> Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input defaultValue={siteConfig.name} disabled />
          </div>
          <div className="space-y-2">
            <Label>Contact Email</Label>
            <Input defaultValue={siteConfig.contact.email} disabled />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue={siteConfig.contact.phone} disabled />
          </div>
          <p className="text-xs text-muted-foreground">
            Settings management will be fully editable in a future update. Currently configured via environment variables.
          </p>
          <Button disabled>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
