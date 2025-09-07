import { faker } from "@faker-js/faker";
import {
  Product,
  Customer,
  Order,
  OrderItem,
  ProductCategory,
  ProductForm,
  ProductStatus,
  OrderStatus,
} from "@/data/types";

faker.seed(360);

const CATEGORIES: ProductCategory[] = [
  "Vitamins",
  "Minerals",
  "Herbal",
  "Probiotics",
  "Omega-3",
  "Protein",
];
const FORMS: ProductForm[] = ["Capsule", "Tablet", "Powder", "Liquid", "Gummy"];
const STATUS_OPTIONS: ProductStatus[] = ["active", "draft", "discontinued"];
const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "paid",
  "fulfilled",
  "refunded",
  "cancelled",
];

// Indian localization data
const INDIAN_FIRST_NAMES = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Vihaan",
  "Arjun",
  "Krishna",
  "Ishaan",
  "Rohan",
  "Ayaan",
  "Kabir",
  "Ananya",
  "Aadhya",
  "Diya",
  "Ira",
  "Kiara",
  "Myra",
  "Anika",
  "Saanvi",
  "Aarohi",
  "Ishita",
];
const INDIAN_LAST_NAMES = [
  "Sharma",
  "Verma",
  "Gupta",
  "Singh",
  "Yadav",
  "Patel",
  "Reddy",
  "Nair",
  "Kumar",
  "Das",
  "Iyer",
  "Joshi",
  "Chopra",
  "Kapoor",
  "Malhotra",
  "Chatterjee",
  "Banerjee",
  "Mukherjee",
  "Pillai",
  "Shetty",
];
const INDIAN_CITIES = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
];
const INDIAN_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.co.in",
  "outlook.com",
  "hotmail.com",
  "rediffmail.com",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals = 2): number {
  const n = Math.random() * (max - min) + min;
  return parseFloat(n.toFixed(decimals));
}

function brandName() {
  const prefixes = [
    "Health360",
    "NutriCore",
    "Vitalix",
    "WellBeing",
    "OptiLife",
    "PureForm",
  ];
  return pick(prefixes);
}

function skuFor(name: string) {
  const code = name.replace(/[^A-Z0-9]/gi, "").slice(0, 5).toUpperCase();
  return `${code}-${randInt(1000, 9999)}`;
}

function productName(category: ProductCategory, form: ProductForm) {
  const base = {
    Vitamins: ["Vitamin C", "Vitamin D3", "Vitamin B12", "Multivitamin"],
    Minerals: ["Magnesium", "Zinc", "Iron", "Calcium"],
    Herbal: ["Ashwagandha", "Turmeric", "Ginkgo Biloba", "Milk Thistle"],
    "Omega-3": ["Fish Oil", "Krill Oil", "Algae Omega-3"],
    Probiotics: [
      "Probiotic Complex",
      "Digestive Probiotic",
      "Probiotic 50B CFU",
    ],
    Protein: ["Whey Protein", "Plant Protein", "Collagen Peptides"],
  }[category]!;
  return `${pick(base)} ${form}`;
}

function indianName() {
  const first = pick(INDIAN_FIRST_NAMES);
  const last = pick(INDIAN_LAST_NAMES);
  return { first, last };
}

function indianMobile(): string {
  // Indian mobile numbers are 10 digits starting with 6-9
  const first = pick([6, 7, 8, 9]);
  let rest = "";
  for (let i = 0; i < 9; i++) rest += randInt(0, 9);
  const raw = `${first}${rest}`;
  return Math.random() < 0.5 ? `+91-${raw}` : raw;
}

function indianEmail(first: string, last: string) {
  const base = `${first}.${last}`
    .toLowerCase()
    .replace(/[^a-z.]/g, "")
    .replace(/\.+/g, ".");
  return `${base}@${pick(INDIAN_EMAIL_DOMAINS)}`;
}

// Product images and descriptions
function imageForCategory(category: ProductCategory): string {
  // Use local high-quality images downloaded from Unsplash
  const imageMap = {
    "Vitamins": "/images/health360/vitamins.jpg",
    "Minerals": "/images/health360/minerals.jpg", 
    "Herbal": "/images/health360/herbal.jpg",
    "Probiotics": "/images/health360/probiotics.jpg",
    "Omega-3": "/images/health360/omega-3.jpg",
    "Protein": "/images/health360/protein.jpg"
  };
  return imageMap[category];
}

function descriptionFor(category: ProductCategory): string {
  switch (category) {
    case "Vitamins":
      return "Daily vitamin support to help fill nutritional gaps and support immunity.";
    case "Minerals":
      return "Essential minerals formulated for bone, muscle, and metabolic health.";
    case "Herbal":
      return "Herbal extracts rooted in traditional wellness, crafted for modern life.";
    case "Probiotics":
      return "Clinically inspired probiotic blends to support gut balance and digestion.";
    case "Omega-3":
      return "Purified omega‑3 oils to support heart, brain, and joint health.";
    case "Protein":
      return "High‑quality protein to support recovery, strength, and lean muscle.";
  }
}

function generateProducts(count = 48): Product[] {
  const items: Product[] = [];
  for (let i = 0; i < count; i++) {
    const category = pick(CATEGORIES);
    const form = pick(FORMS);
    const name = productName(category, form);
    const status: ProductStatus =
      Math.random() < 0.75 ? "active" : Math.random() < 0.5 ? "draft" : "discontinued";
    // INR pricing: from ₹199 to ₹5,999
    const price = randFloat(199, 5999, 2);
    const inventory = Math.random() < 0.1 ? randInt(0, 5) : randInt(10, 500);

    items.push({
      id: faker.string.uuid(),
      name,
      sku: skuFor(name),
      category,
      form,
      brand: brandName(),
      price,
      inventory,
      status,
      createdAt: faker.date.past({ years: 2 }).toISOString(),

      // Storefront fields
      imageUrl: imageForCategory(category),
      rating: randFloat(3.5, 5, 1),
      reviews: randInt(10, 1200),
      description: descriptionFor(category),
    });
  }
  return items;
}

function generateCustomers(count = 120): Customer[] {
  const items: Customer[] = [];
  for (let i = 0; i < count; i++) {
    const { first, last } = indianName();
    items.push({
      id: faker.string.uuid(),
      firstName: first,
      lastName: last,
      email: indianEmail(first, last),
      phone: Math.random() < 0.8 ? indianMobile() : undefined,
      city: Math.random() < 0.9 ? pick(INDIAN_CITIES) : undefined,
      country: "India",
      createdAt: faker.date.past({ years: 3 }).toISOString(),
    });
  }
  return items;
}

function generateOrders(customers: Customer[], products: Product[], count = 250) {
  const orders: Order[] = [];
  const orderItems: OrderItem[] = [];

  for (let i = 0; i < count; i++) {
    const id = faker.string.uuid();
    const customer = pick(customers);

    let subtotal = 0;
    const numItems = randInt(1, 5);
    for (let j = 0; j < numItems; j++) {
      const product = pick(products);
      const quantity = randInt(1, 4);
      const unitPrice = product.price;
      subtotal += quantity * unitPrice;

      orderItems.push({
        id: faker.string.uuid(),
        orderId: id,
        productId: product.id,
        quantity,
        unitPrice,
      });
    }

    const tax = parseFloat((subtotal * 0.18).toFixed(2)); // Assume 18% GST for demo
    const total = parseFloat((subtotal + tax).toFixed(2));

    const status: OrderStatus =
      Math.random() < 0.05
        ? "cancelled"
        : Math.random() < 0.05
        ? "refunded"
        : Math.random() < 0.2
        ? "pending"
        : Math.random() < 0.5
        ? "paid"
        : "fulfilled";

    orders.push({
      id,
      customerId: customer.id,
      status,
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax,
      total,
      createdAt: faker.date.past({ years: 1 }).toISOString(),
    });
  }

  return { orders, orderItems };
}

export const products: Product[] = generateProducts();
export const customers: Customer[] = generateCustomers();
const _orders = generateOrders(customers, products);
export const orders: Order[] = _orders.orders;
export const orderItems: OrderItem[] = _orders.orderItems;

export const kpis = {
  productCount: products.length,
  customerCount: customers.length,
  orderCount: orders.length,
  revenue: orders
    .filter((o) => o.status === "paid" || o.status === "fulfilled")
    .reduce((acc, o) => acc + o.total, 0),
};
