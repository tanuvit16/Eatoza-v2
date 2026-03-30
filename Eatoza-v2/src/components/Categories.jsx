// import React from 'react';
// import './Categories.css';

// const cities = [
//   { name: 'Agra',       emoji: '🕌' },
//   { name: 'Ahmedabad',  emoji: '🏙️' },
//   { name: 'Ajmer',      emoji: '🌿' },
//   { name: 'Amritsar',   emoji: '🛕' },
//   { name: 'Bengaluru',  emoji: '🌇' },
//   { name: 'Chennai',    emoji: '🌊' },
//   { name: 'Delhi',      emoji: '🏛️' },
//   { name: 'Hyderabad',  emoji: '💎' },
//   { name: 'Kolkata',    emoji: '🎭' },
// ];

// const Categories = () => (
//   <div className="locations-section">
//     <h2 className="locations-title">
//       Popular locations in 🇮🇳 <span className="highlight">India</span>
//     </h2>
//     <p className="locations-subtext">
//       From swanky upscale restaurants to the cosiest hidden gems serving the most incredible food,
//       Eatoza covers it all. Explore menus and millions of restaurant photos and reviews from users
//       just like you, to find your next great meal.
//     </p>

//     <div className="locations-grid">
//       {cities.map((city, i) => (
//         <div key={i} className="location-card">
//           <span className="city-emoji">{city.emoji}</span>
//           <span className="city-name">{city.name} Restaurants</span>
//           <span className="arrow">›</span>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default Categories;






import React from 'react';
import './Categories.css';

const cities = [
  { name: 'Agra',      emoji: '🕌' },
  { name: 'Ahmedabad', emoji: '🏙️' },
  { name: 'Ajmer',     emoji: '🌿' },
  { name: 'Amritsar',  emoji: '🛕' },
  { name: 'Bengaluru', emoji: '🌇' },
  { name: 'Chennai',   emoji: '🌊' },
  { name: 'Delhi',     emoji: '🏛️' },
  { name: 'Hyderabad', emoji: '💎' },
  { name: 'Kolkata',   emoji: '🎭' },
];

const Categories = ({ onCityClick }) => (
  <div className="locations-section">
    <h2 className="locations-title">
      Popular locations in 🇮🇳 <span className="highlight">India</span>
    </h2>
    <p className="locations-subtext">
      From swanky upscale restaurants to the cosiest hidden gems serving the most incredible food,
      Eatoza covers it all. Explore menus and millions of restaurant photos and reviews from users
      just like you, to find your next great meal.
    </p>
    <div className="locations-grid">
      {cities.map((city, i) => (
        <div key={i} className="location-card" onClick={() => onCityClick(city.name)}>
          <span className="city-emoji">{city.emoji}</span>
          <span className="city-name">{city.name} Restaurants</span>
          <span className="arrow">›</span>
        </div>
      ))}
    </div>
  </div>
);

export default Categories;
