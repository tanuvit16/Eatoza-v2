// import React from 'react';
// import './Footer.css';

// const Footer = ({ navigate }) => (
//   <footer className="footer">
//     <div className="footer-inner">
//       <div className="footer-top">
//         <div>
//           <div className="footer-logo" onClick={() => navigate('home')}>Eatoza</div>
//           <p className="footer-tagline">Discover the best food & drinks</p>
//         </div>
//         <div className="footer-controls">
//           <select><option>🇮🇳 India</option></select>
//           <select><option>English</option></select>
//         </div>
//       </div>

//       <div className="footer-links">
//         <div className="footer-column">
//           <h4>ABOUT EATOZA</h4>
//           <p>Who We Are</p>
//           <p>Blog</p>
//           <p>Work With Us</p>
//           <p>Investor Relations</p>
//           <p>Report Fraud</p>
//           <p>Contact Us</p>
//         </div>
//         <div className="footer-column">
//           <h4>FOR RESTAURANTS</h4>
//           <p onClick={() => navigate('add-restaurant')} className="link-item">Partner With Us</p>
//           <p>Apps For You</p>
//           <p>Business Blog</p>
//         </div>
//         <div className="footer-column">
//           <h4>LEARN MORE</h4>
//           <p>Privacy</p>
//           <p>Security</p>
//           <p>Terms</p>
//           <p>Sitemap</p>
//         </div>
//         <div className="footer-column">
//           <h4>SOCIAL LINKS</h4>
//           <div className="social-icons">
//             <span title="LinkedIn">💼</span>
//             <span title="Instagram">📸</span>
//             <span title="YouTube">▶️</span>
//             <span title="Twitter">🐦</span>
//             <span title="Facebook">📘</span>
//           </div>
//           <div className="app-store-btns">
//             <div className="store-btn">🍎 App Store</div>
//             <div className="store-btn">▶ Google Play</div>
//           </div>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <p>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies.</p>
//         <p className="copyright">2008–2025 © Eatoza™ Ltd. All rights reserved.</p>
//       </div>
//     </div>
//   </footer>
// );

// export default Footer;


import React from 'react';
import './Footer.css';
import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaFacebookF,
  FaApple,
  FaGooglePlay
} from "react-icons/fa";

const Footer = ({ navigate }) => (
  <footer className="footer">
    <div className="footer-inner">

      {/* TOP */}
      <div className="footer-top">
        <div>
          <div className="footer-logo" onClick={() => navigate('home')}>
            Eatoza
          </div>
          <p className="footer-tagline">Discover the best food & drinks</p>
        </div>

        <div className="footer-controls">
          <select><option>🇮🇳 India</option></select>
          <select><option>English</option></select>
        </div>
      </div>

      {/* LINKS */}
      <div className="footer-links">

        <div className="footer-column">
          <h4>ABOUT EATOZA</h4>
          <p>Who We Are</p>
          <p>Blog</p>
          <p>Work With Us</p>
          <p>Investor Relations</p>
          <p>Report Fraud</p>
          <p>Contact Us</p>
        </div>

        <div className="footer-column">
          <h4>FOR RESTAURANTS</h4>
          <p onClick={() => navigate('add-restaurant')} className="link-item">
            Partner With Us
          </p>
          <p>Apps For You</p>
          <p>Business Blog</p>
        </div>

        <div className="footer-column">
          <h4>LEARN MORE</h4>
          <p>Privacy</p>
          <p>Security</p>
          <p>Terms</p>
          <p>Sitemap</p>
        </div>

        {/* SOCIAL */}
        <div className="footer-column">
          <h4>SOCIAL LINKS</h4>

          <div className="social-icons">
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaFacebookF /></a>
          </div>

          {/* STORE BUTTONS */}
          <div className="app-store-btns">

            <div className="store-btn">
              <FaApple className="store-icon" />
              <div>
                <span className="store-small">Download on the</span>
                <span className="store-big">App Store</span>
              </div>
            </div>

            <div className="store-btn">
              <FaGooglePlay className="store-icon" />
              <div>
                <span className="store-small">Get it on</span>
                <span className="store-big">Google Play</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, Privacy Policy and Content Policies.
        </p>
        <p className="copyright">
          2025 © Eatoza™ Ltd. All rights reserved.
        </p>
      </div>

    </div>
  </footer>
);

export default Footer;