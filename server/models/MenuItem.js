const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name:         { type: String, required: true },
  description:  { type: String },
  price:        { type: Number, required: true },
  category:     { type: String },   // e.g. "Starters", "Main Course", "Desserts"
  isVeg:        { type: Boolean, default: false },
  image:        { type: String },
  isAvailable:  { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);