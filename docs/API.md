# Smart-Inventory-Builder API Reference

*This file documents public interfaces and main functions for integration and scripting.*

## Core APIs

### Inventory Management

- **setup_initialize():** Set up and create database sheets in Google Sheet (DB_ENTRY, DB_INVENTORY, etc.)
- **generateSKU(itemData):** Generates a SKU for a new inventory item.
- **generateQRCodeForSKU(sku):** Returns a QR code URL for the given SKU.
- **moveApprovedToInventory():** Transfers reviewed items from DB_ENTRY to DB_INVENTORY.

### QuickBooks Integration

- **authorizeQuickBooks():** Launches OAuth authorization flow for your QuickBooks company.
- **importQBInvoice(invoiceId):** Imports line items from a QuickBooks invoice.

### PDF OCR

- **uploadPDFAndExtract():** Initiates Vision API OCR on uploaded PDF; parses supplier, item, and pricing info.

### Price Monitoring (BrowseAI)

- **runPriceCheck():** Initiates price check and updates historical price tracking for items.
- **setPriceChangeThreshold(threshold):** Configures delta % for alerting.

### Duplicate Detection

- **checkForDuplicates():** Runs multi-level duplicate check on staging items (SKU, MPN, supplier part number, fuzzy name matching).

## Utility/API Usage Pattern

- All apps script functions are accessible in Google Sheet → Extensions → Apps Script.
- Main integration flows are launched via custom menu (Inventory System).
- Input/output formats documented in SETUP.md and SSOT.md.

## Error Handling

- Errors are logged to the Error Log sheet (see utils/logger.gs).

## Detailed Usage

For each function, see inline documentation in the Apps Script source code (sanitized for public version).

---

*For further API or automation examples, see [docs/SETUP.md](SETUP.md) and [docs/SSOT.md](SSOT.md).*
