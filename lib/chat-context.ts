"use client";

import { products, customers, orders, orderItems } from "@/data/dataset";
import { Product, Customer, Order, OrderItem } from "@/data/types";
import { formatCurrency } from "@/lib/utils";
import { 
  getProductsFromSupabase, 
  getCustomersFromSupabase, 
  getOrdersFromSupabase, 
  getOrderItemsFromSupabase 
} from "@/lib/supabase";

export interface ChatContext {
  products: Product[];
  categories: string[];
  inventorySummary: Record<string, number>;
  businessInfo: {
    name: string;
    shipping: string;
    returns: string;
    support: string;
  };
}

export async function buildChatContext(): Promise<ChatContext> {
  // Try to fetch data from Supabase
  const supabaseProducts = await getProductsFromSupabase();
  const supabaseCustomers = await getCustomersFromSupabase();
  const supabaseOrders = await getOrdersFromSupabase();
  const supabaseOrderItems = await getOrderItemsFromSupabase();
  
  // Use Supabase data if available, otherwise fall back to mock data
  const productsData = supabaseProducts && supabaseProducts.length > 0 ? supabaseProducts : products;
  const customersData = supabaseCustomers && supabaseCustomers.length > 0 ? supabaseCustomers : customers;
  const ordersData = supabaseOrders && supabaseOrders.length > 0 ? supabaseOrders : orders;
  const orderItemsData = supabaseOrderItems && supabaseOrderItems.length > 0 ? supabaseOrderItems : orderItems;

  // Get unique categories
  const categories = [...new Set(productsData.map(p => p.category))];

  // Calculate inventory summary by category
  const inventorySummary: Record<string, number> = {};
  productsData.forEach(product => {
    const category = product.category;
    inventorySummary[category] = (inventorySummary[category] || 0) + product.inventory;
  });

  return {
    products: productsData,
    categories,
    inventorySummary,
    businessInfo: {
      name: "Health360 Supplements",
      shipping: "Free shipping on orders over ₹999",
      returns: "30-day return policy for unopened products",
      support: "Email support@health360.com or call +91-XXXX-XXXXXX"
    }
  };
}

export function buildSystemPrompt(context: ChatContext): string {
  const productSummary = context.products.slice(0, 10).map(p =>
    `${p.name} (${p.category}) - ${formatCurrency(p.price)} - ${p.inventory} in stock`
  ).join('\n');

  const inventorySummary = Object.entries(context.inventorySummary)
    .map(([category, count]) => `${category}: ${count} items`)
    .join(', ');

  return `You are Health360 AI Assistant, a knowledgeable and helpful customer support chatbot for Health360 Supplements, an Indian health and wellness company.

BUSINESS CONTEXT:
- Company: ${context.businessInfo.name}
- Shipping: ${context.businessInfo.shipping}
- Returns: ${context.businessInfo.returns}
- Support: ${context.businessInfo.support}

AVAILABLE PRODUCTS:
${productSummary}
...and ${context.products.length - 10} more products

INVENTORY SUMMARY:
${inventorySummary}

YOUR ROLE:
- Help customers find suitable supplements for their health needs
- Provide accurate product information and pricing
- Assist with order-related questions
- Offer wellness advice based on general health knowledge
- Direct complex medical questions to healthcare professionals
- Maintain a friendly, professional, and helpful tone
- Use Indian Rupees (₹) for all pricing
- Keep responses concise but informative

RESPONSE GUIDELINES:
- Always be helpful and accurate
- If you don't know something, admit it and offer to connect them with human support
- For product recommendations, consider customer's stated health goals
- Include relevant product links or SKUs when appropriate
- End conversations politely and offer further assistance`;
}

export function findRelevantProducts(query: string, productsData: Product[], limit: number = 5): Product[] {
  const lowerQuery = query.toLowerCase();

  // Score products based on relevance
  const scoredProducts = productsData.map(product => {
    let score = 0;
    const productText = `${product.name} ${product.brand} ${product.category} ${product.form}`.toLowerCase();

    // Exact matches get highest score
    if (productText.includes(lowerQuery)) {
      score += 10;
    }

    // Partial matches
    const words = lowerQuery.split(' ');
    words.forEach(word => {
      if (productText.includes(word)) {
        score += 2;
      }
    });

    // Category matches
    if (product.category.toLowerCase().includes(lowerQuery)) {
      score += 5;
    }

    return { product, score };
  });

  // Sort by score and return top results
  return scoredProducts
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.product);
}

export function formatProductInfo(product: Product): string {
  return `${product.name} by ${product.brand}
- Category: ${product.category}
- Form: ${product.form}
- Price: ${formatCurrency(product.price)}
- Stock: ${product.inventory} units
- SKU: ${product.sku}
${product.description ? `- Description: ${product.description}` : ''}`;
}

export function searchOrders(
  customerEmailOrId?: string, 
  orderId?: string, 
  customersData: Customer[] = customers, 
  ordersData: Order[] = orders
): Order[] {
  let filteredOrders = ordersData;

  if (customerEmailOrId) {
    // Try to find customer by email first
    const customer = customersData.find(c => c.email.toLowerCase() === customerEmailOrId.toLowerCase());
    if (customer) {
      filteredOrders = filteredOrders.filter(o => o.customerId === customer.id);
    } else {
      // If not found by email, try to find by ID
      filteredOrders = filteredOrders.filter(o => o.customerId === customerEmailOrId);
    }
  }

  if (orderId) {
    filteredOrders = filteredOrders.filter(o => o.id.includes(orderId));
  }

  return filteredOrders.slice(0, 5); // Limit results
}

export function formatOrderInfo(
  order: Order, 
  customersData: Customer[] = customers, 
  orderItemsData: OrderItem[] = orderItems
): string {
  const customer = customersData.find(c => c.id === order.customerId);
  const orderItemsForOrder = orderItemsData.filter(oi => oi.orderId === order.id);

  return `Order ${order.id}
- Customer: ${customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown'}
- Status: ${order.status}
- Total: ${formatCurrency(order.total)}
- Items: ${orderItemsForOrder.length}
- Created: ${new Date(order.createdAt).toLocaleDateString()}`;
}
