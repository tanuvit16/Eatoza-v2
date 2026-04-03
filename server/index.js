// // const express  = require('express');
// // const cors     = require('cors');
// // const mongoose = require('mongoose');
// // require('dotenv').config();



// // // Import routes
// // const restaurantRoutes = require('./routes/restaurants');
// // const menuRoutes       = require('./routes/menu');
// // const orderRoutes      = require('./routes/orders');


// // const app  = express();
// // const PORT = process.env.PORT || 5000;

// // // Middleware
// // // app.use(cors());
// // app.use(cors({
// //   origin: "https://eatoza-v2.vercel.app",
// //   credentials: true
// // }));
// // app.use(express.json());

// // // Connect to MongoDB
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log('✅ MongoDB connected'))
// //   .catch((err) => console.log('❌ MongoDB error:', err.message));


// //   // Routes
// // app.use('/api/restaurants', restaurantRoutes);
// // app.use('/api/menu',        menuRoutes);
// // app.use('/api/orders',      orderRoutes);

// // // Health check route
// // app.get('/', (req, res) => {
// //   res.json({ message: '🍽️ Eatoza server is running!' });
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });
// // const otpRoutes = require('./routes/otp');
// // app.use('/api/otp', otpRoutes);
























// const express  = require('express');
// const cors     = require('cors');
// const mongoose = require('mongoose');
// require('dotenv').config();

// // Import routes
// const restaurantRoutes = require('./routes/restaurants');
// const menuRoutes       = require('./routes/menu');
// const orderRoutes      = require('./routes/orders');
// const otpRoutes        = require('./routes/otp');

// const app  = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors({
//   origin: ["https://eatoza-v2.vercel.app", "http://localhost:5173"],
//   credentials: true
// }));

// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch((err) => console.log('❌ MongoDB error:', err.message));

// // Routes
// app.use('/api/restaurants', restaurantRoutes);
// app.use('/api/menu',        menuRoutes);
// app.use('/api/orders',      orderRoutes);
// app.use('/api/otp',         otpRoutes);

// // Health check
// app.get('/', (req, res) => {
//   res.json({ message: '🍽️ Eatoza server is running!' });
// });

// // Start server (LAST)
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


















const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const restaurantRoutes = require('./routes/restaurants');
const menuRoutes       = require('./routes/menu');
const orderRoutes      = require('./routes/orders');
const otpRoutes        = require('./routes/otp');

const app  = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["https://eatoza-v2.vercel.app", "http://localhost:5173"],
  credentials: true
}));

app.use(express.json());

// ✅ FIXED MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB error:', err.message));

// Routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu',        menuRoutes);
app.use('/api/orders',      orderRoutes);
app.use('/api/otp',         otpRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: '🍽️ Eatoza server is running!' });
});

// Start server (LAST)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});