import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedRestaurants from './components/FeaturedRestaurants';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddRestaurantPage from './pages/AddRestaurantPage';
import RestaurantPage from './pages/RestaurantPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrdersPage from './pages/OrdersPage';
import Cart from './components/Cart';
import AdminPage from './pages/AdminPage';
import WhyChoose from './components/WhyChoose';

function App() {
  const [currentPage, setCurrentPage]               = useState('home');
  const [filters, setFilters]                       = useState({});
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart]                             = useState([]);
  const [cartOpen, setCartOpen]                     = useState(false);
  const { user } = useUser();

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
if (currentPage === 'admin') return <AdminPage navigate={navigate} />;
  const handleSearch = (newFilters) => {
    setFilters({ ...newFilters });
    setTimeout(() => {
      document.querySelector('.featured-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectRestaurant = (restaurant) => {
    if (!restaurant) { setFilters({}); return; }
    setSelectedRestaurant(restaurant);
    navigate('restaurant');
  };

  const handleAddToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (existing) return prev.map(i => i._id === item._id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleDecreaseFromCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter(i => i._id !== item._id);
      return prev.map(i => i._id === item._id ? { ...i, qty: i.qty - 1 } : i);
    });
  };

  const handleUpdateQty = (id, qty) => {
    if (qty <= 0) setCart(prev => prev.filter(i => i._id !== id));
    else setCart(prev => prev.map(i => i._id === id ? { ...i, qty } : i));
  };

  const handleOrderPlaced = () => setCart([]);
  const handleClearFilters = () => setFilters({});

  if (currentPage === 'login')          return <LoginPage navigate={navigate} />;
  if (currentPage === 'signup')         return <SignupPage navigate={navigate} />;
  if (currentPage === 'add-restaurant') return <AddRestaurantPage navigate={navigate} user={user} />;
  if (currentPage === 'orders')         return <OrdersPage navigate={navigate} />;
  if (currentPage === 'order-success')  return <OrderSuccessPage navigate={navigate} />;
  if (currentPage === 'checkout')       return (
    <CheckoutPage
      cart={cart}
      navigate={navigate}
      onOrderPlaced={handleOrderPlaced}
    />
  );
  if (currentPage === 'restaurant')     return (
    <RestaurantPage
      restaurant={selectedRestaurant}
      navigate={navigate}
      onAddToCart={handleAddToCart}
      onDecreaseFromCart={handleDecreaseFromCart}
      cart={cart}
    />
  );

  return (
    <>
      <Navbar
        navigate={navigate}
        cart={cart}
        onCartClick={() => setCartOpen(true)}
      />
      <Hero onSearch={handleSearch} />
      <Categories onCityClick={(city) => handleSearch({ city })} />
      <FeaturedRestaurants
        filters={filters}
        onSelectRestaurant={handleSelectRestaurant}
        onClearFilters={handleClearFilters}
        currentUserId={user?.id}
      />
      {/* <HowItWorks /> */}
      <WhyChoose/>
      <Footer navigate={navigate} />

      {cartOpen && (
        <Cart
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemove={(id) => setCart(prev => prev.filter(i => i._id !== id))}
          navigate={navigate}
        />
      )}
    </>
  );
}

export default App;
























// import React, { useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import Categories from './components/Categories';
// import FeaturedRestaurants from './components/FeaturedRestaurants';
// import HowItWorks from './components/HowItWorks';
// import Footer from './components/Footer';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import AddRestaurantPage from './pages/AddRestaurantPage';
// import RestaurantPage from './pages/RestaurantPage';
// import Cart from './components/Cart';
// import WhyChoose from './components/WhyChoose';

// function App() {
//   const [currentPage, setCurrentPage]               = useState('home');
//   const [filters, setFilters]                       = useState({});
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
//   const [cart, setCart]                             = useState([]);
//   const [cartOpen, setCartOpen]                     = useState(false);
//   const { user } = useUser();

//   const navigate = (page) => {
//     setCurrentPage(page);
//     window.scrollTo(0, 0);
//   };

//   const handleSearch = (newFilters) => {
//     setFilters({ ...newFilters });
//     setTimeout(() => {
//       document.querySelector('.featured-section')?.scrollIntoView({ behavior: 'smooth' });
//     }, 100);
//   };

//   const handleSelectRestaurant = (restaurant) => {
//     if (!restaurant) { setFilters({}); return; }
//     setSelectedRestaurant(restaurant);
//     navigate('restaurant');
//   };

//   // ── Add item or increase qty ──
//   const handleAddToCart = (item) => {
//     setCart(prev => {
//       const existing = prev.find(i => i._id === item._id);
//       if (existing) {
//         return prev.map(i => i._id === item._id ? { ...i, qty: i.qty + 1 } : i);
//       }
//       return [...prev, { ...item, qty: 1 }];
//     });
//   };

//   // ── Decrease qty or remove if reaches 0 ──
//   const handleDecreaseFromCart = (item) => {
//     setCart(prev => {
//       const existing = prev.find(i => i._id === item._id);
//       if (!existing) return prev;
//       if (existing.qty === 1) return prev.filter(i => i._id !== item._id);
//       return prev.map(i => i._id === item._id ? { ...i, qty: i.qty - 1 } : i);
//     });
//   };

//   // ── Update qty directly (used in cart drawer) ──
//   const handleUpdateQty = (id, qty) => {
//     if (qty <= 0) {
//       setCart(prev => prev.filter(i => i._id !== id));
//     } else {
//       setCart(prev => prev.map(i => i._id === id ? { ...i, qty } : i));
//     }
//   };

//   const handleClearFilters = () => setFilters({});

//   if (currentPage === 'login')          return <LoginPage navigate={navigate} />;
//   if (currentPage === 'signup')         return <SignupPage navigate={navigate} />;
//   if (currentPage === 'add-restaurant') return <AddRestaurantPage navigate={navigate} user={user} />;
//   if (currentPage === 'restaurant')     return (
//     <RestaurantPage
//       restaurant={selectedRestaurant}
//       navigate={navigate}
//       onAddToCart={handleAddToCart}
//       onDecreaseFromCart={handleDecreaseFromCart}
//       cart={cart}
//     />
//   );

//   return (
//     <>
//       <Navbar
//         navigate={navigate}
//         cart={cart}
//         onCartClick={() => setCartOpen(true)}
//       />
//       <Hero onSearch={handleSearch} />
//       <Categories onCityClick={(city) => handleSearch({ city })} />
//       {/* <FeaturedRestaurants
//         filters={filters}
//         onSelectRestaurant={handleSelectRestaurant}
//         onClearFilters={handleClearFilters}
//       /> */}

//       <FeaturedRestaurants
//   filters={filters}
//   onSelectRestaurant={handleSelectRestaurant}
//   onClearFilters={handleClearFilters}
//   currentUserId={user?.id}
// />
//       {/* <HowItWorks /> */}
//       <WhyChoose/>
//       <Footer navigate={navigate} />

//       {/* Cart drawer */}
//       {cartOpen && (
//         <Cart
//           cart={cart}
//           onClose={() => setCartOpen(false)}
//           onUpdateQty={handleUpdateQty}
//           onRemove={(id) => setCart(prev => prev.filter(i => i._id !== id))}
//           navigate={navigate}
//         />
//       )}
//     </>
//   );
// }

// export default App;

























































































