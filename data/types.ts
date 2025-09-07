export type ProductCategory =
  | "Vitamins"
  | "Minerals"
  | "Herbal"
  | "Probiotics"
  | "Omega-3"
  | "Protein";

export type ProductForm = "Capsule" | "Tablet" | "Powder" | "Liquid" | "Gummy";

export type ProductStatus = "active" | "draft" | "discontinued";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  form: ProductForm;
  brand: string;
  price: number;
  inventory: number;
  status: ProductStatus;
  createdAt: string; // ISO date

  // Optional storefront fields
  imageUrl?: string;
  rating?: number; // 0-5
  reviews?: number; // count
  description?: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
  createdAt: string; // ISO date
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "fulfilled"
  | "refunded"
  | "cancelled";

export interface Order {
  id: string;
  customerId: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string; // ISO date
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}
