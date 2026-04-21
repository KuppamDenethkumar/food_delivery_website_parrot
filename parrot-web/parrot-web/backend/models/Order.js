const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  menuItemId: { type: mongoose.Schema.Types.ObjectId },
  name:       { type: String, required: true },
  price:      { type: Number, required: true },
  qty:        { type: Number, required: true, min: 1 },
});

const OrderSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  deliveryBoyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  items:         [OrderItemSchema],
  totalAmount:   { type: Number, required: true },
  address:       { type: String, default: '' },
  couponCode:    { type: String, default: null },
  discount:      { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['pending','confirmed','preparing','ready','assigned','out_for_delivery','delivered','rejected'],
    default: 'pending',
  },
  note: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
