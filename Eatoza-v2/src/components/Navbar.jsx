import React, { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import './Navbar.css';

const Navbar = ({ navigate, cart = [], onCartClick }) => {
  const { isSignedIn, user } = useUser();
  const { signOut }          = useClerk();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('home');
    setMenuOpen(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo" onClick={() => navigate('home')}>Eatoza</div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span><span></span><span></span>
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li onClick={() => { navigate('add-restaurant'); setMenuOpen(false); }}>
          <span className="nav-icon">🍽️</span> Add Restaurant
        </li>

        {isSignedIn ? (
          <>
            <li onClick={() => { navigate('orders'); setMenuOpen(false); }}>
              📋 My Orders
            </li>
             <li onClick={() => { navigate('admin'); setMenuOpen(false); }}>
      ⚙️ Admin
    </li>
            <li className="user-greeting">
              Hi, {user.firstName || user.emailAddresses[0].emailAddress.split('@')[0]} 👋
            </li>
            <li className="nav-btn outline" onClick={handleLogout}>Log out</li>
          </>
        ) : (
          <>
            <li className="nav-btn outline" onClick={() => { navigate('login'); setMenuOpen(false); }}>Log in</li>
            <li className="nav-btn filled" onClick={() => { navigate('signup'); setMenuOpen(false); }}>Sign up</li>
          </>
        )}

        <li className="cart-icon-btn" onClick={onCartClick}>
          🛒
          {totalItems > 0 && (
            <span className="cart-count">{totalItems}</span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;










// import React, { useState, useEffect } from 'react';
// import { useUser, useClerk } from '@clerk/clerk-react';
// import './Navbar.css';

// const Navbar = ({ navigate, cart = [], onCartClick }) => {
//   const { isSignedIn, user } = useUser();
//   const { signOut }          = useClerk();
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = async () => {
//     await signOut();
//     navigate('home');
//     setMenuOpen(false);
//   };

//   const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

//   return (
//     <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//       <div className="logo" onClick={() => navigate('home')}>Eatoza</div>

//       <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//         <span></span><span></span><span></span>
//       </button>

//       <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
//         <li onClick={() => { navigate('add-restaurant'); setMenuOpen(false); }}>
//           <span className="nav-icon">🍽️</span> Add Restaurant
//         </li>
//         {isSignedIn ? (
//           <>
//             <li className="user-greeting">
//               Hi, {user.firstName || user.emailAddresses[0].emailAddress.split('@')[0]} 👋
//             </li>
//             <li className="nav-btn outline" onClick={handleLogout}>Log out</li>
//           </>
//         ) : (
//           <>
//             <li className="nav-btn outline" onClick={() => { navigate('login'); setMenuOpen(false); }}>Log in</li>
//             <li className="nav-btn filled" onClick={() => { navigate('signup'); setMenuOpen(false); }}>Sign up</li>
//           </>
//         )}
//         {/* Cart icon */}
//         <li className="cart-icon-btn" onClick={onCartClick}>
//           🛒
//           {totalItems > 0 && (
//             <span className="cart-count">{totalItems}</span>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
