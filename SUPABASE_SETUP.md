# Supabase Setup Instructions

This document provides instructions for setting up the Supabase database for the Health360 application.

## Prerequisites

1. You should have received the Supabase project URL and anon key
2. These credentials should already be in your `.env.local` file

## Database Setup

### 1. Create Tables

1. Go to your Supabase project dashboard
2. Navigate to the "SQL Editor" section
3. Copy and paste the contents of `supabase-schema.sql` into the editor
4. Click "Run" to execute the SQL commands

This will create the following tables:
- `products`
- `customers`
- `orders`
- `order_items`

And populate them with sample data.

### 2. Set up Row Level Security (RLS)

1. In the same SQL Editor, copy and paste the contents of `supabase-rls.sql`
2. Click "Run" to execute the SQL commands

This will enable RLS on all tables and create policies that allow anonymous access. For a production application, you would want to implement more restrictive policies.

## Testing the Connection

After setting up the database:

1. Restart your development server if it's running
2. The application should now be able to connect to Supabase without the "Invalid supabaseUrl" error
3. You should be able to view and manage products, customers, and orders in the admin panel

## Troubleshooting

If you encounter any issues:

1. Verify that the Supabase URL and anon key in `.env.local` are correct
2. Check that all tables were created successfully in the Supabase table editor
3. Ensure that RLS policies are applied to all tables
4. Check the browser console for any error messages
