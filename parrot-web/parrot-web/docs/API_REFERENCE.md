# API Reference - Parrot Food Delivery

Complete API documentation with request/response examples.

---

## Authentication Endpoints

### Register New User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user"
}
```

**response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Get Current User
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "phone": "+1234567890",
  "address": "123 Main St, City"
}
```

---

## Restaurant Endpoints

### List All Restaurants
**GET** `/api/restaurants`

**Query Parameters:**
- `category` - Filter by category (optional)
- `page` - Pagination (default: 1)
- `limit` - Items per page (default: 10)

**Response (200):**
```json
{
  "restaurants": [
    {
      "id": "507f1f77bcf86cd799439012",
      "name": "McDonald's",
      "category": "Burgers & Fast Food",
      "rating": 4.3,
      "deliveryTime": "20-25 mins",
      "minOrder": 200,
      "location": "Downtown, City",
      "menu": [
        {
          "name": "Burger Whopper",
          "price": 189,
          "category": "Burgers",
          "available": true
        }
      ]
    }
  ],
  "total": 45,
  "page": 1
}
```

### Get Restaurant Details
**GET** `/api/restaurants/:id`

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439012",
  "name": "McDonald's",
  "description": "I'm lovin' it!",
  "category": "Burgers & Fast Food",
  "rating": 4.3,
  "reviews": 123,
  "deliveryTime": "20-25 mins",
  "minOrder": 200,
  "location": "Downtown, City",
  "openUntil": "11:00 PM",
  "menu": [
    {
      "id": "507f1f77bcf86cd799439013",
      "name": "Burger Whopper",
      "price": 189,
      "category": "Burgers",
      "description": "Juicy grilled burger",
      "imageUrl": "https://...",
      "available": true
    }
  ]
}
```

### Create Restaurant (Admin Only)
**POST** `/api/restaurants`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Pizza Hut",
  "category": "Pizza",
  "location": "Main Street",
  "deliveryTime": "30-35 mins",
  "minOrder": 300
}
```

**Response (201):**
```json
{
  "id": "507f1f77bcf86cd799439014",
  "name": "Pizza Hut",
  "category": "Pizza",
  ...
}
```

---

## Order Endpoints

### Create Order
**POST** `/api/orders`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "restaurantId": "507f1f77bcf86cd799439012",
  "items": [
    {
      "menuItemId": "507f1f77bcf86cd799439013",
      "name": "Burger Whopper",
      "price": 189,
      "quantity": 2
    }
  ],
  "total": 378,
  "couponCode": "WELCOME20",
  "address": "123 Main St",
  "phone": "+1234567890"
}
```

**Response (201):**
```json
{
  "id": "507f1f77bcf86cd799439015",
  "userId": "507f1f77bcf86cd799439011",
  "restaurantId": "507f1f77bcf86cd799439012",
  "items": [...],
  "status": "pending",
  "total": 302.4,
  "discount": 75.6,
  "createdAt": "2024-01-15T10:30:00Z",
  "deliveryTime": "30-35 mins"
}
```

### Get User Orders
**GET** `/api/orders`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` - Filter by status (optional)
- `page` - Pagination
- `limit` - Items per page

**Response (200):**
```json
{
  "orders": [
    {
      "id": "507f1f77bcf86cd799439015",
      "restaurantId": "507f1f77bcf86cd799439012",
      "restaurantName": "McDonald's",
      "status": "delivered",
      "total": 378,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 5
}
```

### Get Order Details
**GET** `/api/orders/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439015",
  "restaurantId": "507f1f77bcf86cd799439012",
  "restaurantName": "McDonald's",
  "items": [...],
  "status": "out_for_delivery",
  "deliveryPartner": {
    "name": "Ahmed",
    "phone": "+1987654321",
    "location": {
      "latitude": 25.2048,
      "longitude": 55.2708
    }
  },
  "total": 378,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Update Order Status (Restaurant/Delivery/Admin)
**PUT** `/api/orders/:id/status`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "out_for_delivery"
}
```

**Response (200):**
```json
{
  "message": "Order status updated",
  "order": {
    "id": "507f1f77bcf86cd799439015",
    "status": "out_for_delivery",
    "updatedAt": "2024-01-15T11:15:00Z"
  }
}
```

---

## Offers/Coupons Endpoints

### List Active Offers
**GET** `/api/offers`

**Response (200):**
```json
{
  "offers": [
    {
      "id": "507f1f77bcf86cd799439016",
      "title": "Welcome Offer",
      "code": "WELCOME20",
      "discount": 20,
      "minOrder": 0,
      "validUntil": "2024-12-31",
      "description": "20% off on first order"
    }
  ]
}
```

### Validate Coupon Code
**POST** `/api/offers/validate`

**Request Body:**
```json
{
  "code": "WELCOME20",
  "orderTotal": 378
}
```

**Response (200):**
```json
{
  "valid": true,
  "discount": 75.6,
  "newTotal": 302.4
}
```

### Create Offer (Admin Only)
**POST** `/api/offers`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "title": "Weekend Special",
  "code": "WEEKEND15",
  "discount": 15,
  "minOrder": 300,
  "validUntil": "2024-12-31",
  "description": "15% off on orders above 300"
}
```

**Response (201):**
```json
{
  "id": "507f1f77bcf86cd799439017",
  "title": "Weekend Special",
  ...
}
```

---

## Reverse Bidding (Name Your Price) Endpoints

### Create Bid
**POST** `/api/bids/create`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "description": "I want burger and fries",
  "budget": 200,
  "address": "123 Main St, City",
  "dietaryNotes": "No onions",
  "radius": 5
}
```

**Response (201):**
```json
{
  "id": "507f1f77bcf86cd799439018",
  "userId": "507f1f77bcf86cd799439011",
  "description": "I want burger and fries",
  "budget": 200,
  "status": "open",
  "expiresAt": "2024-01-15T12:30:00Z",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Get Active Bids (For Restaurants)
**GET** `/api/bids/active`

**Headers:**
```
Authorization: Bearer <restaurant_token>
```

**Response (200):**
```json
{
  "bids": [
    {
      "id": "507f1f77bcf86cd799439018",
      "description": "I want burger and fries",
      "budget": 200,
      "location": {...},
      "expiresAt": "2024-01-15T12:30:00Z"
    }
  ]
}
```

### Accept Bid (Restaurant)
**POST** `/api/bids/:id/accept`

**Headers:**
```
Authorization: Bearer <restaurant_token>
```

**Request Body:**
```json
{
  "finalPrice": 189,
  "items": [
    { "name": "Burger Whopper", "price": 99 },
    { "name": "Fries", "price": 90 }
  ]
}
```

**Response (200):**
```json
{
  "message": "Bid accepted",
  "orderId": "507f1f77bcf86cd799439019"
}
```

---

## Admin Analytics Endpoints

### Dashboard Metrics
**GET** `/api/stats/dashboard`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "totalUsers": 1250,
  "totalRestaurants": 45,
  "totalOrders": 8932,
  "totalRevenue": 2500000,
  "activeDeliveries": 23,
  "topRestaurants": [
    { "name": "McDonald's", "orders": 520, "revenue": 125000 }
  ],
  "orderTrend": {
    "today": 120,
    "thisWeek": 650,
    "thisMonth": 2100
  }
}
```

### Revenue Stats
**GET** `/api/stats/revenue`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `period` - day, week, month, year

**Response (200):**
```json
{
  "period": "month",
  "totalRevenue": 2500000,
  "breakdown": {
    "orders": 2000000,
    "platformFee": 500000
  },
  "topCategories": [
    { "category": "Burgers", "revenue": 600000 },
    { "category": "Pizza", "revenue": 500000 }
  ],
  "dailyTrend": [
    { "date": "2024-01-01", "revenue": 75000 },
    { "date": "2024-01-02", "revenue": 82000 }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format"
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized - Invalid or missing token"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied - Admin role required"
}
```

### 404 Not Found
```json
{
  "message": "Restaurant not found"
}
```

### 500 Server Error
```json
{
  "message": "Internal server error",
  "error": "Database connection failed"
}
```

---

## Rate Limiting

API requests are rate-limited to:
- **Authenticated users**: 100 requests/minute
- **Public endpoints**: 30 requests/minute

Rate limit headers included in response:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 92
X-RateLimit-Reset: 1642256400
```

---

## Best Practices

1. **Always include `Authorization` header** for protected routes
2. **Use pagination** for large datasets (page, limit parameters)
3. **Filter by status** to reduce response payload
4. **Cache responses** where appropriate (use ETags)
5. **Handle error responses** gracefully in frontend
6. **Validate input data** on client-side before sending
7. **Use proper HTTP methods**: GET (retrieve), POST (create), PUT (update), DELETE (remove)

---

**For more information, see [README.md](../README.md)**
