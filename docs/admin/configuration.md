# Configuration Guide

## PVT Hostel Check-In System Configuration

This guide covers all configuration options and customization possibilities for the PVT Hostel Check-In System.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Initial Setup](#initial-setup)
3. [Customization Options](#customization-options)
4. [Field Configuration](#field-configuration)
5. [Styling Customization](#styling-customization)
6. [Localization](#localization)
7. [Advanced Configuration](#advanced-configuration)
8. [Integration Options](#integration-options)

## System Requirements

### Minimum Requirements
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **JavaScript**: ES6 support required
- **Screen Resolution**: 1024x768 minimum
- **Storage**: 10MB free space

### Recommended Setup
- **Browser**: Latest Chrome or Firefox
- **Screen**: 1920x1080 or higher
- **Memory**: 4GB RAM
- **Network**: For initial load only

## Initial Setup

### Step 1: Download Files
```
checkin.pvthostel.com/
├── index.html
├── guests.html
├── styles.css
├── script.js
└── docs/
```

### Step 2: Configure Base Settings

Edit the following in `script.js`:

```javascript
// Configuration object (add at top of script.js)
const CONFIG = {
  hotelName: 'PVT Hostel',
  defaultCheckoutDays: 1,
  maxGuestsPerRoom: 4,
  dateFormat: 'YYYY-MM-DD',
  exportPrefix: 'guests_export',
  storageKey: 'hostelGuests'
};
```

### Step 3: Update Branding

In `index.html` and `guests.html`:
```html
<!-- Update hotel name -->
<h1>Your Hotel Name</h1>
<p>Guest Check-In System</p>

<!-- Update footer -->
<footer>
  <p>&copy; 2025 Your Hotel Name. All rights reserved.</p>
</footer>
```

## Customization Options

### Form Fields

#### Adding Custom Fields

1. **Add HTML field** in `index.html`:
```html
<div class="form-group">
  <label for="nationality">Nationality</label>
  <select id="nationality" name="nationality">
    <option value="">Select...</option>
    <option value="US">United States</option>
    <option value="UK">United Kingdom</option>
    <option value="CA">Canada</option>
    <!-- Add more countries -->
  </select>
</div>
```

2. **Update JavaScript** in `script.js`:
```javascript
// In form submission handler
guest.nationality = formData.get('nationality');
```

3. **Display in guest list** - update `guests.html`:
```javascript
<td>${guest.nationality || 'N/A'}</td>
```

#### Making Fields Required

Add `required` attribute and asterisk:
```html
<label for="fieldName">Field Label *</label>
<input type="text" id="fieldName" name="fieldName" required>
```

#### Field Validation

Add custom validation in `script.js`:
```javascript
// Email validation example
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Phone validation example
function validatePhone(phone) {
  const re = /^\+?[\d\s-()]+$/;
  return re.test(phone);
}
```

## Field Configuration

### Room Number Configuration

#### Dropdown Instead of Text Input
```html
<select id="roomNumber" name="roomNumber" required>
  <option value="">Select Room...</option>
  <optgroup label="Floor 1">
    <option value="101">Room 101</option>
    <option value="102">Room 102</option>
  </optgroup>
  <optgroup label="Floor 2">
    <option value="201">Room 201</option>
    <option value="202">Room 202</option>
  </optgroup>
</select>
```

#### Room Capacity Validation
```javascript
const ROOM_CAPACITY = {
  '101': 2,
  '102': 4,
  '201': 2,
  '202': 6
};

function validateRoomCapacity(roomNumber, guestCount) {
  const capacity = ROOM_CAPACITY[roomNumber];
  return guestCount <= capacity;
}
```

### Date Configuration

#### Minimum Stay Requirements
```javascript
// Enforce minimum 1 night stay
document.getElementById('checkOutDate').addEventListener('change', function() {
  const checkIn = new Date(document.getElementById('checkInDate').value);
  const checkOut = new Date(this.value);
  
  if (checkOut <= checkIn) {
    alert('Check-out must be at least 1 day after check-in');
    const minCheckOut = new Date(checkIn);
    minCheckOut.setDate(minCheckOut.getDate() + 1);
    this.value = minCheckOut.toISOString().split('T')[0];
  }
});
```

#### Maximum Stay Limit
```javascript
const MAX_STAY_DAYS = 30;

function validateStayDuration(checkIn, checkOut) {
  const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
  return days <= MAX_STAY_DAYS;
}
```

## Styling Customization

### Color Scheme

Update CSS variables in `styles.css`:
```css
:root {
  /* Primary colors */
  --primary-color: #3498db;
  --primary-hover: #2980b9;
  
  /* Secondary colors */
  --secondary-color: #95a5a6;
  --secondary-hover: #7f8c8d;
  
  /* Background colors */
  --bg-primary: #2c3e50;
  --bg-light: #f5f5f5;
  
  /* Text colors */
  --text-primary: #333;
  --text-light: #7f8c8d;
  
  /* Status colors */
  --success-color: #2ecc71;
  --error-color: #e74c3c;
}

/* Apply variables */
header {
  background-color: var(--bg-primary);
}

.btn-primary {
  background-color: var(--primary-color);
}
```

### Logo Addition

Add logo to header:
```html
<header>
  <img src="logo.png" alt="Hotel Logo" class="logo">
  <h1>PVT Hostel</h1>
  <p>Guest Check-In System</p>
</header>
```

```css
.logo {
  height: 60px;
  margin-bottom: 1rem;
}
```

### Font Customization

```css
/* Import custom font */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;600&display=swap');

body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

## Localization

### Multi-language Support

#### Language Configuration
```javascript
const LANGUAGES = {
  en: {
    checkIn: 'Check In Guest',
    firstName: 'First Name',
    lastName: 'Last Name',
    room: 'Room Number',
    submit: 'Submit',
    // ... more translations
  },
  es: {
    checkIn: 'Registrar Huésped',
    firstName: 'Nombre',
    lastName: 'Apellido',
    room: 'Número de Habitación',
    submit: 'Enviar',
    // ... more translations
  }
};

let currentLang = 'en';

function translate(key) {
  return LANGUAGES[currentLang][key] || key;
}
```

#### Apply Translations
```javascript
function applyTranslations() {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = translate(key);
  });
}
```

#### HTML Usage
```html
<h2 data-translate="checkIn">Check In Guest</h2>
<label data-translate="firstName">First Name</label>
```

### Date Format Localization

```javascript
function formatDateLocal(dateString) {
  const date = new Date(dateString);
  // US format: MM/DD/YYYY
  // return date.toLocaleDateString('en-US');
  
  // European format: DD/MM/YYYY
  // return date.toLocaleDateString('en-GB');
  
  // ISO format: YYYY-MM-DD
  return date.toISOString().split('T')[0];
}
```

## Advanced Configuration

### Storage Configuration

#### Alternative Storage Key
```javascript
// Use different storage key for multiple properties
const STORAGE_KEY = 'hostel_location_1_guests';
```

#### Storage Quota Management
```javascript
function getStorageUsage() {
  const data = localStorage.getItem(STORAGE_KEY) || '[]';
  const bytes = new Blob([data]).size;
  const mb = (bytes / 1024 / 1024).toFixed(2);
  return { bytes, mb };
}

function isStorageNearLimit() {
  const { mb } = getStorageUsage();
  return parseFloat(mb) > 4; // Warn at 4MB
}
```

### Performance Configuration

#### Pagination for Large Lists
```javascript
const ITEMS_PER_PAGE = 50;
let currentPage = 1;

function paginateGuests(guests, page) {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  return guests.slice(start, end);
}
```

#### Lazy Loading
```javascript
// Load guests only when needed
let guestsCache = null;

function getGuestsLazy() {
  if (!guestsCache) {
    guestsCache = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }
  return guestsCache;
}
```

### Security Configuration

#### Input Sanitization
```javascript
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// Apply to all text inputs
function sanitizeFormData(formData) {
  const sanitized = {};
  for (let [key, value] of formData.entries()) {
    sanitized[key] = sanitizeInput(value);
  }
  return sanitized;
}
```

#### Content Security Policy
Add to your web server configuration:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

## Integration Options

### Google Sheets Integration

#### Export to Sheets Format
```javascript
function exportToCSV() {
  const guests = getGuests();
  const headers = ['First Name', 'Last Name', 'Room', 'Check In', 'Check Out'];
  
  const csv = [
    headers.join(','),
    ...guests.map(g => [
      g.firstName,
      g.lastName,
      g.roomNumber,
      g.checkInDate,
      g.checkOutDate
    ].join(','))
  ].join('\n');
  
  downloadFile(csv, 'guests.csv', 'text/csv');
}
```

### Email Notifications

#### Basic Email Link
```javascript
function sendEmailNotification(guest) {
  const subject = `New Guest Check-In: ${guest.firstName} ${guest.lastName}`;
  const body = `
    Guest: ${guest.firstName} ${guest.lastName}
    Room: ${guest.roomNumber}
    Check-in: ${guest.checkInDate}
    Check-out: ${guest.checkOutDate}
  `;
  
  const mailtoLink = `mailto:manager@pvthostel.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink);
}
```

### Print Configuration

#### Custom Print Styles
```css
@media print {
  /* Hide non-essential elements */
  header, footer, .btn, .form-actions {
    display: none !important;
  }
  
  /* Optimize table for printing */
  .guests-table {
    font-size: 12px;
    border: 1px solid #000;
  }
  
  /* Force black text */
  * {
    color: #000 !important;
  }
}
```

#### Print Receipt
```javascript
function printGuestReceipt(guest) {
  const receipt = window.open('', '_blank');
  receipt.document.write(`
    <html>
      <head>
        <title>Guest Receipt</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          h1 { color: #333; }
          .info { margin: 10px 0; }
        </style>
      </head>
      <body>
        <h1>PVT Hostel - Guest Receipt</h1>
        <div class="info"><strong>Name:</strong> ${guest.firstName} ${guest.lastName}</div>
        <div class="info"><strong>Room:</strong> ${guest.roomNumber}</div>
        <div class="info"><strong>Check-in:</strong> ${guest.checkInDate}</div>
        <div class="info"><strong>Check-out:</strong> ${guest.checkOutDate}</div>
        <div class="info"><strong>Confirmation:</strong> ${guest.id}</div>
      </body>
    </html>
  `);
  receipt.document.close();
  receipt.print();
}
```

## Environment-Specific Configuration

### Development Environment
```javascript
const ENV = 'development';

if (ENV === 'development') {
  // Enable debug logging
  window.DEBUG = true;
  
  // Add test data generator
  window.generateTestData = function(count = 10) {
    for (let i = 0; i < count; i++) {
      saveGuest({
        firstName: `Test${i}`,
        lastName: `Guest${i}`,
        idNumber: `TEST${i}`,
        roomNumber: `10${i}`,
        checkInDate: new Date().toISOString().split('T')[0],
        checkOutDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        numberOfGuests: 1
      });
    }
  };
}
```

### Production Environment
```javascript
const ENV = 'production';

if (ENV === 'production') {
  // Disable console logs
  console.log = function() {};
  
  // Enable error tracking
  window.addEventListener('error', function(e) {
    // Send to error tracking service
    trackError(e);
  });
}
```

## Maintenance Mode

```javascript
const MAINTENANCE_MODE = false;

if (MAINTENANCE_MODE) {
  document.body.innerHTML = `
    <div style="text-align: center; padding: 50px;">
      <h1>System Maintenance</h1>
      <p>The check-in system is currently under maintenance.</p>
      <p>Please check back in a few minutes.</p>
    </div>
  `;
}
```

## Conclusion

This configuration guide provides extensive customization options for the PVT Hostel Check-In System. Remember to:

1. Test all changes thoroughly
2. Keep backups before modifications
3. Document your customizations
4. Train staff on any changes

For additional support, refer to the [Technical Documentation](../technical/architecture.md) or contact IT support.

---

*Last Updated: January 2025*
*Version: 1.0*