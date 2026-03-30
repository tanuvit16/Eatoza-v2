// const mongoose = require('mongoose');
// const Restaurant = require('./models/Restaurant');
// require('dotenv').config();

// const restaurants = [
//   {
//     name: 'Spice Garden',
//     tagline: 'Authentic flavours from the heart of India',
//     cuisines: ['North Indian', 'Mughlai'],
//     city: 'Delhi',
//     address: 'Connaught Place, New Delhi',
//     avgPrice: 400,
//     deliveryTime: 30,
//     minOrder: 150,
//     rating: 4.5,
//     isOpen: true,
//     image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500',
//   },
//   {
//     name: 'The Burger Lab',
//     tagline: 'Science never tasted this good',
//     cuisines: ['Burgers', 'American'],
//     city: 'Mumbai',
//     address: 'Bandra West, Mumbai',
//     avgPrice: 300,
//     deliveryTime: 20,
//     minOrder: 100,
//     rating: 4.3,
//     isOpen: true,
//     image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
//   },
//   {
//     name: 'Sushi Sakura',
//     tagline: 'Tokyo vibes in your city',
//     cuisines: ['Japanese', 'Sushi'],
//     city: 'Bengaluru',
//     address: 'Indiranagar, Bengaluru',
//     avgPrice: 900,
//     deliveryTime: 45,
//     minOrder: 300,
//     rating: 4.7,
//     isOpen: true,
//     image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
//   },
//   {
//     name: 'Pizza Palazzo',
//     tagline: 'Straight from the wood-fired oven',
//     cuisines: ['Italian', 'Pizza'],
//     city: 'Delhi',
//     address: 'Hauz Khas Village, Delhi',
//     avgPrice: 500,
//     deliveryTime: 35,
//     minOrder: 200,
//     rating: 4.4,
//     isOpen: true,
//     image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
//   },
//   {
//     name: 'Biryani House',
//     tagline: 'Every grain tells a story',
//     cuisines: ['Biryani', 'Hyderabadi'],
//     city: 'Hyderabad',
//     address: 'Jubilee Hills, Hyderabad',
//     avgPrice: 350,
//     deliveryTime: 40,
//     minOrder: 150,
//     rating: 4.6,
//     isOpen: true,
//     image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500',
//   },
//   {
//     name: 'Cake & Crumbs',
//     tagline: 'Life is short, eat dessert first',
//     cuisines: ['Desserts', 'Bakery'],
//     city: 'Mumbai',
//     address: 'Juhu, Mumbai',
//     avgPrice: 250,
//     deliveryTime: 20,
//     minOrder: 100,
//     rating: 4.8,
//     isOpen: true,
//     image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
//   },
// ];

// const seed = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       serverSelectionTimeoutMS: 5000,
//     });
//     console.log('✅ MongoDB connected');

//     // Clear existing restaurants
//     await Restaurant.deleteMany({});
//     console.log('🗑️  Cleared existing restaurants');

//     // Insert new ones
//     await Restaurant.insertMany(restaurants);
//     console.log(`🌱 Seeded ${restaurants.length} restaurants successfully!`);

//     process.exit(0);
//   } catch (err) {
//     console.error('❌ Seed error:', err.message);
//     process.exit(1);
//   }
// };

// seed();
























const mongoose   = require('mongoose');
const Restaurant = require('./models/Restaurant');
const MenuItem   = require('./models/MenuItem');
require('dotenv').config();

const restaurants = [
  {
    name: 'Spice Garden',
    tagline: 'Authentic flavours from the heart of India',
    cuisines: ['North Indian', 'Mughlai'],
    city: 'Delhi',
    address: 'Connaught Place, New Delhi',
    avgPrice: 400, deliveryTime: 30, minOrder: 150, rating: 4.5, isOpen: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500',
  },
  {
    name: 'The Burger Lab',
    tagline: 'Science never tasted this good',
    cuisines: ['Burgers', 'American'],
    city: 'Mumbai',
    address: 'Bandra West, Mumbai',
    avgPrice: 300, deliveryTime: 20, minOrder: 100, rating: 4.3, isOpen: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
  },
  {
    name: 'Sushi Sakura',
    tagline: 'Tokyo vibes in your city',
    cuisines: ['Japanese', 'Sushi'],
    city: 'Bengaluru',
    address: 'Indiranagar, Bengaluru',
    avgPrice: 900, deliveryTime: 45, minOrder: 300, rating: 4.7, isOpen: true,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
  },
  {
    name: 'Pizza Palazzo',
    tagline: 'Straight from the wood-fired oven',
    cuisines: ['Italian', 'Pizza'],
    city: 'Delhi',
    address: 'Hauz Khas Village, Delhi',
    avgPrice: 500, deliveryTime: 35, minOrder: 200, rating: 4.4, isOpen: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
  },
  {
    name: 'Biryani House',
    tagline: 'Every grain tells a story',
    cuisines: ['Biryani', 'Hyderabadi'],
    city: 'Hyderabad',
    address: 'Jubilee Hills, Hyderabad',
    avgPrice: 350, deliveryTime: 40, minOrder: 150, rating: 4.6, isOpen: true,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500',
  },
  {
    name: 'Cake & Crumbs',
    tagline: 'Life is short, eat dessert first',
    cuisines: ['Desserts', 'Bakery'],
    city: 'Mumbai',
    address: 'Juhu, Mumbai',
    avgPrice: 250, deliveryTime: 20, minOrder: 100, rating: 4.8, isOpen: true,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
  },
];

const getMenuItems = (restaurantId, name) => {
  const menus = {
    'Spice Garden': [
      { name: 'Butter Chicken',     description: 'Creamy tomato-based curry with tender chicken', price: 320, category: 'Main Course', isVeg: false, isAvailable: true },
      { name: 'Dal Makhani',        description: 'Slow-cooked black lentils in rich butter gravy', price: 220, category: 'Main Course', isVeg: true,  isAvailable: true },
      { name: 'Paneer Tikka',       description: 'Grilled cottage cheese with spices',             price: 280, category: 'Starters',   isVeg: true,  isAvailable: true },
      { name: 'Chicken Biryani',    description: 'Fragrant basmati rice with spiced chicken',      price: 350, category: 'Main Course', isVeg: false, isAvailable: true },
      { name: 'Garlic Naan',        description: 'Soft bread baked in tandoor with garlic',        price: 60,  category: 'Breads',     isVeg: true,  isAvailable: true },
      { name: 'Gulab Jamun',        description: 'Soft milk dumplings in sugar syrup',             price: 120, category: 'Desserts',   isVeg: true,  isAvailable: true },
    ],
    'The Burger Lab': [
      { name: 'Classic Smash Burger',  description: 'Double smashed patty with special sauce',       price: 299, category: 'Burgers',   isVeg: false, isAvailable: true },
      { name: 'Crispy Chicken Burger', description: 'Fried chicken fillet with coleslaw',            price: 249, category: 'Burgers',   isVeg: false, isAvailable: true },
      { name: 'Veggie Delight',        description: 'Grilled veggie patty with fresh veggies',       price: 199, category: 'Burgers',   isVeg: true,  isAvailable: true },
      { name: 'Loaded Fries',          description: 'Crispy fries with cheese sauce and jalapeños',  price: 149, category: 'Sides',     isVeg: true,  isAvailable: true },
      { name: 'Chocolate Shake',       description: 'Thick creamy chocolate milkshake',              price: 129, category: 'Beverages', isVeg: true,  isAvailable: true },
      { name: 'Onion Rings',           description: 'Golden crispy onion rings with dip',            price: 99,  category: 'Sides',     isVeg: true,  isAvailable: true },
    ],
    'Sushi Sakura': [
      { name: 'Salmon Nigiri (2pc)',   description: 'Fresh salmon over seasoned rice',               price: 380, category: 'Nigiri',    isVeg: false, isAvailable: true },
      { name: 'Dragon Roll (8pc)',     description: 'Prawn tempura topped with avocado',             price: 650, category: 'Rolls',     isVeg: false, isAvailable: true },
      { name: 'Veggie Maki (6pc)',     description: 'Cucumber and avocado maki roll',                price: 320, category: 'Rolls',     isVeg: true,  isAvailable: true },
      { name: 'Miso Soup',            description: 'Traditional Japanese soup with tofu',            price: 150, category: 'Soups',     isVeg: true,  isAvailable: true },
      { name: 'Edamame',              description: 'Steamed salted soybean pods',                    price: 180, category: 'Starters',  isVeg: true,  isAvailable: true },
      { name: 'Matcha Ice Cream',     description: 'Creamy green tea ice cream',                     price: 220, category: 'Desserts',  isVeg: true,  isAvailable: true },
    ],
    'Pizza Palazzo': [
      { name: 'Margherita',           description: 'Classic tomato, mozzarella and fresh basil',    price: 349, category: 'Pizzas',    isVeg: true,  isAvailable: true },
      { name: 'Pepperoni Feast',      description: 'Loaded with spicy pepperoni slices',            price: 449, category: 'Pizzas',    isVeg: false, isAvailable: true },
      { name: 'BBQ Chicken Pizza',    description: 'Smoky BBQ sauce with grilled chicken',          price: 479, category: 'Pizzas',    isVeg: false, isAvailable: true },
      { name: 'Truffle Mushroom',     description: 'Wild mushrooms with truffle oil drizzle',       price: 499, category: 'Pizzas',    isVeg: true,  isAvailable: true },
      { name: 'Garlic Bread',         description: 'Toasted bread with herb garlic butter',         price: 149, category: 'Sides',     isVeg: true,  isAvailable: true },
      { name: 'Tiramisu',             description: 'Classic Italian coffee dessert',                price: 199, category: 'Desserts',  isVeg: true,  isAvailable: true },
    ],
    'Biryani House': [
      { name: 'Hyderabadi Dum Biryani', description: 'Slow-cooked chicken biryani Hyderabadi style', price: 320, category: 'Biryani',   isVeg: false, isAvailable: true },
      { name: 'Veg Dum Biryani',        description: 'Fragrant rice with mixed vegetables',          price: 250, category: 'Biryani',   isVeg: true,  isAvailable: true },
      { name: 'Mutton Biryani',         description: 'Tender mutton pieces in aromatic rice',        price: 420, category: 'Biryani',   isVeg: false, isAvailable: true },
      { name: 'Raita',                  description: 'Cooling yoghurt with cucumber and cumin',      price: 60,  category: 'Sides',     isVeg: true,  isAvailable: true },
      { name: 'Mirchi Ka Salan',        description: 'Spicy chilli curry served with biryani',       price: 80,  category: 'Sides',     isVeg: true,  isAvailable: true },
      { name: 'Double Ka Meetha',       description: 'Hyderabadi bread pudding dessert',             price: 120, category: 'Desserts',  isVeg: true,  isAvailable: true },
    ],
    'Cake & Crumbs': [
      { name: 'Chocolate Truffle Cake', description: 'Rich dark chocolate layers with ganache',     price: 350, category: 'Cakes',     isVeg: true,  isAvailable: true },
      { name: 'Red Velvet Cake',        description: 'Classic red velvet with cream cheese frosting', price: 320, category: 'Cakes',   isVeg: true,  isAvailable: true },
      { name: 'Croissant',             description: 'Buttery flaky French pastry',                  price: 120, category: 'Pastries',  isVeg: true,  isAvailable: true },
      { name: 'Blueberry Cheesecake',  description: 'Creamy cheesecake with blueberry compote',     price: 280, category: 'Cakes',     isVeg: true,  isAvailable: true },
      { name: 'Cold Coffee',           description: 'Chilled coffee with whipped cream',             price: 150, category: 'Beverages', isVeg: true,  isAvailable: true },
      { name: 'Cinnamon Roll',         description: 'Warm cinnamon roll with vanilla glaze',         price: 140, category: 'Pastries',  isVeg: true,  isAvailable: true },
    ],
  };
  return (menus[name] || []).map(item => ({ ...item, restaurantId }));
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB connected');

    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});
    console.log('🗑️  Cleared existing data');

    const createdRestaurants = await Restaurant.insertMany(restaurants);
    console.log(`🌱 Seeded ${createdRestaurants.length} restaurants`);

    const allMenuItems = createdRestaurants.flatMap(r =>
      getMenuItems(r._id, r.name)
    );

    await MenuItem.insertMany(allMenuItems);
    console.log(`🍽️  Seeded ${allMenuItems.length} menu items`);

    console.log('✅ All done!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seed();