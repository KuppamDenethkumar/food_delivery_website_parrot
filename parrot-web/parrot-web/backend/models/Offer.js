const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  code:        { type: String, required: true, unique: true, uppercase: true },
  discount:    { type: Number, required: true },
  minOrder:    { type: Number, default: 0 },
  active:      { type: Boolean, default: true },
  emoji:       { type: String, default: '🎁' },
  restaurantName: { type: String, default: 'All Restaurants' },
  validUntil:  { type: Date, default: new Date('2026-12-31') },
}, { timestamps: true });

module.exports = mongoose.model('Offer', OfferSchema);
