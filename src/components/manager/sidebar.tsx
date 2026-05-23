"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Building2, MessageSquare, Settings,
  CreditCard, FileText, Wrench, Users, LogOut, ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/actions";
import { siteConfig } from "@/lib/config";

const mainNav = [
  { href: "/manager", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/manager/listings", icon: Building2, label: "Listings" },
  { href: "/manager/inquiries", icon: MessageSquare, label: "Inquiries" },
  { href: "/manager/settings", icon: Settings, label: "Settings" },
];

const futureNav = [
  { href: "/manager/applications", icon: FileText, label: "Applications" },
  { href: "/manager/payments", icon: CreditCard, label: "Payments" },
  { href: "/manager/maintenance", icon: Wrench, label: "Maintenance" },
];

export function ManagerSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/manager") return pathname === "/manager";
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border/40 lg:bg-muted/20">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-5 border-b border-border/40">
          <Link href="/manager" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">{siteConfig.name}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Manager</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2">
            Main
          </p>
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-blue-50 text-blue-700 border border-blue-100"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
              {isActive(item.href) && (
                <ChevronRight className="h-3 w-3 ml-auto" />
              )}
            </Link>
          ))}

          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2 mt-6">
            Coming Soon
          </p>
          {futureNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground/50 cursor-default"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
              <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0">
                Soon
              </Badge>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border/40 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Users className="h-4 w-4" />
            View Public Site
          </Link>
          <form action={signOut}>
            <Button
              variant="ghost"
              type="submit"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              size="sm"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
}
