import React from 'react';
import './Cart.css';

const Cart = ({ cart, onClose, onUpdateQty, onRemove, navigate }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      {/* Backdrop */}
      <div className="cart-backdrop" onClick={onClose}></div>

      {/* Drawer */}
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>Your Cart 🛒</h2>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>🍽️</p>
            <p>Your cart is empty</p>
            <p>Add items from a restaurant to get started</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-info">
                    <span className={`cart-veg-dot ${item.isVeg ? 'veg' : 'nonveg'}`}></span>
                    <div>
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">₹{item.price} × {item.qty}</p>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <button onClick={() => onUpdateQty(item._id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => onUpdateQty(item._id, item.qty + 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total ({totalItems} items)</span>
                <span className="cart-total-price">₹{total}</span>
              </div>
              {/* <button
                className="cart-checkout-btn"
                onClick={() => { onClose(); navigate('checkout'); }}
              >
                Proceed to Checkout →
              </button> */}


<button
  className="cart-checkout-btn"
  onClick={() => {
    onClose();
    setTimeout(() => navigate('checkout'), 100);
  }}
>
  Proceed to Checkout →
</button>









            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;