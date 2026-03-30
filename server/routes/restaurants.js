const express    = require('express');
const router     = express.Router();
const Restaurant = require('../models/Restaurant');

// ── GET all restaurants (with optional filters) ──
// Example: /api/restaurants?city=Delhi&cuisine=Chinese
router.get('/', async (req, res) => {
  try {
    const { city, cuisine, search } = req.query;

    // Build filter object dynamically
    let filter = {};

    if (city)    filter.city     = { $regex: city, $options: 'i' };
    // if (cuisine) filter.cuisines = { $in: [cuisine] };
    if (cuisine) filter.cuisines = { $in: [new RegExp(cuisine, 'i')] };
    if (search)  filter.name     = { $regex: search, $options: 'i' };

    const restaurants = await Restaurant.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: restaurants });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET single restaurant by ID ──
// Example: /api/restaurants/64abc123...
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    res.json({ success: true, data: restaurant });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── POST add a new restaurant ──
router.post('/', async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json({ success: true, data: restaurant });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ── PUT update a restaurant ──
router.put('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }   // return updated document
    );
    res.json({ success: true, data: restaurant });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ── DELETE a restaurant ──
router.delete('/:id', async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Restaurant deleted' });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;