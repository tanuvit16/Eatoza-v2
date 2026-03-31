// import React, { useState, useEffect } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import './AdminPage.css';
// import OtpModal from '../components/OtpModal';


// const [showOtp, setShowOtp]         = useState(false);
// const [pendingAction, setPendingAction] = useState(null);

// // ── Set your Clerk user ID here as admin ──
// const ADMIN_EMAIL = 'tanuvit16@gmail.com'; // your email

// const statusColors = {
//   pending:   { bg: '#fff8e1', color: '#f59e0b' },
//   confirmed: { bg: '#e8f5e9', color: '#2ecc71' },
//   preparing: { bg: '#e3f2fd', color: '#3498db' },
//   delivered: { bg: '#e8f5e9', color: '#27ae60' },
//   cancelled: { bg: '#fce4ec', color: '#e74c3c' },
// };

// const AdminPage = ({ navigate }) => {
//   const { user, isSignedIn } = useUser();
//   const [tab, setTab]                   = useState('restaurants');
//   const [restaurants, setRestaurants]   = useState([]);
//   const [orders, setOrders]             = useState([]);
//   const [loadingR, setLoadingR]         = useState(true);
//   const [loadingO, setLoadingO]         = useState(true);
//   const [stats, setStats]               = useState({ restaurants: 0, orders: 0, revenue: 0 });

//   // Check if current user is admin
//   const isAdmin = isSignedIn &&
//     user?.emailAddresses?.[0]?.emailAddress === ADMIN_EMAIL;

//   useEffect(() => {
//     // Fetch restaurants
//     fetch('http://localhost:5000/api/restaurants')
//       .then(r => r.json())
//       .then(data => {
//         if (data.success) {
//           setRestaurants(data.data);
//           setStats(s => ({ ...s, restaurants: data.data.length }));
//         }
//         setLoadingR(false);
//       });

//     // Fetch all orders
//     fetch('http://localhost:5000/api/orders/all')
//       .then(r => r.json())
//       .then(data => {
//         if (data.success) {
//           setOrders(data.data);
//           const revenue = data.data.reduce((sum, o) => sum + o.totalAmount, 0);
//           setStats(s => ({ ...s, orders: data.data.length, revenue }));
//         }
//         setLoadingO(false);
//       });
//   }, []);

//   // const handleDeleteRestaurant = async (id, name) => {
//   //   if (!window.confirm(`Delete "${name}"?`)) return;
//   //   const res  = await fetch(`http://localhost:5000/api/restaurants/${id}`, { method: 'DELETE' });
//   //   const data = await res.json();
//   //   if (data.success) setRestaurants(prev => prev.filter(r => r._id !== id));
//   // };


//   const handleDeleteRestaurant = (id, name) => {
//   setPendingAction({ type: 'delete-restaurant', id, name });
//   setShowOtp(true);
// };

// const confirmDeleteRestaurant = async (id, name) => {
//   if (!window.confirm(`Delete "${name}"?`)) return;
//   const res  = await fetch(`http://localhost:5000/api/restaurants/${id}`, { method: 'DELETE' });
//   const data = await res.json();
//   if (data.success) setRestaurants(prev => prev.filter(r => r._id !== id));
// };
//   // const handleUpdateOrderStatus = async (id, status) => {
//   //   const res  = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
//   //     method:  'PUT',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body:    JSON.stringify({ status }),
//   //   });
//   //   const data = await res.json();
//   //   if (data.success) {
//   //     setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
//   //   }
//   // };



//   const handleUpdateOrderStatus = (id, status) => {
//   setPendingAction({ type: 'update-order', id, status });
//   setShowOtp(true);
// };

// const confirmUpdateOrderStatus = async (id, status) => {
//   const res  = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
//     method:  'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body:    JSON.stringify({ status }),
//   });
//   const data = await res.json();
//   if (data.success) {
//     setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
//   }
// };

//   // ── Not admin ──
//   if (!isSignedIn) {
//     return (
//       <div className="admin-page">
//         <div className="admin-blocked">
//           <p>🔒</p>
//           <h2>Please log in</h2>
//           <button onClick={() => navigate('login')}>Log In</button>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="admin-page">
//         <div className="admin-blocked">
//           <p>⛔</p>
//           <h2>Access Denied</h2>
//           <p>You don't have admin permissions.</p>
//           <button onClick={() => navigate('home')}>Back to Home</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-page">
//       {/* Nav */}
//       <nav className="admin-nav">
//         <span className="admin-logo" onClick={() => navigate('home')}>Eatoza</span>
//         <span className="admin-badge">Admin Dashboard</span>
//         <button className="admin-back" onClick={() => navigate('home')}>← Back to Site</button>
//       </nav>

//       {/* Stats */}
//       <div className="admin-stats">
//         <div className="stat-card">
//           <p className="stat-value">{stats.restaurants}</p>
//           <p className="stat-label">🍽️ Restaurants</p>
//         </div>
//         <div className="stat-card">
//           <p className="stat-value">{stats.orders}</p>
//           <p className="stat-label">📦 Total Orders</p>
//         </div>
//         <div className="stat-card">
//           <p className="stat-value">₹{stats.revenue.toLocaleString()}</p>
//           <p className="stat-label">💰 Total Revenue</p>
//         </div>
//         <div className="stat-card">
//           <p className="stat-value">
//             {orders.filter(o => o.status === 'confirmed').length}
//           </p>
//           <p className="stat-label">✅ Confirmed Orders</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="admin-container">
//         <div className="admin-tabs">
//           <button
//             className={`admin-tab ${tab === 'restaurants' ? 'active' : ''}`}
//             onClick={() => setTab('restaurants')}
//           >
//             🍽️ Restaurants ({restaurants.length})
//           </button>
//           <button
//             className={`admin-tab ${tab === 'orders' ? 'active' : ''}`}
//             onClick={() => setTab('orders')}
//           >
//             📦 Orders ({orders.length})
//           </button>
//         </div>

//         {/* ── Restaurants Tab ── */}
//         {tab === 'restaurants' && (
//           <div className="admin-section">
//             {loadingR ? (
//               <p className="admin-loading">Loading restaurants...</p>
//             ) : (
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>City</th>
//                     <th>Cuisines</th>
//                     <th>Rating</th>
//                     <th>Price</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {restaurants.map(r => (
//                     <tr key={r._id}>
//                       <td>
//                         <div className="admin-restaurant-name">
//                           {r.image && (
//                             <img src={r.image} alt={r.name}
//                               className="admin-restaurant-img" />
//                           )}
//                           <span>{r.name}</span>
//                         </div>
//                       </td>
//                       <td>{r.city}</td>
//                       <td>
//                         <div className="admin-tags">
//                           {r.cuisines.slice(0, 2).map(c => (
//                             <span key={c} className="admin-tag">{c}</span>
//                           ))}
//                         </div>
//                       </td>
//                       <td>⭐ {r.rating}</td>
//                       <td>₹{r.avgPrice}</td>
//                       <td>
//                         <span className={`admin-status ${r.isOpen ? 'open' : 'closed'}`}>
//                           {r.isOpen ? 'Open' : 'Closed'}
//                         </span>
//                       </td>
//                       <td>
//                         <button
//                           className="admin-delete-btn"
//                           onClick={() => handleDeleteRestaurant(r._id, r.name)}
//                         >
//                           🗑️ Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         )}

//         {/* ── Orders Tab ── */}
//         {tab === 'orders' && (
//           <div className="admin-section">
//             {loadingO ? (
//               <p className="admin-loading">Loading orders...</p>
//             ) : orders.length === 0 ? (
//               <p className="admin-empty">No orders yet</p>
//             ) : (
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>Order ID</th>
//                     <th>Items</th>
//                     <th>Address</th>
//                     <th>Total</th>
//                     <th>Date</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map(o => (
//                     <tr key={o._id}>
//                       <td className="order-id-cell">
//                         #{o._id.slice(-6).toUpperCase()}
//                       </td>
//                       <td>
//                         <div className="admin-order-items">
//                           {o.items.map((item, i) => (
//                             <span key={i}>{item.name} ×{item.quantity}</span>
//                           ))}
//                         </div>
//                       </td>
//                       <td className="admin-address">{o.deliveryAddress}</td>
//                       <td><strong>₹{o.totalAmount}</strong></td>
//                       <td className="admin-date">
//                         {new Date(o.createdAt).toLocaleDateString('en-IN', {
//                           day: 'numeric', month: 'short', year: 'numeric'
//                         })}
//                       </td>
//                       <td>
//                         <select
//                           className="admin-status-select"
//                           value={o.status}
//                           onChange={e => handleUpdateOrderStatus(o._id, e.target.value)}
//                           style={{
//                             background: statusColors[o.status]?.bg,
//                             color:      statusColors[o.status]?.color,
//                           }}
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="confirmed">Confirmed</option>
//                           <option value="preparing">Preparing</option>
//                           <option value="delivered">Delivered</option>
//                           <option value="cancelled">Cancelled</option>
//                         </select>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;










import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import './AdminPage.css';
import OtpModal from '../components/OtpModal';

const ADMIN_EMAIL = 'tanuvit16@gmail.com';

const statusColors = {
  pending:   { bg: '#fff8e1', color: '#f59e0b' },
  confirmed: { bg: '#e8f5e9', color: '#2ecc71' },
  preparing: { bg: '#e3f2fd', color: '#3498db' },
  delivered: { bg: '#e8f5e9', color: '#27ae60' },
  cancelled: { bg: '#fce4ec', color: '#e74c3c' },
};

const AdminPage = ({ navigate }) => {
  const { user, isSignedIn } = useUser();
  const [tab, setTab]                     = useState('restaurants');
  const [restaurants, setRestaurants]     = useState([]);
  const [orders, setOrders]               = useState([]);
  const [loadingR, setLoadingR]           = useState(true);
  const [loadingO, setLoadingO]           = useState(true);
  const [stats, setStats]                 = useState({ restaurants: 0, orders: 0, revenue: 0 });
  const [showOtp, setShowOtp]             = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const isAdmin = isSignedIn &&
    user?.emailAddresses?.[0]?.emailAddress === ADMIN_EMAIL;

  useEffect(() => {
    fetch('http://localhost:5000/api/restaurants')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setRestaurants(data.data);
          setStats(s => ({ ...s, restaurants: data.data.length }));
        }
        setLoadingR(false);
      });

    fetch('http://localhost:5000/api/orders/all')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setOrders(data.data);
          const revenue = data.data.reduce((sum, o) => sum + o.totalAmount, 0);
          setStats(s => ({ ...s, orders: data.data.length, revenue }));
        }
        setLoadingO(false);
      });
  }, []);

  // ── Ask for OTP before delete ──
  const handleDeleteRestaurant = (id, name) => {
    setPendingAction({ type: 'delete-restaurant', id, name });
    setShowOtp(true);
  };

  const confirmDeleteRestaurant = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    const res  = await fetch(`http://localhost:5000/api/restaurants/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) setRestaurants(prev => prev.filter(r => r._id !== id));
  };

  // ── Ask for OTP before status update ──
  const handleUpdateOrderStatus = (id, status) => {
    setPendingAction({ type: 'update-order', id, status });
    setShowOtp(true);
  };

  const confirmUpdateOrderStatus = async (id, status) => {
    const res  = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success) {
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
    }
  };

  // ── Called after OTP verified ──
  const handleOtpVerified = async () => {
    setShowOtp(false);
    if (!pendingAction) return;

    if (pendingAction.type === 'delete-restaurant') {
      await confirmDeleteRestaurant(pendingAction.id, pendingAction.name);
    } else if (pendingAction.type === 'update-order') {
      await confirmUpdateOrderStatus(pendingAction.id, pendingAction.status);
    }
    setPendingAction(null);
  };

  // ── Not signed in ──
  if (!isSignedIn) {
    return (
      <div className="admin-page">
        <div className="admin-blocked">
          <p>🔒</p>
          <h2>Please log in</h2>
          <button onClick={() => navigate('login')}>Log In</button>
        </div>
      </div>
    );
  }

  // ── Not admin ──
  if (!isAdmin) {
    return (
      <div className="admin-page">
        <div className="admin-blocked">
          <p>⛔</p>
          <h2>Access Denied</h2>
          <p>You don't have admin permissions.</p>
          <button onClick={() => navigate('home')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Nav */}
      <nav className="admin-nav">
        <span className="admin-logo" onClick={() => navigate('home')}>Eatoza</span>
        <span className="admin-badge">Admin Dashboard</span>
        <button className="admin-back" onClick={() => navigate('home')}>← Back to Site</button>
      </nav>

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <p className="stat-value">{stats.restaurants}</p>
          <p className="stat-label">🍽️ Restaurants</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{stats.orders}</p>
          <p className="stat-label">📦 Total Orders</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">₹{stats.revenue.toLocaleString()}</p>
          <p className="stat-label">💰 Total Revenue</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">
            {orders.filter(o => o.status === 'confirmed').length}
          </p>
          <p className="stat-label">✅ Confirmed Orders</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-container">
        <div className="admin-tabs">
          <button
            className={`admin-tab ${tab === 'restaurants' ? 'active' : ''}`}
            onClick={() => setTab('restaurants')}
          >
            🍽️ Restaurants ({restaurants.length})
          </button>
          <button
            className={`admin-tab ${tab === 'orders' ? 'active' : ''}`}
            onClick={() => setTab('orders')}
          >
            📦 Orders ({orders.length})
          </button>
        </div>

        {/* ── Restaurants Tab ── */}
        {tab === 'restaurants' && (
          <div className="admin-section">
            {loadingR ? (
              <p className="admin-loading">Loading restaurants...</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Cuisines</th>
                    <th>Rating</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map(r => (
                    <tr key={r._id}>
                      <td>
                        <div className="admin-restaurant-name">
                          {r.image && (
                            <img src={r.image} alt={r.name}
                              className="admin-restaurant-img" />
                          )}
                          <span>{r.name}</span>
                        </div>
                      </td>
                      <td>{r.city}</td>
                      <td>
                        <div className="admin-tags">
                          {r.cuisines.slice(0, 2).map(c => (
                            <span key={c} className="admin-tag">{c}</span>
                          ))}
                        </div>
                      </td>
                      <td>⭐ {r.rating}</td>
                      <td>₹{r.avgPrice}</td>
                      <td>
                        <span className={`admin-status ${r.isOpen ? 'open' : 'closed'}`}>
                          {r.isOpen ? 'Open' : 'Closed'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="admin-delete-btn"
                          onClick={() => handleDeleteRestaurant(r._id, r.name)}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── Orders Tab ── */}
        {tab === 'orders' && (
          <div className="admin-section">
            {loadingO ? (
              <p className="admin-loading">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="admin-empty">No orders yet</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Items</th>
                    <th>Address</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o._id}>
                      <td className="order-id-cell">
                        #{o._id.slice(-6).toUpperCase()}
                      </td>
                      <td>
                        <div className="admin-order-items">
                          {o.items.map((item, i) => (
                            <span key={i}>{item.name} ×{item.quantity}</span>
                          ))}
                        </div>
                      </td>
                      <td className="admin-address">{o.deliveryAddress}</td>
                      <td><strong>₹{o.totalAmount}</strong></td>
                      <td className="admin-date">
                        {new Date(o.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </td>
                      <td>
                        <select
                          className="admin-status-select"
                          value={o.status}
                          onChange={e => handleUpdateOrderStatus(o._id, e.target.value)}
                          style={{
                            background: statusColors[o.status]?.bg,
                            color:      statusColors[o.status]?.color,
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* OTP Modal */}
      {showOtp && (
        <OtpModal
          action={
            pendingAction?.type === 'delete-restaurant'
              ? `delete "${pendingAction.name}"`
              : `update order status to "${pendingAction?.status}"`
          }
          onVerified={handleOtpVerified}
          onClose={() => { setShowOtp(false); setPendingAction(null); }}
        />
      )}
    </div>
  );
};

export default AdminPage;