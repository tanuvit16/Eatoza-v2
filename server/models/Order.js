const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId:        { type: String, required: false},  // Clerk user ID
  restaurantId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  items: [{
    name:     String,
    price:    Number,
    quantity: Number,
  }],
  totalAmount:   { type: Number, required: true },
  status:        { 
    type: String, 
    enum: ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  stripePaymentId: { type: String },
  deliveryAddress: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);