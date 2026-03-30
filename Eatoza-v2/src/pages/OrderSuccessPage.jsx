import React, { useEffect, useState } from 'react';
import './OrderSuccessPage.css';

const OrderSuccessPage = ({ navigate }) => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          clearInterval(timer);
          navigate('orders');
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-animation">🎉</div>
        <h1>Order Placed!</h1>
        <p>Your food is being prepared with love 🍽️</p>
        <div className="success-details">
          <div className="success-step">
            <span className="step-icon">✅</span>
            <span>Order confirmed</span>
          </div>
          <div className="success-step">
            <span className="step-icon">👨‍🍳</span>
            <span>Preparing your food</span>
          </div>
          <div className="success-step">
            <span className="step-icon">🚴</span>
            <span>Out for delivery</span>
          </div>
          <div className="success-step">
            <span className="step-icon">🏠</span>
            <span>Delivered!</span>
          </div>
        </div>
        <p className="redirect-text">
          Redirecting to your orders in {count}s...
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="success-btn" onClick={() => navigate('orders')}>
            View Orders
          </button>
          <button className="success-btn outline" onClick={() => navigate('home')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;