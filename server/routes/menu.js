const express  = require('express');
const router   = express.Router();
const MenuItem = require('../models/MenuItem');

// ── GET all menu items for a restaurant ──
router.get('/:restaurantId', async (req, res) => {
  try {
    const items = await MenuItem.find({ 
      restaurantId: req.params.restaurantId 
    });
    res.json({ success: true, data: items });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── POST add a menu item ──
router.post('/', async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json({ success: true, data: item });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ── DELETE a menu item ──
router.delete('/:id', async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Menu item deleted' });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;