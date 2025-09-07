"use client";

import * as React from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

export function CartButton() {
  const count = useCart((s) => s.count());
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)} className="relative">
        <ShoppingCart className="h-4 w-4 mr-2" />
        Cart
        {count > 0 ? (
          <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-medium text-primary-foreground">
            {count}
          </span>
        ) : null}
      </Button>
      <CartSheet open={open} onOpenChange={setOpen} />
    </>
  );
}

export function CartSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { items, inc, dec, remove, clear, subtotal, tax, total } = useCart();

  function onCheckout() {
    toast.info("Checkout is not implemented in this demo");
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-3">
                {items.map((it) => (
                  <div key={it.id} className="flex gap-3 rounded-md border p-2">
                    <div className="relative h-16 w-20 overflow-hidden rounded">
                      <Image
                        src={it.imageUrl ?? "/next.svg"}
                        alt={it.name}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm font-medium leading-tight line-clamp-2">{it.name}</div>
                          <div className="text-xs text-muted-foreground">{it.brand}</div>
                        </div>
                        <div className="text-sm font-semibold whitespace-nowrap">
                          {formatCurrency(it.price * it.quantity)}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center gap-1">
                          <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => dec(it.id)} aria-label="Decrease">
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <span className="px-2 text-sm">{it.quantity}</span>
                          <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => inc(it.id)} aria-label="Increase">
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <Button size="icon" variant="destructive" className="h-7 w-7" onClick={() => remove(it.id)} aria-label="Remove">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal())}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="font-medium">{formatCurrency(tax())}</span>
                </div>
                <div className="flex items-center justify-between text-base pt-1">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{formatCurrency(total())}</span>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-2">
                <Button className="flex-1" onClick={onCheckout}>Proceed to checkout</Button>
                <Button variant="outline" onClick={() => clear()}>Clear</Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
