[SETUP.md](https://github.com/user-attachments/files/23602845/SETUP.md)
# Smart-Inventory-Builder Setup Guide

**Complete installation and deployment instructions**  
**Developer:** iSystem Development  
**Client:** GSL Power Ltd

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Repository Setup](#repository-setup)
3. [Google Cloud Configuration](#google-cloud-configuration)
4. [API Credentials](#api-credentials)
5. [Apps Script Deployment](#apps-script-deployment)
6. [Database Initialization](#database-initialization)
7. [Integration Configuration](#integration-configuration)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts

- ✅ **Google Workspace Account** (with Google Sheets access)
- ✅ **Google Cloud Project** (for Vision API)
- ✅ **GitHub Account** (for version control)
- ☐ **QuickBooks Online Account** (optional)
- ☐ **BrowseAI Account** (optional)
- ☐ **PrintNode Account** (optional)

### Required Tools

```bash
# Node.js and npm
node --version  # v18 or higher
npm --version   # v9 or higher

# Google Apps Script CLI (clasp)
npm install -g @google/clasp

# Git
git --version
```

---

## Repository Setup

### 1. Clone Private Repository

```bash
# Clone the private repository
git clone https://github.com/iSystemDevelopment/smart-inventory-builder-private.git
cd smart-inventory-builder-private

# Verify repository structure
ls -la
```

### 2. Configure Git

```bash
# Set your identity
git config user.name "Your Name"
git config user.email "your.email@gslpower.io"

# Verify configuration
git config --list
```

### 3. Install Dependencies

```bash
# Install sanitization script dependencies
cd scripts
npm install
cd ..
```

---

## Google Cloud Configuration

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Create Project**
3. Name: `gsl-power-inventory-prod`
4. Click **Create**

### 2. Enable Vision API

```bash
# Using gcloud CLI (optional)
gcloud services enable vision.googleapis.com --project=gsl-power-inventory-prod
```

Or manually:
1. Navigate to **APIs & Services** → **Library**
2. Search for "Cloud Vision API"
3. Click **Enable**

### 3. Create Service Account

1. Go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Name: `vision-api-service`
4. Description: `Service account for Vision API OCR`
5. Click **Create and Continue**
6. Grant role: **Project → Editor**
7. Click **Done**

### 4. Generate Service Account Key

1. Click on the created service account
2. Go to **Keys** tab
3. Click **Add Key** → **Create new key**
4. Choose **JSON** format
5. Click **Create**
6. **Save the JSON file securely** (you'll need it later)

---

## API Credentials

### QuickBooks Configuration

1. **Create Intuit Developer Account**
   - Go to [developer.intuit.com](https://developer.intuit.com/)
   - Sign in or create account

2. **Create App**
   - Dashboard → **Create an app**
   - App type: **QuickBooks Online**
   - App name: `GSL-Inventory-System`

3. **Get Credentials**
   - Go to **Keys & OAuth**
   - Copy **Client ID**
   - Copy **Client Secret**
   - Add **Redirect URI**: `https://script.google.com/macros/d/{SCRIPT_ID}/usercallback`

4. **Test Connection**
   - Use **Sandbox** environment first
   - Test with sample company

### BrowseAI Configuration

1. **Sign Up**
   - Go to [browse.ai](https://www.browse.ai/)
   - Create account

2. **Create Robot**
   - Create new robot for price scraping
   - Configure selectors for your target websites
   - Test robot

3. **Get API Key**
   - Go to **Integrations** → **API**
   - Copy your API key

### PrintNode Configuration

1. **Sign Up**
   - Go to [printnode.com](https://www.printnode.com/)
   - Create account

2. **Add Printer**
   - Install PrintNode client on computer connected to printer
   - Add Brother QL-820NWB printer
   - Note the **Printer ID**

3. **Get API Key**
   - Go to **Account** → **API**
   - Create new API key
   - Copy key

---

## Apps Script Deployment

### 1. Enable Apps Script API

```bash
# Login to Google
clasp login

# Enable Apps Script API
# Visit: https://script.google.com/home/usersettings
# Turn on: Google Apps Script API
```

### 2. Create Apps Script Project

```bash
# In your project directory
clasp create --title "Smart-Inventory-Builder" --type sheets

# This creates .clasp.json with script ID
```

### 3. Configure Project

Edit `src/1_CONFIG.gs` with your credentials:

```javascript
// IMPORTANT: Replace all placeholder values

const SPREADSHEET_CONFIG = {
  spreadsheetId: 'YOUR_SPREADSHEET_ID_HERE'  // From Google Sheet URL
};

const QB_CONFIG = {
  clientId: 'YOUR_QB_CLIENT_ID',
  clientSecret: 'YOUR_QB_CLIENT_SECRET',
  redirectUri: 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercallback'
};

const VISION_API_CONFIG = {
  projectId: 'gsl-power-inventory-prod',
  serviceAccount: {
    email: 'vision-api-service@gsl-power-inventory-prod.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n'
  }
};

const BROWSEAI_API_KEY = 'your-browseai-key';
const PRINTNODE_API_KEY = 'your-printnode-key';
```

### 4. Push Code to Apps Script

```bash
# Push all .gs files
clasp push

# Open in browser
clasp open
```

### 5. Deploy as Web App (for OAuth)

In Apps Script Editor:

1. Click **Deploy** → **New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy**
6. Copy the **Web App URL** (your redirect URI)

Update `QB_CONFIG.redirectUri` with this URL and push again:

```bash
clasp push
```

---

## Database Initialization

### 1. Create Google Sheet

1. Create new Google Sheet
2. Name it: `GSL-Inventory-Master`
3. Copy the Spreadsheet ID from URL:
   ```
   https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
   ```

### 2. Update Configuration

Update `src/1_CONFIG.gs`:

```javascript
const SPREADSHEET_CONFIG = {
  spreadsheetId: 'YOUR_COPIED_SPREADSHEET_ID'
};
```

Push changes:

```bash
clasp push
```

### 3. Initialize Database

In Apps Script Editor:

1. Go to your Google Sheet
2. You should see new menu: **Inventory System**
3. Click **Inventory System** → **Setup** → **Initialize Database**
4. Authorize the script when prompted
5. Wait for initialization to complete

This creates:
- DB_ENTRY sheet
- DB_INVENTORY sheet
- Setup sheet
- Error Log sheet
- Supplier Mappings sheet
- QR_Codes sheet
- Price_History sheet

---

## Integration Configuration

### QuickBooks Authorization

1. In your Google Sheet
2. Click **Inventory System** → **QuickBooks** → **Authorize**
3. Follow OAuth flow
4. Select your company
5. Verify connection

### Test Imports

```javascript
// In Apps Script Editor, run these test functions:

function testQuickBooksConnection() {
  const result = testQBConnection();
  Logger.log(result);
}

function testVisionAPI() {
  // Upload test PDF first
  const result = testVisionAPIConnection();
  Logger.log(result);
}

function testQRGeneration() {
  const sku = 'SKU-000001';
  const result = generateQRCodeForSKU(sku);
  Logger.log(result);
}
```

---

## Testing

### Manual Testing Checklist

- [ ] Database initialization successful
- [ ] Custom menu appears in Google Sheet
- [ ] QuickBooks authorization works
- [ ] Can import test invoice from QuickBooks
- [ ] PDF OCR extracts data correctly
- [ ] SKU generation works
- [ ] Duplicate detection works
- [ ] QR codes generate successfully
- [ ] Items can be moved from DB_ENTRY to DB_INVENTORY
- [ ] Error logging works

### Test Data

Create test entries in DB_ENTRY:

```
Item_Name: "Test Screw M6x20"
Supplier: "Test Supplier Ltd"
Purchase_Price_excl_VAT: 10.00
VAT_Rate: 20
Category: "Screws"
```

Run processes:

1. Generate SKU
2. Check for duplicates
3. Generate QR code
4. Approve and move to inventory

---

## Troubleshooting

### Common Issues

#### "Authorization required"
- Re-authorize the script
- Check OAuth scopes in Apps Script
- Verify redirect URI matches

#### "Spreadsheet not found"
- Verify Spreadsheet ID is correct
- Check sheet name spelling
- Ensure sharing permissions

#### "Vision API error"
- Verify API is enabled in GCP
- Check service account credentials
- Ensure JSON key is valid

#### "QuickBooks connection failed"
- Verify Client ID and Secret
- Check redirect URI
- Test in sandbox first

#### "Rate limit exceeded"
- Add delays between API calls
- Reduce batch sizes
- Check API quotas

### Error Logs

Check the **Error Log** sheet for detailed error messages.

### Support

For issues specific to GSL Power Ltd:
- **Developer:** iSystem Development
- **Email:** administrator@gslpower.io
- **Repository:** https://github.com/iSystemDevelopment/smart-inventory-builder-private

---

## Next Steps

After successful setup:

1. **Import Historical Data**
   - Export from existing system
   - Format as CSV
   - Import to DB_ENTRY
   - Review and approve

2. **Configure Automation**
   - Set up time-based triggers
   - Configure email notifications
   - Test automated workflows

3. **Train Users**
   - Demo the system
   - Provide user guide
   - Define workflows

4. **Go Live**
   - Switch to production QuickBooks
   - Enable real-time price monitoring
   - Start QR code labeling

5. **Setup Public Repository**
   - Configure GitHub Actions
   - Add PUBLIC_REPO_PAT secret
   - Test sanitization workflow

---

## Maintenance

### Regular Tasks

**Daily:**
- Monitor Error Log sheet
- Check email notifications

**Weekly:**
- Review duplicate alerts
- Verify QuickBooks sync

**Monthly:**
- Audit stock levels
- Review price changes
- Update supplier mappings

---

**Document Version:** 1.0  
**Last Updated:** November 2024  
**Status:** Production Ready ✅
