# Smart-Inventory-Builder - OCR Guide (PDF Invoice Extraction)

**How PDF invoices are processed and mapped with Google Vision API v3.  
No credentials or private PDFs should be shared in this public guide.**

---

## Overview

- System accepts PDF invoices from suppliers.
- Uses Google Vision API to extract:
  - Supplier name
  - Invoice number/date
  - Line items
  - SKU, part number, quantity, prices
- Data is mapped directly to the staging table (DB_ENTRY).

---

## Steps for OCR Processing

1. **Upload PDF Invoice**
   - User uploads a PDF using the custom menu.

2. **Invoke Vision API**
   - Script submits the file to Google Vision API.

3. **Parse Results**
   - Extracted text is parsed for item details.

4. **Populate DB_ENTRY**
   - Extracted items, prices, and suppliers are inserted into staging table.

5. **Run Duplicate Detection**
   - System checks if new items already exist in the database.

---

## Sample OCR Flow

```javascript
function uploadPDFAndExtract() {
  // 1. User selects/upload PDF file
  // 2. Calls Vision API for OCR processing
  // 3. Parses document text and line items
  // 4. Populates DB_ENTRY sheet
}
```

### Example Output Mapping

| Field                | Example Value            |
|----------------------|-------------------------|
| Supplier             | "Acme Parts Ltd"        |
| Invoice Number       | "INV-2024-0042"         |
| Invoice Date         | "2024-11-15"            |
| Item Name            | "Stage Dimmer Model X"  |
| Quantity             | 4                       |
| Unit Price           | 132.50                  |
| SKU                  | "SKU-001234"            |
| MPN                  | "DMR-X-2024"            |

---

## Common Error Checks

- Validate supplier match.
- Flag unrecognized PDF formats.
- Check for missing data (e.g. price or SKU).

---

**For technical details, see: `src/ocr/vision-api.gs` and inline code documentation.**
