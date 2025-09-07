"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { kpis, products } from "@/data/dataset";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatIsoDate } from "@/lib/utils";
import Link from "next/link";

export default function AdminDashboardPage() {
  const lowStock = products
    .filter((p) => p.inventory <= 5)
    .sort((a, b) => a.inventory - b.inventory)
    .slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.productCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Total active catalog</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.customerCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered contacts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.orderCount}</div>
            <p className="text-xs text-muted-foreground mt-1">All-time order count</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpis.revenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">Paid + fulfilled</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-semibold">Low stock</CardTitle>
          <Link href="/admin/products" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </CardHeader>
        <CardContent>
          {lowStock.length === 0 ? (
            <p className="text-sm text-muted-foreground">No low stock items.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="py-2 pr-4 text-left font-medium">Product</th>
                    <th className="py-2 pr-4 text-left font-medium">SKU</th>
                    <th className="py-2 pr-4 text-left font-medium">Inventory</th>
                    <th className="py-2 pr-4 text-left font-medium">Price</th>
                    <th className="py-2 pr-4 text-left font-medium">Status</th>
                    <th className="py-2 text-left font-medium">Added</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStock.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="py-2 pr-4">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {p.brand} • {p.category} • {p.form}
                        </div>
                      </td>
                      <td className="py-2 pr-4">{p.sku}</td>
                      <td className="py-2 pr-4">
                        <Badge variant="secondary">{p.inventory}</Badge>
                      </td>
                      <td className="py-2 pr-4">{formatCurrency(p.price)}</td>
                      <td className="py-2 pr-4">
                        <Badge
                          variant={p.status === "active" ? "default" : p.status === "draft" ? "secondary" : "destructive"}
                        >
                          {p.status}
                        </Badge>
                      </td>
                      <td className="py-2">{formatIsoDate(p.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
