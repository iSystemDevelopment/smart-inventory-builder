# Smart-Inventory-Builder Configuration Guide

**This document describes key configuration options for the public (sanitized) version of Smart-Inventory-Builder.  
Never store real credentials here!**

---

## General Configuration Structure

All configuration is centralized in `src/1_CONFIG.gs` and `config.example.gs`.

### Example

```javascript
const SPREADSHEET_CONFIG = {
  spreadsheetId: 'YOUR_SPREADSHEET_ID'
};

const QB_CONFIG = {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI'
};

const VISION_API_CONFIG = {
  projectId: 'your-gcp-project-id',
  serviceAccount: {
    email: 'your-service-account@gcp-project.iam.gserviceaccount.com',
    privateKey: '---PLACEHOLDER---'
  }
};

const BROWSEAI_API_KEY = 'BROWSEAI_API_KEY_PLACEHOLDER';
const PRINTNODE_API_KEY = 'PRINTNODE_API_KEY_PLACEHOLDER';
```

---

## Key Options

- **spreadsheetId:**  
  Your Google Sheet database (DB_ENTRY and DB_INVENTORY).

- **QuickBooks OAuth:**  
  `clientId`, `clientSecret`, and `redirectUri` for API access.

- **Google Vision API:**  
  Service Account email and key for OCR processing.

- **BrowseAI API Key:**  
  Used for automated price monitoring.

- **PrintNode API Key:**  
  Used for remote label printing.

- **SKU Configuration:**  
  ```javascript
  const SKU_CONFIG = {
    prefix: 'SKU-',
    length: 6,
    startNumber: 1,
    format: 'PADDED' // or 'SEQUENTIAL'
  };
  ```

- **QR Code Configuration:**  
  ```javascript
  const QR_CONFIG = {
    size: '300x300',
    format: 'png',
    errorCorrection: 'M',
    includeLabel: true,
    labelTemplate: '{SKU_ID} - {Item_Name}'
  };
  ```

- **Duplicate Detection:**  
  ```javascript
  const DUPLICATE_CONFIG = {
    checkSKU: true,
    checkMPN: true,
    checkSupplierPartNumber: true,
    fuzzyMatchThreshold: 0.85, // 85%
    ignoreCase: true
  };
  ```

---

## Example Workflow

1. Copy `config.example.gs` as a template.
2. Fill placeholder values with your own credentials (do this **only in private repo!**).
3. For public/portfolio version, leave placeholders as-is.

---

**For details about each configuration group, see inline comments in the sanitized source code.**
