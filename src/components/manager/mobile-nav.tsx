"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu, X, LayoutDashboard, Building2, MessageSquare, Settings,
  LogOut, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/actions";
import { siteConfig } from "@/lib/config";

const navItems = [
  { href: "/manager", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/manager/listings", icon: Building2, label: "Listings" },
  { href: "/manager/inquiries", icon: MessageSquare, label: "Inquiries" },
  { href: "/manager/settings", icon: Settings, label: "Settings" },
];

export function ManagerMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden border-b border-border/40 bg-background">
      <div className="flex items-center justify-between px-4 h-14">
        <Link href="/manager" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-xs">
            <Building2 className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold">{siteConfig.name}</span>
        </Link>
        <button onClick={() => setOpen(!open)} className="p-2">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="p-3 border-t border-border/40 space-y-1 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                pathname === item.href || (item.href !== "/manager" && pathname.startsWith(item.href))
                  ? "bg-blue-50 text-blue-700"
                  : "text-muted-foreground hover:bg-accent"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground" onClick={() => setOpen(false)}>
            <Users className="h-4 w-4" /> Public Site
          </Link>
          <form action={signOut}>
            <Button variant="ghost" type="submit" className="w-full justify-start text-muted-foreground" size="sm">
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </form>
        </nav>
      )}
    </div>
  );
}
