const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({
  userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  triggerTime:  { type: String, required: true },
  items:        [{ name: String, price: Number, qty: Number, category: String }],
  active:       { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Routine', RoutineSchema);
