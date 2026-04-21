# food_delivery_website_parrot
# 🦜 Parrot - Food Delivery Web App

A modern full-stack food delivery platform built with **React** and **Express.js**. Features include reverse bidding, restaurant management, delivery tracking, and dynamic pricing with coupons.

> **Status**: Ready for deployment • **License**: MIT • **Node**: 18+ required

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- **Node.js** 18+ and **npm**
- **MongoDB** (local: `mongodb://127.0.0.1:27017/parrot` or cloud Atlas URI)

### Setup Backend
```bash
cd backend
npm install
cp .env.example .env          # Edit MONGO_URI if needed
npm run dev                    # Starts on http://localhost:5000
```

### Setup Frontend
```bash
cd frontend
npm install
npm start                      # Starts on http://localhost:3000
```

### Demo Login Credentials
| Role | Email | Password |
|------|-------|----------|
| 👨‍💼 Admin | `admin@parrot.com` | `admin123` |
| 🧑‍💻 User | `user@parrot.com` | `user123` |
| 🏪 Restaurant | `restaurant@parrot.com` | `rest123` |
| 🚚 Delivery Partner | `delivery@parrot.com` | `delivery123` |

---

## 📋 Complete Setup Guide

### Backend Configuration

**1. Install Dependencies**
```bash
cd backend
npm install
```

**2. Environment Setup** (`.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/parrot
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

**3. Start Development Server**
```bash
npm run dev                    # With auto-reload (nodemon)
# OR
npm start                      # Direct start
```

**Available Scripts:**
- `npm run dev` — Development with nodemon auto-reload
- `npm start` — Production start
- `npm run seed` — Manually seed database with demo data

**4. Verify Backend**
- Health check: `GET http://localhost:5000/api/health`
- Debug accounts: `GET http://localhost:5000/api/debug/accounts`

---

### Frontend Configuration

**1. Install Dependencies**
```bash
cd frontend
npm install
```

**2. Start Development Server**
```bash
npm start                      # Opens http://localhost:3000
```

**3. Build for Production**
```bash
npm run build                  # Creates optimized bundle in `build/` folder
```

**Available Scripts:**
- `npm start` — Development server with hot reload
- `npm run build` — Production build
- `npm test` — Run tests
- `npm run eject` — Full control (⚠️ irreversible)

---

## 🎯 Key Features

### For Customers
- 🔍 **Browse & Order** — Explore restaurants and menu items
- 💰 **Reverse Bidding** — Name your price for meals
- 📦 **Mystery Orders** — AI-matched surprise meals
- 🔁 **Routine Orders** — Schedule recurring deliveries
- 🎟️ **Coupon System** — Apply discount codes

### For Restaurants
- 📊 **Dashboard** — View orders and sales analytics
- 📝 **Menu Management** — Add/edit menu items
- 💬 **Customer Requests** — Respond to menu requests
- 📈 **Performance Metrics** — Track revenue and ratings

### For Delivery Partners
- 📍 **Order Tracking** — Real-time delivery status
- 💵 **Earnings** — Track completed deliveries and earnings
- 🗺️ **Route Optimization** — Nearby delivery suggestions

### For Admins
- 🛡️ **Platform Management** — Approve restaurants and users
- 📊 **Analytics** — System-wide statistics
- 🎯 **Offer Management** — Create and monitor coupons
- ⚙️ **System Settings** — Configure platform parameters

---

## 🏗️ Project Structure

```
parrot-web/
├── backend/
│   ├── models/                 # MongoDB schemas
│   │   ├── User.js            # User profiles (4 roles)
│   │   ├── Restaurant.js      # Restaurant profiles + menus
│   │   ├── Order.js           # Order tracking & status
│   │   ├── Offer.js           # Coupons & discounts
│   │   ├── Bid.js             # Reverse bidding/"Name Your Price"
│   │   ├── MenuRequest.js     # Menu item approval workflow
│   │   ├── MysteryOrder.js    # AI-matched surprise meals
│   │   └── Routine.js         # Recurring orders
│   ├── routes/                 # API endpoints
│   │   ├── auth.js            # Authentication & registration
│   │   ├── restaurants.js     # Restaurant catalog
│   │   ├── orders.js          # Order management
│   │   ├── offers.js          # Coupon endpoints
│   │   ├── admin.js           # Admin panel endpoints
│   │   ├── restaurant.js      # Restaurant dashboard
│   │   ├── delivery.js        # Delivery partner endpoints
│   │   ├── bids.js            # Reverse bidding endpoints
│   │   ├── routines.js        # Recurring orders
│   │   ├── features.js        # Platform features management
│   │   ├── menuRequests.js    # Menu request approvals
│   │   ├── stats.js           # Analytics endpoints
│   │   └── upload.js          # File upload handling
│   ├── middleware/
│   │   └── auth.js            # JWT verification + role guards
│   ├── server.js              # Express entry point
│   ├── .env                   # Environment configuration
│   ├── .env.example           # Environment template
│   ├── .gitignore             # Git ignore rules
│   └── package.json           # Dependencies
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Page components (routes)
│   │   ├── context/           # React Context for state
│   │   ├── utils/             # Helper functions & API calls
│   │   ├── App.js             # Main app with routing
│   │   └── index.js           # React entry point
│   ├── public/                # Static files
│   ├── package.json           # React dependencies
│   └── src/index.css          # Global styles
├── docs/
│   ├── README.md              # This file
│   ├── API_REFERENCE.md       # Detailed API docs
│   ├── DEPLOYMENT.md          # Deployment guides
│   └── ARCHITECTURE.md        # System design
└── .gitignore                 # Root level git ignore
```

---

## 🔌 API Endpoints Quick Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | Login & get JWT token |
| GET | `/api/auth/me` | Get current user profile |
| POST | `/api/auth/logout` | Logout (client-side) |

### Restaurants
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/restaurants` | List all restaurants |
| GET | `/api/restaurants/:id` | Get restaurant details |
| POST | `/api/restaurants` | Create new restaurant (Admin) |
| PUT | `/api/restaurants/:id` | Update restaurant (Owner) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get user's orders |
| POST | `/api/orders` | Place new order |
| GET | `/api/orders/:id` | Get order details |
| PUT | `/api/orders/:id/status` | Update order status |
| GET | `/api/orders/:id/track` | Real-time tracking |

### Offers & Coupons
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/offers` | List active coupons |
| POST | `/api/offers/validate` | Validate coupon code |
| POST | `/api/offers` | Create offer (Admin) |

### Admin Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats/dashboard` | Platform overview metrics |
| GET | `/api/stats/revenue` | Revenue statistics |
| GET | `/api/stats/users` | User base statistics |

### Special Features
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bids/create` | Create reverse bid (user names price) |
| GET | `/api/bids/active` | View available bids |
| POST | `/api/routines` | Schedule recurring order |
| POST | `/api/menuRequests` | Request new menu items |

**Full API documentation**: See [API_REFERENCE.md](docs/API_REFERENCE.md)

---

## 🔐 Authentication & Authorization

### JWT Token Flow
1. **Login**: User sends email + password → Server returns JWT token
2. **Bearer Token**: Frontend stores token in localStorage
3. **Authorization Header**: Frontend sends `Authorization: Bearer <token>` on each request
4. **Verification**: Backend verifies token signature against `JWT_SECRET`

### Role-Based Access Control (RBAC)
```javascript
// Middleware usage in routes
const auth = require('../middleware/auth');

// Protected route - any authenticated user
router.get('/profile', auth.verify, (req, res) => { });

// Admin-only endpoint
router.delete('/user/:id', auth.adminOnly, (req, res) => { });

// Restaurant owner endpoint
router.put('/menu', auth.restaurantOnly, (req, res) => { });

// Delivery partner endpoint
router.get('/deliveries', auth.deliveryOnly, (req, res) => { });
```

### User Roles
- **user** — Regular customers (can order, bid, create routines)
- **admin** — Platform administrators (full system access)
- **restaurant** — Restaurant owners (manage menus, view orders)
- **delivery** — Delivery partners (fulfill orders, track routes)

---

## 🗄️ Database Architecture

### Collections Structure

**Users**
- Email-based login with bcryptjs password hashing
- 4 role types: user, admin, restaurant, delivery
- Profile fields: name, phone, address, ratings

**Restaurants**
- Owned by restaurant role users
- Nested menu items with pricing & categories
- Location, delivery time, operational hours, ratings

**Orders**
- Status flow: pending → confirmed → preparing → ready → assigned → out_for_delivery → delivered
- Embedded order items (menuItemId, qty, price)
- Rejection tracking and timestamps

**Offers (Coupons)**
- Unique uppercase code (e.g., "WELCOME20")
- Discount percentage + minimum order threshold
- Expiration date validation

**Bids (Reverse Bidding)**
- Customer proposes budget for meal delivery
- Status: open → accepted → expired
- Includes dietary notes & delivery radius

**MenuRequests**
- Customer requests for specific menu items
- Restaurant can response with approval/rejection
- Used for inventory planning

**MysteryOrders**
- Budget-based AI recommendations
- Allergy/diet preferences
- Status: pending → matched → expired

**Routines**
- Trigger time scheduling (e.g., "08:00 AM")
- Recurring items list with pricing
- Active toggle for enable/disable

---

## 🛠️ Technologies Used

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.18.2 | Web framework |
| MongoDB | 7.0.0 | NoSQL database |
| Mongoose | 7.0.0 | ODM for MongoDB |
| JWT | 9.0.0 | Authentication tokens |
| bcryptjs | 2.4.3 | Password hashing |
| Multer | 1.4.5 | File upload handling |
| Nodemon | 3.0.0 | Auto-reload during development |
| CORS | Latest | Cross-origin requests |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI library |
| React DOM | 18.2.0 | DOM rendering |
| React Router | 6.20.0 | Client-side routing |
| Axios | 1.6.0 | HTTP client |
| React Toastify | 9.1.3 | Toast notifications |
| React Scripts | 5.0.0 | Build tooling |

---

## 🚀 Deployment Options

### Option 1: Heroku (Easiest)
```bash
# Backend deployment
heroku create parrot-app-backend
git push heroku main

# Frontend deployment to Netlify
npm run build
# Deploy `build/` folder to Netlify
```

### Option 2: Docker
```dockerfile
# Build backend image
docker build -t parrot-backend ./backend

# Build frontend image
docker build -t parrot-frontend ./frontend

# Run with docker-compose
docker-compose up
```

### Option 3: AWS/Azure
- **Backend**: Deploy via EC2 or App Service
- **Frontend**: Deploy via S3 + CloudFront or Static Web Apps
- **Database**: Use managed MongoDB Atlas

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

---

## 🐛 Troubleshooting

### Backend Issues

| Problem | Solution |
|---------|----------|
| **Port 5000 already in use** | Change `PORT` in `.env` or kill process: `lsof -ti:5000 \| xargs kill -9` |
| **MongoDB connection failed** | Verify `MONGO_URI` in `.env` and MongoDB service is running |
| **JWT token invalid** | Check `JWT_SECRET` matches between requests or regenerate token |
| **CORS errors** | Verify frontend URL is allowed in backend CORS config |
| **File upload fails** | Ensure `uploads/` directory exists and has write permissions |

### Frontend Issues

| Problem | Solution |
|---------|----------|
| **Blank white screen** | Check browser console for errors; ensure backend is running on :5000 |
| **API calls returning 404** | Verify React proxy in `package.json` points to `http://localhost:5000` |
| **localStorage errors** | Clear browser cache and localStorage; check browser privacy settings |
| **Hot reload not working** | Restart React dev server: `npm start` |

### Database Issues

| Problem | Solution |
|---------|----------|
| **No demo data visible** | Run manual seed: `POST /api/debug/seed` or restart server |
| **Database locked** | Kill MongoDB: `mongod --shutdown` then restart |
| **Duplicate key errors** | Drop collection: `db.collectionName.drop()` and reseed |

---

## 📚 Additional Resources

**Documentation**
- [API Reference](docs/API_REFERENCE.md) — Complete endpoint documentation
- [Deployment Guide](docs/DEPLOYMENT.md) — Production deployment options
- [Architecture Guide](docs/ARCHITECTURE.md) — System design decisions

**Learning Resources**
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Docs](https://react.dev)
- [JWT Introduction](https://jwt.io/introduction)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

**Code Style**: Use ES6+, add comments for complex logic, follow existing naming conventions.

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) file for details.

---

## 👥 Team

Created as a modern food delivery platform demonstrating:
- Full-stack JavaScript (MERN stack)
- MongoDB schema design
- JWT authentication with role-based access
- Real-time order tracking
- Advanced features (reverse bidding, AI recommendations)

---

## 🙏 Support

For issues, questions, or suggestions:
1. Check [Troubleshooting section](#-troubleshooting)
2. Review [API Reference](docs/API_REFERENCE.md)
3. Check [GitHub Issues](https://github.com/KuppamDenethkumar/parrot-web/issues)

---

**Made with ❤️ | Parrot Food Delivery Platform**
