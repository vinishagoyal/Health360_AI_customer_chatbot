"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { products as seedProducts } from "@/data/dataset";
import { Product, ProductCategory, ProductForm, ProductStatus } from "@/data/types";
import { DataTable } from "@/components/data-table/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency, formatIsoDate } from "@/lib/utils";
import { useLocalStorageState } from "@/lib/storage";
import { Plus, Pencil, Trash2 } from "lucide-react";

const CATEGORY_OPTIONS: ProductCategory[] = ["Vitamins", "Minerals", "Herbal", "Probiotics", "Omega-3", "Protein"];
const FORM_OPTIONS: ProductForm[] = ["Capsule", "Tablet", "Powder", "Liquid", "Gummy"];
const STATUS_OPTIONS: ProductStatus[] = ["active", "draft", "discontinued"];

type Draft = Omit<Product, "id" | "createdAt"> & { id?: string; createdAt?: string };

export default function ProductsPage() {
  const [rows, setRows, resetRows] = useLocalStorageState<Product[]>("h360in_products_v2", seedProducts);
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Product | null>(null);
  const [draft, setDraft] = React.useState<Draft>({
    name: "",
    sku: "",
    brand: "",
    price: 0,
    inventory: 0,
    category: "Vitamins",
    form: "Capsule",
    status: "active",
  });

  const filtered = React.useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [rows, query]);

  const columns = React.useMemo<ColumnDef<Product, unknown>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-muted-foreground">
                {p.brand} • {p.category} • {p.form}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "sku",
        header: "SKU",
      },
      {
        accessorKey: "inventory",
        header: "Inventory",
        cell: ({ row }) => <Badge variant="secondary">{row.original.inventory}</Badge>,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => formatCurrency(row.original.price),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const s = row.original.status;
          const variant = s === "active" ? "default" : s === "draft" ? "secondary" : "destructive";
          return <Badge variant={variant}>{s}</Badge>;
        },
      },
      {
        accessorKey: "createdAt",
        header: "Added",
        cell: ({ row }) => formatIsoDate(row.original.createdAt),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditing(p);
                  setDraft({ ...p });
                  setOpen(true);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  setRows(rows.filter((r) => r.id !== p.id));
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ];
  }, [rows, setRows]);

  function onOpenNew() {
    setEditing(null);
    setDraft({
      name: "",
      sku: "",
      brand: "",
      price: 0,
      inventory: 0,
      category: "Vitamins",
      form: "Capsule",
      status: "active",
    });
    setOpen(true);
  }

  function saveDraft() {
    // minimal validation
    if (!draft.name || !draft.sku || !draft.brand) return;
    if (draft.price < 0 || draft.inventory < 0) return;

    if (editing) {
      setRows(
        rows.map((r) =>
          r.id === editing.id
            ? {
                ...r,
                name: draft.name,
                sku: draft.sku,
                brand: draft.brand,
                price: Number(draft.price),
                inventory: Number(draft.inventory),
                category: draft.category,
                form: draft.form,
                status: draft.status,
              }
            : r
        )
      );
    } else {
      setRows([
        {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          name: draft.name,
          sku: draft.sku,
          brand: draft.brand,
          price: Number(draft.price),
          inventory: Number(draft.inventory),
          category: draft.category,
          form: draft.form,
          status: draft.status,
        },
        ...rows,
      ]);
    }
    setOpen(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Products</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search products, SKU, brand..."
            className="w-[280px]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={onOpenNew}>
            <Plus className="mr-2 h-4 w-4" />
            New
          </Button>
          <Button variant="outline" onClick={() => resetRows()}>Reset demo data</Button>
        </div>
      </div>

      <DataTable<Product, unknown>
        columns={columns}
        data={filtered}
        title="Products"
        placeholder="Search..."
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[560px] max-h-[85dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit product" : "New product"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" value={draft.sku} onChange={(e) => setDraft({ ...draft, sku: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="brand">Brand</Label>
              <Input id="brand" value={draft.brand} onChange={(e) => setDraft({ ...draft, brand: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={draft.price}
                onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="inventory">Inventory</Label>
              <Input
                id="inventory"
                type="number"
                value={draft.inventory}
                onChange={(e) => setDraft({ ...draft, inventory: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select
                value={draft.category}
                onValueChange={(v) => setDraft({ ...draft, category: v as ProductCategory })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Form</Label>
              <Select value={draft.form} onValueChange={(v) => setDraft({ ...draft, form: v as ProductForm })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select form" />
                </SelectTrigger>
                <SelectContent>
                  {FORM_OPTIONS.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={draft.status} onValueChange={(v) => setDraft({ ...draft, status: v as ProductStatus })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveDraft}>{editing ? "Save" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
