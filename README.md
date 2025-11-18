# Smart-Inventory-Builder

**Enterprise-grade inventory management system built by iSystem Development as a bespoke solution for GSL Power Ltd.**

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Google%20Apps%20Script-blue.svg)](https://developers.google.com/apps-script)
[![Status](https://img.shields.io/badge/status-Production%20Ready-success.svg)](https://github.com/iSystemDevelopment/smart-inventory-builder)

## 🎯 Overview

Smart-Inventory-Builder is a comprehensive inventory management solution built on Google Sheets with powerful automation capabilities including QuickBooks integration, PDF invoice OCR, price monitoring, QR code generation for SKU labeling, and dual-repository architecture.

**Built for:** GSL Power Ltd  
**Developer:** iSystem Development  
**Technology Stack:** Google Apps Script, Google Vision API v3, QuickBooks API, BrowseAI

---

## 📁 Repository Architecture

This project uses a **dual-repository SSOT (Single Source of Truth)** architecture:

- **Private Repository (SSOT):** https://github.com/iSystemDevelopment/smart-inventory-builder-private
  - Contains production code with real credentials
  - Full deployment capabilities
  - Internal documentation
  
- **Public Repository (Portfolio):** https://github.com/iSystemDevelopment/smart-inventory-builder
  - Sanitized code with placeholder values
  - Public-facing documentation
  - Automated sync from private repo

```
smart-inventory-builder/
├── private/                           # PRIVATE REPO
│   ├── src/
│   │   ├── 1_CONFIG.gs               # Master configuration
│   │   ├── core/
│   │   │   ├── database.gs           # Database operations
│   │   │   ├── duplicate-checker.gs  # Duplicate detection
│   │   │   ├── sku-generator.gs      # SKU generation
│   │   │   └── qr-generator.gs       # QR code generation
│   │   ├── integrations/
│   │   │   ├── quickbooks/
│   │   │   │   ├── auth.gs           # OAuth 2.0 authentication
│   │   │   │   ├── invoice-import.gs # Invoice processing
│   │   │   │   └── api-client.gs     # API wrapper
│   │   │   ├── browseai/
│   │   │   │   ├── price-monitor.gs  # Price monitoring
│   │   │   │   └── api-client.gs     # BrowseAI integration
│   │   │   └── printnode/
│   │   │       └── label-printer.gs  # Label printing
│   │   ├── ocr/
│   │   │   ├── vision-api.gs         # Google Vision API v3
│   │   │   ├── pdf-processor.gs      # PDF extraction
│   │   │   └── invoice-parser.gs     # Invoice data parsing
│   │   ├── ui/
│   │   │   ├── menu.gs               # Custom menu
│   │   │   ├── dialogs.gs            # UI dialogs
│   │   │   └── sidebars.gs           # Sidebar panels
│   │   └── utils/
│   │       ├── logger.gs             # Error logging
│   │       ├── validators.gs         # Data validation
│   │       └── helpers.gs            # Helper functions
│   ├── config/
│   │   ├── config.gs                 # Production config
│   │   └── config.example.gs         # Template config
│   ├── .github/workflows/
│   │   └── sanitize-and-sync.yml     # Auto-sync workflow
│   └── scripts/
│       ├── sanitize.js               # Sanitization script
│       └── deploy.sh                 # Deployment script
│
└── public/                            # PUBLIC REPO
    ├── src/                          # Sanitized source code
    ├── docs/                         # Public documentation
    └── examples/                     # Example configurations
```

---

## 🚀 Key Features

### 1. 📄 PDF Invoice OCR (Google Vision API v3)
- Automatic invoice data extraction from uploaded PDFs
- Detects supplier, invoice number, date, line items
- Supports multiple invoice formats
- Extracts SKU, description, quantity, prices
- Maps data directly to DB_ENTRY staging table

### 2. 💰 QuickBooks Integration
- OAuth 2.0 authentication with company validation
- Import invoices by URL or ID
- Direct API access to invoice data
- Real-time synchronization
- Automatic line item extraction

### 3. 📊 BrowseAI Price Monitoring
- Automated competitor price tracking
- Configurable scraping robots
- Price change detection and alerts
- Historical price tracking
- Delta percentage calculations

### 4. 📱 QR Code Generation for SKU Labels
- Automatic QR code generation for each SKU
- Brother QL-820NWB label printer integration
- PrintNode API support for remote printing
- Customizable label templates
- Batch printing capabilities

### 5. 🔍 Intelligent Duplicate Detection
- Multi-level matching: SKU, MPN, Supplier Part Number
- Fuzzy name matching for similar items
- Configurable threshold settings
- Manual review workflow for potential duplicates

### 6. 🔄 Automated Workflow
- Status-based processing (Pending → Reviewed → Approved → Added)
- Automatic SKU generation with custom prefixes
- Ref_ID assignment and tracking
- Audit trail with timestamps and user tracking

### 7. 🔐 Dual-Repository Sanitization
- Automated secret removal and replacement
- GitHub Actions-powered sync
- Clean public portfolio without credentials
- Maintains separate git histories

---

## 📊 Database Schema

### DB_ENTRY (Staging/Queue)
*(See documentation for full column list and examples.)*

### DB_INVENTORY (Master Database)
*(See documentation for full column list and examples.)*

---

## 🔧 Documentation

- **Setup Guide:** [docs/SETUP.md](docs/SETUP.md)
- **Dual-Repository Architecture:** [docs/SSOT.md](docs/SSOT.md)
- **API Reference:** [docs/API.md](docs/API.md) *(see below for template)*
- **Configuration:** [examples/config.example.gs](examples/config.example.gs)

---

## 🤝 Support

**Developer:** iSystem Development  
**Contact:** administrator@gslpower.io  
**Private Repository:** https://github.com/iSystemDevelopment/smart-inventory-builder-private

---

## 📄 License

Proprietary Software – All rights reserved.
This software is a bespoke work for GSL Power Ltd. Unauthorized distribution/modification prohibited.

---

## 🏆 Credits

**Developed by:** iSystem Development  
**Client:** GSL Power Ltd  
**Industry:** Stage Lighting, Power Distribution, Electronics Repair

**Technology Stack:**
- Google Apps Script
- Google Vision API v3
- QuickBooks Online API
- BrowseAI API
- PrintNode API
- Google Sheets
- GitHub Actions

---

**Version:** 1.0.0  
**Release Date:** November 2024  
**Status:** Production Ready

**Repositories:**
- Private (SSOT): https://github.com/iSystemDevelopment/smart-inventory-builder-private
- Public (Portfolio): https://github.com/iSystemDevelopment/smart-inventory-builder
