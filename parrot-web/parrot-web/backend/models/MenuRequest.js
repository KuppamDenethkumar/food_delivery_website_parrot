const mongoose = require('mongoose');

const MenuRequestSchema = new mongoose.Schema({
  restaurantId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  restaurantName: { type: String, required: true },
  name:           { type: String, required: true },
  description:    { type: String, default: '' },
  price:          { type: Number, required: true },
  category:       { type: String, default: 'Main' },
  emoji:          { type: String, default: '🍽️' },
  imageUrl:       { type: String, default: '' },
  available:      { type: Boolean, default: true },
  ingredients:    { type: [String], default: [] },
  status:         { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('MenuRequest', MenuRequestSchema);
