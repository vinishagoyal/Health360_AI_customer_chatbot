"use client";

import { createClient } from '@supabase/supabase-js';

// Define types for our Supabase tables
export type SupabaseProduct = {
  id: string;
  created_at: string;
  name: string;
  sku: string;
  category: string;
  form: string;
  brand: string;
  price: number;
  inventory: number;
  status: string;
  image_url?: string;
  rating?: number;
  reviews?: number;
  description?: string;
};

export type SupabaseCustomer = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
};

export type SupabaseOrder = {
  id: string;
  created_at: string;
  customer_id: string;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
};

export type SupabaseOrderItem = {
  id: string;
  created_at: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
};

// Get Supabase URL and anon key from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Check if Supabase URL and anon key are provided
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and anon key are required. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to fetch products from Supabase
export async function getProductsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products from Supabase:', error);
      return null;
    }

    // Convert Supabase product format to our existing Product type
    return data.map(product => ({
      id: product.id,
      createdAt: product.created_at,
      name: product.name,
      sku: product.sku,
      category: product.category,
      form: product.form,
      brand: product.brand,
      price: product.price,
      inventory: product.inventory,
      status: product.status,
      imageUrl: product.image_url,
      rating: product.rating,
      reviews: product.reviews,
      description: product.description
    }));
  } catch (error) {
    console.error('Error fetching products from Supabase:', error);
    return null;
  }
}

// Function to fetch customers from Supabase
export async function getCustomersFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching customers from Supabase:', error);
      return null;
    }

    // Convert Supabase customer format to our existing Customer type
    return data.map(customer => ({
      id: customer.id,
      createdAt: customer.created_at,
      firstName: customer.first_name,
      lastName: customer.last_name,
      email: customer.email,
      phone: customer.phone,
      city: customer.city,
      country: customer.country
    }));
  } catch (error) {
    console.error('Error fetching customers from Supabase:', error);
    return null;
  }
}

// Function to create a new customer in Supabase
export async function createCustomerInSupabase(customer: Omit<SupabaseCustomer, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('customers')
      .insert({
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        city: customer.city,
        country: customer.country
      })
      .select();

    if (error) {
      console.error('Error creating customer in Supabase:', error);
      return null;
    }

    // Convert the created customer to our existing Customer type
    return data.map(customer => ({
      id: customer.id,
      createdAt: customer.created_at,
      firstName: customer.first_name,
      lastName: customer.last_name,
      email: customer.email,
      phone: customer.phone,
      city: customer.city,
      country: customer.country
    }))[0];
  } catch (error) {
    console.error('Error creating customer in Supabase:', error);
    return null;
  }
}

// Function to update a customer in Supabase
export async function updateCustomerInSupabase(id: string, customer: Partial<Omit<SupabaseCustomer, 'id' | 'created_at'>>) {
  try {
    const { data, error } = await supabase
      .from('customers')
      .update({
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        city: customer.city,
        country: customer.country
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating customer in Supabase:', error);
      return null;
    }

    // Convert the updated customer to our existing Customer type
    return data.map(customer => ({
      id: customer.id,
      createdAt: customer.created_at,
      firstName: customer.first_name,
      lastName: customer.last_name,
      email: customer.email,
      phone: customer.phone,
      city: customer.city,
      country: customer.country
    }))[0];
  } catch (error) {
    console.error('Error updating customer in Supabase:', error);
    return null;
  }
}

// Function to delete a customer from Supabase
export async function deleteCustomerFromSupabase(id: string) {
  try {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting customer from Supabase:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting customer from Supabase:', error);
    return false;
  }
}

// Function to fetch orders from Supabase
export async function getOrdersFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders from Supabase:', error);
      return null;
    }

    // Convert Supabase order format to our existing Order type
    return data.map(order => ({
      id: order.id,
      createdAt: order.created_at,
      customerId: order.customer_id,
      status: order.status,
      subtotal: order.subtotal,
      tax: order.tax,
      total: order.total
    }));
  } catch (error) {
    console.error('Error fetching orders from Supabase:', error);
    return null;
  }
}

// Function to fetch order items from Supabase
export async function getOrderItemsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching order items from Supabase:', error);
      return null;
    }

    // Convert Supabase order item format to our existing OrderItem type
    return data.map(item => ({
      id: item.id,
      createdAt: item.created_at,
      orderId: item.order_id,
      productId: item.product_id,
      quantity: item.quantity,
      unitPrice: item.unit_price
    }));
  } catch (error) {
    console.error('Error fetching order items from Supabase:', error);
    return null;
  }
}

// Function to update an order in Supabase
export async function updateOrderInSupabase(id: string, order: Partial<Omit<SupabaseOrder, 'id' | 'created_at'>>) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({
        customer_id: order.customer_id,
        status: order.status,
        subtotal: order.subtotal,
        tax: order.tax,
        total: order.total
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating order in Supabase:', error);
      return null;
    }

    // Convert the updated order to our existing Order type
    return data.map(order => ({
      id: order.id,
      createdAt: order.created_at,
      customerId: order.customer_id,
      status: order.status,
      subtotal: order.subtotal,
      tax: order.tax,
      total: order.total
    }))[0];
  } catch (error) {
    console.error('Error updating order in Supabase:', error);
    return null;
  }
}

// Function to create a new product in Supabase
export async function createProductInSupabase(product: Omit<SupabaseProduct, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        sku: product.sku,
        category: product.category,
        form: product.form,
        brand: product.brand,
        price: product.price,
        inventory: product.inventory,
        status: product.status,
        image_url: product.image_url,
        rating: product.rating,
        reviews: product.reviews,
        description: product.description
      })
      .select();

    if (error) {
      console.error('Error creating product in Supabase:', error);
      return null;
    }

    // Convert the created product to our existing Product type
    return data.map(item => ({
      id: item.id,
      createdAt: item.created_at,
      name: item.name,
      sku: item.sku,
      category: item.category,
      form: item.form,
      brand: item.brand,
      price: item.price,
      inventory: item.inventory,
      status: item.status,
      imageUrl: item.image_url,
      rating: item.rating,
      reviews: item.reviews,
      description: item.description
    }))[0];
  } catch (error) {
    console.error('Error creating product in Supabase:', error);
    return null;
  }
}

// Function to update a product in Supabase
export async function updateProductInSupabase(id: string, product: Partial<Omit<SupabaseProduct, 'id' | 'created_at'>>) {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({
        name: product.name,
        sku: product.sku,
        category: product.category,
        form: product.form,
        brand: product.brand,
        price: product.price,
        inventory: product.inventory,
        status: product.status,
        image_url: product.image_url,
        rating: product.rating,
        reviews: product.reviews,
        description: product.description
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating product in Supabase:', error);
      return null;
    }

    // Convert the updated product to our existing Product type
    return data.map(item => ({
      id: item.id,
      createdAt: item.created_at,
      name: item.name,
      sku: item.sku,
      category: item.category,
      form: item.form,
      brand: item.brand,
      price: item.price,
      inventory: item.inventory,
      status: item.status,
      imageUrl: item.image_url,
      rating: item.rating,
      reviews: item.reviews,
      description: item.description
    }))[0];
  } catch (error) {
    console.error('Error updating product in Supabase:', error);
    return null;
  }
}

// Function to delete a product from Supabase
export async function deleteProductFromSupabase(id: string) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product from Supabase:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting product from Supabase:', error);
    return false;
  }
}
