"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatIsoDate } from "@/lib/utils";
import Link from "next/link";
import { getProductsFromSupabase, getCustomersFromSupabase, getOrdersFromSupabase } from "@/lib/supabase";
import { Product, Customer, Order } from "@/data/types";
import { kpis as seedKpis, products as seedProducts } from "@/data/dataset";

export default function AdminDashboardPage() {
  const [products, setProducts] = React.useState<Product[]>(seedProducts);
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [productsData, customersData, ordersData] = await Promise.all([
          getProductsFromSupabase(),
          getCustomersFromSupabase(),
          getOrdersFromSupabase()
        ]);

        if (productsData) setProducts(productsData);
        if (customersData) setCustomers(customersData);
        if (ordersData) setOrders(ordersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const kpis = React.useMemo(() => {
    const productCount = products.length;
    const customerCount = customers.length;
    const orderCount = orders.length;
    const revenue = orders
      .filter((o) => o.status === "paid" || o.status === "fulfilled")
      .reduce((acc, o) => acc + o.total, 0);

    return {
      productCount,
      customerCount,
      orderCount,
      revenue
    };
  }, [products, customers, orders]);

  const lowStock = React.useMemo(() => {
    return products
      .filter((p) => p.inventory <= 5)
      .sort((a, b) => a.inventory - b.inventory)
      .slice(0, 8);
  }, [products]);

  if (loading) {
    return <div className="p-6">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading dashboard data: {error}</div>;
  }

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

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
            <Link href="/admin/orders" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground">No orders yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="py-2 pr-4 text-left font-medium">Customer</th>
                      <th className="py-2 pr-4 text-left font-medium">Total</th>
                      <th className="py-2 pr-4 text-left font-medium">Status</th>
                      <th className="py-2 text-left font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => {
                      const customer = customers.find(c => c.id === order.customerId);
                      return (
                        <tr key={order.id} className="border-t">
                          <td className="py-2 pr-4">
                            <div className="font-medium">
                              {customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer'}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {customer?.email || 'No email'}
                            </div>
                          </td>
                          <td className="py-2 pr-4 font-medium">{formatCurrency(order.total)}</td>
                          <td className="py-2 pr-4">
                            <Badge
                              variant={
                                order.status === "fulfilled" ? "default" :
                                order.status === "paid" ? "secondary" :
                                order.status === "pending" ? "outline" : "destructive"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-2">{formatIsoDate(order.createdAt)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-semibold">Recent Customers</CardTitle>
            <Link href="/admin/customers" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {customers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No customers yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="py-2 pr-4 text-left font-medium">Name</th>
                      <th className="py-2 pr-4 text-left font-medium">Email</th>
                      <th className="py-2 text-left font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.slice(0, 5).map((customer) => (
                      <tr key={customer.id} className="border-t">
                        <td className="py-2 pr-4">
                          <div className="font-medium">{customer.firstName} {customer.lastName}</div>
                          <div className="text-xs text-muted-foreground">
                            {customer.city && customer.country ? `${customer.city}, ${customer.country}` : 'Location not set'}
                          </div>
                        </td>
                        <td className="py-2 pr-4">{customer.email}</td>
                        <td className="py-2">{formatIsoDate(customer.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
