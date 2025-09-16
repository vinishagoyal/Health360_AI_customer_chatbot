# AI-Powered Customer Query & Complaint Deflection System for Health360

**📋 Business Requirements Document:** [View BRD](https://docs.google.com/document/d/1z1zIDr27pgcMZdyzygvX54X5GfciW0VLgDAIVlAFKkA/edit?usp=sharing)

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

# BUSINESS REQUIREMENTS DOCUMENT (BRD)

**Project Title:** AI-Powered Customer Query & Complaint Deflection System for Health360 Health Supplements  
**Prepared For:** Health360 Health Supplements Leadership  
**Prepared By:** Vinisha Goyal  
**Date:** 07 September, 2025  
**Version:** 1.0

## 1. Executive Summary

Health360 Health Supplements is experiencing a sharp rise in customer interactions — both complaints and product-related queries — across multiple channels (Call, WhatsApp, Email). With only 5 support agents, the team is overwhelmed, leading to delayed responses, inconsistent service, and potential brand erosion.

This BRD outlines the business need, objectives, scope, and proposed AI-driven solutions to automate, deflect, and intelligently route customer interactions — reducing agent workload by 40–60%, improving response time, and enhancing customer satisfaction.

## 2. Business Problem Statement

The customer support team (5 agents) is unable to handle the volume of incoming complaints and product queries across WhatsApp, Email, and Calls — leading to poor SLAs, burnout, and risk of non-compliance in health supplement communication.

### Key Pain Points:
- High ticket volume > Team capacity
- No self-service or deflection layer for common queries (e.g., dosage, ingredients, delivery)
- No central system to track, categorize, or escalate issues
- No visibility into peak hours (UK vs India time zones)
- Generic AI (e.g., ChatGPT) is unsuitable due to compliance, accuracy, and integration risks
- Custom website platform requires tailored, not off-the-shelf, solution

## 3. Business Objectives

| ID | Objective | Success Metric |
|---|---|---|
| OBJ-01 | Reduce volume of tickets reaching human agents | 40–60% deflection rate within 3 months |
| OBJ-02 | Improve first response time | < 2 mins for bot, < 4 hrs for escalated tickets |
| OBJ-03 | Ensure compliance with health supplement regulations (FSSAI/UK ASA) | Zero regulatory violations from bot responses |
| OBJ-04 | Identify peak interaction times (by region/channel) | Dashboard showing hourly/weekly heatmaps |
| OBJ-05 | Maintain brand voice and product accuracy | 95%+ customer satisfaction on bot replies |
| OBJ-06 | Seamlessly integrate with existing custom website | Zero disruption to current UX |

## 4. Project Scope

### ✅ In Scope
- AI chatbot deployment on Health360's custom website
- Training AI on Health360's product catalog, FAQs, policies, and past tickets
- Admin dashboard with:
  - Real-time query volume
  - Top queries by category (complaint vs product)
  - Peak time analytics (split by UK/India timezone)
  - Agent workload distribution
- Escalation engine: Bot → Human agent (with priority tagging)
- Monthly maintenance, updates, and performance reports

### ❌ Out of Scope
- WhatsApp Business API integration for automated replies
- Email parser to auto-respond or create tickets from inbound emails
- Call center/IVR voice bot (Phase 2)
- CRM or ERP integration (Phase 2)
- Mobile app integration (Phase 2)
- Social media (Instagram/FB) support (Phase 2)
- Multilingual support beyond English (Phase 2)

## 5. Stakeholders

| Role | Name/Dept | Responsibility |
|---|---|---|
| Project Sponsor | Health360 CEO / Ops Head | Approve budget, strategic alignment |
| Product Owner | Customer Support Lead | Define FAQs, escalation rules, review bot responses |
| Tech Lead | Health360 Dev Team | Provide API access, test integration, deploy on website |
| Compliance Officer | Legal/Regulatory | Approve bot content for FSSAI/UK compliance |
| End Users | Customers (UK + India) | Interact with bot, provide feedback |
| Solution Provider | Vinisha Goyal | Build, train, deploy, maintain AI system |

## 6. Functional Requirements

| ID | Requirement | Description | Priority |
|---|---|---|---|
| FR-01 | Widget | Bot must respond via Website Widget | High |
| FR-02 | Query Classification | Auto-tag incoming message as "Complaint" or "Product Query" | High |
| FR-03 | Dynamic Response Engine | Respond using approved knowledge base (no hallucinations) | Critical |
| FR-04 | Escalation Workflow | If confidence <80% or user says "agent", route to human + notify via email/dashboard | High |
| FR-05 | Compliance Guardrails | Block responses containing medical claims, unverified benefits | Critical |
| FR-06 | Admin Dashboard | Show real-time metrics: deflection rate, top queries, peak hours, unresolved tickets | High |
| FR-07 | Exportable Reports | Weekly CSV/PDF reports for management review | Medium |
| FR-08 | Brand Voice Customization | Tone must match Health360's brand guidelines (friendly, professional, health-conscious) | Medium |
| FR-09 | Timezone Awareness | Auto-detect user region (UK/IN) and adjust response timing/availability | Medium |

## 7. Non-Functional Requirements

| ID | Requirement | Description |
|---|---|---|
| NFR-01 | Uptime | 99.5% availability (excluding scheduled maintenance) |
| NFR-02 | Response Time | < 3 seconds for bot reply |
| NFR-03 | Data Security | All data stored on Indian/EU servers; no OpenAI/ChatGPT backend |
| NFR-04 | Scalability | Handle up to 10,000 queries/day without degradation |
| NFR-05 | Audit Trail | Log all interactions for compliance and training purposes |

## 8. Proposed Solutions & Cost Options

| Option | Description | Cost | Timeline | Best For |
|---|---|---|---|---|
| **SOLUTION A: White-Label Bot** | Rebranded existing system. Pre-trained on supplements. Quick deploy. | ₹45,000 setup + ₹8,000/month | 7–10 days | Fast relief, low budget |
| **SOLUTION B: Hybrid Custom Bot** | Your base system + Health360's data/UI/flows injected | ₹75,000 one-time + ₹15,000/year | 2–3 weeks | Balance of speed & customization |
| **SOLUTION C: Fully Custom AI Bot** | Built from scratch. Deep product & compliance training. Full analytics. | ₹1,00,000 one-time + ₹24,000/year | 4–6 weeks | Long-term, enterprise-grade |

## 9. Success Metrics & KPIs

| KPI | Target | Measurement Frequency |
|---|---|---|
| Deflection Rate | ≥ 50% | Weekly |
| Avg. First Response Time (Bot) | < 2 mins | Daily |
| Escalation Rate to Human Agent | < 30% | Weekly |
| Customer Satisfaction (CSAT) on Bot | ≥ 4.2/5 | Bi-weekly survey |
| Agent Ticket Load Reduction | ≥ 40% | Monthly |
| Peak Time Identification Accuracy | ≥ 85% match with actual spikes | Weekly |

## 10. Implementation Roadmap

| Phase | Activities | Timeline |
|---|---|---|
| **Phase 1: Discovery & Setup** | Finalize FAQs, compliance rules, API access, UI design | Week 1 |
| **Phase 2: Bot Training & Testing** | Train model, test responses, compliance review | Week 2–3 |
| **Phase 3: Pilot Launch** | Deploy on Dev environment for review | Week 4 |
| **Phase 4: Full Deployment** | Roll out to Website + Email, train agents on escalation | Week 5 |
| **Phase 5: Optimization & Reporting** | Tune responses, generate first performance report | Week 6+ |

## 11. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Bot gives inaccurate product info | High (compliance + safety) | Human-in-the-loop review + strict knowledge base |
| Integration fails with custom website | Medium | Dedicated tech sync sessions + sandbox testing |
| Low customer adoption of bot | Medium | Prominent placement + "Get instant answer" CTA |
| Budget constraints | Medium | Start with Pilot or White-Label option |

## 12. Approvals

| Role | Name | Signature | Date |
|---|---|---|---|
| Project Sponsor | [Client Name] | ___________ | //_____  |
| Product Owner | [Support Lead] | ___________ | //_____  |
| Tech Lead | [Dev Lead] | ___________ | //_____  |
| Solution Provider | Vinisha Goyal | ___________ | //_____  |

---

## Technical Documentation

### Technology Stack
- **Frontend:** Next.js 15.5.2, React 19.1.0, TypeScript
- **Styling:** Tailwind CSS 4.0
- **UI Components:** Radix UI, Lucide React
- **State Management:** Zustand
- **Data Handling:** TanStack Table, React Hook Form
- **Build Tool:** Turbopack

### Development Commands

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production with Turbopack
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

### Project Structure
```
health360-admin/
├── app/                 # Next.js App Router
│   ├── admin/          # Admin dashboard pages
│   ├── globals.css     # Global styles
│   └── layout.tsx      # Root layout
├── components/         # Reusable components
│   ├── ui/            # Base UI components
│   ├── layout/        # Layout components
│   └── store/         # Store-specific components
├── data/              # Data types and mock data
├── lib/               # Utility functions
└── public/            # Static assets
```

### Deployment
The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

For more details, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## AI Customer Support Chatbot

Health360 includes an AI-powered customer support chatbot to assist customers with their inquiries. The chatbot is powered by OpenRouter and uses the GLM-4.5-air model.

To access the chatbot:
1. Visit the Health360 website
2. Click on the chat icon in the bottom right corner
3. Type your question or select from the quick actions
4. The AI assistant will provide relevant information about products, orders, and general support

The chatbot can help customers with:
- Product recommendations based on health goals
- Order tracking and status updates
- General information about shipping, returns, and support
- Instant responses to frequently asked questions

For administrators, the chatbot provides:
- Real-time access to product catalog
- Order information lookup
- Customer support analytics
