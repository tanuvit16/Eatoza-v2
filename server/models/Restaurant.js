const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  tagline:      { type: String },
  cuisines:     [String],                         // e.g. ["North Indian", "Chinese"]
  city:         { type: String, required: true },
  address:      { type: String },
  avgPrice:     { type: Number },                 // price for two
  deliveryTime: { type: Number },                 // minutes
  minOrder:     { type: Number },
  rating:       { type: Number, default: 0 },
  isOpen:       { type: Boolean, default: true },
  image:        { type: String },                 // image URL
  addedBy:      { type: String },                 // Clerk user ID
}, { timestamps: true });                         // adds createdAt, updatedAt automatically

module.exports = mongoose.model('Restaurant', restaurantSchema);