const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  budget:      { type: Number, required: true },
  address:     { type: String, required: true },
  dietaryNotes:{ type: String, default: '' },
  radius:      { type: Number, default: 3 },
  status:      { type: String, enum: ['open','accepted','expired'], default: 'open' },
  expiresAt:   { type: Date, required: true },
  acceptedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', default: null },
  orderId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Bid', BidSchema);
