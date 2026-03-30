// // const express = require('express');
// // const router  = express.Router();
// // const Order   = require('../models/Order');

// // // ── POST place a new order ──
// // router.post('/', async (req, res) => {
// //   try {
// //     const order = new Order(req.body);
// //     await order.save();
// //     res.status(201).json({ success: true, data: order });

// //   } catch (err) {
// //     res.status(400).json({ success: false, message: err.message });
// //   }
// // });

// // // ── GET all orders for a user ──
// // router.get('/user/:userId', async (req, res) => {
// //   try {
// //     const orders = await Order.find({ userId: req.params.userId })
// //       .populate('restaurantId', 'name city')  // fetch restaurant name+city
// //       .sort({ createdAt: -1 });
// //     res.json({ success: true, data: orders });

// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // });

// // // ── GET single order by ID ──
// // router.get('/:id', async (req, res) => {
// //   try {
// //     const order = await Order.findById(req.params.id)
// //       .populate('restaurantId', 'name city');
// //     res.json({ success: true, data: order });

// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // });

// // // ── PUT update order status (for admin) ──
// // router.put('/:id/status', async (req, res) => {
// //   try {
// //     const order = await Order.findByIdAndUpdate(
// //       req.params.id,
// //       { status: req.body.status },
// //       { new: true }
// //     );
// //     res.json({ success: true, data: order });

// //   } catch (err) {
// //     res.status(400).json({ success: false, message: err.message });
// //   }
// // });

// // module.exports = router;





// const express    = require('express');
// const router     = express.Router();
// const Order      = require('../models/Order');
// const requireAuth = require('../middleware/auth');

// // ── POST place a new order (must be logged in) ──
// router.post('/', requireAuth, async (req, res) => {
//   try {
//     const order = new Order({
//       ...req.body,
//       userId: req.userId,   // comes from Clerk token
//     });
//     await order.save();
//     res.status(201).json({ success: true, data: order });

//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// // ── GET all orders for logged in user ──
// router.get('/my-orders', requireAuth, async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.userId })
//       .populate('restaurantId', 'name city')
//       .sort({ createdAt: -1 });
//     res.json({ success: true, data: orders });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // ── GET single order by ID ──
// router.get('/:id', requireAuth, async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//       .populate('restaurantId', 'name city');
//     res.json({ success: true, data: order });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // ── PUT update order status (admin only) ──
// router.put('/:id/status', requireAuth, async (req, res) => {
//   try {
//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status: req.body.status },
//       { new: true }
//     );
//     res.json({ success: true, data: order });

//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });


// // ── GET all orders (debug only) ──
// router.get('/all', async (req, res) => {
//   try {
//     const orders = await Order.find({}).sort({ createdAt: -1 });
//     res.json({ success: true, data: orders });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });



const express     = require('express');
const router      = express.Router();
const Order       = require('../models/Order');
const requireAuth = require('../middleware/auth');

// ── GET all orders (debug only) ──
router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});









// ── POST place a new order (must be logged in) ──
router.post('/', async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      userId: req.userId,
    });
    await order.save();
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ── GET all orders for logged in user ──
router.get('/my-orders', requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate('restaurantId', 'name city')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET all orders for a specific user (no auth needed for now) ──
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});











// ── GET single order by ID ──
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurantId', 'name city');
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PUT update order status (admin only) ──
router.put('/:id/status', requireAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;