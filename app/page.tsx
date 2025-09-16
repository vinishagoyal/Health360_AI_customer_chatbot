"use client";

import * as React from "react";
import { Product } from "@/data/types";
import { ProductCard } from "@/components/store/ProductCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MessageSquareText, Maximize2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { CartButton } from "@/components/store/CartSheet";
import { getProductsFromSupabase } from "@/lib/supabase";
import { products as seedProducts } from "@/data/dataset";
import { ChatbotWidget, ChatbotWidgetRef } from "@/components/chatbot/ChatbotWidget";
import { FullScreenChatbot } from "@/components/chatbot/FullScreenChatbot";

type SortKey = "relevance" | "price-asc" | "price-desc" | "newest";

export default function HomeStorefront() {
  const [rows, setRows] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("all");
  const [form, setForm] = React.useState<string>("all");
  const [sort, setSort] = React.useState<SortKey>("relevance");

  const chatbotRef = React.useRef<ChatbotWidgetRef>(null);
  const [isFullScreenChatOpen, setIsFullScreenChatOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const products = await getProductsFromSupabase();
        if (products) {
          setRows(products);
        } else {
          // Fallback to seed data if Supabase fetch returns null
          setRows(seedProducts);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch products");
        // Fallback to seed data if Supabase fetch fails
        setRows(seedProducts);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = React.useMemo(() => {
    const set = new Set(rows.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [rows]);

  const forms = React.useMemo(() => {
    const set = new Set(rows.map((p) => p.form));
    return ["all", ...Array.from(set)];
  }, [rows]);

  const filtered = React.useMemo(() => {
    let data = rows;

    const q = query.trim().toLowerCase();
    if (q) {
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    if (category !== "all") {
      data = data.filter((p) => p.category === category);
    }
    if (form !== "all") {
      data = data.filter((p) => p.form === form);
    }

    switch (sort) {
      case "price-asc":
        data = [...data].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        data = [...data].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        data = [...data].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        break;
      case "relevance":
      default:
        // Keep original seed order (acts as "relevance" for demo)
        break;
    }

    return data;
  }, [rows, query, category, form, sort]);

  function scrollToCatalog() {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Basic stats for hero section (optional marketing copy)
  const minPrice = React.useMemo(() => {
    const v = rows.length ? Math.min(...rows.map((p) => p.price)) : 0;
    return formatCurrency(v);
  }, [rows]);

  return (
    <div className="min-h-dvh">
      {/* Top bar */}
      <header className="px-4 md:px-8 lg:px-12 h-14 border-b bg-background">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between">
          <div className="font-semibold">Health360</div>
          <CartButton />
        </div>
      </header>

      {/* Hero section */}
      <section className="px-4 md:px-8 lg:px-12 py-10 md:py-14 border-b bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Health360</span>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              Wellness supplements for everyday health
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore our curated range of vitamins, minerals, probiotics, and protein supplements.
              Starting at {minPrice}. Shop quality you can trust.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Button onClick={scrollToCatalog}>Shop all</Button>
              <Button variant="outline" onClick={() => (window.location.href = "/admin")}>
                Admin panel
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsFullScreenChatOpen(true)}
                className="gap-2"
              >
                <MessageSquareText className="h-4 w-4" />
                <Maximize2 className="h-3 w-3" />
                Test Chatbot
              </Button>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Try our AI chatbot! Example questions:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={async () => {
                  chatbotRef.current?.openChat();
                  setTimeout(async () => {
                    await chatbotRef.current?.sendMessage("What are your best-selling vitamins?");
                  }, 300);
                }}>
                  Best-selling vitamins
                </Button>
                <Button variant="outline" size="sm" onClick={async () => {
                  chatbotRef.current?.openChat();
                  setTimeout(async () => {
                    await chatbotRef.current?.sendMessage("Do you have Omega-3 supplements for heart health?");
                  }, 300);
                }}>
                  Omega-3 for heart health
                </Button>
                <Button variant="outline" size="sm" onClick={async () => {
                  chatbotRef.current?.openChat();
                  setTimeout(async () => {
                    await chatbotRef.current?.sendMessage("How can I track my recent order?");
                  }, 300);
                }}>
                  Track my order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 md:px-8 lg:px-12 py-5 border-b bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search products, brand, or SKU…"
                className="w-[260px] md:w-[320px]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c === "all" ? "All categories" : c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={form} onValueChange={setForm}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Form" />
                </SelectTrigger>
                <SelectContent>
                  {forms.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f === "all" ? "All forms" : f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => { setQuery(""); setCategory("all"); setForm("all"); setSort("relevance"); }}>
                Reset
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Products</h2>
            <div className="text-sm text-muted-foreground">{filtered.length} result(s)</div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">No products match your filters.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Chatbot Widget - Hidden when full-screen is open */}
      {!isFullScreenChatOpen && <ChatbotWidget ref={chatbotRef} />}

      {/* Full-Screen Chatbot */}
      <FullScreenChatbot 
        isOpen={isFullScreenChatOpen} 
        onClose={() => setIsFullScreenChatOpen(false)} 
      />
    </div>
  );
}
