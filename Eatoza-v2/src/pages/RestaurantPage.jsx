// import React, { useState, useEffect } from 'react';
// import './RestaurantPage.css';

// const categories = ['All', 'Starters', 'Main Course', 'Biryani', 'Burgers', 
//                     'Pizzas', 'Rolls', 'Nigiri', 'Sides', 'Breads', 
//                     'Beverages', 'Desserts', 'Cakes', 'Pastries', 'Soups'];

// const MenuItem = ({ item, onAdd }) => (
//   <div className="menu-item">
//     <div className="menu-item-info">
//       <div className="veg-badge">
//         <span className={`veg-dot ${item.isVeg ? 'veg' : 'nonveg'}`}></span>
//       </div>
//       <h4>{item.name}</h4>
//       <p className="menu-desc">{item.description}</p>
//       <p className="menu-price">₹{item.price}</p>
//     </div>
//     <button className="add-btn" onClick={() => onAdd(item)}>+ Add</button>
//   </div>
// );

// const RestaurantPage = ({ restaurant, navigate, onAddToCart }) => {
//   const [menuItems, setMenuItems]       = useState([]);
//   const [loading, setLoading]           = useState(true);
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [added, setAdded]               = useState({});

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/menu/${restaurant._id}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) setMenuItems(data.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [restaurant._id]);

//   const handleAdd = (item) => {
//     onAddToCart(item);
//     setAdded(a => ({ ...a, [item._id]: true }));
//     setTimeout(() => {
//       setAdded(a => ({ ...a, [item._id]: false }));
//     }, 1000);
//   };

//   // Get categories that actually have items
//   const availableCategories = ['All', ...new Set(menuItems.map(i => i.category))];

//   const filtered = activeCategory === 'All'
//     ? menuItems
//     : menuItems.filter(i => i.category === activeCategory);

//   return (
//     <div className="rp-page">
//       {/* Navbar */}
//       <nav className="rp-nav">
//         <button className="rp-back" onClick={() => navigate('home')}>← Back</button>
//         <span className="rp-logo" onClick={() => navigate('home')}>Eatoza</span>
//       </nav>

//       {/* Hero */}
//       <div className="rp-hero">
//         {restaurant.image && (
//           <img src={restaurant.image} alt={restaurant.name} className="rp-hero-img" />
//         )}
//         <div className="rp-hero-overlay"></div>
//         <div className="rp-hero-content">
//           <h1>{restaurant.name}</h1>
//           <p>{restaurant.tagline}</p>
//           <div className="rp-badges">
//             <span className="rp-badge">⭐ {restaurant.rating}</span>
//             <span className="rp-badge">⏱ {restaurant.deliveryTime} mins</span>
//             <span className="rp-badge">₹{restaurant.avgPrice} for two</span>
//             <span className="rp-badge">📍 {restaurant.city}</span>
//             <span className={`rp-badge ${restaurant.isOpen ? 'open' : 'closed'}`}>
//               {restaurant.isOpen ? '🟢 Open' : '🔴 Closed'}
//             </span>
//           </div>
//           <div className="rp-cuisines">
//             {restaurant.cuisines.map(c => (
//               <span key={c} className="rp-cuisine-tag">{c}</span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Menu */}
//       <div className="rp-content">
//         <h2 className="rp-menu-title">Menu</h2>

//         {/* Category filter */}
//         <div className="rp-categories">
//           {availableCategories.map(cat => (
//             <button
//               key={cat}
//               className={`rp-cat-btn ${activeCategory === cat ? 'active' : ''}`}
//               onClick={() => setActiveCategory(cat)}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Menu items */}
//         {loading ? (
//           <p className="rp-loading">Loading menu...</p>
//         ) : filtered.length === 0 ? (
//           <p className="rp-empty">No items in this category</p>
//         ) : (
//           <div className="menu-grid">
//             {filtered.map(item => (
//               <MenuItem
//                 key={item._id}
//                 item={item}
//                 onAdd={handleAdd}
//                 added={added[item._id]}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RestaurantPage;







import React, { useState, useEffect } from 'react';
import './RestaurantPage.css';

const MenuItem = ({ item, onAdd, onDecrease, qty }) => (
  <div className="menu-item">
    <div className="menu-item-info">
      <div className="veg-badge">
        <span className={`veg-dot ${item.isVeg ? 'veg' : 'nonveg'}`}></span>
      </div>
      <h4>{item.name}</h4>
      <p className="menu-desc">{item.description}</p>
      <p className="menu-price">₹{item.price}</p>
    </div>

    {qty === 0 ? (
      <button className="add-btn" onClick={() => onAdd(item)}>+ Add</button>
    ) : (
      <div className="qty-control">
        <button onClick={() => onDecrease(item)}>−</button>
        <span>{qty}</span>
        <button onClick={() => onAdd(item)}>+</button>
      </div>
    )}
  </div>
);

const RestaurantPage = ({ restaurant, navigate, onAddToCart, onDecreaseFromCart, cart }) => {
  const [menuItems, setMenuItems]           = useState([]);
  const [loading, setLoading]               = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch(`http://localhost:5000/api/menu/${restaurant._id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setMenuItems(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [restaurant._id]);

  const getQty = (itemId) => {
    const found = cart.find(i => i._id === itemId);
    return found ? found.qty : 0;
  };

  const availableCategories = ['All', ...new Set(menuItems.map(i => i.category))];

  const filtered = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(i => i.category === activeCategory);

  const totalCartItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalCartPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="rp-page">
      {/* Navbar */}
      <nav className="rp-nav">
        <button className="rp-back" onClick={() => navigate('home')}>← Back</button>
        <span className="rp-logo" onClick={() => navigate('home')}>Eatoza</span>
      </nav>

      {/* Hero */}
      <div className="rp-hero">
        {restaurant.image && (
          <img src={restaurant.image} alt={restaurant.name} className="rp-hero-img" />
        )}
        <div className="rp-hero-overlay"></div>
        <div className="rp-hero-content">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.tagline}</p>
          <div className="rp-badges">
            <span className="rp-badge">⭐ {restaurant.rating}</span>
            <span className="rp-badge">⏱ {restaurant.deliveryTime} mins</span>
            <span className="rp-badge">₹{restaurant.avgPrice} for two</span>
            <span className="rp-badge">📍 {restaurant.city}</span>
            <span className={`rp-badge ${restaurant.isOpen ? 'open' : 'closed'}`}>
              {restaurant.isOpen ? '🟢 Open' : '🔴 Closed'}
            </span>
          </div>
          <div className="rp-cuisines">
            {restaurant.cuisines.map(c => (
              <span key={c} className="rp-cuisine-tag">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="rp-content">
        <h2 className="rp-menu-title">Menu</h2>

        {/* Category filter */}
        <div className="rp-categories">
          {availableCategories.map(cat => (
            <button
              key={cat}
              className={`rp-cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu items */}
        {loading ? (
          <p className="rp-loading">Loading menu...</p>
        ) : filtered.length === 0 ? (
          <p className="rp-empty">No items in this category</p>
        ) : (
          <div className="menu-grid">
            {filtered.map(item => (
              <MenuItem
                key={item._id}
                item={item}
                onAdd={onAddToCart}
                onDecrease={onDecreaseFromCart}
                qty={getQty(item._id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating cart bar — shows when items in cart */}
      {totalCartItems > 0 && (
        <div className="floating-cart" onClick={() => navigate('checkout')}>
          <span>{totalCartItems} item{totalCartItems > 1 ? 's' : ''} added</span>
          <span>₹{totalCartPrice} →</span>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;