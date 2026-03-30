import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import './OrdersPage.css';

const statusColors = {
  pending:   { bg: '#fff8e1', color: '#f59e0b' },
  confirmed: { bg: '#e8f5e9', color: '#2ecc71' },
  preparing: { bg: '#e3f2fd', color: '#3498db' },
  delivered: { bg: '#e8f5e9', color: '#27ae60' },
  cancelled: { bg: '#fce4ec', color: '#e74c3c' },
};

const OrdersPage = ({ navigate }) => {
  const { user, isSignedIn } = useUser();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!isSignedIn) return;

//     fetch(`http://localhost:5000/api/orders/user/${user.id}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) setOrders(data.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [isSignedIn]);

useEffect(() => {
  if (!isSignedIn) return;

  // Debug — fetch all orders first
  fetch(`http://localhost:5000/api/orders/all`)
    .then(res => res.json())
    .then(data => {
      console.log('All orders:', data);
      if (data.success) setOrders(data.data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, [isSignedIn]);



  return (
    <div className="orders-page">
      <nav className="orders-nav">
        <button className="orders-back" onClick={() => navigate('home')}>← Back</button>
        <span className="orders-logo" onClick={() => navigate('home')}>Eatoza</span>
      </nav>

      <div className="orders-container">
        <h1>Your Orders</h1>

        {!isSignedIn ? (
          <div className="orders-empty">
            <p>🔒</p>
            <h3>Please log in to view your orders</h3>
            <button className="orders-btn" onClick={() => navigate('login')}>Log In</button>
          </div>
        ) : loading ? (
          <div className="orders-loading">
            {[1,2,3].map(i => (
              <div key={i} className="order-card skeleton">
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <p>🍽️</p>
            <h3>No orders yet</h3>
            <p>Your order history will appear here</p>
            <button className="orders-btn" onClick={() => navigate('home')}>
              Order Now
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <p className="order-id">Order #{order._id.slice(-6).toUpperCase()}</p>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'long', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <span
                    className="order-status"
                    style={{
                      background: statusColors[order.status]?.bg || '#f5f5f5',
                      color:      statusColors[order.status]?.color || '#888',
                    }}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.map((item, i) => (
                    <div key={i} className="order-item">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-address">
                    📍 {order.deliveryAddress}
                  </div>
                  <div className="order-total">
                    Total: <strong>₹{order.totalAmount}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;