const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  optional: { type: Boolean, default: true },
});

const MenuItemSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, default: '' },
  price:       { type: Number, required: true },
  category:    { type: String, default: 'Main' },
  emoji:       { type: String, default: '🍽️' },
  imageUrl:    { type: String, default: '' },
  available:   { type: Boolean, default: true },
  ingredients: { type: [IngredientSchema], default: [] },
}, { timestamps: true });

const RestaurantSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, default: '' },
  category:    { type: String, default: 'Multi-cuisine' },
  location:    { type: String, default: '' },
  rating:      { type: Number, default: 4.0, min: 0, max: 5 },
  deliveryTime:{ type: String, default: '30-45 min' },
  minOrder:    { type: Number, default: 100 },
  discount:    { type: Number, default: 0 },
  openUntil:   { type: String, default: '11:00 PM' },
  image:       { type: String, default: '' },
  active:      { type: Boolean, default: true },
  menu:        [MenuItemSchema],
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
