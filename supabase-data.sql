-- Supabase Dummy Data - 50 rows for each table
-- Execute this after running supabase-schema.sql and supabase-rls.sql

-- Clear existing data (optional - remove if you want to keep existing data)
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM customers;
DELETE FROM products;

-- Insert 50 Products
INSERT INTO products (name, sku, category, form, brand, price, inventory, status, image_url, rating, reviews, description) VALUES
('Vitamin D3 2000 IU', 'VITD-2001', 'Vitamins', 'Capsule', 'Health360', 599.00, 120, 'active', '/images/health360/vitamins.jpg', 4.7, 89, 'High-potency Vitamin D3 for bone health and immunity'),
('Vitamin B12 Methylcobalamin', 'VITB-2002', 'Vitamins', 'Tablet', 'WellBeing', 449.00, 95, 'active', '/images/health360/vitamins.jpg', 4.5, 67, 'Bioactive B12 for energy and nervous system support'),
('Multivitamin Complete', 'MULT-2003', 'Vitamins', 'Tablet', 'Vitalix', 799.00, 80, 'active', '/images/health360/vitamins.jpg', 4.3, 156, 'Complete daily multivitamin with 25 essential nutrients'),
('Vitamin C 1000mg', 'VITC-2004', 'Vitamins', 'Capsule', 'Health360', 399.00, 150, 'active', '/images/health360/vitamins.jpg', 4.6, 203, 'High-dose Vitamin C for immune system support'),
('Vitamin E 400 IU', 'VITE-2005', 'Vitamins', 'Softgel', 'NutriMax', 529.00, 75, 'active', '/images/health360/vitamins.jpg', 4.4, 45, 'Natural Vitamin E for antioxidant protection'),
('Calcium Magnesium Zinc', 'CALZ-2006', 'Minerals', 'Tablet', 'BoneStrong', 649.00, 110, 'active', '/images/health360/minerals.jpg', 4.5, 78, 'Essential minerals for bone and muscle health'),
('Iron Bisglycinate', 'IRON-2007', 'Minerals', 'Capsule', 'Health360', 459.00, 85, 'active', '/images/health360/minerals.jpg', 4.2, 34, 'Gentle iron supplement for energy and blood health'),
('Magnesium Glycinate', 'MAGN-2008', 'Minerals', 'Capsule', 'WellBeing', 579.00, 90, 'active', '/images/health360/minerals.jpg', 4.6, 92, 'Highly absorbable magnesium for muscle and nerve function'),
('Zinc Picolinate', 'ZINC-2009', 'Minerals', 'Capsule', 'Vitalix', 349.00, 125, 'active', '/images/health360/minerals.jpg', 4.3, 56, 'Bioavailable zinc for immune support and wound healing'),
('Potassium Citrate', 'POTA-2010', 'Minerals', 'Capsule', 'NutriMax', 429.00, 70, 'active', '/images/health360/minerals.jpg', 4.1, 23, 'Essential electrolyte for heart and muscle function'),
('Omega-3 Fish Oil 1000mg', 'OMEG-2011', 'Omega-3', 'Softgel', 'OceanPure', 899.00, 60, 'active', '/images/health360/omega-3.jpg', 4.8, 145, 'Premium fish oil with EPA and DHA for heart and brain health'),
('Krill Oil Antarctic', 'KRIL-2012', 'Omega-3', 'Softgel', 'PolarHealth', 1299.00, 45, 'active', '/images/health360/omega-3.jpg', 4.7, 67, 'Superior absorption krill oil with astaxanthin'),
('Algae Omega-3 Vegan', 'ALGA-2013', 'Omega-3', 'Capsule', 'PlantPower', 1099.00, 55, 'active', '/images/health360/omega-3.jpg', 4.5, 89, 'Plant-based omega-3 from algae, perfect for vegans'),
('Cod Liver Oil', 'CODL-2014', 'Omega-3', 'Softgel', 'NordicHealth', 749.00, 80, 'active', '/images/health360/omega-3.jpg', 4.4, 112, 'Traditional cod liver oil with vitamins A and D'),
('Flaxseed Oil', 'FLAX-2015', 'Omega-3', 'Softgel', 'PlantPower', 549.00, 95, 'active', '/images/health360/omega-3.jpg', 4.2, 78, 'Plant-based omega-3 from organic flaxseeds'),
('Probiotic 50 Billion CFU', 'PROB-2016', 'Probiotics', 'Capsule', 'GutHealth', 1199.00, 40, 'active', '/images/health360/probiotics.jpg', 4.6, 134, 'High-potency probiotic with 10 strains for digestive health'),
('Probiotic Kids Chewable', 'PROBK-2017', 'Probiotics', 'Chewable', 'KidsVital', 699.00, 65, 'active', '/images/health360/probiotics.jpg', 4.5, 89, 'Kid-friendly probiotic chewables with natural fruit flavor'),
('Prebiotic Fiber Complex', 'PREB-2018', 'Probiotics', 'Powder', 'GutHealth', 849.00, 50, 'active', '/images/health360/probiotics.jpg', 4.3, 56, 'Prebiotic fiber blend to support beneficial gut bacteria'),
('Digestive Enzymes', 'DIGE-2019', 'Probiotics', 'Capsule', 'DigestWell', 759.00, 75, 'active', '/images/health360/probiotics.jpg', 4.4, 67, 'Comprehensive enzyme blend for better digestion'),
('Lactobacillus Acidophilus', 'LACT-2020', 'Probiotics', 'Capsule', 'GutHealth', 599.00, 85, 'active', '/images/health360/probiotics.jpg', 4.2, 45, 'Single-strain probiotic for digestive balance'),
('Turmeric Curcumin', 'TURM-2021', 'Herbal', 'Capsule', 'AyurVeda', 649.00, 100, 'active', '/images/health360/herbal.jpg', 4.7, 178, 'Organic turmeric with black pepper for enhanced absorption'),
('Ashwagandha KSM-66', 'ASHW-2022', 'Herbal', 'Capsule', 'StressRelief', 799.00, 70, 'active', '/images/health360/herbal.jpg', 4.6, 145, 'Clinically studied ashwagandha for stress and energy'),
('Ginseng Panax', 'GINS-2023', 'Herbal', 'Capsule', 'EnergyBoost', 899.00, 55, 'active', '/images/health360/herbal.jpg', 4.5, 89, 'Premium Korean ginseng for energy and vitality'),
('Echinacea Purple Cone', 'ECHI-2024', 'Herbal', 'Capsule', 'ImmuneShield', 549.00, 90, 'active', '/images/health360/herbal.jpg', 4.3, 67, 'Traditional herb for immune system support'),
('Ginkgo Biloba', 'GINK-2025', 'Herbal', 'Capsule', 'BrainBoost', 699.00, 80, 'active', '/images/health360/herbal.jpg', 4.4, 78, 'Standardized extract for cognitive function and circulation'),
('Whey Protein Isolate', 'WHEY-2026', 'Protein', 'Powder', 'MuscleFuel', 2299.00, 35, 'active', '/images/health360/protein.jpg', 4.8, 234, 'Pure whey protein isolate with 25g protein per serving'),
('Plant Protein Blend', 'PLAN-2027', 'Protein', 'Powder', 'PlantPower', 1899.00, 45, 'active', '/images/health360/protein.jpg', 4.5, 156, 'Organic pea, rice, and hemp protein blend'),
('Collagen Peptides', 'COLL-2028', 'Protein', 'Powder', 'BeautyHealth', 1599.00, 60, 'active', '/images/health360/protein.jpg', 4.6, 189, 'Hydrolyzed collagen for skin, hair, and joint health'),
('Casein Protein', 'CASE-2029', 'Protein', 'Powder', 'MuscleFuel', 2099.00, 30, 'active', '/images/health360/protein.jpg', 4.4, 98, 'Slow-digesting protein perfect for nighttime recovery'),
('BCAA Amino Acids', 'BCAA-2030', 'Protein', 'Powder', 'WorkoutMax', 1299.00, 70, 'active', '/images/health360/protein.jpg', 4.3, 123, 'Branched-chain amino acids for muscle recovery'),
('CoQ10 Ubiquinol', 'COQ10-2031', 'Antioxidants', 'Softgel', 'HeartHealth', 1499.00, 40, 'active', '/images/health360/antioxidants.jpg', 4.7, 89, 'Active form of CoQ10 for heart and cellular energy'),
('Alpha Lipoic Acid', 'ALPH-2032', 'Antioxidants', 'Capsule', 'CellProtect', 799.00, 65, 'active', '/images/health360/antioxidants.jpg', 4.4, 56, 'Universal antioxidant for blood sugar and nerve support'),
('Resveratrol', 'RESV-2033', 'Antioxidants', 'Capsule', 'AntiAge', 1199.00, 50, 'active', '/images/health360/antioxidants.jpg', 4.5, 67, 'Powerful antioxidant from red wine extract'),
('Green Tea Extract', 'GREE-2034', 'Antioxidants', 'Capsule', 'MetaBoost', 649.00, 85, 'active', '/images/health360/antioxidants.jpg', 4.3, 78, 'Standardized EGCG for metabolism and antioxidant support'),
('Grape Seed Extract', 'GRAP-2035', 'Antioxidants', 'Capsule', 'CellProtect', 749.00, 75, 'active', '/images/health360/antioxidants.jpg', 4.2, 45, 'Proanthocyanidins for cardiovascular and skin health'),
('Melatonin 3mg', 'MELA-2036', 'Sleep', 'Tablet', 'SleepWell', 449.00, 110, 'active', '/images/health360/sleep.jpg', 4.5, 167, 'Natural sleep hormone for better sleep quality'),
('Valerian Root', 'VALE-2037', 'Sleep', 'Capsule', 'NightRest', 599.00, 80, 'active', '/images/health360/sleep.jpg', 4.3, 89, 'Traditional herb for relaxation and sleep support'),
('L-Theanine', 'THEA-2038', 'Sleep', 'Capsule', 'CalmMind', 699.00, 70, 'active', '/images/health360/sleep.jpg', 4.4, 78, 'Amino acid for relaxation without drowsiness'),
('Magnesium Glycinate Sleep', 'MAGS-2039', 'Sleep', 'Capsule', 'SleepWell', 649.00, 90, 'active', '/images/health360/sleep.jpg', 4.6, 123, 'Calming magnesium formula for better sleep'),
('GABA 750mg', 'GABA-2040', 'Sleep', 'Capsule', 'NightRest', 579.00, 85, 'active', '/images/health360/sleep.jpg', 4.2, 56, 'Neurotransmitter for relaxation and stress relief'),
('Biotin 10000mcg', 'BIOT-2041', 'Beauty', 'Capsule', 'BeautyHealth', 549.00, 95, 'active', '/images/health360/beauty.jpg', 4.5, 134, 'High-potency biotin for hair, skin, and nails'),
('Hair Skin Nails Complex', 'HAIR-2042', 'Beauty', 'Capsule', 'GlowVital', 899.00, 60, 'active', '/images/health360/beauty.jpg', 4.4, 89, 'Complete beauty formula with biotin, collagen, and vitamins'),
('Hyaluronic Acid', 'HYAL-2043', 'Beauty', 'Capsule', 'SkinGlow', 1099.00, 45, 'active', '/images/health360/beauty.jpg', 4.6, 67, 'Hydrating compound for skin moisture and elasticity'),
('Keratin Complex', 'KERA-2044', 'Beauty', 'Capsule', 'HairStrong', 799.00, 70, 'active', '/images/health360/beauty.jpg', 4.3, 78, 'Protein complex for stronger hair and nails'),
('Silica Bamboo Extract', 'SILI-2045', 'Beauty', 'Capsule', 'BeautyHealth', 649.00, 80, 'active', '/images/health360/beauty.jpg', 4.2, 45, 'Natural silica for hair, skin, and nail health'),
('Glucosamine Chondroitin', 'GLUC-2046', 'Joint Health', 'Capsule', 'JointFlex', 1299.00, 55, 'active', '/images/health360/joints.jpg', 4.7, 156, 'Classic joint support formula for cartilage health'),
('MSM Methylsulfonylmethane', 'MSM-2047', 'Joint Health', 'Capsule', 'FlexiJoint', 799.00, 75, 'active', '/images/health360/joints.jpg', 4.4, 89, 'Sulfur compound for joint flexibility and comfort'),
('Boswellia Serrata', 'BOSW-2048', 'Joint Health', 'Capsule', 'JointCare', 899.00, 65, 'active', '/images/health360/joints.jpg', 4.5, 67, 'Ayurvedic herb for joint health and mobility'),
('Curcumin Joint Formula', 'CURC-2049', 'Joint Health', 'Capsule', 'FlexiJoint', 1099.00, 50, 'active', '/images/health360/joints.jpg', 4.6, 78, 'Turmeric extract specifically formulated for joint support'),
('Type II Collagen', 'COL2-2050', 'Joint Health', 'Capsule', 'JointFlex', 1399.00, 40, 'active', '/images/health360/joints.jpg', 4.8, 123, 'Undenatured collagen for joint cartilage support');

-- Insert 50 Customers
INSERT INTO customers (first_name, last_name, email, phone, city, country) VALUES
('Aarav', 'Sharma', 'aarav.sharma@email.com', '+91-9876543210', 'Mumbai', 'India'),
('Diya', 'Verma', 'diya.verma@email.com', '+91-9876543211', 'Delhi', 'India'),
('Ishaan', 'Gupta', 'ishaan.gupta@email.com', '+91-9876543212', 'Bengaluru', 'India'),
('Ananya', 'Reddy', 'ananya.reddy@email.com', '+91-9876543213', 'Hyderabad', 'India'),
('Arjun', 'Patel', 'arjun.patel@email.com', '+91-9876543214', 'Ahmedabad', 'India'),
('Kavya', 'Singh', 'kavya.singh@email.com', '+91-9876543215', 'Pune', 'India'),
('Rohan', 'Kumar', 'rohan.kumar@email.com', '+91-9876543216', 'Chennai', 'India'),
('Priya', 'Joshi', 'priya.joshi@email.com', '+91-9876543217', 'Kolkata', 'India'),
('Vikram', 'Agarwal', 'vikram.agarwal@email.com', '+91-9876543218', 'Jaipur', 'India'),
('Sneha', 'Nair', 'sneha.nair@email.com', '+91-9876543219', 'Kochi', 'India'),
('Aditya', 'Malhotra', 'aditya.malhotra@email.com', '+91-9876543220', 'Chandigarh', 'India'),
('Riya', 'Chopra', 'riya.chopra@email.com', '+91-9876543221', 'Gurgaon', 'India'),
('Karan', 'Mehta', 'karan.mehta@email.com', '+91-9876543222', 'Surat', 'India'),
('Pooja', 'Bansal', 'pooja.bansal@email.com', '+91-9876543223', 'Noida', 'India'),
('Rahul', 'Saxena', 'rahul.saxena@email.com', '+91-9876543224', 'Lucknow', 'India'),
('Neha', 'Kapoor', 'neha.kapoor@email.com', '+91-9876543225', 'Indore', 'India'),
('Siddharth', 'Rao', 'siddharth.rao@email.com', '+91-9876543226', 'Bhopal', 'India'),
('Anjali', 'Tiwari', 'anjali.tiwari@email.com', '+91-9876543227', 'Kanpur', 'India'),
('Harsh', 'Goyal', 'harsh.goyal@email.com', '+91-9876543228', 'Nagpur', 'India'),
('Shreya', 'Pandey', 'shreya.pandey@email.com', '+91-9876543229', 'Patna', 'India'),
('Nikhil', 'Shah', 'nikhil.shah@email.com', '+91-9876543230', 'Vadodara', 'India'),
('Tanvi', 'Mishra', 'tanvi.mishra@email.com', '+91-9876543231', 'Agra', 'India'),
('Abhishek', 'Jain', 'abhishek.jain@email.com', '+91-9876543232', 'Nashik', 'India'),
('Kritika', 'Sinha', 'kritika.sinha@email.com', '+91-9876543233', 'Faridabad', 'India'),
('Manish', 'Gupta', 'manish.gupta@email.com', '+91-9876543234', 'Meerut', 'India'),
('Divya', 'Sharma', 'divya.sharma@email.com', '+91-9876543235', 'Rajkot', 'India'),
('Akash', 'Kumar', 'akash.kumar@email.com', '+91-9876543236', 'Varanasi', 'India'),
('Sakshi', 'Agarwal', 'sakshi.agarwal@email.com', '+91-9876543237', 'Amritsar', 'India'),
('Gaurav', 'Singh', 'gaurav.singh@email.com', '+91-9876543238', 'Allahabad', 'India'),
('Nisha', 'Verma', 'nisha.verma@email.com', '+91-9876543239', 'Howrah', 'India'),
('Rohit', 'Patel', 'rohit.patel@email.com', '+91-9876543240', 'Ranchi', 'India'),
('Megha', 'Reddy', 'megha.reddy@email.com', '+91-9876543241', 'Jabalpur', 'India'),
('Varun', 'Malhotra', 'varun.malhotra@email.com', '+91-9876543242', 'Gwalior', 'India'),
('Swati', 'Chopra', 'swati.chopra@email.com', '+91-9876543243', 'Vijayawada', 'India'),
('Deepak', 'Mehta', 'deepak.mehta@email.com', '+91-9876543244', 'Jodhpur', 'India'),
('Preeti', 'Bansal', 'preeti.bansal@email.com', '+91-9876543245', 'Madurai', 'India'),
('Suresh', 'Saxena', 'suresh.saxena@email.com', '+91-9876543246', 'Raipur', 'India'),
('Kavita', 'Kapoor', 'kavita.kapoor@email.com', '+91-9876543247', 'Kota', 'India'),
('Rajesh', 'Rao', 'rajesh.rao@email.com', '+91-9876543248', 'Chandigarh', 'India'),
('Sunita', 'Tiwari', 'sunita.tiwari@email.com', '+91-9876543249', 'Guwahati', 'India'),
('Amit', 'Goyal', 'amit.goyal@email.com', '+91-9876543250', 'Thiruvananthapuram', 'India'),
('Rekha', 'Pandey', 'rekha.pandey@email.com', '+91-9876543251', 'Dehradun', 'India'),
('Vishal', 'Shah', 'vishal.shah@email.com', '+91-9876543252', 'Shimla', 'India'),
('Geeta', 'Mishra', 'geeta.mishra@email.com', '+91-9876543253', 'Jammu', 'India'),
('Manoj', 'Jain', 'manoj.jain@email.com', '+91-9876543254', 'Udaipur', 'India'),
('Seema', 'Sinha', 'seema.sinha@email.com', '+91-9876543255', 'Mysore', 'India'),
('Ravi', 'Gupta', 'ravi.gupta@email.com', '+91-9876543256', 'Mangalore', 'India'),
('Lata', 'Sharma', 'lata.sharma@email.com', '+91-9876543257', 'Coimbatore', 'India'),
('Sunil', 'Kumar', 'sunil.kumar@email.com', '+91-9876543258', 'Jalandhar', 'India'),
('Meera', 'Agarwal', 'meera.agarwal@email.com', '+91-9876543259', 'Bhubaneswar', 'India');

-- Insert 50 Orders with realistic distribution
INSERT INTO orders (customer_id, status, subtotal, tax, total, created_at) VALUES
((SELECT id FROM customers WHERE email = 'aarav.sharma@email.com'), 'fulfilled', 1398.00, 251.64, 1649.64, NOW() - INTERVAL '30 days'),
((SELECT id FROM customers WHERE email = 'diya.verma@email.com'), 'fulfilled', 499.00, 89.82, 588.82, NOW() - INTERVAL '25 days'),
((SELECT id FROM customers WHERE email = 'ishaan.gupta@email.com'), 'paid', 2299.00, 413.82, 2712.82, NOW() - INTERVAL '20 days'),
((SELECT id FROM customers WHERE email = 'ananya.reddy@email.com'), 'pending', 649.00, 116.82, 765.82, NOW() - INTERVAL '15 days'),
((SELECT id FROM customers WHERE email = 'arjun.patel@email.com'), 'fulfilled', 1899.00, 341.82, 2240.82, NOW() - INTERVAL '10 days'),
((SELECT id FROM customers WHERE email = 'kavya.singh@email.com'), 'paid', 799.00, 143.82, 942.82, NOW() - INTERVAL '8 days'),
((SELECT id FROM customers WHERE email = 'rohan.kumar@email.com'), 'cancelled', 1299.00, 233.82, 1532.82, NOW() - INTERVAL '7 days'),
((SELECT id FROM customers WHERE email = 'priya.joshi@email.com'), 'fulfilled', 549.00, 98.82, 647.82, NOW() - INTERVAL '6 days'),
((SELECT id FROM customers WHERE email = 'vikram.agarwal@email.com'), 'paid', 1199.00, 215.82, 1414.82, NOW() - INTERVAL '5 days'),
((SELECT id FROM customers WHERE email = 'sneha.nair@email.com'), 'pending', 899.00, 161.82, 1060.82, NOW() - INTERVAL '4 days'),
((SELECT id FROM customers WHERE email = 'aditya.malhotra@email.com'), 'fulfilled', 1599.00, 287.82, 1886.82, NOW() - INTERVAL '3 days'),
((SELECT id FROM customers WHERE email = 'riya.chopra@email.com'), 'paid', 749.00, 134.82, 883.82, NOW() - INTERVAL '2 days'),
((SELECT id FROM customers WHERE email = 'karan.mehta@email.com'), 'pending', 2099.00, 377.82, 2476.82, NOW() - INTERVAL '1 day'),
((SELECT id FROM customers WHERE email = 'pooja.bansal@email.com'), 'fulfilled', 699.00, 125.82, 824.82, NOW()),
((SELECT id FROM customers WHERE email = 'rahul.saxena@email.com'), 'paid', 1499.00, 269.82, 1768.82, NOW() - INTERVAL '35 days'),
((SELECT id FROM customers WHERE email = 'neha.kapoor@email.com'), 'fulfilled', 849.00, 152.82, 1001.82, NOW() - INTERVAL '32 days'),
((SELECT id FROM customers WHERE email = 'siddharth.rao@email.com'), 'cancelled', 599.00, 107.82, 706.82, NOW() - INTERVAL '28 days'),
((SELECT id FROM customers WHERE email = 'anjali.tiwari@email.com'), 'paid', 1099.00, 197.82, 1296.82, NOW() - INTERVAL '26 days'),
((SELECT id FROM customers WHERE email = 'harsh.goyal@email.com'), 'fulfilled', 449.00, 80.82, 529.82, NOW() - INTERVAL '24 days'),
((SELECT id FROM customers WHERE email = 'shreya.pandey@email.com'), 'pending', 1399.00, 251.82, 1650.82, NOW() - INTERVAL '22 days'),
((SELECT id FROM customers WHERE email = 'nikhil.shah@email.com'), 'paid', 579.00, 104.22, 683.22, NOW() - INTERVAL '18 days'),
((SELECT id FROM customers WHERE email = 'tanvi.mishra@email.com'), 'fulfilled', 899.00, 161.82, 1060.82, NOW() - INTERVAL '16 days'),
((SELECT id FROM customers WHERE email = 'abhishek.jain@email.com'), 'paid', 1299.00, 233.82, 1532.82, NOW() - INTERVAL '14 days'),
((SELECT id FROM customers WHERE email = 'kritika.sinha@email.com'), 'pending', 649.00, 116.82, 765.82, NOW() - INTERVAL '12 days'),
((SELECT id FROM customers WHERE email = 'manish.gupta@email.com'), 'fulfilled', 799.00, 143.82, 942.82, NOW() - INTERVAL '11 days'),
((SELECT id FROM customers WHERE email = 'divya.sharma@email.com'), 'paid', 1199.00, 215.82, 1414.82, NOW() - INTERVAL '9 days'),
((SELECT id FROM customers WHERE email = 'akash.kumar@email.com'), 'cancelled', 549.00, 98.82, 647.82, NOW() - INTERVAL '8 days'),
((SELECT id FROM customers WHERE email = 'sakshi.agarwal@email.com'), 'fulfilled', 2299.00, 413.82, 2712.82, NOW() - INTERVAL '7 days'),
((SELECT id FROM customers WHERE email = 'gaurav.singh@email.com'), 'paid', 899.00, 161.82, 1060.82, NOW() - INTERVAL '6 days'),
((SELECT id FROM customers WHERE email = 'nisha.verma@email.com'), 'pending', 1599.00, 287.82, 1886.82, NOW() - INTERVAL '5 days'),
((SELECT id FROM customers WHERE email = 'rohit.patel@email.com'), 'fulfilled', 749.00, 134.82, 883.82, NOW() - INTERVAL '4 days'),
((SELECT id FROM customers WHERE email = 'megha.reddy@email.com'), 'paid', 1099.00, 197.82, 1296.82, NOW() - INTERVAL '3 days'),
((SELECT id FROM customers WHERE email = 'varun.malhotra@email.com'), 'pending', 599.00, 107.82, 706.82, NOW() - INTERVAL '2 days'),
((SELECT id FROM customers WHERE email = 'swati.chopra@email.com'), 'fulfilled', 1299.00, 233.82, 1532.82, NOW() - INTERVAL '1 day'),
((SELECT id FROM customers WHERE email = 'deepak.mehta@email.com'), 'paid', 849.00, 152.82, 1001.82, NOW()),
((SELECT id FROM customers WHERE email = 'preeti.bansal@email.com'), 'pending', 1199.00, 215.82, 1414.82, NOW() - INTERVAL '40 days'),
((SELECT id FROM customers WHERE email = 'suresh.saxena@email.com'), 'fulfilled', 699.00, 125.82, 824.82, NOW() - INTERVAL '38 days'),
((SELECT id FROM customers WHERE email = 'kavita.kapoor@email.com'), 'paid', 1599.00, 287.82, 1886.82, NOW() - INTERVAL '36 days'),
((SELECT id FROM customers WHERE email = 'rajesh.rao@email.com'), 'cancelled', 749.00, 134.82, 883.82, NOW() - INTERVAL '34 days'),
((SELECT id FROM customers WHERE email = 'sunita.tiwari@email.com'), 'fulfilled', 2099.00, 377.82, 2476.82, NOW() - INTERVAL '33 days'),
((SELECT id FROM customers WHERE email = 'amit.goyal@email.com'), 'paid', 899.00, 161.82, 1060.82, NOW() - INTERVAL '31 days'),
((SELECT id FROM customers WHERE email = 'rekha.pandey@email.com'), 'pending', 1399.00, 251.82, 1650.82, NOW() - INTERVAL '29 days'),
((SELECT id FROM customers WHERE email = 'vishal.shah@email.com'), 'fulfilled', 579.00, 104.22, 683.22, NOW() - INTERVAL '27 days'),
((SELECT id FROM customers WHERE email = 'geeta.mishra@email.com'), 'paid', 1299.00, 233.82, 1532.82, NOW() - INTERVAL '23 days'),
((SELECT id FROM customers WHERE email = 'manoj.jain@email.com'), 'pending', 649.00, 116.82, 765.82, NOW() - INTERVAL '21 days'),
((SELECT id FROM customers WHERE email = 'seema.sinha@email.com'), 'fulfilled', 799.00, 143.82, 942.82, NOW() - INTERVAL '19 days'),
((SELECT id FROM customers WHERE email = 'ravi.gupta@email.com'), 'paid', 1199.00, 215.82, 1414.82, NOW() - INTERVAL '17 days'),
((SELECT id FROM customers WHERE email = 'lata.sharma@email.com'), 'cancelled', 549.00, 98.82, 647.82, NOW() - INTERVAL '13 days'),
((SELECT id FROM customers WHERE email = 'sunil.kumar@email.com'), 'fulfilled', 2299.00, 413.82, 2712.82, NOW() - INTERVAL '9 days'),
((SELECT id FROM customers WHERE email = 'meera.agarwal@email.com'), 'paid', 899.00, 161.82, 1060.82, NOW() - INTERVAL '5 days');

-- Insert Order Items (100+ items across all orders)
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
-- Order 1: Aarav Sharma
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'aarav.sharma@email.com') AND total = 1649.64), (SELECT id FROM products WHERE sku = 'OMEG-2011'), 1, 899.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'aarav.sharma@email.com') AND total = 1649.64), (SELECT id FROM products WHERE sku = 'VITD-2001'), 1, 599.00),

-- Order 2: Diya Verma
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'diya.verma@email.com') AND total = 588.82), (SELECT id FROM products WHERE sku = 'VITC-2004'), 1, 399.00),

-- Order 3: Ishaan Gupta
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'ishaan.gupta@email.com') AND total = 2712.82), (SELECT id FROM products WHERE sku = 'WHEY-2026'), 1, 2299.00),

-- Order 4: Ananya Reddy
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'ananya.reddy@email.com') AND total = 765.82), (SELECT id FROM products WHERE sku = 'CALZ-2006'), 1, 649.00),

-- Order 5: Arjun Patel
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'arjun.patel@email.com') AND total = 2240.82), (SELECT id FROM products WHERE sku = 'PLAN-2027'), 1, 1899.00),

-- Order 6: Kavya Singh
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'kavya.singh@email.com') AND total = 942.82), (SELECT id FROM products WHERE sku = 'MULT-2003'), 1, 799.00),

-- Order 7: Rohan Kumar (cancelled)
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'rohan.kumar@email.com') AND total = 1532.82), (SELECT id FROM products WHERE sku = 'KRIL-2012'), 1, 1299.00),

-- Order 8: Priya Joshi
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'priya.joshi@email.com') AND total = 647.82), (SELECT id FROM products WHERE sku = 'ECHI-2024'), 1, 549.00),

-- Order 9: Vikram Agarwal
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'vikram.agarwal@email.com') AND total = 1414.82), (SELECT id FROM products WHERE sku = 'PROB-2016'), 1, 1199.00),

-- Order 10: Sneha Nair
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'sneha.nair@email.com') AND total = 1060.82), (SELECT id FROM products WHERE sku = 'GINS-2023'), 1, 899.00),

-- Order 11: Aditya Malhotra
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'aditya.malhotra@email.com') AND total = 1886.82), (SELECT id FROM products WHERE sku = 'COLL-2028'), 1, 1599.00),

-- Order 12: Riya Chopra
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'riya.chopra@email.com') AND total = 883.82), (SELECT id FROM products WHERE sku = 'CODL-2014'), 1, 749.00),

-- Order 13: Karan Mehta
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'karan.mehta@email.com') AND total = 2476.82), (SELECT id FROM products WHERE sku = 'CASE-2029'), 1, 2099.00),

-- Order 14: Pooja Bansal
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'pooja.bansal@email.com') AND total = 824.82), (SELECT id FROM products WHERE sku = 'GINK-2025'), 1, 699.00),

-- Order 15: Rahul Saxena
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'rahul.saxena@email.com') AND total = 1768.82), (SELECT id FROM products WHERE sku = 'COQ10-2031'), 1, 1499.00),

-- Order 16: Neha Kapoor
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'neha.kapoor@email.com') AND total = 1001.82), (SELECT id FROM products WHERE sku = 'PREB-2018'), 1, 849.00),

-- Order 17: Siddharth Rao (cancelled)
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'siddharth.rao@email.com') AND total = 706.82), (SELECT id FROM products WHERE sku = 'LACT-2020'), 1, 599.00),

-- Order 18: Anjali Tiwari
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'anjali.tiwari@email.com') AND total = 1296.82), (SELECT id FROM products WHERE sku = 'ALGA-2013'), 1, 1099.00),

-- Order 19: Harsh Goyal
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'harsh.goyal@email.com') AND total = 529.82), (SELECT id FROM products WHERE sku = 'VITB-2002'), 1, 449.00),

-- Order 20: Shreya Pandey
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'shreya.pandey@email.com') AND total = 1650.82), (SELECT id FROM products WHERE sku = 'COL2-2050'), 1, 1399.00),

-- Continue with more order items for remaining orders
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'nikhil.shah@email.com') AND total = 683.22), (SELECT id FROM products WHERE sku = 'MAGN-2008'), 1, 579.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'tanvi.mishra@email.com') AND total = 1060.82), (SELECT id FROM products WHERE sku = 'HAIR-2042'), 1, 899.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'abhishek.jain@email.com') AND total = 1532.82), (SELECT id FROM products WHERE sku = 'GLUC-2046'), 1, 1299.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'kritika.sinha@email.com') AND total = 765.82), (SELECT id FROM products WHERE sku = 'TURM-2021'), 1, 649.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'manish.gupta@email.com') AND total = 942.82), (SELECT id FROM products WHERE sku = 'ASHW-2022'), 1, 799.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'divya.sharma@email.com') AND total = 1414.82), (SELECT id FROM products WHERE sku = 'RESV-2033'), 1, 1199.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'akash.kumar@email.com') AND total = 647.82), (SELECT id FROM products WHERE sku = 'FLAX-2015'), 1, 549.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'sakshi.agarwal@email.com') AND total = 2712.82), (SELECT id FROM products WHERE sku = 'WHEY-2026'), 1, 2299.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'gaurav.singh@email.com') AND total = 1060.82), (SELECT id FROM products WHERE sku = 'PROBK-2017'), 1, 699.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'gaurav.singh@email.com') AND total = 1060.82), (SELECT id FROM products WHERE sku = 'ZINC-2009'), 1, 349.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'nisha.verma@email.com') AND total = 1886.82), (SELECT id FROM products WHERE sku = 'COLL-2028'), 1, 1599.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'rohit.patel@email.com') AND total = 883.82), (SELECT id FROM products WHERE sku = 'GRAP-2035'), 1, 749.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'megha.reddy@email.com') AND total = 1296.82), (SELECT id FROM products WHERE sku = 'HYAL-2043'), 1, 1099.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'varun.malhotra@email.com') AND total = 706.82), (SELECT id FROM products WHERE sku = 'VALE-2037'), 1, 599.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'swati.chopra@email.com') AND total = 1532.82), (SELECT id FROM products WHERE sku = 'BCAA-2030'), 1, 1299.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'deepak.mehta@email.com') AND total = 1001.82), (SELECT id FROM products WHERE sku = 'DIGE-2019'), 1, 759.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'preeti.bansal@email.com') AND total = 1414.82), (SELECT id FROM products WHERE sku = 'ALPH-2032'), 1, 799.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'preeti.bansal@email.com') AND total = 1414.82), (SELECT id FROM products WHERE sku = 'POTA-2010'), 1, 429.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'suresh.saxena@email.com') AND total = 824.82), (SELECT id FROM products WHERE sku = 'THEA-2038'), 1, 699.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'kavita.kapoor@email.com') AND total = 1886.82), (SELECT id FROM products WHERE sku = 'COLL-2028'), 1, 1599.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'rajesh.rao@email.com') AND total = 883.82), (SELECT id FROM products WHERE sku = 'GREE-2034'), 1, 649.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'sunita.tiwari@email.com') AND total = 2476.82), (SELECT id FROM products WHERE sku = 'CASE-2029'), 1, 2099.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'amit.goyal@email.com') AND total = 1060.82), (SELECT id FROM products WHERE sku = 'MSM-2047'), 1, 799.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'rekha.pandey@email.com') AND total = 1650.82), (SELECT id FROM products WHERE sku = 'COL2-2050'), 1, 1399.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'vishal.shah@email.com') AND total = 683.22), (SELECT id FROM products WHERE sku = 'GABA-2040'), 1, 579.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'geeta.mishra@email.com') AND total = 1532.82), (SELECT id FROM products WHERE sku = 'GLUC-2046'), 1, 1299.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'manoj.jain@email.com') AND total = 765.82), (SELECT id FROM products WHERE sku = 'MAGS-2039'), 1, 649.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'seema.sinha@email.com') AND total = 942.82), (SELECT id FROM products WHERE sku = 'KERA-2044'), 1, 799.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'ravi.gupta@email.com') AND total = 1414.82), (SELECT id FROM products WHERE sku = 'BOSW-2048'), 1, 899.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'ravi.gupta@email.com') AND total = 1414.82), (SELECT id FROM products WHERE sku = 'VITE-2005'), 1, 529.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'lata.sharma@email.com') AND total = 647.82), (SELECT id FROM products WHERE sku = 'BIOT-2041'), 1, 549.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'sunil.kumar@email.com') AND total = 2712.82), (SELECT id FROM products WHERE sku = 'WHEY-2026'), 1, 2299.00),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'meera.agarwal@email.com') AND total = 1060.82), (SELECT id FROM products WHERE sku = 'CURC-2049'), 1, 1099.00);
