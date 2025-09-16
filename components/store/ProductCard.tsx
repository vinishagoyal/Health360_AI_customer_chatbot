"use client";

import * as React from "react";
import { Product } from "@/data/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { Eye, ShoppingCart, Star } from "lucide-react";
import { CategoryIcon } from "@/lib/product-icons";

function Stars({ value = 5 }: { value?: number }) {
  const v = Math.round((value ?? 0) * 2) / 2; // round to .5
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = i + 1 <= v ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground";
        return <Star key={i} className={`h-4 w-4 ${fill}`} fill="currentColor" />;
      })}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const lowStock = (product.inventory ?? 0) <= 5;
  const [open, setOpen] = React.useState(false);

  function onAdd(qty = 1) {
    add(product, qty);
    toast.success("Added to cart", {
      description: `${product.name} • ${formatCurrency(product.price)}`
    });
  }

  return (
    <>
      <Card className="h-full flex flex-col group">
        <CardHeader className="pb-2">
          <div className="relative w-full overflow-hidden rounded-md border bg-muted">
            <div className="relative aspect-[4/3] w-full transition-transform duration-300 group-hover:scale-[1.03]">
              <CategoryIcon 
                category={product.category} 
                className="h-16 w-16"
              />
            </div>
          </div>
          <CardTitle className="mt-2 text-base leading-tight line-clamp-2">
            {product.name}
          </CardTitle>
          <div className="text-xs text-muted-foreground">{product.brand}</div>
        </CardHeader>

        <CardContent className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{formatCurrency(product.price)}</div>
            {product.rating ? (
              <div className="flex items-center gap-1">
                <Stars value={product.rating} />
                <span className="text-xs text-muted-foreground">
                  {product.reviews ? `(${product.reviews})` : null}
                </span>
              </div>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{product.category}</Badge>
            <Badge variant="outline">{product.form}</Badge>
            {lowStock ? <Badge variant="destructive">Low stock</Badge> : null}
          </div>
          {product.description ? (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          ) : null}
          <div className="text-[11px] text-muted-foreground">SKU: {product.sku}</div>
        </CardContent>

        <CardFooter className="flex gap-2 items-stretch min-w-0">
          <Button variant="outline" size="sm" className="flex-1 min-w-0" aria-label="Quick view" onClick={() => setOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Quick view
          </Button>
          <Button size="sm" className="flex-1 min-w-0" variant="secondary" aria-label="Add to cart" onClick={() => onAdd(1)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to cart
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[720px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="mr-3">{product.name}</span>
              <span className="text-base font-semibold">{formatCurrency(product.price)}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-md border bg-muted">
              <div className="relative aspect-[4/3] w-full">
                <CategoryIcon 
                  category={product.category} 
                  className="h-24 w-24"
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="outline">{product.form}</Badge>
                {lowStock ? <Badge variant="destructive">Low stock</Badge> : null}
              </div>
              {product.rating ? (
                <div className="flex items-center gap-2">
                  <Stars value={product.rating} />
                  <span className="text-xs text-muted-foreground">
                    {product.reviews ? `${product.reviews} reviews` : "No reviews"}
                  </span>
                </div>
              ) : null}
              <p className="text-sm text-muted-foreground">
                {product.description ??
                  "Premium supplement crafted for everyday wellness and vitality."}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Button onClick={() => onAdd(1)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to cart
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
