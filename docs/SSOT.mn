# SSOT: Dual-Repository Architecture Guide

**Single Source of Truth (SSOT) workflow for Smart-Inventory-Builder**  
**Developer:** iSystem Development  
**Client:** GSL Power Ltd

---

## Table of Contents

1. [Core Architecture](#1-core-architecture)
2. [Repository Setup](#2-repository-setup)
3. [Sanitization Process](#3-sanitization-process)
4. [Sanitizer Script](#4-sanitizer-script-nodejs)
5. [GitHub Actions Workflow](#5-github-actions-workflow)
6. [PAT Configuration](#6-setting-up-public-repository-pat)
7. [Full Example](#7-full-stack-sanitization-example)
8. [Best Practices](#8-best-practices)

---

## 1. Core Architecture

The **private repository** is the Single Source of Truth. The **public repository** is a build artifact with sanitized code and separate git history.

### Architecture Principles

| Aspect | Private Repo (SSOT) | Public Repo (Portfolio) |
|:---|:---|:---|
| **Purpose** | Production code | Portfolio showcase |
| **API Keys** | ✅ Real credentials | ❌ `PLACEHOLDER` values |
| **QuickBooks Config** | Real Client ID/Secret | `YOUR_CLIENT_ID_HERE` |
| **Vision API Credentials** | Service Account JSON | Example structure |
| **BrowseAI Keys** | Production API key | `BROWSEAI_API_KEY_PLACEHOLDER` |
| **PrintNode Config** | Actual API key | `PRINTNODE_API_KEY_PLACEHOLDER` |
| **Script IDs** | Real Google Script IDs | Generic examples |
| **Email Addresses** | `@gslpower.io` emails | `example@example.com` |
| **Deployment Scripts** | Full `clasp` setup | No deployment |
| **GitHub Actions** | CI/CD + Sanitizer | None |
| **Issue Tracking** | Production bugs | Portfolio inquiries only |
| **Documentation** | Internal procedures | Public-facing guides |
| **Git History** | Complete development | Auto-generated clean history |

---

## 2. Repository Setup

### Private Repository (SSOT)
```
https://github.com/iSystemDevelopment/smart-inventory-builder-private
```

**Purpose:**  
- Source of truth for all code
- Contains production credentials
- Full deployment capabilities
- Internal documentation
- Complete git history

**Access:**  
- Private repository
- Access limited to iSystem Development team
- Contains sensitive GSL Power Ltd data

### Public Repository (Portfolio)
```
https://github.com/iSystemDevelopment/smart-inventory-builder
```

**Purpose:**  
- Sanitized code for portfolio/showcase
- Public-facing documentation
- Example configurations only
- No deployment capabilities

**Access:**  
- Public repository
- Safe for external viewing
- No sensitive data

---

## 3. Sanitization Process

### Workflow Diagram

```mermaid
graph TB
    A[Push to Private Repo] --> B[GitHub Actions Triggered]
    B --> C[Run Sanitization Script]
    C --> D[Detect Sensitive Patterns]
    D --> E[Remove/Replace Secrets]
    E --> F[Process Marker Comments]
    F --> G[Clone Public Repo]
    G --> H[Rsync Sanitized Code]
    H --> I[Commit to Public Repo]
    I --> J[Push with ci skip]
    
    style A fill:#e1f5ff
    style J fill:#d4edda
```

### Sanitization Rules

#### 1. Comment Markers

Use these markers to flag sensitive code:

```javascript
// Single-line marker
// SANITIZE
const QUICKBOOKS_CLIENT_ID = "ABchvYYWKU0YiPvgMy1zlohW0QLRC3G8qBemN8iKL7iSPDLbH6";

// Block marker
// SANITIZE:START
const QB_CONFIG = {
  clientId: 'ABchvYYWKU0YiPvgMy1zlohW0QLRC3G8qBemN8iKL7iSPDLbH6',
  clientSecret: 'j0LQynVqPZDd9LTJcz3ZfXqWt2l9PMHhzOWThU0I',
  redirectUri: 'https://script.google.com/macros/d/AKfycbxYZ123.../usercallback'
};
// SANITIZE:END

// Line marker
const BROWSEAI_KEY = "browseai:sk-prod-abc123xyz789"; // SANITIZE
```

**Output after sanitization:**

```javascript
// [SANITIZED]

// [SANITIZED BLOCK REMOVED]

const BROWSEAI_KEY_PLACEHOLDER = "REDACTED"; // [SANITIZED]
```

#### 2. Automatic Pattern Detection

Regex patterns automatically detect and replace:

**API Keys:**
```javascript
/(api[_-]?key|apikey)\s*[=:]\s*["'`][a-zA-Z0-9\-_:]+["'`]/gi
```

**OAuth Credentials:**
```javascript
/(client[_-]?id|client[_-]?secret)\s*[=:]\s*["'`][a-zA-Z0-9\-_]+["'`]/gi
```

**Google Script URLs:**
```javascript
/https:\/\/script\.google\.com\/macros\/d\/[a-zA-Z0-9\-_]+/g
```

**Email Addresses:**
```javascript
/[a-zA-Z0-9._%+-]+@gslpower\.io/g
```

**Service Account Private Keys:**
```javascript
/"private_key":\s*"-----BEGIN PRIVATE KEY-----[^"]+-----END PRIVATE KEY-----"/g
```

**Bearer Tokens:**
```javascript
/[bB]earer\s+([a-zA-Z0-9\-_:.]+)/g
```

#### 3. File-Specific Rules

**Complete Replacement:**
- `config/config.gs` → Replace with `config/config.example.gs`
- `.clasp.json` → Replace with `.clasp.example.json`
- `config/service-account.json` → Replace with example structure

**Always Exclude:**
- `.env` files
- `secrets/` directory
- `*.private.gs` files
- `.credentials/` directory
- `tests/` directory (optional)

---

## 4. Sanitizer Script (Node.js)

Create `scripts/sanitize.js` in your **private repository**:

```javascript
#!/usr/bin/env node
/**
 * Smart-Inventory-Builder Sanitization Script
 * Developer: iSystem Development
 * Client: GSL Power Ltd
 */

const fs = require('fs');
const path = require('path');

// ===== CONFIGURATION =====

const SOURCE_DIR = 'src';
const DEST_DIR = '../smart-inventory-builder/src';

const SANITIZE_MARKER = '// SANITIZE';
const SANITIZE_BLOCK_START = '// SANITIZE:START';
const SANITIZE_BLOCK_END = '// SANITIZE:END';

// Patterns to detect and sanitize
const EXCLUDE_PATTERNS = [
  // API Keys
  /(api[_-]?key|apikey|api_secret)\s*[=:]\s*["'`]([a-zA-Z0-9\-_:]+)["'`]/gi,
  
  // OAuth Credentials
  /(client[_-]?id|clientid)\s*[=:]\s*["'`]([a-zA-Z0-9\-_]+)["'`]/gi,
  /(client[_-]?secret|clientsecret)\s*[=:]\s*["'`]([a-zA-Z0-9\-_]+)["'`]/gi,
  
  // Google Script URLs and IDs
  /https:\/\/script\.google\.com\/macros\/d\/([a-zA-Z0-9\-_]+)/g,
  /(script[_-]?id)\s*[=:]\s*["'`]([a-zA-Z0-9\-_]+)["'`]/gi,
  
  // GSL Power Ltd emails
  /([a-zA-Z0-9._%+-]+)@gslpower\.io/g,
  
  // Service Account Keys
  /"private_key":\s*"(-----BEGIN PRIVATE KEY-----[\s\S]*?-----END PRIVATE KEY-----

)"/g,
  
  // Bearer Tokens
  /[bB]earer\s+([a-zA-Z0-9\-_:.]+)/g,
  
  // QuickBooks-specific patterns
  /realmId["\s:=]+["'](\d+)["']/gi,
  
  // BrowseAI patterns
  /browseai:sk-[a-z]+-[a-zA-Z0-9]+/g,
  
  // PrintNode patterns
  /printnode[_-]?api[_-]?key\s*[=:]\s*["'`]([a-zA-Z0-9\-_]+)["'`]/gi,
  
  // Database Connection Strings
  /mongodb(\+srv)?:\/\/[^"'\s]+/g,
  /postgresql:\/\/[^"'\s]+/g,
  
  // Spreadsheet IDs
  /spreadsheet[_-]?id\s*[=:]\s*["'`]([a-zA-Z0-9\-_]+)["'`]/gi
];

// Files to completely replace with examples
const REPLACE_FILES = {
  'config/config.gs': 'config/config.example.gs',
  '.clasp.json': '.clasp.example.json',
  'config/service-account.json': 'config/service-account.example.json',
  '.env': '.env.example'
};

// Directories to exclude
const EXCLUDE_DIRS = [
  'node_modules',
  '.git',
  'secrets',
  '.credentials',
  'tests',
  '.clasp-cache'
];

// File extensions to process
const PROCESS_EXTENSIONS = [
  '.js', '.ts', '.gs', '.json', '.yaml', '.yml',
  '.env', '.md', '.txt', '.html', '.css'
];

// ===== SANITIZATION FUNCTIONS =====

/**
 * Sanitize a single file
 */
function sanitizeFile(srcPath, dstPath) {
  let content = fs.readFileSync(srcPath, 'utf8');
  let changed = false;
  let lines = content.split('\n');
  let result = [];
  let inSanitizeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle block start marker
    if (line.includes(SANITIZE_BLOCK_START)) {
      inSanitizeBlock = true;
      result.push('// [SANITIZED BLOCK REMOVED]');
      changed = true;
      continue;
    }

    // Handle block end marker
    if (line.includes(SANITIZE_BLOCK_END)) {
      inSanitizeBlock = false;
      continue;
    }

    // Skip lines inside sanitize block
    if (inSanitizeBlock) {
      changed = true;
      continue;
    }

    // Handle single-line marker
    if (line.includes(SANITIZE_MARKER)) {
      result.push('// [SANITIZED]');
      changed = true;
      continue;
    }

    // Apply regex patterns
    let processedLine = line;
    let lineChanged = false;

    for (const pattern of EXCLUDE_PATTERNS) {
      const regex = new RegExp(pattern);
      if (regex.test(processedLine)) {
        const match = processedLine.match(regex);
        if (match) {
          // Extract key name for placeholder
          const keyName = match[1] ? match[1].toUpperCase().replace(/[^A-Z0-9_]/g, '_') : 'SECRET';
          
          // Replace with placeholder
          if (processedLine.includes('=')) {
            processedLine = processedLine.replace(
              regex,
              `${keyName}_PLACEHOLDER = "REDACTED"`
            );
          } else {
            processedLine = processedLine.replace(regex, `${keyName}_PLACEHOLDER`);
          }
          
          lineChanged = true;
          changed = true;
        }
      }
    }

    result.push(processedLine);
  }

  // Ensure destination directory exists
  const dir = path.dirname(dstPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write sanitized content
  fs.writeFileSync(dstPath, result.join('\n'), 'utf8');

  if (changed) {
    console.log(`✓ Sanitized: ${srcPath}`);
  }

  return changed;
}

/**
 * Process directory recursively
 */
function processDirectory(srcDir, dstDir) {
  if (!fs.existsSync(srcDir)) {
    console.error(`❌ Source directory not found: ${srcDir}`);
    return;
  }

  const items = fs.readdirSync(srcDir);

  for (const item of items) {
    const srcPath = path.join(srcDir, item);
    const dstPath = path.join(dstDir, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      // Skip excluded directories
      if (EXCLUDE_DIRS.includes(item)) {
        console.log(`⊘ Skipping directory: ${srcPath}`);
        continue;
      }
      processDirectory(srcPath, dstPath);
    } else {
      const ext = path.extname(item);
      const relPath = path.relative(SOURCE_DIR, srcPath);

      // Check if file should be replaced with example
      if (REPLACE_FILES[relPath]) {
        const examplePath = path.join(
          path.dirname(srcPath),
          REPLACE_FILES[relPath]
        );
        
        if (fs.existsSync(examplePath)) {
          const dir = path.dirname(dstPath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.copyFileSync(examplePath, dstPath);
          console.log(`⇄ Replaced: ${relPath} → ${REPLACE_FILES[relPath]}`);
        } else {
          console.warn(`⚠ Example file not found: ${examplePath}`);
        }
        continue;
      }

      // Process files with specified extensions
      if (PROCESS_EXTENSIONS.includes(ext)) {
        sanitizeFile(srcPath, dstPath);
      } else {
        // Copy other files as-is
        const dir = path.dirname(dstPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.copyFileSync(srcPath, dstPath);
        console.log(`→ Copied: ${srcPath}`);
      }
    }
  }
}

/**
 * Main execution
 */
function main() {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║  Smart-Inventory-Builder Sanitization Script         ║');
  console.log('║  Developer: iSystem Development                      ║');
  console.log('║  Client: GSL Power Ltd                               ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');
  
  console.log(`📁 Source:      ${path.resolve(SOURCE_DIR)}`);
  console.log(`📁 Destination: ${path.resolve(DEST_DIR)}\n`);

  // Check if source exists
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Ensure destination exists
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
    console.log(`✓ Created destination directory\n`);
  }

  console.log('🔒 Starting sanitization process...\n');

  // Process all files
  processDirectory(SOURCE_DIR, DEST_DIR);

  console.log('\n✅ Sanitization complete!');
  console.log('📋 Next steps:');
  console.log('   1. Review sanitized files in public repo');
  console.log('   2. Verify all secrets are replaced');
  console.log('   3. Commit and push to public repository\n');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { sanitizeFile, processDirectory };
```

Create `scripts/package.json`:

```json
{
  "name": "smart-inventory-sanitizer",
  "version": "1.0.0",
  "description": "Sanitization script for Smart-Inventory-Builder",
  "main": "sanitize.js",
  "scripts": {
    "sanitize": "node sanitize.js",
    "test": "echo \"No tests configured\" && exit 0"
  },
  "author": "iSystem Development",
  "license": "UNLICENSED",
  "private": true
}
```

---

## 5. GitHub Actions Workflow

Create `.github/workflows/sanitize-and-sync.yml` in your **private repository**:

```yaml
name: Sanitize and Sync to Public Portfolio

on:
  push:
    branches: [main]
    paths:
      - 'src/**'
      - 'config/**'
      - 'scripts/**'
  workflow_dispatch: # Allow manual trigger

env:
  PUBLIC_REPO: 'iSystemDevelopment/smart-inventory-builder'
  PRIVATE_REPO: 'iSystemDevelopment/smart-inventory-builder-private'

jobs:
  sanitize-and-sync:
    runs-on: ubuntu-latest
    
    steps:
      - name: 📥 Checkout Private Repository
        uses: actions/checkout@v4
        with:
          persist-credentials: false
          fetch-depth: 0

      - name: 🟢 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'

      - name: 📦 Install Dependencies
        run: |
          cd scripts
          if [ -f package.json ]; then
            npm install
          fi

      - name: 🔒 Run Sanitization Script
        run: |
          echo "Starting sanitization process..."
          node scripts/sanitize.js
          echo "✅ Sanitization complete"

      - name: ⚙️ Configure Git
        run: |
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git config --global user.name "iSystem Automation Bot"

      - name: 📥 Clone Public Repository
        env:
          PUBLIC_REPO_PAT: ${{ secrets.PUBLIC_REPO_PAT }}
        run: |
          echo "Cloning public repository..."
          git clone https://x-access-token:${PUBLIC_REPO_PAT}@github.com/${PUBLIC_REPO}.git public-repo
          echo "✅ Public repository cloned"

      - name: 🔄 Sync Sanitized Code
        run: |
          echo "Syncing sanitized code to public repository..."
          
          # Create README for public repo if it doesn't exist
          if [ ! -f public-repo/README.md ]; then
            cat > public-repo/README.md << 'EOF'
# Smart-Inventory-Builder

**Sanitized portfolio version - Developed by iSystem Development for GSL Power Ltd**

⚠️ **Notice:** This is an automatically sanitized version of the private production repository. All sensitive credentials and proprietary information have been removed or replaced with placeholders.

## About

Smart-Inventory-Builder is a comprehensive inventory management system built on Google Apps Script with:
- QuickBooks integration
- PDF invoice OCR (Google Vision API v3)
- BrowseAI price monitoring
- QR code generation for SKU labels
- Automated workflows

**Developer:** iSystem Development  
**Client:** GSL Power Ltd  
**Industry:** Stage Lighting, Power Distribution, Electronics Repair

## Repository Structure

This public repository contains sanitized source code for portfolio purposes. For production deployment or actual credentials, refer to the private repository.

## Documentation

- [Setup Guide](docs/SETUP.md)
- [API Reference](docs/API.md)
- [Configuration](docs/CONFIG.md)

## Security

All API keys, OAuth credentials, and sensitive data have been sanitized in this public version.

---

**Last Updated:** $(date '+%Y-%m-%d %H:%M UTC')  
**Private Repo:** https://github.com/${PRIVATE_REPO}  
**Public Repo:** https://github.com/${PUBLIC_REPO}
EOF
          fi
          
          # Sync sanitized code using rsync
          # --delete removes files in public that don't exist in private (sanitized output)
          rsync -av --delete ../smart-inventory-builder/src/ public-repo/src/
          
          # Copy documentation
          if [ -d docs ]; then
            rsync -av --delete docs/ public-repo/docs/
          fi
          
          cd public-repo
          
          # Check if there are changes
          if [[ -n $(git status --porcelain) ]]; then
            echo "📝 Changes detected, committing..."
            git add .
            git commit -m "🔄 Auto-sync from private SSOT [$(date '+%Y-%m-%d %H:%M')] [ci skip]" \
                      -m "Sanitized and synchronized from private repository" \
                      -m "Repository: ${PRIVATE_REPO}" \
                      -m "Commit: ${GITHUB_SHA:0:7}"
            git push origin main
            echo "✅ Public repository updated successfully"
          else
            echo "✓ No changes detected, skipping commit"
          fi

      - name: 📊 Generate Summary
        if: always()
        run: |
          echo "## 🔒 Sanitization Summary" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "- **Private Repository:** \`${PRIVATE_REPO}\`" >> $GITHUB_STEP_SUMMARY
          echo "- **Public Repository:** \`${PUBLIC_REPO}\`" >> $GITHUB_STEP_SUMMARY
          echo "- **Trigger:** ${GITHUB_EVENT_NAME}" >> $GITHUB_STEP_SUMMARY
          echo "- **Commit:** \`${GITHUB_SHA:0:7}\`" >> $GITHUB_STEP_SUMMARY
          echo "- **Status:** ✅ Complete" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "### Files Processed" >> $GITHUB_STEP_SUMMARY
          echo "\`\`\`" >> $GITHUB_STEP_SUMMARY
          find src -type f | wc -l | xargs echo "Total files:" >> $GITHUB_STEP_SUMMARY
          echo "\`\`\`" >> $GITHUB_STEP_SUMMARY

      - name: 🔔 Notify on Failure
        if: failure()
        run: |
          echo "❌ Sanitization workflow failed!" >> $GITHUB_STEP_SUMMARY
          echo "Please check the logs and fix any issues." >> $GITHUB_STEP_SUMMARY
```

---

## 6. Setting Up Public Repository PAT

### Create Personal Access Token (PAT)

1. **Navigate to GitHub Settings:**
   - Click your profile picture → **Settings**
   - Scroll to **Developer settings** → **Personal access tokens** → **Tokens (classic)**

2. **Generate New Token:**
   - Click **Generate new token (classic)**
   - **Note:** `Smart-Inventory-Builder Public Sync`
   - **Expiration:** 90 days (or your preference)
   - **Select scopes:**
     - ☑️ **repo** (Full control of private repositories)
       - repo:status
       - repo_deployment
       - public_repo
       - repo:invite
       - security_events

3. **Generate and Copy:**
   - Click **Generate token**
   - **Copy the token immediately** (you won't see it again!)

### Add Secret to Private Repository

1. **Go to Private Repository:**
   ```
   https://github.com/iSystemDevelopment/smart-inventory-builder-private
   ```

2. **Navigate to Secrets:**
   - Click **Settings** → **Secrets and variables** → **Actions**

3. **Add New Secret:**
   - Click **New repository secret**
   - **Name:** `PUBLIC_REPO_PAT`
   - **Secret:** Paste the token you copied
   - Click **Add secret**

### Verify Configuration

Test the workflow:

```bash
# In your private repository
git add .
git commit -m "test: verify sanitization workflow"
git push origin main

# Check GitHub Actions tab for workflow run
```

---

## 7. Full-Stack Sanitization Example

### Private Repository (`smart-inventory-builder-private`)

#### `src/config/config.gs` (PRIVATE - Contains Real Credentials)

```javascript
/**
 * Smart-Inventory-Builder Configuration
 * Developer: iSystem Development
 * Client: GSL Power Ltd
 * 
 * ⚠️ PRIVATE - Contains production credentials
 */

// SANITIZE:START
const QB_CONFIG = {
  clientId: 'ABchvYYWKU0YiPvgMy1zlohW0QLRC3G8qBemN8iKL7iSPDLbH6',
  clientSecret: 'j0LQynVqPZDd9LTJcz3ZfXqWt2l9PMHhzOWThU0I',
  redirectUri: 'https://script.google.com/macros/d/AKfycbxYZ123.../usercallback',
  environment: 'production',
  companyId: '123456789012345'
};
// SANITIZE:END

// SANITIZE
const BROWSEAI_API_KEY = 'browseai:sk-prod-abc123xyz789';

// SANITIZE
const PRINTNODE_API_KEY = 'printnode-api-key-production-12345';

// SANITIZE
const SPREADSHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';

// SANITIZE:START
const VISION_API_CONFIG = {
  projectId: 'gsl-power-inventory-prod',
  serviceAccountEmail: 'vision-api@gsl-power-inventory-prod.iam.gserviceaccount.com',
  privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAA...\n-----END PRIVATE KEY-----\n'
};
// SANITIZE:END

// SANITIZE
const ADMIN_EMAIL = 'administrator@gslpower.io';

const CONFIG = {
  sheetNames: {
    entry: 'DB_ENTRY',
    inventory: 'DB_INVENTORY',
    setup: 'Setup',
    errorLog: 'Error Log'
  },
  skuPrefix: 'SKU-',
  skuLength: 6
};
```

### Public Repository (`smart-inventory-builder`)

#### `src/config/config.gs` (PUBLIC - Sanitized)

```javascript
/**
 * Smart-Inventory-Builder Configuration
 * Developer: iSystem Development
 * Client: GSL Power Ltd
 * 
 * ⚠️ PUBLIC PORTFOLIO VERSION - All credentials sanitized
 */

// [SANITIZED BLOCK REMOVED]

// [SANITIZED]

// [SANITIZED]

// [SANITIZED]

// [SANITIZED BLOCK REMOVED]

// [SANITIZED]

const CONFIG = {
  sheetNames: {
    entry: 'DB_ENTRY',
    inventory: 'DB_INVENTORY',
    setup: 'Setup',
    errorLog: 'Error Log'
  },
  skuPrefix: 'SKU-',
  skuLength: 6
};
```

---

## 8. Best Practices

### DO's ✅

1. **Use Sanitization Markers Consistently**
   ```javascript
   // SANITIZE
   const SECRET = "production-value";
   ```

2. **Store All Secrets in Config Files**
   - Keep credentials in `config/config.gs`
   - Never hardcode in business logic

3. **Use Example Files**
   - Maintain `.example` versions for all config files
   - Document placeholder structure

4. **Test Sanitization Locally**
   ```bash
   node scripts/sanitize.js
   cd ../smart-inventory-builder
   git diff # Review changes
   ```

5. **Review Before Public Push**
   - Always verify sanitized output
   - Check for accidentally exposed secrets

6. **Keep git Histories Separate**
   - Never merge public repo back to private
   - Maintain clean one-way sync

### DON'Ts ❌

1. **Never Commit Secrets to Public Repo**
   - Always sanitize before public push
   - Use automated workflows

2. **Don't Share Production Credentials**
   - Never include in documentation
   - Never email or message

3. **Don't Use Same Names for Both Repos**
   - Clear distinction: `-private` suffix
   - Prevents accidental push to wrong repo

4. **Don't Disable Sanitization Workflow**
   - Keep automated sync active
   - Review workflow logs regularly

5. **Don't Include Customer Data**
   - No real SKUs, prices, suppliers in examples
   - Use placeholder data only

### Security Checklist

Before making repository public:

- [ ] All API keys sanitized
- [ ] No OAuth credentials exposed
- [ ] No email addresses with `@gslpower.io`
- [ ] No Google Script IDs present
- [ ] No Service Account private keys
- [ ] Example configurations only
- [ ] Documentation reviewed
- [ ] No customer data included
- [ ] `.gitignore` configured properly
- [ ] Sanitization workflow tested

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Git Workflow Best Practices](https://guides.github.com/introduction/flow/)
- [Secrets Management](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

**Document Version:** 1.0  
**Last Updated:** November 2024  
**Maintained by:** iSystem Development

**Repositories:**
- Private: https://github.com/iSystemDevelopment/smart-inventory-builder-private
- Public: https://github.com/iSystemDevelopment/smart-inventory-builder
