// import React, { useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import './CheckoutPage.css';

// const CheckoutPage = ({ cart, navigate, onOrderPlaced }) => {
//   const { user, isSignedIn } = useUser();

//   const [address, setAddress] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError]     = useState('');

//   const safeCart = cart || [];

// const total      = safeCart.reduce((sum, i) => sum + i.price * i.qty, 0);
// const totalItems = safeCart.reduce((sum, i) => sum + i.qty, 0);

//   // const total      = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
//   // const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

//   const handlePlaceOrder = async () => {
//     if (!isSignedIn || !user) {
//       navigate('login');
//       return;
//     }

//     if (!address.trim()) {
//       setError('Please enter your delivery address.');
//       return;
//     }

//     if (!safeCart.length) {
//       setError('Your cart is empty.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     // Get user ID safely
//     const userId =
//       user.id ||
//       user.externalId ||
//       user.emailAddresses?.[0]?.emailAddress ||
//       'guest';

//     console.log('USER ID:', userId);

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId,
//           items: safeCart.map(i => ({
//             name: i.name,
//             price: i.price,
//             quantity: i.qty,
//           })),
//           totalAmount: total,
//           deliveryAddress: address,
//           status: 'confirmed',
//           paymentStatus: 'unpaid',
//         }),
//       });

//       const data = await res.json();

//       console.log('Order response:', data);

//       if (data.success) {
//         onOrderPlaced();
//         navigate('order-success');
//       } else {
//         setError(data.message || 'Failed to place order.');
//       }

//     } catch (err) {
//       console.error('Order error:', err);
//       setError('Server not reachable. Check backend.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!safeCart.length || safeCart.length === 0) {
//     return (
//       <div className="checkout-page">
//         <nav className="checkout-nav">
//           <button onClick={() => navigate('home')}>← Back</button>
//           <span onClick={() => navigate('home')}>Eatoza</span>
//         </nav>

//         <div className="checkout-empty">
//           <h2>Your cart is empty 🛒</h2>
//           <button onClick={() => navigate('home')}>
//             Browse Restaurants
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="checkout-page">
//       <nav className="checkout-nav">
//         <button onClick={() => navigate('home')}>← Back</button>
//         <span onClick={() => navigate('home')}>Eatoza</span>
//       </nav>

//       <div className="checkout-container">
//         <h1>Checkout</h1>

//         <div className="checkout-grid">

//           {/* LEFT */}
//           <div className="checkout-summary">
//             <h3>Order Summary</h3>

//             {cart.map(item => (
//               <div key={item._id}>
//                 {item.name} × {item.qty} → ₹{item.price * item.qty}
//               </div>
//             ))}

//             <hr />

//             <p>Total Items: {totalItems}</p>
//             <h3>Total: ₹{total}</h3>
//           </div>

//           {/* RIGHT */}
//           <div className="checkout-details">
//             <h3>Delivery Details</h3>

//             {isSignedIn ? (
//               <div>
//                 <p>{user.firstName || 'User'}</p>
//                 <p>{user.emailAddresses?.[0]?.emailAddress}</p>
//               </div>
//             ) : (
//               <button onClick={() => navigate('login')}>
//                 Login First
//               </button>
//             )}

//             <textarea
//               value={address}
//               onChange={e => setAddress(e.target.value)}
//               placeholder="Enter delivery address..."
//             />

//             {error && <p style={{ color: 'red' }}>{error}</p>}

//             <button
//               onClick={handlePlaceOrder}
//               disabled={loading || !isSignedIn}
//             >
//               {loading ? 'Placing...' : `Place Order ₹${total}`}
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;


































// // import React, { useState } from 'react';
// // import { useUser } from '@clerk/clerk-react';
// // import './CheckoutPage.css';

// // const CheckoutPage = ({ cart, navigate, onOrderPlaced }) => {
// //   const { user, isSignedIn } = useUser();

// //   const [address, setAddress] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   // ✅ SAFE FALLBACK (prevents crash)
// //   const safeCart = cart || [];

// //   const total = safeCart.reduce((sum, i) => sum + i.price * i.qty, 0);
// //   const totalItems = safeCart.reduce((sum, i) => sum + i.qty, 0);

// //   const handlePlaceOrder = async () => {
// //     if (!isSignedIn || !user) {
// //       navigate('login');
// //       return;
// //     }

// //     if (!address.trim()) {
// //       setError('Please enter your delivery address.');
// //       return;
// //     }

// //     if (safeCart.length === 0) {
// //       setError('Your cart is empty.');
// //       return;
// //     }

// //     setLoading(true);
// //     setError('');

// //     const userId =
// //       user.id ||
// //       user.externalId ||
// //       user.emailAddresses?.[0]?.emailAddress ||
// //       'guest';

// //     try {
// //       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           userId,
// //           items: safeCart.map(i => ({
// //             name: i.name,
// //             price: i.price,
// //             quantity: i.qty,
// //           })),
// //           totalAmount: total,
// //           deliveryAddress: address,
// //           status: 'confirmed',
// //           paymentStatus: 'unpaid',
// //         }),
// //       });

// //       const data = await res.json();

// //       if (data.success) {
// //         onOrderPlaced();
// //         navigate('order-success');
// //       } else {
// //         setError(data.message || 'Failed to place order.');
// //       }

// //     } catch (err) {
// //       console.error('Order error:', err);
// //       setError('Server not reachable. Check backend.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ SAFE EMPTY CHECK
// //   if (!safeCart || safeCart.length === 0) {
// //     return (
// //       <div className="checkout-page">
// //         <nav className="checkout-nav">
// //           <button
// //             className="checkout-back"
// //             onClick={() => navigate('home')}
// //           >
// //             ← Back
// //           </button>
// //           <span
// //             className="checkout-logo"
// //             onClick={() => navigate('home')}
// //           >
// //             Eatoza
// //           </span>
// //         </nav>

// //         <div className="checkout-empty">
// //           <h2>Your cart is empty 🛒</h2>
// //           <button
// //             className="place-order-btn"
// //             onClick={() => navigate('home')}
// //           >
// //             Browse Restaurants
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="checkout-page">
// //       <nav className="checkout-nav">
// //         <button
// //           className="checkout-back"
// //           onClick={() => navigate('home')}
// //         >
// //           ← Back
// //         </button>
// //         <span
// //           className="checkout-logo"
// //           onClick={() => navigate('home')}
// //         >
// //           Eatoza
// //         </span>
// //       </nav>

// //       <div className="checkout-container">
// //         <h1>Checkout</h1>

// //         <div className="checkout-grid">

// //           {/* LEFT */}
// //           <div className="checkout-summary">
// //             <h3>Order Summary</h3>

// //             {safeCart.map(item => (
// //               <div key={item._id}>
// //                 {item.name} × {item.qty} → ₹{item.price * item.qty}
// //               </div>
// //             ))}

// //             <hr />

// //             <p>Total Items: {totalItems}</p>
// //             <h3>Total: ₹{total}</h3>
// //           </div>

// //           {/* RIGHT */}
// //           <div className="checkout-details">
// //             <h3>Delivery Details</h3>

// //             {isSignedIn ? (
// //               <div>
// //                 <p>{user.firstName || 'User'}</p>
// //                 <p>{user.emailAddresses?.[0]?.emailAddress}</p>
// //               </div>
// //             ) : (
// //               <button
// //                 className="place-order-btn"
// //                 onClick={() => navigate('login')}
// //               >
// //                 Login First
// //               </button>
// //             )}

// //             <textarea
// //               value={address}
// //               onChange={e => setAddress(e.target.value)}
// //               placeholder="Enter delivery address..."
// //             />

// //             {error && <p style={{ color: 'red' }}>{error}</p>}

// //             <button
// //               className="place-order-btn"
// //               onClick={handlePlaceOrder}
// //               disabled={loading || !isSignedIn}
// //             >
// //               {loading ? 'Placing...' : `Place Order ₹${total}`}
// //             </button>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CheckoutPage;



































import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import './CheckoutPage.css';

const CheckoutPage = ({ cart, navigate, onOrderPlaced }) => {
  const { user, isSignedIn } = useUser();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const safeCart   = cart || [];
  const total      = safeCart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalItems = safeCart.reduce((sum, i) => sum + i.qty, 0);

  const handlePlaceOrder = async () => {
    if (!isSignedIn || !user) { navigate('login'); return; }
    if (!address.trim()) { setError('Please enter your delivery address.'); return; }
    if (!safeCart.length) { setError('Your cart is empty.'); return; }

    setLoading(true);
    setError('');

    const userId = user.id || user.externalId
      || user.emailAddresses?.[0]?.emailAddress || 'guest';

    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res  = await fetch(`${API}/api/orders`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          items: safeCart.map(i => ({
            name: i.name, price: i.price, quantity: i.qty,
          })),
          totalAmount:     total,
          deliveryAddress: address,
          status:          'confirmed',
          paymentStatus:   'unpaid',
        }),
      });
      const data = await res.json();
      if (data.success) { onOrderPlaced(); navigate('order-success'); }
      else setError(data.message || 'Failed to place order.');
    } catch (err) {
      setError('Server not reachable. Check backend.');
    } finally {
      setLoading(false);
    }
  };

  if (!safeCart.length) {
    return (
      <div className="checkout-page">
        <nav className="checkout-nav">
          <button className="checkout-back" onClick={() => navigate('home')}>← Back</button>
          <span className="checkout-logo" onClick={() => navigate('home')}>Eatoza</span>
        </nav>
        <div className="checkout-empty">
          <p>🛒</p>
          <h2>Your cart is empty</h2>
          <button className="place-order-btn" onClick={() => navigate('home')}>
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <nav className="checkout-nav">
        <button className="checkout-back" onClick={() => navigate('home')}>← Back</button>
        <span className="checkout-logo" onClick={() => navigate('home')}>Eatoza</span>
      </nav>

      <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="checkout-grid">

          {/* LEFT — Order summary */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="checkout-items">
              {safeCart.map(item => (
                <div key={item._id} className="checkout-item">
                  <div className="checkout-item-left">
                    <span className={`co-dot ${item.isVeg ? 'veg' : 'nonveg'}`}></span>
                    <div>
                      <p className="co-name">{item.name}</p>
                      <p className="co-qty">× {item.qty}</p>
                    </div>
                  </div>
                  <p className="co-price">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>
            <div className="checkout-totals">
              <div className="checkout-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{total}</span>
              </div>
              <div className="checkout-row">
                <span>Delivery fee</span>
                <span className="free">FREE</span>
              </div>
              <div className="checkout-row total-row">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Delivery details */}
          <div className="checkout-details">
            <h3>Delivery Details</h3>

            {isSignedIn ? (
              <div className="user-info">
                <p>👤 {user.firstName || user.emailAddresses?.[0]?.emailAddress?.split('@')[0]}</p>
                <p>📧 {user.emailAddresses?.[0]?.emailAddress}</p>
              </div>
            ) : (
              <div className="login-prompt">
                <p>Please log in to place an order</p>
                <button className="place-order-btn" onClick={() => navigate('login')}>
                  Log In
                </button>
              </div>
            )}

            <div className="address-field">
              <label>Delivery Address *</label>
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Enter your full delivery address..."
                rows={3}
              />
            </div>

            <div className="payment-method">
              <h4>Payment Method</h4>
              <div className="payment-option selected">
                <span>💵</span>
                <div>
                  <p>Cash on Delivery</p>
                  <p className="payment-sub">Pay when your order arrives</p>
                </div>
                <span className="payment-check">✓</span>
              </div>
            </div>

            {error && <p className="checkout-error">{error}</p>}

            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={loading || !isSignedIn}
            >
              {loading ? 'Placing Order...' : `Place Order · ₹${total}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;


