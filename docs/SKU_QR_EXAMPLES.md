# Smart-Inventory-Builder - SKU & QR Code Generation Examples

## SKU Generation

### Configuration Sample

```javascript
const SKU_CONFIG = {
  prefix: 'SKU-',
  length: 6,
  startNumber: 1,
  format: 'PADDED' // or 'SEQUENTIAL'
};
```

### Example Function

```javascript
function generateSKU(itemNum) {
  // Example: SKU-000123
  const padded = String(itemNum).padStart(SKU_CONFIG.length, '0');
  return `${SKU_CONFIG.prefix}${padded}`;
}
```

### Output Example

| Item Name             | ItemNum | SKU Output   |
|-----------------------|---------|--------------|
| "Power Cable 5m"      | 1       | "SKU-000001" |
| "Dimmer Module 24ch"  | 123     | "SKU-000123" |

---

## QR Code Generation

### QR Code Settings

```javascript
const QR_CONFIG = {
  size: '300x300',
  format: 'png',
  errorCorrection: 'M',
  includeLabel: true,
  labelTemplate: '{SKU_ID} - {Item_Name}'
};
```

### Example QR Code Logic

```javascript
function generateQRCodeForSKU(sku, itemName) {
  // Uses QR_CONFIG for formatting
  // Example: returns URL for PNG image
  return `https://qrcode.example.com/generate?data=${sku}&size=300x300&format=png`;
}
```

### Output Table

| SKU         | Item Name           | QR Code URL                                          |
|-------------|--------------------|------------------------------------------------------|
| SKU-000001  | "Power Cable 5m"   | https://qrcode.example.com/generate?...              |
| SKU-000123  | "Dimmer Module 24ch"| https://qrcode.example.com/generate?...             |

---

## Batch QR Code Workflow

1. User selects items in DB_INVENTORY.
2. Script calls QR generator for each SKU.
3. Results are available as image URLs in the QR_Codes sheet.
4. Optionally triggers PrintNode for direct label printing.

---

**For actual code, see `src/core/sku-generator.gs`, `src/core/qr-generator.gs` (sanitized) in the public repo.**
