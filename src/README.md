# 📁 Smart-Inventory-Builder – `src/` Directory Guide (Public Portfolio)

Welcome to the `src/` directory of Smart-Inventory-Builder’s **public portfolio repository**.

---

## What Is This?

This folder contains the *sanitized* source code generated automatically from the private production repository using our custom sanitization workflow.

All files here:
- **Do NOT contain any real credentials, API keys, or sensitive information**
- Have code blocks and values replaced or removed based on `// SANITIZE` markers and sanitizer patterns
- Are safe for sharing, demonstration, code review, and portfolio purposes
- Represent the actual system logic *minus* deployment secrets

---

## How Does Sanitization Work?

When iSystem Development makes updates to the private repository, a GitHub Actions workflow:
1. **Runs the sanitizer script:**  
   - Scans the source code for `// SANITIZE` comments, block tags, and common sensitive patterns (API keys, OAuth creds, emails, service accounts, etc.)
   - Replaces secrets or config values with placeholders (e.g., `YOUR_CLIENT_ID_HERE`)
   - Removes entire code blocks where required
2. **Copies sanitized files here:**  
   - Updates the content of this `src/` directory in the public repository (maintaining a clean separation from production)
   - Ensures no real credentials or business data ever appear in public
3. **Syncs documentation and configuration templates:**  
   - Ensures only example config files, never production ones, are present

**Read more on this process in** [`../docs/SSOT.md`](../docs/SSOT.md) and [`../docs/WORKFLOWS.md`](../docs/WORKFLOWS.md).

---

## Why Is This Useful?

- **Security:** You can confidently review code without any risk of exposing sensitive info.
- **Transparency:** See the system’s logic, structure, and approach as used in real operations.
- **Portfolio:** Lets GSL Power Ltd and iSystem Development showcase the capabilities and engineering quality.
- **Educational:** Great resource for learning about Apps Script-based enterprise automation, secure code publication, and workflow integration.

---

## Code Structure Overview

Typical modules and folders in `src/`:

```
src/
├── 1_CONFIG.gs               # Sanitized configuration file (placeholders only)
├── core/
│   ├── qr-generator.gs       # QR code logic (sanitized)
│   ├── sku-generator.gs      # SKU generation logic
│   ├── duplicate-checker.gs  # Duplicate detection routines
│   └── database.gs           # Inventory database operations
├── integrations/
│   ├── quickbooks/           # QuickBooks API integration (sanitized)
│   ├── browseai/             # Price monitoring
│   ├── printnode/            # Label printing
│   └── vision-api/           # PDF OCR routines
├── ui/
│   ├── menu.gs               # Custom menu code
│   └── dialogs.gs            # UI and dialog handlers
└── utils/
    ├── logger.gs             # Error logging (no actual logs here)
    └── validators.gs         # Data validation helpers
```

All files follow the rule:  
**“No secrets, no production credentials, no sensitive user or supplier data.”**

---

## What’s NOT Included Here?

- Real API keys, private OAuth credentials, spreadsheet IDs, service account JSONs
- Proprietary business data, customer info, or supplier contracts
- Internal error logs, database backups, or audit trails

**For actual deployment, integrations, and business workflows, see the private SSOT repository.**

---

## Customizing for Your Own Portfolio

You’re encouraged to inspect, fork, or adapt the code for learning or demonstration, but:
- Always set your own credentials in a *private*, secured setup
- Do not attempt to run or deploy directly from this repo without proper reconfiguration

---

## Questions or Feedback?

Reach out via the repository’s Contacts or [issues page](https://github.com/iSystemDevelopment/smart-inventory-builder/issues).  
We’re happy to help explain workflows, architecture, or answer security questions.

---

*Smart-Inventory-Builder is a proud example of secure, scalable, enterprise-grade automation for Google Sheets and Apps Script, delivered by iSystem Development for GSL Power Ltd.*

