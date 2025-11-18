/**
 * ═══════════════════════════════════════════════════════════════════════
 * Smart-Inventory-Builder - Configuration Example
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Developer: iSystem Development
 * Client: GSL Power Ltd
 * 
 * ⚠️ This is an EXAMPLE configuration file for the public portfolio.
 * Replace all placeholder values with your actual credentials.
 * 
 * NEVER commit real credentials to public repositories!
 * ═══════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════
// GOOGLE SHEETS CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════

const SPREADSHEET_CONFIG = {
  spreadsheetId: 'YOUR_SPREADSHEET_ID_HERE', // Get from Sheet URL
  
  sheetNames: {
    entry: 'DB_ENTRY',
    inventory: 'DB_INVENTORY',
    setup: 'Setup',
    errorLog: 'Error Log',
    supplierMap: 'Supplier Mappings',
    qrCodes: 'QR_Codes',
    priceHistory: 'Price_History'
  }
};

// ═══════════════════════════════════════════════════════════════════════
// DATABASE HEADERS - DO NOT MODIFY
// ═══════════════════════════════════════════════════════════════════════

const DB_ENTRY_HEADERS = [
  'Ref_ID', 'SKU_ID', 'Category', 'Screws_and_Nuts_Type',
  'Screws_and_Nuts_Finish', 'Screws_and_Nuts_Head_Type',
  'Screws_and_Nuts_Thread_Size', 'Screws_and_Nuts_Lenght(mm)',
  'Screws_and_Nuts_Drive_Type', 'Item_Name', 'Description',
  'MPN_Manufacturer', 'Supplier_Part_Number', 'Unit', 'Package_Volume',
  'Purchase_Price_excl_VAT', 'VAT_Rate', 'Purchase_Price_incl_VAT',
  'Discount', 'Delivery_Cost', 'Supplier', 'Url_To_Item', 'Url_To_Images',
  'Source', 'Source_File_Link', 'Duplicate_Check', 'Status',
  'ImportDate', 'ImportedBy'
];

const DB_INVENTORY_HEADERS = [
  'Ref_ID', 'SKU_ID', 'QR_ID', 'QR_Code_URL', 'Item_Image', 'Category',
  'Screws_and_Nuts_Type', 'Screws_and_Nuts_Finish', 'Screws_and_Nuts_Head_Type',
  'Screws_and_Nuts_Thread_Size', 'Screws_and_Nuts_Lenght(mm)',
  'Screws_and_Nuts_Drive_Type', 'Item_Name', 'Colour', 'Description',
  'MPN_Manufacturer', 'Supplier_Part_Number', 'Item_LabelSticker', 'Location',
  'Brand_Related_Service_Form', 'Min_Volume_Take_Out', 'Sale_Unit',
  'Item_Stock_Type', 'Sale_Price', 'Markup', 'Reorder_Level', 'Stock_Level',
  'Unit', 'Package_Volume', 'Total_Stock_Value', 'Purchase_Price_excl_VAT',
  'VAT_Rate', 'Purchase_Price_incl_VAT', 'Discount', 'Price_CheckOut',
  'Scraper_Alert', 'Delivery_Cost', 'Supplier', 'Alternative_Supplier',
  'PO_Email_Address', 'Url_To_Item', 'Url_To_Images', 'Source', 'QBInvoice',
  'ImportDate', 'LastUpdated', 'Updated_By'
];

// Mapping configuration
const ENTRY_TO_INVENTORY_MAP = {
  'Ref_ID': 'Ref_ID',
  'SKU_ID': 'SKU_ID',
  'Category': 'Category',
  'Item_Name': 'Item_Name',
  'Description': 'Description',
  'MPN_Manufacturer': 'MPN_Manufacturer',
  'Supplier_Part_Number': 'Supplier_Part_Number',
  'Unit': 'Unit',
  'Package_Volume': 'Package_Volume',
  'Purchase_Price_excl_VAT': 'Purchase_Price_excl_VAT',
  'VAT_Rate': 'VAT_Rate',
  'Purchase_Price_incl_VAT': 'Purchase_Price_incl_VAT',
  'Supplier': 'Supplier',
  'Url_To_Item': 'Url_To_Item',
  'Source': 'Source',
  'Source_File_Link': 'QBInvoice'
};

// ═══════════════════════════════════════════════════════════════════════
// SKU & STATUS CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════

const SKU_CONFIG = {
  prefix: 'SKU-',
  length: 6,
  startNumber: 1,
  format: 'PADDED'
};

const STATUS = {
  pending: 'Pending Review',
  reviewed: 'Reviewed',
  approved: 'Approved',
  added: 'Added to Inventory',
  error: 'Error',
  duplicate: 'Possible Duplicate',
  rejected: 'Rejected'
};

// ═══════════════════════════════════════════════════════════════════════
// QUICKBOOKS CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════

const QB_CONFIG = {
  clientId: 'YOUR_QUICKBOOKS_CLIENT_ID',           // From Intuit Developer Portal
  clientSecret: 'YOUR_QUICKBOOKS_CLIENT_SECRET',   // From Intuit Developer Portal
  redirectUri: 'YOUR_APPS_SCRIPT_REDIRECT_URI',    // From clasp deployment
  environment: 'production', // or 'sandbox'
  authorizationUrl: 'https://appcenter.intuit.com/connect/oauth2',
  tokenUrl: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
  apiBaseUrl: 'https://quickbooks.api.intuit.com',
  companyId: 'YOUR_QUICKBOOKS_COMPANY_ID'
};

// ═══════════════════════════════════════════════════════════════════════
// GOOGLE VISION API CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════

const VISION_API_CONFIG = {
  projectId: 'your-gcp-project-id',
  apiEndpoint: 'https://vision.googleapis.com/v1/images:annotate',
  features: [
    { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 1 }
  ],
  serviceAccount: {
    email: 'your-service-account@your-project.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n'
  }
};

// ═══════════════════════════════════════════════════════════════════════
// BROWSEAI CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════

const BROWSEAI_API_KEY = 'YOUR_BROWSEAI_API_KEY';

const BROWSEAI_CONFIG = {
  apiEndpoint: 'https://api.browse.ai/v2',
  robotId: 'your-robot-id',
  batchSize: 10,
  sleepBetweenBatches: 2000,
  maxRetries: 3
};

// ═══════════════════════════════════════════════════════════════════════
// PRINTNODE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════

const PRINTNODE_API_KEY = 'YOUR_PRINTNODE_API_KEY';

const PRINTNODE_CONFIG = {
  apiEndpoint: 'https://api.printnode.com',
  printerId: 0, // Your printer ID from PrintNode
  labelSize: '62x29',
  orientation: 'landscape'
};

// ═══════════════════════════════════════════════════════════════════════
// QR CODE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════

const QR_CONFIG = {
  apiEndpoint: 'https://api.qrserver.com/v1/create-qr-code/',
  size: '300x300',
  format: 'png',
  errorCorrection: 'M',
  margin: 10,
  includeLabel: true,
  labelTemplate: '{SKU_ID} - {Item_Name}'
};

// ═══════════════════════════════════════════════════════════════════════
// OTHER CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════

const DUPLICATE_CONFIG = {
  checkSKU: true,
  checkMPN: true,
  checkSupplierPartNumber: true,
  checkItemName: false,
  fuzzyMatchThreshold: 0.85,
  ignoreCase: true
};

const EMAIL_CONFIG = {
  adminEmail: 'your-email@example.com',
  notifyOnImport: true,
  notifyOnDuplicate: true,
  notifyOnError: true,
  notifyOnPriceChange: true,
  priceChangeThreshold: 10
};

const LOGGING_CONFIG = {
  enabled: true,
  level: 'INFO',
  maxLogEntries: 1000,
  logToSheet: true,
  logToStackdriver: false
};

const TRIGGER_CONFIG = {
  dailyPriceCheck: { enabled: true, hour: 2 },
  weeklyQBSync: { enabled: true, dayOfWeek: 1, hour: 9 },
  monthlyStockAudit: { enabled: true, dayOfMonth: 1, hour: 8 }
};

const VALIDATION_RULES = {
  requiredFields: {
    entry: ['Item_Name', 'Supplier', 'Purchase_Price_excl_VAT'],
    inventory: ['SKU_ID', 'Item_Name', 'Category', 'Supplier']
  },
  priceRange: { min: 0.01, max: 100000 },
  skuPattern: /^SKU-\d{6}$/,
  refIdPattern: /^REF-\d{8}$/,
  urlPattern: /^https?:\/\/.+/
};

// ═══════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

function getActiveSpreadsheet() {
  return SPREADSHEET_CONFIG.spreadsheetId 
    ? SpreadsheetApp.openById(SPREADSHEET_CONFIG.spreadsheetId)
    : SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet(sheetName) {
  return getActiveSpreadsheet().getSheetByName(sheetName);
}

function getCurrentUserEmail() {
  return Session.getActiveUser().getEmail();
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN CONFIG OBJECT
// ═══════════════════════════════════════════════════════════════════════

const CONFIG = {
  spreadsheet: SPREADSHEET_CONFIG,
  headers: { entry: DB_ENTRY_HEADERS, inventory: DB_INVENTORY_HEADERS },
  mapping: ENTRY_TO_INVENTORY_MAP,
  sku: SKU_CONFIG,
  status: STATUS,
  quickbooks: QB_CONFIG,
  visionApi: VISION_API_CONFIG,
  browseAi: { apiKey: BROWSEAI_API_KEY, ...BROWSEAI_CONFIG },
  printNode: { apiKey: PRINTNODE_API_KEY, ...PRINTNODE_CONFIG },
  qr: QR_CONFIG,
  duplicate: DUPLICATE_CONFIG,
  email: EMAIL_CONFIG,
  logging: LOGGING_CONFIG,
  triggers: TRIGGER_CONFIG,
  validation: VALIDATION_RULES,
  getSheet: getSheet,
  getCurrentUser: getCurrentUserEmail,
  getActiveSpreadsheet: getActiveSpreadsheet
};
