# Smart-Inventory-Builder - Example Automated Workflows

**This document describes key automated workflows used in Smart-Inventory-Builder.  
All workflow logic is implemented using Google Apps Script triggers and GitHub Actions.  
Portfolio version only - no sensitive data, safe to share.**

---

## 📅 Daily Price Monitoring Workflow

- **Trigger:** Time-based Apps Script trigger (every day, e.g. 02:00 UTC)
- **Steps:**
  1. Fetch monitored URLs from the DB_INVENTORY sheet.
  2. Call the BrowseAI API to check for price updates.
  3. Compare new prices with historical records.
  4. If price change exceeds threshold (default: 10%), log to Price_History and notify via email.
  5. Update relevant inventory fields in the sheet.

- **Key Functions:**  
  - `runPriceCheck()`  
  - `sendPriceAlertIfNeeded()`

---

## 🗓️ Weekly QuickBooks Sync Workflow

- **Trigger:** Time-based Apps Script trigger (e.g., every Monday at 09:00 UTC)
- **Steps:**
  1. Use QuickBooks API to fetch invoices from the last 7 days.
  2. Extract line items via the invoice importer.
  3. Create new entries in the DB_ENTRY sheet.
  4. Run duplicate detection for all imported lines.
  5. Set status to "Pending Review" for new entries.

- **Key Functions:**  
  - `importRecentInvoices()`  
  - `checkForDuplicates()`

---

## 📥 PDF Invoice and OCR Workflow

- **Trigger:** Manual (via custom menu or button in Google Sheet)
- **Steps:**
  1. User uploads a PDF invoice from supplier.
  2. Script calls Google Vision API for OCR.
  3. Extracts supplier, date, items, prices from PDF.
  4. Populates DB_ENTRY sheet with extracted data.
  5. Runs duplicate check and sets status.

- **Key Functions:**  
  - `uploadPDFAndExtract()`  
  - `parseInvoiceData()`

---

## 🏷️ QR Code Batch Generation Workflow

- **Trigger:** Manual (via "Generate QR Codes" menu item)
- **Steps:**
  1. User selects items from DB_INVENTORY.
  2. Script generates QR codes for each unique SKU.
  3. Stores QR image links in QR_Codes sheet.
  4. Optionally, sends print jobs via PrintNode API.
  5. Updates item with QR_ID and label status.

- **Key Functions:**  
  - `generateQRCodeForSKU()`  
  - `queueLabelPrintJob()`

---

## 🔄 Sanitization & Public Portfolio Sync Workflow (GitHub Actions)

- **Trigger:** Push to main branch in private repo (via .github/workflows/sanitize-and-sync.yml)
- **Steps:**
  1. Run the `sanitize.js` Node.js script to remove secrets/code marked with `// SANITIZE`.
  2. Replace sensitive files (config, credentials) with example versions.
  3. Rsync sanitized source and docs to public repo.
  4. Commit and push changes (with `[ci skip]` marker).
  5. Validate output for secrets using automated checks.

- **Key Files:**  
  - `.github/workflows/sanitize-and-sync.yml`  
  - `scripts/sanitize.js`

---

## ⏱️ Other Scheduled Maintenance

### Monthly: Stock Audit
- Generate low-stock report, flag items below reorder threshold, send results to management.

### Quarterly: Security & Performance Review
- Review error logs, storage quota, update documentation, optimize database formulas.

---

## 🚨 Error Logging & Alerts Workflow

- **Trigger:** On any unexpected exception in script logic.
- **Steps:**
  1. Log error details to "Error Log" sheet (function name, timestamp, user, stack trace).
  2. Optionally email administrator if error matches critical pattern.

- **Key Functions:**  
  - `logError()`  
  - `sendErrorAlert()`

---

## 🛠️ How to Customize Workflows

- Time-based triggers can be set via Apps Script dashboard (see [docs/SETUP.md](SETUP.md)).
- Integration API keys and thresholds configured in `config.example.gs` (never store real secrets here!).
- Additional workflow automation can be added by extending Apps Script or GitHub Actions.

---

**For full source logic and workflow code, see sanitized modules in `src/`.  
For more info on security/sanitization, see [docs/SSOT.md](SSOT.md).**
