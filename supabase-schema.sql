-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL,
  form VARCHAR(100) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  inventory INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  image_url TEXT,
  rating DECIMAL(3, 2),
  reviews INTEGER,
  description TEXT
);

-- Create customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  city VARCHAR(100),
  country VARCHAR(100)
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  customer_id UUID REFERENCES customers(id),
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL
);

-- Create order_items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL
);

-- Insert sample data for products
INSERT INTO products (name, sku, category, form, brand, price, inventory, status, image_url, rating, reviews, description) VALUES
('Vitamin C Capsule', 'VITC-1234', 'Vitamins', 'Capsule', 'Health360', 499.00, 100, 'active', '/images/health360/vitamins.jpg', 4.5, 25, 'Daily vitamin C supplement for immune support'),
('Omega-3 Fish Oil', 'OMEG-5678', 'Omega-3', 'Capsule', 'WellBeing', 899.00, 50, 'active', '/images/health360/omega-3.jpg', 4.8, 42, 'High-quality fish oil for heart and brain health'),
('Probiotic Complex', 'PROB-9012', 'Probiotics', 'Capsule', 'Vitalix', 699.00, 75, 'active', '/images/health360/probiotics.jpg', 4.3, 18, 'Daily probiotic blend for digestive health'),
('Ashwagandha Extract', 'ASHW-3456', 'Herbal', 'Capsule', 'WellBeing', 599.00, 30, 'active', '/images/health360/herbal.jpg', 4.6, 31, 'Traditional herb for stress relief and energy');

-- Insert sample data for customers
INSERT INTO customers (first_name, last_name, email, phone, city, country) VALUES
('Aarav', 'Sharma', 'aarav.sharma@email.com', '+91-9876543210', 'Mumbai', 'India'),
('Diya', 'Verma', 'diya.verma@email.com', '+91-9876543211', 'Delhi', 'India'),
('Ishaan', 'Gupta', 'ishaan.gupta@email.com', '+91-9876543212', 'Bengaluru', 'India'),
('Ananya', 'Reddy', 'ananya.reddy@email.com', '+91-9876543213', 'Hyderabad', 'India');

-- Insert sample data for orders
INSERT INTO orders (customer_id, status, subtotal, tax, total) VALUES
((SELECT id FROM customers WHERE email = 'aarav.sharma@email.com'), 'paid', 1398.00, 251.64, 1649.64),
((SELECT id FROM customers WHERE email = 'diya.verma@email.com'), 'fulfilled', 499.00, 89.82, 588.82);

-- Insert sample data for order_items
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
((SELECT id FROM orders WHERE total = 1649.64), (SELECT id FROM products WHERE sku = 'OMEG-5678'), 1, 899.00),
((SELECT id FROM orders WHERE total = 1649.64), (SELECT id FROM products WHERE sku = 'PROB-9012'), 1, 699.00),
((SELECT id FROM orders WHERE total = 588.82), (SELECT id FROM products WHERE sku = 'VITC-1234'), 1, 499.00);
