# 🏥 Web-Based Clinical Scenario with AI Feedback System

A clinical education platform built for the School of Nursing (MFU) — delivering 12 interactive patient scenarios across 6 body systems with real-time AI-powered response evaluation for 4th-year nursing students (n=138).

## Key Features
- **Hybrid AI Evaluation Engine** — combines a rule-based keyword matcher (<500ms) with Google Gemini 1.5 Flash for semantic assessment of mixed Thai-English clinical responses
- **RBAC** — 3-tier role hierarchy (Admin / Faculty / Student), enforced server-side via middleware on every API route
- **Thai PDPA Compliance** — encrypted PII (AES-256), digital consent flow, audit logging, right-to-erasure support
- **Zero-Budget Architecture** — Upstash Redis response caching to respect Gemini Free Tier rate limits and eliminate redundant API calls
- **RESTful API** — Zod-validated input across auth, scenario, assessment, and export endpoints

## Tech Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn/ui
- **Backend:** Next.js API Routes, Prisma ORM, Jose (JWT), Zod
- **Database:** PostgreSQL via Supabase
- **AI/Caching:** Google Gemini 1.5 Flash API, Upstash Redis
- **Deployment:** Vercel + Supabase (MVP phase)

## My Role
Authored the complete Software Requirements Specification (SRS), architected the Hybrid AI Evaluation Engine and PDPA-compliant data flow, and developed the functional UI prototype.

## Status
Working UI prototype and system architecture completed. Full backend integration paused pending administrative budget confirmation.
