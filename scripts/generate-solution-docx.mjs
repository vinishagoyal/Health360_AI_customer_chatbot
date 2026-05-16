import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";

const outPath = path.resolve("docs/health360-solution-vibe-coding-openrouter.docx");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "health360-docx-"));

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function write(rel, content) {
  const abs = path.join(tmp, rel);
  ensureDir(abs);
  fs.writeFileSync(abs, content);
}

function run(text, opts = {}) {
  const style = opts.style ? `<w:pStyle w:val="${opts.style}"/>` : "";
  const spacing = opts.spacing ?? `<w:spacing w:after="120" w:line="276" w:lineRule="auto"/>`;
  const indent = opts.indent ? `<w:ind w:left="${opts.indent}"/>` : "";
  const keep = opts.keep ? "<w:keepNext/>" : "";
  const bold = opts.bold ? "<w:b/>" : "";
  const color = opts.color ? `<w:color w:val="${opts.color}"/>` : "";
  const size = opts.size ? `<w:sz w:val="${opts.size}"/><w:szCs w:val="${opts.size}"/>` : "";
  const pPr = `<w:pPr>${style}${spacing}${indent}${keep}</w:pPr>`;
  const rPr = `<w:rPr>${bold}${color}${size}</w:rPr>`;
  return `<w:p>${pPr}<w:r>${rPr}<w:t xml:space="preserve">${esc(text)}</w:t></w:r></w:p>`;
}

function para(text) {
  return run(text, { size: 22 });
}

function h1(text) {
  return run(text, { style: "Heading1", size: 32, bold: true, color: "0F172A", keep: true });
}

function h2(text) {
  return run(text, { style: "Heading2", size: 26, bold: true, color: "0F766E", keep: true });
}

function bullet(text) {
  return run(`- ${text}`, { size: 22, indent: 360, spacing: `<w:spacing w:after="80" w:line="276" w:lineRule="auto"/>` });
}

function pageBreak() {
  return `<w:p><w:r><w:br w:type="page"/></w:r></w:p>`;
}

function table(headers, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  const grid = widths.map((w) => `<w:gridCol w:w="${w}"/>`).join("");
  const cell = (text, width, header = false) => `
    <w:tc>
      <w:tcPr>
        <w:tcW w:w="${width}" w:type="dxa"/>
        <w:tcMar><w:top w:w="120" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="120" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tcMar>
        ${header ? '<w:shd w:fill="E2E8F0"/>' : ""}
      </w:tcPr>
      ${run(text, { size: header ? 20 : 19, bold: header, spacing: `<w:spacing w:after="0" w:line="240" w:lineRule="auto"/>` })}
    </w:tc>`;
  const rowXml = (cells, header = false) => `<w:tr>${cells.map((c, i) => cell(c, widths[i], header)).join("")}</w:tr>`;
  return `
    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="${total}" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:left w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:bottom w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:right w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tblGrid>${grid}</w:tblGrid>
      ${rowXml(headers, true)}
      ${rows.map((r) => rowXml(r)).join("")}
    </w:tbl>
    ${run("", { spacing: `<w:spacing w:after="160"/>` })}
  `;
}

const body = [];
body.push(run("BUSINESS AND BUILD DOCUMENT", { size: 22, bold: true, color: "0F766E", spacing: `<w:spacing w:after="80"/>` }));
body.push(run("Health360 AI Customer Support Solution", { size: 46, bold: true, color: "0F172A", spacing: `<w:spacing w:after="120"/>` }));
body.push(run("A practical overview of the business problem, the solution offered through Health360, how the prototype was built using vibe coding, and how OpenRouter's free model API was integrated through an SDK-style client module.", { size: 25, color: "334155", spacing: `<w:spacing w:after="260" w:line="300" w:lineRule="auto"/>` }));
body.push(table(["Prepared For", "Prepared By", "Project", "Date"], [["Health360 Health Supplements", "Vinisha Goyal", "AI Customer Query and Complaint Deflection System", "May 7, 2026"]], [2300, 1800, 3300, 1500]));

body.push(h1("1. Executive Summary"));
body.push(para("Health360 is a health supplement business that needs faster, more consistent customer support for product questions, order questions, shipping concerns, returns, and complaints. The solution is an AI-powered customer support experience on the Health360 website, supported by an admin dashboard and product catalog."));
body.push(para("The prototype was built using a vibe-coding workflow: defining the business need, rapidly translating it into product screens and data flows, iterating through user feedback, and shipping working features quickly. The AI layer uses OpenRouter's free model API through a lightweight SDK-style client wrapper."));

body.push(h1("2. Business Problem"));
body.push(para("Health360's support team faces a rising volume of repetitive product, order, and complaint queries. Without a self-service support layer, agents spend too much time answering common questions, customers wait longer for help, and the business risks inconsistent or unsafe supplement communication."));
body.push(h2("Customer Support Challenges"));
[
  "Customers repeatedly ask about supplement benefits, ingredients, dosage, stock, and product suitability.",
  "Order-related questions such as shipping, tracking, returns, and delivery timing create avoidable support load.",
  "Complaints and urgent concerns are not always categorized or escalated consistently.",
  "Manual replies can vary by agent, which weakens brand consistency.",
  "Health supplement businesses must avoid unsupported medical claims, diagnosis, or treatment advice.",
  "Leadership needs better visibility into product demand, support volume, and customer query patterns.",
].forEach((item) => body.push(bullet(item)));
body.push(table(["Area", "Problem", "Business Effect"], [
  ["Support workload", "Agents handle repetitive questions manually.", "Higher workload, slower response time, and reduced capacity for serious complaints."],
  ["Customer experience", "Customers wait for basic information.", "Lower satisfaction and possible drop-offs before purchase."],
  ["Compliance", "Supplement guidance can be sensitive.", "Risk of inaccurate claims or unsafe advice."],
  ["Operations", "No central dashboard for product and support signals.", "Harder to identify trends, stock issues, and support bottlenecks."],
], [1800, 3300, 4200]));

body.push(h1("3. Solution Offered Through Health360"));
body.push(para("The solution is a website-based AI customer support and ecommerce support layer. It combines a Health360 storefront, AI chatbot, cart experience, and admin dashboard. The goal is to deflect routine support queries while keeping humans involved for complaints, low-confidence questions, and medically sensitive conversations."));
body.push(table(["Solution Component", "Description"], [
  ["AI Chatbot Widget", "A floating website chatbot that answers product, order, shipping, returns, and general support questions."],
  ["Full-Screen Chatbot", "A larger testing and demo mode for validating chatbot behavior and example prompts."],
  ["Health360 Product Catalog", "A searchable and filterable storefront with Health360-branded supplement product images."],
  ["Admin Dashboard", "Product, customer, and order views for operations, inventory awareness, and support context."],
], [2600, 6500]));
body.push(h2("Core Capabilities"));
[
  "Answer frequently asked customer questions instantly.",
  "Recommend relevant supplement categories based on customer wellness goals.",
  "Provide product names, categories, price, SKU, stock, and descriptions from the Health360 catalog.",
  "Guide customers on order tracking, shipping, and returns.",
  "Escalate risky, complaint-heavy, or medically sensitive queries to human support.",
  "Show admins product, customer, order, revenue, and low-stock information.",
].forEach((item) => body.push(bullet(item)));

body.push(pageBreak());
body.push(h1("4. How I Built It Using Vibe Coding"));
body.push(para("Vibe coding was used as the practical build approach. Instead of starting with a long engineering specification, the product was shaped iteratively from the business problem, then refined through working screens, code changes, and feedback loops."));
body.push(table(["Step", "What Happened"], [
  ["Understand the pain", "Mapped support overload, repetitive queries, order support, and compliance risk."],
  ["Convert into flows", "Defined customer asks question, bot responds, risky cases escalate, admin tracks data."],
  ["Build usable UI first", "Created storefront, product cards, filters, cart, chatbot widget, and admin pages."],
  ["Add data structure", "Connected products, customers, orders, and order items through Supabase-compatible helpers."],
  ["Integrate AI behavior", "Built a system prompt from Health360 product and business context."],
  ["Iterate visually", "Replaced generic icons with Health360-branded supplement product images."],
  ["Test and refine", "Ran lint/build checks and adjusted based on observed behavior."],
], [2300, 6800]));
body.push(h2("Why Vibe Coding Worked"));
[
  "It allowed quick movement from concept to working demo.",
  "Business feedback could be converted into UI and logic changes immediately.",
  "The chatbot, storefront, and admin dashboard could evolve together.",
  "The final demo shows real flows rather than only documentation.",
].forEach((item) => body.push(bullet(item)));

body.push(h1("5. OpenRouter Free API Integration"));
body.push(para("The chatbot uses an OpenRouter-compatible integration through the project's lib/openrouter.ts module. This module behaves like a small SDK wrapper: it accepts chat messages, formats the API request, sends it to OpenRouter, validates the response, and returns clean assistant text back to the chatbot UI."));
body.push(h2("Integration Flow"));
[
  "The user types a message in the Health360 chatbot widget.",
  "The chatbot loads Health360 context using buildChatContext().",
  "The system prompt is generated using product catalog, inventory summary, and business policies.",
  "The current conversation is sent to OpenRouter's chat completions endpoint.",
  "The assistant response is displayed in the chatbot with Markdown formatting.",
  "If the API fails, the chatbot falls back to safe predefined support responses.",
].forEach((item) => body.push(bullet(item)));
body.push(table(["Part", "Implementation"], [
  ["Client module", "lib/openrouter.ts"],
  ["Request endpoint", "https://openrouter.ai/api/v1/chat/completions"],
  ["Model value", "openrouter/free"],
  ["API key variable", "NEXT_PUBLIC_OPENROUTER_API_KEY in the prototype"],
  ["Prompt source", "lib/chat-context.ts builds the Health360 system prompt"],
  ["UI consumers", "ChatbotWidget.tsx and FullScreenChatbot.tsx"],
], [2600, 6500]));
body.push(para("Production note: In the prototype, the OpenRouter key is referenced through a public environment variable so the demo can run quickly in the browser. For production, the AI call should move to a server-side API route so the key is not exposed to users. This would also allow better logging, rate limiting, moderation, and cost control."));

body.push(pageBreak());
body.push(h1("6. Technical Architecture"));
body.push(table(["Layer", "Technology / File", "Purpose"], [
  ["Frontend", "Next.js, React, TypeScript", "Storefront, admin dashboard, chatbot UI, routing."],
  ["Styling", "Tailwind CSS and reusable UI components", "Responsive and reusable interface elements."],
  ["Data access", "lib/supabase.ts", "Products, customers, orders, and order item operations."],
  ["Fallback data", "data/dataset.ts", "Demo products, customers, and orders when Supabase is unavailable."],
  ["Cart", "lib/cart.ts", "Zustand cart state with local persistence."],
  ["AI context", "lib/chat-context.ts", "Builds Health360-specific system prompt and product summaries."],
  ["AI API", "lib/openrouter.ts", "OpenRouter-compatible API wrapper for chatbot responses."],
  ["Visual assets", "public/images/health360/", "Generated Health360 branded supplement product images."],
], [1700, 3100, 4300]));

body.push(h1("7. Requirements Covered"));
body.push(h2("Functional Requirements"));
[
  "Customer can browse, search, filter, sort, and quick-view Health360 supplement products.",
  "Customer can add items to cart and view subtotal, GST, and total.",
  "Customer can ask the AI assistant product and order questions.",
  "Bot can answer using Health360 catalog and business context.",
  "Bot can fall back safely if AI service is unavailable.",
  "Admin can view products, customers, orders, revenue, and low-stock information.",
  "Admin can create, edit, delete, and export product and customer records.",
  "Order status can be reviewed and updated from the admin order page.",
].forEach((item) => body.push(bullet(item)));
body.push(h2("Non-Functional Requirements"));
body.push(table(["Category", "Requirement", "How Addressed"], [
  ["Performance", "Fast storefront and chatbot experience.", "Next.js app, client-side filtering, concise prompt context."],
  ["Reliability", "Keep working if Supabase or AI provider fails.", "Seed data fallback and mock support responses."],
  ["Security", "Protect API keys and customer data in production.", "Production recommendation: server-side OpenRouter route and stricter RLS."],
  ["Compliance", "Avoid unsafe health claims.", "System prompt instructs conservative responses and professional-care referrals."],
  ["Scalability", "Support growing query volume and catalog size.", "Supabase-backed data model and modular UI/data layers."],
  ["Maintainability", "Keep code organized and easy to update.", "Separate modules for cart, Supabase, OpenRouter, chat context, visuals, and UI."],
  ["Usability", "Customers should find support quickly.", "Floating chatbot, quick actions, product cards, filters, full-screen chat mode."],
], [1900, 3300, 3900]));

body.push(h1("8. Value Delivered"));
[
  "Reduces repetitive support load by answering common product and order questions.",
  "Improves first response time with instant chatbot access.",
  "Improves brand consistency through a controlled Health360 assistant voice.",
  "Improves product discovery through a searchable, branded storefront.",
  "Gives admins operational visibility into product, customer, and order data.",
  "Creates a strong base for future WhatsApp, email, CRM, and reporting integrations.",
].forEach((item) => body.push(bullet(item)));

body.push(h1("9. Recommended Next Steps"));
[
  "Move OpenRouter API calls from the browser to a secure server-side API route.",
  "Tighten Supabase RLS policies before production use.",
  "Add conversation logging with category, confidence, escalation status, and timestamps.",
  "Create an approved FAQ and compliance-safe product claim library.",
  "Add human handoff workflow for complaints, medical questions, and refund issues.",
  "Add analytics for deflection rate, escalation rate, response time, and top query categories.",
].forEach((item) => body.push(bullet(item)));

const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    ${body.join("\n")}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1080" w:right="1080" w:bottom="1080" w:left="1080" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`;

const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="22"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/>
    <w:pPr><w:spacing w:before="260" w:after="120"/><w:keepNext/></w:pPr>
    <w:rPr><w:b/><w:color w:val="0F172A"/><w:sz w:val="32"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/>
    <w:pPr><w:spacing w:before="180" w:after="80"/><w:keepNext/></w:pPr>
    <w:rPr><w:b/><w:color w:val="0F766E"/><w:sz w:val="26"/></w:rPr>
  </w:style>
</w:styles>`;

write("[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`);

write("_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`);

write("word/_rels/document.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`);

write("word/document.xml", documentXml);
write("word/styles.xml", stylesXml);
write("docProps/core.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Health360 AI Customer Support Solution</dc:title>
  <dc:creator>Vinisha Goyal</dc:creator>
  <cp:lastModifiedBy>Vinisha Goyal</cp:lastModifiedBy>
</cp:coreProperties>`);
write("docProps/app.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Codex</Application>
</Properties>`);

if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
execFileSync("zip", ["-qr", outPath, "."], { cwd: tmp });
console.log(`Wrote ${outPath}`);
