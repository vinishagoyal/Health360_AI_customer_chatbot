"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { orders as seedOrders, orderItems, products, customers } from "@/data/dataset";
import { Order, OrderStatus } from "@/data/types";
import { DataTable } from "@/components/data-table/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency, formatIsoDate } from "@/lib/utils";
import { useLocalStorageState } from "@/lib/storage";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Eye, Pencil } from "lucide-react";

const STATUS_OPTIONS: OrderStatus[] = ["pending", "paid", "fulfilled", "refunded", "cancelled"];

type OrderWithCounts = Order & { itemCount: number; customerName: string; customerEmail: string };

const productMap = new Map(products.map((p) => [p.id, p]));
const customerMap = new Map(customers.map((c) => [c.id, c]));
const itemsByOrder = new Map<string, typeof orderItems>();
for (const it of orderItems) {
  const arr = (itemsByOrder.get(it.orderId) as any) || [];
  arr.push(it);
  itemsByOrder.set(it.orderId, arr);
}

export default function OrdersPage() {
  const [rows, setRows] = useLocalStorageState<Order[]>("h360in_orders_v2", seedOrders);
  const [statusFilter, setStatusFilter] = React.useState<"all" | OrderStatus>("all");
  const [query, setQuery] = React.useState("");
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [editStatus, setEditStatus] = React.useState<OrderStatus | null>(null);

  const enriched: OrderWithCounts[] = React.useMemo(() => {
    return rows.map((o) => {
      const items = (itemsByOrder.get(o.id) as any) || [];
      const cust = customerMap.get(o.customerId);
      return {
        ...o,
        itemCount: items.length,
        customerName: cust ? `${cust.firstName} ${cust.lastName}` : "Unknown",
        customerEmail: cust?.email || "-",
      };
    });
  }, [rows]);

  const filtered = React.useMemo(() => {
    let r = enriched;
    if (statusFilter !== "all") {
      r = r.filter((o) => o.status === statusFilter);
    }
    if (query) {
      const q = query.toLowerCase();
      r = r.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q)
      );
    }
    return r.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [enriched, statusFilter, query]);

  const columns = React.useMemo<ColumnDef<OrderWithCounts, unknown>[]>(() => {
    return [
      {
        accessorKey: "id",
        header: "Order",
        cell: ({ row }) => {
          const id = row.original.id;
          return <span className="font-mono text-xs">{id.slice(0, 8)}…</span>;
        },
      },
      {
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => {
          const o = row.original;
          return (
            <div>
              <div className="font-medium">{o.customerName}</div>
              <div className="text-xs text-muted-foreground">{o.customerEmail}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const s = row.original.status;
          const variant =
            s === "paid" ? "default" : s === "fulfilled" ? "secondary" : s === "pending" ? "outline" : "destructive";
          return <Badge variant={variant as any}>{s}</Badge>;
        },
      },
      {
        accessorKey: "itemCount",
        header: "Items",
        cell: ({ row }) => <span>{row.original.itemCount}</span>,
      },
      {
        accessorKey: "subtotal",
        header: "Subtotal",
        cell: ({ row }) => formatCurrency(row.original.subtotal),
      },
      {
        accessorKey: "tax",
        header: "Tax",
        cell: ({ row }) => formatCurrency(row.original.tax),
      },
      {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => <span className="font-medium">{formatCurrency(row.original.total)}</span>,
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => formatIsoDate(row.original.createdAt),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const id = row.original.id;
          return (
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline" onClick={() => setOpenId(id)}>
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditStatus(row.original.status);
                  setOpenId(id);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ];
  }, []);

  const activeOrder = openId ? rows.find((o) => o.id === openId) || null : null;
  const activeItems = openId ? ((itemsByOrder.get(openId) as any) || []) : [];
  const activeCustomer = activeOrder ? customerMap.get(activeOrder.customerId) || null : null;

  function saveStatus() {
    if (!activeOrder || !editStatus) return;
    setRows(rows.map((o) => (o.id === activeOrder.id ? { ...o, status: editStatus } : o)));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Orders</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            placeholder="Search order id or customer…"
            className="w-[260px]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable<OrderWithCounts, unknown>
        columns={columns}
        data={filtered}
        title="Orders"
        placeholder="Search..."
      />

      <Sheet open={!!openId} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Order details</SheetTitle>
          </SheetHeader>

          {!activeOrder ? (
            <p className="text-sm text-muted-foreground mt-4">No order selected.</p>
          ) : (
            <div className="space-y-4 mt-4">
              <div>
                <div className="text-sm text-muted-foreground">Order ID</div>
                <div className="font-mono text-sm">{activeOrder.id}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-muted-foreground">Customer</div>
                  <div className="font-medium">
                    {activeCustomer ? `${activeCustomer.firstName} ${activeCustomer.lastName}` : "Unknown"}
                  </div>
                  <div className="text-xs text-muted-foreground">{activeCustomer?.email || "-"}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Created</div>
                  <div className="font-medium">{formatIsoDate(activeOrder.createdAt)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-muted-foreground">Subtotal</div>
                  <div className="font-medium">{formatCurrency(activeOrder.subtotal)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Tax</div>
                  <div className="font-medium">{formatCurrency(activeOrder.tax)}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-muted-foreground">Total</div>
                  <div className="text-lg font-semibold">{formatCurrency(activeOrder.total)}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      activeOrder.status === "paid"
                        ? "default"
                        : activeOrder.status === "fulfilled"
                        ? "secondary"
                        : activeOrder.status === "pending"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {activeOrder.status}
                  </Badge>
                  <Select
                    value={editStatus ?? activeOrder.status}
                    onValueChange={(v) => setEditStatus(v as OrderStatus)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={saveStatus}>
                    Save
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <div className="font-medium mb-2">Items</div>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="text-left py-2 px-3 font-medium">Product</th>
                        <th className="text-left py-2 px-3 font-medium">Qty</th>
                        <th className="text-left py-2 px-3 font-medium">Unit price</th>
                        <th className="text-left py-2 px-3 font-medium">Line total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeItems.map((it: any) => {
                        const p = productMap.get(it.productId);
                        return (
                          <tr key={it.id} className="border-t">
                            <td className="py-2 px-3">
                              <div className="font-medium">{p?.name || "Unknown"}</div>
                              <div className="text-xs text-muted-foreground">{p?.sku}</div>
                            </td>
                            <td className="py-2 px-3">{it.quantity}</td>
                            <td className="py-2 px-3">{formatCurrency(it.unitPrice)}</td>
                            <td className="py-2 px-3">{formatCurrency(it.unitPrice * it.quantity)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
