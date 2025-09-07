"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/types";

export type CartLine = {
  id: string; // product id
  name: string;
  brand: string;
  price: number;
  imageUrl?: string;
  quantity: number;
};

type CartState = {
  items: CartLine[];
  add: (p: Product, qty?: number) => void;
  remove: (productId: string) => void;
  inc: (productId: string) => void;
  dec: (productId: string) => void;
  clear: () => void;

  // Derived helpers
  count: () => number; // total quantity
  subtotal: () => number;
  tax: () => number; // 18% GST (demo)
  total: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (p, qty = 1) => {
        set((state) => {
          const idx = state.items.findIndex((i) => i.id === p.id);
          if (idx >= 0) {
            const copy = [...state.items];
            copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
            return { items: copy };
          }
          return {
            items: [
              ...state.items,
              {
                id: p.id,
                name: p.name,
                brand: p.brand,
                price: p.price,
                imageUrl: p.imageUrl,
                quantity: qty,
              },
            ],
          };
        });
      },
      remove: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== productId) })),
      inc: (productId) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === productId ? { ...i, quantity: i.quantity + 1 } : i)),
        })),
      dec: (productId) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === productId ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),

      count: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      subtotal: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
      tax: () => parseFloat((get().subtotal() * 0.18).toFixed(2)),
      total: () => parseFloat((get().subtotal() + get().tax()).toFixed(2)),
    }),
    {
      name: "h360_cart_v1",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
