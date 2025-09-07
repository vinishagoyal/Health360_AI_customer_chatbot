"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Package,
  Users,
  ShoppingCart,
} from "lucide-react";

const routes = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r bg-background h-dvh overflow-y-auto">
      <div className="h-14 flex items-center px-4 border-b">
        <Link href="/admin" className="font-semibold">
          Health360 Admin
        </Link>
      </div>
      <nav className="flex-1 px-2 py-3">
        <ul className="space-y-1">
          {routes.map((r) => {
            const Icon = r.icon;
            const active =
              pathname === r.href || (pathname?.startsWith(r.href) && r.href !== "/admin");
            return (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{r.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Health360
      </div>
    </aside>
  );
}
