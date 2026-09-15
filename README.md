# LegalEase AI - GenAI Legal Document Intelligence & Assistance

> **Empowering users to understand, compare, and navigate complex legal documents with artificial intelligence.**

![License](https://img.shields.io/badge/license-MIT-gold.svg)
![GenAI](https://img.shields.io/badge/GenAI-Google%20Gemini-4285F4.svg)
![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-10B981.svg)
![Tests](https://img.shields.io/badge/Tests-100%25%20Passing-emerald.svg)

---

## ⚖️ Overview

Legal documents, employment contracts, non-disclosure agreements, and property leases are often complex, dense, and difficult to comprehend without professional assistance. **LegalEase AI** is a GenAI-powered web application designed to simplify legal documents, detect high-risk clauses, compare agreements side-by-side, answer grounded legal questions with citations, and generate actionable attorney consultation briefing reports.

*Note: LegalEase AI provides informational intelligence and assistance. It is designed to aid understanding and preparation, not to substitute for formal legal advice from a licensed attorney.*

---

## 🌟 Key Features

### 1. 📜 Plain English Clause Simplifier & Red-Flag Detector
- Translates legalese into clear 8th-grade reading level explanations.
- Calculates an automated **Risk Index Score (0–100)** with a dynamic circular gauge display.
- Highlights high-risk covenants (e.g. 24-month non-competes, off-hours IP capture) and provides negotiation mitigation tips.
- Includes an **Interactive Legal Jargon Helper** providing instant definitions for terms like *Indemnification*, *Non-Compete*, *Severability*, and *Force Majeure*.

### 2. 🔀 Side-by-Side Contract Comparison Engine
- Compares active agreements against baseline market standards (Doc A vs. Doc B).
- Generates a **Key Divergence Matrix** highlighting differences in non-compete duration, IP rights, termination notice periods, and legal dispute fees.

### 3. 💬 Grounded Legal AI Assistant Chat
- Context-aware AI chat trained directly on the loaded document text.
- Provides instant answers accompanied by clickable **Clause Citations** (e.g. *Section 5.1 Non-Competition*).
- Includes prompt starter chips for instant one-click queries.

### 4. 🧭 Options & Next Steps Navigator
- Interactive decision-tree pathway helping users evaluate options before signing:
  - **Option 1: Consult a Licensed Attorney** (*Recommended*)
  - **Option 2: Negotiate Specific Red-Flag Clauses** (*Actionable*)
  - **Option 3: Accept Terms As-Is** (*High Risk / Standard*)

### 5. 📋 Actionable Summary & Checklist
- Interactive checklist with progress tracking guiding users on key contract clauses to clarify or redline before signing.

### 6. 📄 Lawyer Consultation Prep Exporter
- Generates a structured briefing report summarizing executive highlights, red flags, and tailored attorney questions.
- Exports in multiple formats: **Print to PDF**, **Copy as Markdown**, and **Download as JSON**.

### 7. ⚡ Dual Execution Engine (Real Gemini API + Smart Offline Mode)
- Integrates Google Gemini REST API (`gemini-1.5-flash` / `gemini-2.5-flash`).
- Includes a complete offline fallback engine with pre-analyzed datasets and custom document section extractors.

---

## 🚀 Quickstart & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/subho178/promptwar.git
   cd promptwar
   ```

2. **Start the local HTTP server:**
   ```bash
   node server.js
   ```

3. **Open in browser:**
   Navigate to `http://localhost:8080/`

---

## 🧪 Automated Testing

LegalEase AI includes a headless automated test runner (`test_suite.js`) verifying security, text parsing, risk index logic, Q&A matching, and accessibility.

Run tests via command line:
```bash
node test_suite.js
```

**Test Results:** View generated test reports in [`test_results.md`](test_results.md) and [`test_results.json`](test_results.json).

---

## 🔒 Security & Privacy

- **Input Sanitization**: All user inputs and uploaded files are sanitized (`sanitizeHtml`) to protect against XSS injections.
- **Server Traversal Shield**: `server.js` uses strict path normalization preventing directory traversal attacks.
- **Security Headers**: Includes `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, and `X-Frame-Options: DENY`.

---

## 📂 Project Structure

```
├── index.html          # Main HTML structure with ARIA accessibility roles
├── styles.css          # Design system with luxury legal aesthetic & focus outlines
├── app.js              # Application controller, DOM caching, and AI logic
├── samples.js          # Realistic legal contract datasets (NDA, Lease, Employment, SaaS)
├── server.js           # Secure static HTTP server with security headers
├── test_suite.js       # Headless automated test runner (100% pass rate)
├── test_results.md     # Markdown test report artifact
├── test_results.json   # Machine-readable test metrics
└── README.md           # Project documentation
```

---

## 📄 License & Disclaimer

LegalEase AI is provided for informational and educational purposes. Always consult a qualified licensed attorney for formal legal advice.
