import fs from "node:fs";
import path from "node:path";

const outPath = path.resolve("docs/health360-prd.pdf");

const doc = [
  { type: "title", text: "Health360 AI Customer Query and Complaint Deflection System" },
  { type: "subtitle", text: "Product Requirements Document (PRD)" },
  { type: "meta", rows: [
    ["Prepared For", "Health360 Health Supplements Leadership"],
    ["Prepared By", "Vinisha Goyal"],
    ["Document Type", "Business Problem, Proposed Solution, Functional Requirements, Non-Functional Requirements"],
    ["Date", "May 6, 2026"],
    ["Version", "1.0"],
  ]},
  { type: "h1", text: "1. Executive Summary" },
  { type: "p", text: "Health360 receives a growing volume of customer conversations across product questions, order support, delivery concerns, returns, and complaints. The support team has limited human capacity, so repetitive questions slow down response times and create inconsistent answers. This is especially risky for a health supplements business because product guidance must be accurate, controlled, and compliant." },
  { type: "p", text: "The proposed product is an AI-powered customer support layer on the Health360 website, backed by Health360 product data, policy content, complaint routing rules, and an admin dashboard. The system should deflect routine queries, classify conversations, provide safe product information, escalate uncertain or high-risk cases, and give administrators metrics for operations and continuous improvement." },

  { type: "h1", text: "2. Business Problem" },
  { type: "p", text: "Problem statement: Health360's support team cannot efficiently handle the rising volume of repetitive product, order, and complaint queries while maintaining fast SLAs, consistent answers, and compliant supplement communication." },
  { type: "h2", text: "Key Pain Points" },
  { type: "bullets", items: [
    "High query volume exceeds available support capacity.",
    "Customers repeat common questions about dosage, ingredients, stock, delivery, returns, and order status.",
    "No scalable self-service assistant is available on the website.",
    "Manual responses create inconsistent brand tone and product accuracy.",
    "Health supplement communication has compliance risk if benefits are overstated.",
    "Leadership lacks visibility into query patterns, peak hours, and unresolved issues.",
    "Escalations are not consistently tagged by urgency, category, or customer intent.",
  ]},
  { type: "h2", text: "Business Impact" },
  { type: "rows", headers: ["Area", "Current Risk", "Desired Outcome"], rows: [
    ["Support workload", "Agents spend time on repeated questions.", "40-60% routine question deflection."],
    ["Customer experience", "Delayed first replies and inconsistent answers.", "Instant first response for common questions."],
    ["Compliance", "Risk of inaccurate supplement claims.", "Approved, constrained answers with escalation."],
    ["Operations", "Limited visibility into volume and topic trends.", "Dashboard for query, category, order, and inventory signals."],
  ]},

  { type: "h1", text: "3. Proposed Solution" },
  { type: "p", text: "Build a Health360 AI support assistant embedded on the Health360 website. The assistant answers approved product and policy questions, recommends relevant supplements based on user goals, handles order-support prompts, and escalates uncertain or sensitive issues to a human support process. The system includes a storefront experience, AI chatbot widget, full-screen chatbot testing mode, and admin dashboard for products, customers, and orders." },
  { type: "h2", text: "Solution Components" },
  { type: "bullets", items: [
    "Customer-facing chatbot: Website widget for product, order, shipping, return, and support questions.",
    "Knowledge-based responses: Uses Health360 catalog, inventory, policies, and business information.",
    "Admin dashboard: Tracks products, customers, orders, low stock, revenue, and support-related signals.",
    "Escalation layer: Routes low-confidence, complaint, medical, or human-agent requests for manual handling.",
    "Branded product catalog: Health360 supplement images and browsable product cards.",
  ]},
  { type: "h2", text: "Solution Principles" },
  { type: "bullets", items: [
    "Give fast, concise, helpful responses for routine queries.",
    "Use Health360-approved product and policy data as the source of truth.",
    "Avoid diagnosis, treatment promises, or unsupported medical claims.",
    "Escalate when the query is uncertain, risky, emotional, or outside approved content.",
    "Make the system measurable through deflection, escalation, response-time, and CSAT metrics.",
  ]},

  { type: "h1", text: "4. Goals and KPIs" },
  { type: "rows", headers: ["ID", "Goal", "Target"], rows: [
    ["G-01", "Reduce repetitive tickets reaching agents.", "40-60% deflection within 3 months."],
    ["G-02", "Improve first response time.", "Bot acknowledgement under 1 second; AI response target under 3 seconds."],
    ["G-03", "Maintain safe supplement communication.", "Zero known regulatory violations from bot content."],
    ["G-04", "Increase customer satisfaction.", "CSAT at or above 4.2 out of 5."],
    ["G-05", "Improve operational visibility.", "Dashboard for volume, products, customers, orders, revenue, and low stock."],
    ["G-06", "Lower human support load.", "At least 40% reduction in repetitive handling effort."],
  ]},

  { type: "h1", text: "5. Scope" },
  { type: "h2", text: "In Scope" },
  { type: "bullets", items: [
    "Website chatbot widget and full-screen chatbot testing experience.",
    "Health360 product catalog browsing, filtering, and branded product card experience.",
    "Admin product, customer, and order management pages.",
    "AI responses grounded in product catalog, category, inventory, business policies, and support guidance.",
    "Basic order support flow, including tracking guidance and human escalation.",
    "Query classification by broad intent: product query, order support, complaint, general support, medical/risk.",
    "Escalation guidance when confidence is low or user requests a human agent.",
    "Dashboard metrics for products, customers, orders, revenue, and low stock.",
  ]},
  { type: "h2", text: "Out of Scope for Phase 1" },
  { type: "bullets", items: [
    "WhatsApp Business API automation.",
    "Email parsing and auto-response workflows.",
    "Voice bot, IVR, or call center integration.",
    "CRM, ERP, logistics, payment gateway, or warehouse integrations.",
    "Mobile app integration.",
    "Multilingual support beyond English.",
    "Automated refund approval or medical advice.",
  ]},

  { type: "h1", text: "6. Users and Stakeholders" },
  { type: "rows", headers: ["User / Stakeholder", "Needs", "Product Support"], rows: [
    ["Customer", "Fast answers about supplements, delivery, returns, and orders.", "Website chatbot and product catalog."],
    ["Support Agent", "Fewer repetitive tickets and clearer escalations.", "Deflection, category tagging, escalation prompts."],
    ["Support Lead", "Visibility into query trends, volume, and unresolved issues.", "Admin dashboard and future reports."],
    ["Compliance Officer", "Safe, approved supplement claims.", "Guardrails, restricted response policy, escalation."],
    ["Operations / Inventory", "Awareness of product and stock patterns.", "Inventory display and low-stock dashboard."],
    ["Leadership", "Lower cost, better service, measurable ROI.", "Deflection and performance KPIs."],
  ]},

  { type: "h1", text: "7. Functional Requirements" },
  { type: "rows", headers: ["ID", "Requirement", "Priority", "Acceptance Criteria"], rows: [
    ["FR-01", "Website chatbot widget", "Critical", "User can open chat, type, send, and receive a response."],
    ["FR-02", "Full-screen chatbot", "High", "User can open full-screen chat and close it with UI or Escape."],
    ["FR-03", "Product-aware answers", "Critical", "Bot answers catalog questions using product, price, category, and inventory data."],
    ["FR-04", "Product recommendations", "High", "Bot recommends relevant supplements without medical claims."],
    ["FR-05", "Order support guidance", "High", "Bot asks for order ID/email and routes complex cases to support."],
    ["FR-06", "Query classification", "High", "Messages are classified as product, complaint, order, general, or medical/risk."],
    ["FR-07", "Complaint escalation", "Critical", "Bot escalates complaints, refund disputes, legal threats, and safety concerns."],
    ["FR-08", "Medical guardrails", "Critical", "Bot avoids diagnosis, treatment, disease-cure claims, and unsafe dosage advice."],
    ["FR-09", "Admin dashboard", "High", "Dashboard renders products, customers, orders, revenue, and low-stock metrics."],
    ["FR-10", "Product management", "High", "Admins can create, edit, search, delete, and export products."],
    ["FR-11", "Customer management", "Medium", "Admins can create, edit, search, delete, and export customers."],
    ["FR-12", "Order management", "High", "Admins can view order details and update order status."],
    ["FR-13", "Storefront catalog", "High", "Users can browse product cards with brand imagery, price, rating, description, and SKU."],
    ["FR-14", "Catalog filters", "Medium", "Users can filter by search, category, form, and sort option."],
    ["FR-15", "Cart", "Medium", "Users can add, remove, increment, decrement, and clear cart items."],
    ["FR-16", "Fallback data", "High", "Storefront and admin pages remain usable if Supabase is unavailable."],
    ["FR-17", "Reporting export", "Medium", "Admin tables can export current rows to CSV."],
    ["FR-18", "Brand presentation", "Medium", "Category cards show Health360-branded supplement imagery."],
  ]},

  { type: "h1", text: "8. Non-Functional Requirements" },
  { type: "rows", headers: ["ID", "Category", "Requirement", "Target"], rows: [
    ["NFR-01", "Availability", "Customer-facing chatbot and storefront should be available during business-critical hours.", "99.5% monthly uptime target after production launch."],
    ["NFR-02", "Performance", "Chatbot responses should feel instant.", "UI acknowledgement under 1 second; AI response target under 3 seconds."],
    ["NFR-03", "Scalability", "System should support growth without redesign.", "Support up to 10,000 queries/day with horizontal scaling."],
    ["NFR-04", "Security", "API keys and privileged database operations must not be exposed to browsers.", "AI and admin-sensitive operations run through server-side endpoints or protected roles."],
    ["NFR-05", "Privacy", "Customer and order information must be protected.", "Collect only required data and restrict admin access."],
    ["NFR-06", "Compliance", "Bot must avoid prohibited health, disease, and cure claims.", "All health content follows approved claim library and escalation policy."],
    ["NFR-07", "Reliability", "System should degrade gracefully when third-party services fail.", "Fallback responses and seed data keep demo/storefront usable."],
    ["NFR-08", "Observability", "Support and engineering need visibility into failures and journeys.", "Log chatbot failures, escalations, latency, and admin CRUD failures."],
    ["NFR-09", "Auditability", "Conversation outcomes should be reviewable for training and compliance.", "Store metadata, category, escalation status, and approved response version."],
    ["NFR-10", "Maintainability", "Code should be modular and easy to extend.", "Chat context, AI client, UI, data access, and visuals remain separated."],
    ["NFR-11", "Accessibility", "Core UI should work with keyboard and screen readers.", "Accessible labels, keyboard dialogs, and WCAG AA contrast where practical."],
    ["NFR-12", "Usability", "Customers should understand how to use chat and catalog quickly.", "Visible chat widget, quick actions, scannable cards."],
    ["NFR-13", "Data Integrity", "Admin edits must preserve valid data.", "Required fields, numeric validation, valid status values, unique SKU/email constraints."],
    ["NFR-14", "Backup and Recovery", "Operational data should be restorable.", "Supabase backup/export process documented before production launch."],
    ["NFR-15", "Compatibility", "App should work across modern browsers and responsive layouts.", "Latest Chrome, Safari, Edge, and mobile responsive viewports."],
    ["NFR-16", "Cost Control", "AI usage should remain financially predictable.", "Track usage, define max tokens, add fallback paths, and monitor provider cost."],
  ]},

  { type: "h1", text: "9. Data and System Requirements" },
  { type: "rows", headers: ["Entity", "Purpose", "Important Fields"], rows: [
    ["Product", "Catalog and recommendation source.", "Name, SKU, category, form, brand, price, inventory, status, description."],
    ["Customer", "Support and order ownership.", "Name, email, phone, city, country, created date."],
    ["Order", "Order support and admin workflow.", "Customer ID, status, subtotal, tax, total, created date."],
    ["Order Item", "Line-item detail for order view.", "Order ID, product ID, quantity, unit price."],
    ["Conversation", "Future production audit and analytics.", "User message, bot response, category, confidence, escalation flag, timestamp."],
  ]},
  { type: "h2", text: "System Dependencies" },
  { type: "bullets", items: [
    "Frontend: Next.js, React, TypeScript, Tailwind CSS.",
    "Database: Supabase for products, customers, orders, and order items.",
    "AI Provider: OpenRouter-backed assistant in the current prototype; production should route through server-side APIs.",
    "State: Zustand local cart persistence for storefront cart.",
  ]},

  { type: "h1", text: "10. Compliance and Safety Rules" },
  { type: "bullets", items: [
    "Bot must not diagnose diseases or recommend treatment plans.",
    "Bot must not claim a supplement cures, prevents, or treats a disease unless specifically approved by compliance.",
    "Bot must recommend consulting a healthcare professional for pregnancy, chronic disease, medication interactions, severe symptoms, or dosage uncertainty.",
    "Bot must not replace doctor, pharmacist, or nutritionist guidance.",
    "Bot must not invent ingredients, certifications, clinical proof, delivery promises, or refund approvals.",
    "Every risky query should be escalated or answered with conservative general information.",
  ]},

  { type: "h1", text: "11. Release Plan" },
  { type: "rows", headers: ["Phase", "Timeline", "Activities", "Exit Criteria"], rows: [
    ["Discovery", "Week 1", "Finalize FAQs, product data, policies, escalation rules, compliance restrictions.", "Approved knowledge base and escalation matrix."],
    ["Prototype", "Week 2", "Configure storefront, admin dashboard, chatbot context, and demo data.", "Internal demo answers core product/order questions."],
    ["Compliance Testing", "Week 3", "Test risky prompts, medical questions, complaints, and edge cases.", "Compliance signs off on guardrail behavior."],
    ["Pilot", "Week 4", "Launch to limited website traffic or internal users.", "Bot resolves routine questions with acceptable CSAT and escalation accuracy."],
    ["Production", "Week 5+", "Full website rollout, monitoring, reporting, and optimization.", "KPIs tracked weekly and improvement backlog created."],
  ]},

  { type: "h1", text: "12. Risks and Mitigations" },
  { type: "rows", headers: ["Risk", "Impact", "Mitigation"], rows: [
    ["Bot provides inaccurate supplement guidance.", "High compliance and customer safety risk.", "Use approved knowledge base, guardrails, and human escalation."],
    ["API key exposure in browser.", "High security and cost risk.", "Move AI calls to server-side route before production."],
    ["Overly permissive database access.", "High data integrity and privacy risk.", "Use authenticated admin access and restrictive RLS policies."],
    ["Customers distrust bot responses.", "Medium adoption risk.", "Use clear brand tone, concise answers, and easy human handoff."],
    ["Low-quality knowledge base.", "High answer quality risk.", "Maintain product, policy, and FAQ data through support/product owner."],
    ["Provider latency or downtime.", "Medium service risk.", "Add fallback responses, retries, and status monitoring."],
  ]},

  { type: "h1", text: "13. Open Questions" },
  { type: "bullets", items: [
    "Which exact FSSAI/UK ASA approved claims can be used for each product category?",
    "What CRM, ticketing, email, or WhatsApp platform should escalations integrate with in Phase 2?",
    "What are the official support hours for India and UK customers?",
    "Which analytics events should be included in the weekly leadership report?",
    "What customer data retention policy should apply to chat transcripts?",
  ]},

  { type: "h1", text: "14. Acceptance Summary" },
  { type: "p", text: "The Phase 1 product is acceptable when customers can use the website chatbot to receive safe product and order-support guidance, admins can manage core catalog/customer/order data, risky queries are escalated rather than over-answered, and leadership can evaluate deflection and support workload improvement through measurable KPIs." },
];

const pageWidth = 612;
const pageHeight = 792;
const margin = 54;
const contentWidth = pageWidth - margin * 2;
const bottom = 54;
const fonts = {
  regular: "F1",
  bold: "F2",
};

function escapePdfText(text) {
  return String(text)
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, (char) => {
      if (char === "–" || char === "—") return "-";
      if (char === "’" || char === "‘") return "'";
      if (char === "“" || char === "”") return '"';
      if (char === "≥") return ">=";
      if (char === "₹") return "INR ";
      return "";
    })
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function textWidth(text, size) {
  return String(text).length * size * 0.47;
}

function wrapText(text, size, width) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (textWidth(candidate, size) <= width || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

class PdfBuilder {
  constructor() {
    this.pages = [];
    this.current = [];
    this.y = pageHeight - margin;
  }

  ensure(height) {
    if (this.y - height < bottom) this.newPage();
  }

  newPage() {
    if (this.current.length) this.pages.push(this.current.join("\n"));
    this.current = [];
    this.y = pageHeight - margin;
  }

  text(text, x, y, size = 10, font = fonts.regular) {
    this.current.push(`BT /${font} ${size} Tf ${x.toFixed(2)} ${y.toFixed(2)} Td (${escapePdfText(text)}) Tj ET`);
  }

  line(x1, y1, x2, y2, width = 0.7) {
    this.current.push(`${width} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`);
  }

  paragraph(text, opts = {}) {
    const size = opts.size ?? 10;
    const font = opts.font ?? fonts.regular;
    const indent = opts.indent ?? 0;
    const gap = opts.gap ?? 5;
    const lineHeight = size * 1.35;
    const lines = wrapText(text, size, contentWidth - indent);
    this.ensure(lines.length * lineHeight + gap);
    for (const line of lines) {
      this.text(line, margin + indent, this.y, size, font);
      this.y -= lineHeight;
    }
    this.y -= gap;
  }

  heading(text, level = 1) {
    const size = level === 1 ? 15 : 12;
    const gapBefore = level === 1 ? 14 : 8;
    const gapAfter = level === 1 ? 8 : 5;
    this.ensure(size * 2.8 + gapAfter);
    this.y -= gapBefore;
    this.text(text, margin, this.y, size, fonts.bold);
    this.y -= size * 0.55;
    if (level === 1) this.line(margin, this.y, pageWidth - margin, this.y, 0.6);
    this.y -= gapAfter;
  }

  bullets(items) {
    for (const item of items) {
      const lines = wrapText(item, 10, contentWidth - 16);
      this.ensure(lines.length * 13.5 + 2);
      this.text("-", margin + 2, this.y, 10, fonts.bold);
      for (let i = 0; i < lines.length; i++) {
        this.text(lines[i], margin + 16, this.y, 10);
        this.y -= 13.5;
      }
      this.y -= 1;
    }
    this.y -= 4;
  }

  meta(rows) {
    for (const [label, value] of rows) {
      this.ensure(18);
      this.text(`${label}:`, margin, this.y, 10, fonts.bold);
      this.text(value, margin + 125, this.y, 10);
      this.y -= 16;
    }
    this.y -= 10;
  }

  rows(headers, rows) {
    const colWidth = contentWidth / headers.length;
    const size = 8.3;
    const lineHeight = 10.8;
    const drawRow = (cells, isHeader = false) => {
      const wrapped = cells.map((cell) => wrapText(cell, size, colWidth - 8));
      const rowHeight = Math.max(...wrapped.map((lines) => lines.length)) * lineHeight + 9;
      this.ensure(rowHeight + 2);
      this.line(margin, this.y + 4, pageWidth - margin, this.y + 4, 0.45);
      cells.forEach((_, index) => {
        const x = margin + index * colWidth;
        this.line(x, this.y + 4, x, this.y - rowHeight + 4, 0.35);
      });
      this.line(pageWidth - margin, this.y + 4, pageWidth - margin, this.y - rowHeight + 4, 0.35);
      wrapped.forEach((lines, col) => {
        let textY = this.y - 7;
        for (const line of lines) {
          this.text(line, margin + col * colWidth + 4, textY, size, isHeader ? fonts.bold : fonts.regular);
          textY -= lineHeight;
        }
      });
      this.y -= rowHeight;
      this.line(margin, this.y + 4, pageWidth - margin, this.y + 4, 0.45);
    };
    drawRow(headers, true);
    for (const row of rows) drawRow(row);
    this.y -= 10;
  }

  finish() {
    if (this.current.length) this.pages.push(this.current.join("\n"));
  }
}

const pdf = new PdfBuilder();
for (const block of doc) {
  if (block.type === "title") {
    pdf.ensure(70);
    pdf.text(block.text, margin, pdf.y, 22, fonts.bold);
    pdf.y -= 30;
  } else if (block.type === "subtitle") {
    pdf.text(block.text, margin, pdf.y, 13, fonts.bold);
    pdf.y -= 24;
  } else if (block.type === "meta") {
    pdf.meta(block.rows);
  } else if (block.type === "h1") {
    pdf.heading(block.text, 1);
  } else if (block.type === "h2") {
    pdf.heading(block.text, 2);
  } else if (block.type === "p") {
    pdf.paragraph(block.text);
  } else if (block.type === "bullets") {
    pdf.bullets(block.items);
  } else if (block.type === "rows") {
    pdf.rows(block.headers, block.rows);
  }
}
pdf.finish();

const objects = [];
function addObject(body) {
  objects.push(body);
  return objects.length;
}

const fontRegularId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
const fontBoldId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
const pageIds = [];
const contentIds = [];

for (const pageStream of pdf.pages) {
  const stream = `<< /Length ${Buffer.byteLength(pageStream)} >>\nstream\n${pageStream}\nendstream`;
  contentIds.push(addObject(stream));
  pageIds.push(null);
}

const pagesIdPlaceholder = objects.length + pdf.pages.length + 1;
for (let i = 0; i < pdf.pages.length; i++) {
  pageIds[i] = addObject(`<< /Type /Page /Parent ${pagesIdPlaceholder} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentIds[i]} 0 R >>`);
}

const pagesId = addObject(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`);
const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

let output = "%PDF-1.4\n";
const offsets = [0];
for (let i = 0; i < objects.length; i++) {
  offsets.push(Buffer.byteLength(output));
  output += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
}
const xrefOffset = Buffer.byteLength(output);
output += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i <= objects.length; i++) {
  output += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
output += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

fs.writeFileSync(outPath, output, "binary");
console.log(`Wrote ${outPath}`);
