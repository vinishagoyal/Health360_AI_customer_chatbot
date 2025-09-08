"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { customers as seedCustomers } from "@/data/dataset";
import { Customer } from "@/data/types";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { formatIsoDate } from "@/lib/utils";
import { useLocalStorageState } from "@/lib/storage";
import { Plus, Pencil, Trash2 } from "lucide-react";

type Draft = Omit<Customer, "id" | "createdAt"> & { id?: string; createdAt?: string };

export default function CustomersPage() {
  const [rows, setRows, resetRows] = useLocalStorageState<Customer[]>("h360in_customers_v2", seedCustomers);
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Customer | null>(null);
  const [draft, setDraft] = React.useState<Draft>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
  });

  const filtered = React.useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter((c) => {
      const name = `${c.firstName} ${c.lastName}`.toLowerCase();
      return (
        name.includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.city?.toLowerCase() || "").includes(q) ||
        (c.country?.toLowerCase() || "").includes(q)
      );
    });
  }, [rows, query]);

  const columns = React.useMemo<ColumnDef<Customer, unknown>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Customer",
        cell: ({ row }) => {
          const c = row.original;
          return (
            <div>
              <div className="font-medium">{c.firstName} {c.lastName}</div>
              <div className="text-xs text-muted-foreground">{c.email}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => row.original.phone || "-",
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
          const c = row.original;
          return (
            <span className="text-muted-foreground">
              {[c.city, c.country].filter(Boolean).join(", ") || "-"}
            </span>
          );
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
          const c = row.original;
          return (
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditing(c);
                  setDraft({ ...c });
                  setOpen(true);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  setRows(rows.filter((r) => r.id !== c.id));
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
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
    });
    setOpen(true);
  }

  function saveDraft() {
    if (!draft.firstName || !draft.lastName || !draft.email) return;

    if (editing) {
      setRows(
        rows.map((r) =>
          r.id === editing.id
            ? {
                ...r,
                firstName: draft.firstName,
                lastName: draft.lastName,
                email: draft.email,
                phone: draft.phone,
                city: draft.city,
                country: draft.country,
              }
            : r
        )
      );
    } else {
      setRows([
        {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          firstName: draft.firstName,
          lastName: draft.lastName,
          email: draft.email,
          phone: draft.phone,
          city: draft.city,
          country: draft.country,
        },
        ...rows,
      ]);
    }
    setOpen(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Customers</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search name, email, location..."
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

      <DataTable<Customer, unknown>
        columns={columns}
        data={filtered}
        title="Customers"
        placeholder="Search..."
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit customer" : "New customer"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" value={draft.firstName} onChange={(e) => setDraft({ ...draft, firstName: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" value={draft.lastName} onChange={(e) => setDraft({ ...draft, lastName: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={draft.phone || ""} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={draft.city || ""} onChange={(e) => setDraft({ ...draft, city: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Input id="country" value={draft.country || ""} onChange={(e) => setDraft({ ...draft, country: e.target.value })} />
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
