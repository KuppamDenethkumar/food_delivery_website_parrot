const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/offers',      require('./routes/offers'));
app.use('/api/orders',      require('./routes/orders'));
app.use('/api/admin',       require('./routes/admin'));
app.use('/api/restaurant',  require('./routes/restaurant'));
app.use('/api/delivery',    require('./routes/delivery'));
app.use('/api/stats',       require('./routes/stats'));
app.use('/api/bids',        require('./routes/bids'));
app.use('/api/routines',    require('./routes/routines'));
app.use('/api/features',    require('./routes/features'));
app.use('/api/menuRequests', require('./routes/menuRequests'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Debug route - list all accounts
app.get('/api/debug/accounts', async (req, res) => {
  try {
    const User = require('./models/User');
    const users = await User.find({}, 'name email role').lean();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('✅ MongoDB Connected');
    await seedDatabase();
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB Error:', err.message);
    process.exit(1);
  });

async function seedDatabase() {
  const bcrypt     = require('bcryptjs');
  const User       = require('./models/User');
  const Restaurant = require('./models/Restaurant');
  const Offer      = require('./models/Offer');

  // Seed admin and demo user
  if (!(await User.findOne({ role: 'admin' }))) {
    await User.create({
      name: 'Admin',
      email: 'admin@parrot.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin'
    });

    await User.create({
      name: 'Demo User',
      email: 'user@parrot.com',
      password: await bcrypt.hash('user123', 10),
      role: 'user'
    });

    console.log('✅ Demo accounts seeded:');
    console.log('   Admin:  admin@parrot.com  / admin123');
    console.log('   User:   user@parrot.com   / user123');
  }

  // Seed restaurants
  let restaurants = await Restaurant.find();
  if (restaurants.length === 0) {
    restaurants = await Restaurant.insertMany([
      {
        name: "McDonald's",
        description: "I'm lovin' it!",
        category: "Burgers & Fast food",
        location: "Downtown, City",
        deliveryTime: "20-25 mins",
        minOrder: 200,
        rating: 4.3,
        discount: 20,
        openUntil: "11:00 PM",
        menu: [
          { name: 'Burger Whopper', price: 189, category: 'Burgers', description: 'Juicy grilled burger' },
          { name: 'Crispy Fries', price: 89, category: 'Sides', description: 'Golden crispy fries' },
          { name: 'Cola', price: 49, category: 'Drinks', description: 'Chilled cola' }
        ]
      },
      {
        name: 'Pizza Hut',
        description: 'Make it great!',
        category: 'Pizza',
        location: 'Main Street, City',
        deliveryTime: '30-35 mins',
        minOrder: 300,
        rating: 4.1,
        discount: 15,
        openUntil: '11:00 PM',
        menu: [
          { name: 'Cheese Pizza', price: 299, category: 'Pizza', description: 'Classic cheese pizza' },
          { name: 'Pepperoni Pizza', price: 399, category: 'Pizza', description: 'With pepperoni' }
        ]
      }
    ]);
    console.log('✅ Sample restaurants seeded');
  }

  // Seed offers
  let offers = await Offer.find();
  if (offers.length === 0) {
    await Offer.insertMany([
      { title: 'Welcome Offer', code: 'WELCOME20', discount: 20, minOrder: 0 },
      { title: 'Weekend Special', code: 'WEEKEND15', discount: 15, minOrder: 300 }
    ]);
    console.log('✅ Demo offers seeded');
  }
}
