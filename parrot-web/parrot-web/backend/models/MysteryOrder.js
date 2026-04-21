const mongoose = require('mongoose');

const MysteryOrderSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  budget:      { type: Number, required: true },
  allergies:   { type: [String], default: [] },
  diet:        { type: String, default: '' },
  address:     { type: String, required: true },
  status:      { type: String, enum: ['pending','matched','expired'], default: 'pending' },
  restaurantId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', default: null },
  orderId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null },
}, { timestamps: true });

module.exports = mongoose.model('MysteryOrder', MysteryOrderSchema);
