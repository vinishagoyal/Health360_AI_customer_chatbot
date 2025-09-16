-- Enable Row Level Security (RLS) on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access (since we're using the anon key)
-- For a production app, you would want to be more restrictive

-- Products policies
CREATE POLICY "Allow anonymous read access to products" ON products
FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous insert access to products" ON products
FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous update access to products" ON products
FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow anonymous delete access to products" ON products
FOR DELETE TO anon USING (true);

-- Customers policies
CREATE POLICY "Allow anonymous read access to customers" ON customers
FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous insert access to customers" ON customers
FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous update access to customers" ON customers
FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow anonymous delete access to customers" ON customers
FOR DELETE TO anon USING (true);

-- Orders policies
CREATE POLICY "Allow anonymous read access to orders" ON orders
FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous insert access to orders" ON orders
FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous update access to orders" ON orders
FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow anonymous delete access to orders" ON orders
FOR DELETE TO anon USING (true);

-- Order items policies
CREATE POLICY "Allow anonymous read access to order_items" ON order_items
FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous insert access to order_items" ON order_items
FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous update access to order_items" ON order_items
FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow anonymous delete access to order_items" ON order_items
FOR DELETE TO anon USING (true);
