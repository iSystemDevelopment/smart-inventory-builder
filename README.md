# 🛡️ Smart-Inventory-Builder — Public Portfolio Repository

[![License: Proprietary](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Google%20Apps%20Script-blue.svg)](https://developers.google.com/apps-script)
[![Status](https://img.shields.io/badge/status-Production%20Ready-success.svg)](https://github.com/iSystemDevelopment/smart-inventory-builder)

---

Welcome to the public showcase of **Smart-Inventory-Builder**, an enterprise-grade inventory management solution engineered by iSystem Development for GSL Power Ltd.

**Note:**  
This portfolio repository contains only sanitized source code and public documentation.  
No real credentials, sensitive business data, or proprietary configurations are included.

---

## 🎯 Project Overview

Smart-Inventory-Builder is a fully featured inventory automation platform, built on Google Sheets and Google Apps Script. Core features include:

- **QuickBooks integration**
- **PDF invoice OCR (Google Vision API v3)**
- **Competitor price monitoring (BrowseAI)**
- **QR code generation and label printing (PrintNode, Brother QL-820NWB)**
- **Intelligent duplicate detection**
- **Automated workflows**
- **Dual-repository architecture for security**

---

## 📁 Repository Architecture

This project uses a **dual-repository SSOT** approach:

- **Private Repository (SSOT):**  
  [smart-inventory-builder-private](https://github.com/iSystemDevelopment/smart-inventory-builder-private)  
  – Production code, real secrets, internal documentation

- **Public Repository (Portfolio):**  
  [smart-inventory-builder](https://github.com/iSystemDevelopment/smart-inventory-builder)  
  – Sanitized code, example configs, portfolio docs

Sanitization is fully automated (see [docs/SSOT.md](docs/SSOT.md)) with GitHub Actions.

Example public structure:

```
smart-inventory-builder/
├── src/                  # Source code – sanitized for public
├── docs/                 # Public documentation (setup, workflow, architecture, API, etc.)
├── examples/             # Example configurations only
├── LICENSE               # Proprietary license
└── README.md             # This file
```

---

## 🚀 Key Features

- **PDF Invoice OCR (Vision API v3):** Extract supplier, items, pricing from PDFs
- **QuickBooks Integration:** OAuth 2.0, direct invoice import, line item extraction
- **Price Monitoring (BrowseAI):** Track and alert price changes across competitors
- **QR Code Labeling:** Generate, store, and print QR codes for SKU labels
- **Duplicate Detection:** Multi-level checks (SKU, MPN, fuzzy matching)
- **Status Workflows:** Pending, reviewed, approved, added
- **Audit Logging:** Error and activity logs via Google Sheets
- **Secure Publication:** Automated secret removal, public/private repo separation

---

## 📖 Documentation

See `docs/` for:

- [SETUP.md](docs/SETUP.md) – Public setup guide  
- [SSOT.md](docs/SSOT.md) – Dual-repository architecture  
- [WORKFLOWS.md](docs/WORKFLOWS.md) – Example automated workflows  
- [API.md](docs/API.md) – Public API reference  
- [CONFIG.md](docs/CONFIG.md) – Configuration options (example only)  
- [OCR.md](docs/OCR.md) – PDF OCR processing guide  
- [SKU_QR_EXAMPLES.md](docs/SKU_QR_EXAMPLES.md) – SKU & QR code generation samples

Explore `examples/` for template configuration files.

---

## 🔐 Security & Licensing

- All real secrets, API keys, and internal business data are **excluded** from the public repo.
- Proprietary license – see [LICENSE](LICENSE)
- Dual-repo architecture keeps customer and production data safe and private.
- Questions about security or reuse? Contact iSystem Development.

---

## 🤝 Support & Contact

**Developer:** iSystem Development  
**Client:** GSL Power Ltd  
**Contact:** administrator@gslpower.io  
**Repo (private production):** [smart-inventory-builder-private](https://github.com/iSystemDevelopment/smart-inventory-builder-private)

---

## 🏆 Credits

- Built for: GSL Power Ltd (Stage Lighting, Dimmers, Power Distribution, Electronics Repair)
- Developed by: iSystem Development
- Technologies: Google Apps Script, Google Vision API v3, QuickBooks API, BrowseAI, PrintNode, GitHub Actions

---

## 📄 Disclaimer

This repository is for demonstration, technical review, and portfolio purposes only.  
Deployment, production use, or adaptation requires a proprietary license from iSystem Development.

---

*Thank you for visiting Smart-Inventory-Builder’s public showcase! For more details on architecture and workflows, see the docs folder or contact the developer team.*
