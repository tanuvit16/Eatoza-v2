// import React, { useState } from 'react';
// import './Hero.css';

// const Hero = () => {
//   const [location, setLocation] = useState('');
//   const [search, setSearch] = useState('');

//   return (
//     <div className="hero">
//       <div className="hero-overlay"></div>
//       <div className="hero-content">
//         <p className="hero-tag">🍴 India's #1 Food Discovery Platform</p>
//         <h1>Discover the best food &amp; drinks in your city</h1>
//         <div className="search-bar">
//           <div className="input-group location-group">
//             <span className="input-icon">📍</span>
//             <input
//               type="text"
//               placeholder="Location"
//               className="location-input"
//               value={location}
//               onChange={e => setLocation(e.target.value)}
//             />
//           </div>
//           <div className="divider"></div>
//           <div className="input-group search-group">
//             <span className="input-icon">🔍</span>
//             <input
//               type="text"
//               placeholder="Search for restaurants, cuisines or a dish"
//               className="search-input"
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//             />
//           </div>
//           <button className="search-btn">Search</button>
//         </div>
//         <div className="hero-tags">
//           {['Pizza', 'Biryani', 'Burger', 'Sushi', 'Chinese', 'Desserts'].map(tag => (
//             <span key={tag} className="quick-tag">{tag}</span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;




import React, { useState } from 'react';
import './Hero.css';

const Hero = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [search, setSearch]     = useState('');

  const handleSearch = () => {
    onSearch({ city: location, search });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const quickTags = ['Pizza', 'Biryani', 'Burger', 'Sushi', 'Chinese', 'Desserts'];

  return (
    <div className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <p className="hero-tag">🍴 India's #1 Food Discovery Platform</p>
        <h1>Discover the best food &amp; drinks in your city</h1>
        <div className="search-bar">
          <div className="input-group location-group">
            <span className="input-icon">📍</span>
            <input
              type="text"
              placeholder="City"
              className="location-input"
              value={location}
              onChange={e => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="divider"></div>
          <div className="input-group search-group">
            <span className="input-icon">🔍</span>
            <input
              type="text"
              placeholder="Search restaurants, cuisines or dishes"
              className="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
        <div className="hero-tags">
          {quickTags.map(tag => (
            <span
              key={tag}
              className="quick-tag"
              onClick={() => onSearch({ search: tag })}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
