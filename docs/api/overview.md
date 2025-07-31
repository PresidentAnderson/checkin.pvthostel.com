# API Documentation Overview

## Introduction

The PVT Hostel Check-In System currently operates as a client-side application without a traditional REST API. However, this documentation outlines the JavaScript API interface for interacting with the system programmatically and provides a blueprint for future server-side API implementation.

## Current Architecture

### Client-Side API

The system exposes several JavaScript functions that act as an internal API for data operations:

```javascript
// Core API Functions
saveGuest(guest)      // Create new guest record
getGuests()           // Retrieve all guests
removeGuest(guestId)  // Delete guest record
exportData()          // Export guest data
```

## Future REST API Design

### API Design Principles

1. **RESTful Architecture**: Following REST conventions
2. **JSON Format**: All requests and responses in JSON
3. **Stateless**: Each request contains all necessary information
4. **Versioned**: API versioning for backward compatibility
5. **Secure**: HTTPS only, token-based authentication

### Proposed Base URL
```
https://api.pvthostel.com/v1
```

### Authentication
```
Authorization: Bearer <token>
```

### Standard Response Format

#### Success Response
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2025-01-16T10:30:00Z"
}
```

#### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": { ... }
  },
  "timestamp": "2025-01-16T10:30:00Z"
}
```

## JavaScript API Reference

### Core Functions

#### saveGuest(guest)
Saves a new guest to localStorage.

**Parameters:**
- `guest` (Object): Guest object with required fields

**Returns:**
- `void`

**Example:**
```javascript
const newGuest = {
  firstName: "John",
  lastName: "Doe",
  idNumber: "AB123456",
  roomNumber: "101",
  checkInDate: "2025-01-16",
  checkOutDate: "2025-01-17",
  numberOfGuests: 1
};

saveGuest(newGuest);
```

#### getGuests()
Retrieves all guests from localStorage.

**Parameters:**
- None

**Returns:**
- `Array<Guest>`: Array of guest objects

**Example:**
```javascript
const allGuests = getGuests();
console.log(`Total guests: ${allGuests.length}`);
```

#### removeGuest(guestId)
Removes a guest from the system.

**Parameters:**
- `guestId` (String): Unique guest identifier

**Returns:**
- `void`

**Example:**
```javascript
removeGuest("1642338400000");
```

#### exportData()
Exports all guest data as a JSON file download.

**Parameters:**
- None

**Returns:**
- `void` (triggers file download)

**Example:**
```javascript
exportData(); // Downloads guests_export_2025-01-16.json
```

## Data Models

### Guest Model
```typescript
interface Guest {
  id: string;              // Unique identifier (timestamp)
  firstName: string;       // Guest's first name
  lastName: string;        // Guest's last name
  email?: string;          // Optional email address
  phone?: string;          // Optional phone number
  idNumber: string;        // ID or passport number
  roomNumber: string;      // Assigned room
  checkInDate: string;     // ISO date (YYYY-MM-DD)
  checkOutDate: string;    // ISO date (YYYY-MM-DD)
  numberOfGuests: number;  // Number of guests (min: 1)
  notes?: string;          // Optional notes
  checkedInAt: string;     // ISO timestamp of check-in
}
```

## Event System

### Custom Events

The system dispatches custom events for various operations:

```javascript
// Guest checked in
window.dispatchEvent(new CustomEvent('guestCheckedIn', {
  detail: { guest: guestObject }
}));

// Guest checked out
window.dispatchEvent(new CustomEvent('guestCheckedOut', {
  detail: { guestId: guestId }
}));

// Data exported
window.dispatchEvent(new CustomEvent('dataExported', {
  detail: { count: guestCount }
}));
```

### Event Listeners

```javascript
// Listen for guest check-in
window.addEventListener('guestCheckedIn', (event) => {
  console.log('New guest:', event.detail.guest);
});

// Listen for guest check-out
window.addEventListener('guestCheckedOut', (event) => {
  console.log('Guest checked out:', event.detail.guestId);
});
```

## Storage API

### LocalStorage Operations

#### Set Data
```javascript
localStorage.setItem('hostelGuests', JSON.stringify(guests));
```

#### Get Data
```javascript
const guests = JSON.parse(localStorage.getItem('hostelGuests') || '[]');
```

#### Clear Data
```javascript
localStorage.removeItem('hostelGuests');
```

#### Storage Events
```javascript
window.addEventListener('storage', (event) => {
  if (event.key === 'hostelGuests') {
    console.log('Guest data changed in another tab');
  }
});
```

## Integration Examples

### External System Integration

#### Reading Guest Data
```javascript
// Get all current guests
function getCurrentGuests() {
  const guests = getGuests();
  return guests.filter(guest => {
    const checkOut = new Date(guest.checkOutDate);
    return checkOut >= new Date();
  });
}

// Get guests by room
function getGuestsByRoom(roomNumber) {
  const guests = getGuests();
  return guests.filter(guest => guest.roomNumber === roomNumber);
}
```

#### Batch Operations
```javascript
// Import guests from external source
function importGuests(guestsArray) {
  guestsArray.forEach(guest => {
    guest.id = Date.now().toString() + Math.random();
    guest.checkedInAt = new Date().toISOString();
    saveGuest(guest);
  });
}

// Export to specific format
function exportToCSV() {
  const guests = getGuests();
  const csv = convertToCSV(guests);
  downloadCSV(csv, 'guests.csv');
}
```

## Error Handling

### Error Codes
```javascript
const ErrorCodes = {
  STORAGE_FULL: 'STORAGE_FULL',
  INVALID_DATA: 'INVALID_DATA',
  GUEST_NOT_FOUND: 'GUEST_NOT_FOUND',
  DATE_CONFLICT: 'DATE_CONFLICT'
};
```

### Error Handling Pattern
```javascript
try {
  saveGuest(guestData);
} catch (error) {
  if (error.name === 'QuotaExceededError') {
    handleStorageFullError();
  } else {
    console.error('Failed to save guest:', error);
  }
}
```

## Performance Considerations

### Optimization Tips
1. **Batch reads**: Read all guests once, then filter in memory
2. **Debounce saves**: When saving multiple guests, batch operations
3. **Lazy loading**: Load guest list only when needed
4. **Data archiving**: Export and clear old records periodically

### Performance Metrics
```javascript
// Measure operation time
function measurePerformance(operation) {
  const start = performance.now();
  operation();
  const end = performance.now();
  console.log(`Operation took ${end - start}ms`);
}
```

## Security Considerations

### Data Validation
```javascript
function validateGuest(guest) {
  const required = ['firstName', 'lastName', 'idNumber', 'roomNumber', 'checkInDate', 'checkOutDate'];
  
  for (const field of required) {
    if (!guest[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  
  // Validate dates
  if (new Date(guest.checkOutDate) <= new Date(guest.checkInDate)) {
    throw new Error('Check-out date must be after check-in date');
  }
  
  return true;
}
```

### XSS Prevention
```javascript
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

## Migration to Server API

### Migration Strategy
1. Implement server endpoints matching current functions
2. Add network layer with fallback to localStorage
3. Sync local and server data
4. Gradually phase out localStorage dependency

### Compatibility Layer
```javascript
// Future-proof API wrapper
class GuestAPI {
  async saveGuest(guest) {
    if (this.isOnline()) {
      return await this.postToServer('/guests', guest);
    } else {
      return this.saveToLocalStorage(guest);
    }
  }
  
  async getGuests() {
    if (this.isOnline()) {
      return await this.fetchFromServer('/guests');
    } else {
      return this.getFromLocalStorage();
    }
  }
}
```

## Conclusion

While the current system uses a client-side API, the architecture is designed to easily transition to a server-based REST API when needed. The JavaScript API provides a clean interface for all data operations and can serve as a blueprint for future API development.