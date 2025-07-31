# API Endpoints Reference

## Overview

This document provides detailed specifications for future REST API endpoints. While the current system operates client-side, these endpoints serve as a blueprint for server-side implementation.

## Base Configuration

### Base URL
```
Production: https://api.pvthostel.com/v1
Staging: https://api-staging.pvthostel.com/v1
Development: http://localhost:3000/api/v1
```

### Headers
```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
X-API-Version: 1.0
```

## Authentication Endpoints

### POST /auth/login
Authenticate user and receive access token.

**Request:**
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@pvthostel.com",
  "password": "securepassword"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600,
    "user": {
      "id": "usr_123",
      "email": "user@pvthostel.com",
      "role": "ambassador",
      "name": "John Doe"
    }
  }
}
```

### POST /auth/refresh
Refresh access token using refresh token.

**Request:**
```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600
  }
}
```

### POST /auth/logout
Invalidate current token.

**Request:**
```http
POST /api/v1/auth/logout
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

## Guest Management Endpoints

### GET /guests
Retrieve all guests with optional filtering.

**Request:**
```http
GET /api/v1/guests?status=active&room=101&page=1&limit=20
Authorization: Bearer {token}
```

**Query Parameters:**
- `status` (optional): active, checked_out, all
- `room` (optional): Filter by room number
- `checkInDate` (optional): ISO date (YYYY-MM-DD)
- `checkOutDate` (optional): ISO date (YYYY-MM-DD)
- `search` (optional): Search by name or ID
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "guests": [
      {
        "id": "gst_1642338400000",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@email.com",
        "phone": "+1234567890",
        "idNumber": "AB123456",
        "roomNumber": "101",
        "checkInDate": "2025-01-16",
        "checkOutDate": "2025-01-17",
        "numberOfGuests": 1,
        "notes": "Late arrival expected",
        "checkedInAt": "2025-01-16T14:30:00Z",
        "checkedInBy": "usr_123",
        "status": "active"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 87,
      "itemsPerPage": 20
    }
  }
}
```

### GET /guests/{id}
Retrieve specific guest details.

**Request:**
```http
GET /api/v1/guests/gst_1642338400000
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "guest": {
      "id": "gst_1642338400000",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@email.com",
      "phone": "+1234567890",
      "idNumber": "AB123456",
      "roomNumber": "101",
      "checkInDate": "2025-01-16",
      "checkOutDate": "2025-01-17",
      "numberOfGuests": 1,
      "notes": "Late arrival expected",
      "checkedInAt": "2025-01-16T14:30:00Z",
      "checkedInBy": "usr_123",
      "status": "active",
      "history": [
        {
          "action": "checked_in",
          "timestamp": "2025-01-16T14:30:00Z",
          "user": "usr_123"
        }
      ]
    }
  }
}
```

### POST /guests
Create new guest check-in.

**Request:**
```http
POST /api/v1/guests
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@email.com",
  "phone": "+0987654321",
  "idNumber": "CD789012",
  "roomNumber": "202",
  "checkInDate": "2025-01-16",
  "checkOutDate": "2025-01-18",
  "numberOfGuests": 2,
  "notes": "Traveling with family"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "guest": {
      "id": "gst_1642339500000",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@email.com",
      "phone": "+0987654321",
      "idNumber": "CD789012",
      "roomNumber": "202",
      "checkInDate": "2025-01-16",
      "checkOutDate": "2025-01-18",
      "numberOfGuests": 2,
      "notes": "Traveling with family",
      "checkedInAt": "2025-01-16T15:45:00Z",
      "checkedInBy": "usr_123",
      "status": "active"
    }
  }
}
```

### PUT /guests/{id}
Update guest information.

**Request:**
```http
PUT /api/v1/guests/gst_1642338400000
Authorization: Bearer {token}
Content-Type: application/json

{
  "roomNumber": "103",
  "checkOutDate": "2025-01-19",
  "notes": "Room changed due to maintenance"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "guest": {
      "id": "gst_1642338400000",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@email.com",
      "phone": "+1234567890",
      "idNumber": "AB123456",
      "roomNumber": "103",
      "checkInDate": "2025-01-16",
      "checkOutDate": "2025-01-19",
      "numberOfGuests": 1,
      "notes": "Room changed due to maintenance",
      "checkedInAt": "2025-01-16T14:30:00Z",
      "checkedInBy": "usr_123",
      "lastModifiedAt": "2025-01-16T16:00:00Z",
      "lastModifiedBy": "usr_123",
      "status": "active"
    }
  }
}
```

### DELETE /guests/{id}
Check out guest (soft delete).

**Request:**
```http
DELETE /api/v1/guests/gst_1642338400000
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Guest checked out successfully",
    "checkOutTime": "2025-01-17T10:00:00Z",
    "checkedOutBy": "usr_123"
  }
}
```

## Room Management Endpoints

### GET /rooms
Get all rooms with availability status.

**Request:**
```http
GET /api/v1/rooms?status=available&floor=2
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "rooms": [
      {
        "roomNumber": "101",
        "floor": 1,
        "capacity": 2,
        "type": "double",
        "status": "occupied",
        "currentGuests": 1,
        "amenities": ["wifi", "ac", "bathroom"]
      },
      {
        "roomNumber": "201",
        "floor": 2,
        "capacity": 4,
        "type": "dorm",
        "status": "available",
        "currentGuests": 0,
        "amenities": ["wifi", "ac", "shared_bathroom"]
      }
    ]
  }
}
```

### GET /rooms/{roomNumber}/availability
Check room availability for date range.

**Request:**
```http
GET /api/v1/rooms/101/availability?from=2025-01-20&to=2025-01-25
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "roomNumber": "101",
    "available": true,
    "conflicts": [],
    "capacity": 2,
    "pricePerNight": 50.00
  }
}
```

## Reports Endpoints

### GET /reports/occupancy
Get occupancy report.

**Request:**
```http
GET /api/v1/reports/occupancy?from=2025-01-01&to=2025-01-31
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "period": {
      "from": "2025-01-01",
      "to": "2025-01-31"
    },
    "summary": {
      "totalRooms": 50,
      "totalCapacity": 150,
      "totalGuestNights": 2850,
      "averageOccupancy": 61.3,
      "revenue": 142500.00
    },
    "daily": [
      {
        "date": "2025-01-01",
        "occupiedRooms": 35,
        "totalGuests": 89,
        "occupancyRate": 70.0
      }
    ]
  }
}
```

### GET /reports/revenue
Get revenue report.

**Request:**
```http
GET /api/v1/reports/revenue?from=2025-01-01&to=2025-01-31&groupBy=week
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "period": {
      "from": "2025-01-01",
      "to": "2025-01-31"
    },
    "summary": {
      "totalRevenue": 142500.00,
      "averageRoomRate": 50.00,
      "revenuePar": 30.65
    },
    "breakdown": [
      {
        "week": "2025-W01",
        "revenue": 32500.00,
        "guestNights": 650
      }
    ]
  }
}
```

## Export Endpoints

### GET /export/guests
Export guest data in various formats.

**Request:**
```http
GET /api/v1/export/guests?format=csv&from=2025-01-01&to=2025-01-31
Authorization: Bearer {token}
```

**Response (200 OK):**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="guests_2025-01-01_2025-01-31.csv"

firstName,lastName,email,phone,idNumber,roomNumber,checkInDate,checkOutDate
John,Doe,john.doe@email.com,+1234567890,AB123456,101,2025-01-16,2025-01-17
Jane,Smith,jane.smith@email.com,+0987654321,CD789012,202,2025-01-16,2025-01-18
```

### POST /export/report
Generate custom report.

**Request:**
```http
POST /api/v1/export/report
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "guest_summary",
  "format": "pdf",
  "dateRange": {
    "from": "2025-01-01",
    "to": "2025-01-31"
  },
  "filters": {
    "status": "all"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "reportId": "rpt_123456",
    "status": "processing",
    "estimatedTime": 30,
    "downloadUrl": null
  }
}
```

## Webhook Endpoints

### POST /webhooks
Register webhook for events.

**Request:**
```http
POST /api/v1/webhooks
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "https://external.system/webhook",
  "events": ["guest.checked_in", "guest.checked_out"],
  "secret": "webhook_secret_key"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "webhookId": "whk_123456",
    "url": "https://external.system/webhook",
    "events": ["guest.checked_in", "guest.checked_out"],
    "status": "active",
    "createdAt": "2025-01-16T10:00:00Z"
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "fields": {
        "email": "Invalid email format",
        "checkOutDate": "Must be after check-in date"
      }
    }
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Guest not found",
    "details": {
      "guestId": "gst_invalid"
    }
  }
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "details": {
      "limit": 100,
      "window": "1h",
      "retryAfter": 3600
    }
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "details": {
      "reference": "err_ref_123456"
    }
  }
}
```

## Rate Limiting

### Rate Limit Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642342800
```

### Rate Limits by Endpoint
- Authentication: 5 requests per minute
- Guest operations: 100 requests per hour
- Reports: 10 requests per hour
- Exports: 5 requests per hour

## API Versioning

### Version Header
```http
X-API-Version: 1.0
```

### Deprecation Notice
```http
X-API-Deprecation-Date: 2026-01-01
X-API-Deprecation-Info: https://api.pvthostel.com/deprecation/v1
```

## WebSocket Events

### Connection
```javascript
const ws = new WebSocket('wss://api.pvthostel.com/v1/events');

ws.on('open', () => {
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'Bearer {token}'
  }));
});
```

### Event Types
```javascript
// Guest checked in
{
  "type": "guest.checked_in",
  "data": {
    "guestId": "gst_123456",
    "roomNumber": "101",
    "timestamp": "2025-01-16T10:00:00Z"
  }
}

// Room status changed
{
  "type": "room.status_changed",
  "data": {
    "roomNumber": "101",
    "oldStatus": "available",
    "newStatus": "occupied",
    "timestamp": "2025-01-16T10:00:00Z"
  }
}
```

## SDK Examples

### JavaScript/Node.js
```javascript
const PVTHostelAPI = require('@pvthostel/api-sdk');

const api = new PVTHostelAPI({
  apiKey: 'your_api_key',
  version: 'v1'
});

// Check in guest
const guest = await api.guests.create({
  firstName: 'John',
  lastName: 'Doe',
  idNumber: 'AB123456',
  roomNumber: '101',
  checkInDate: '2025-01-16',
  checkOutDate: '2025-01-17'
});

// Get all guests
const guests = await api.guests.list({
  status: 'active',
  page: 1,
  limit: 20
});
```

### Python
```python
from pvthostel import PVTHostelAPI

api = PVTHostelAPI(api_key='your_api_key')

# Check in guest
guest = api.guests.create(
    first_name='John',
    last_name='Doe',
    id_number='AB123456',
    room_number='101',
    check_in_date='2025-01-16',
    check_out_date='2025-01-17'
)

# Get occupancy report
report = api.reports.occupancy(
    from_date='2025-01-01',
    to_date='2025-01-31'
)
```

## Testing

### Test Environment
```
Base URL: https://api-sandbox.pvthostel.com/v1
Test API Key: test_key_123456
```

### Postman Collection
Download our Postman collection for easy API testing:
[PVT Hostel API Postman Collection](https://api.pvthostel.com/postman/collection.json)

## Conclusion

This comprehensive API design provides a solid foundation for transitioning from the current client-side system to a full-featured server-based solution. The RESTful design ensures scalability and maintainability while supporting all current features and enabling future enhancements.