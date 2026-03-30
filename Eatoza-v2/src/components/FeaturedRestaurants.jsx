




// import React, { useState, useEffect } from 'react';
// import './FeaturedRestaurants.css';

// const tagColors = {
//   0: '#ff6b35', 1: '#2ecc71', 2: '#9b59b6',
//   3: '#3498db', 4: '#e67e22', 5: '#ef4f5f',
// };

// // const RestaurantCard = ({ r, index, onSelect }) => (
// //   <div className="r-card" onClick={() => onSelect(r)}>
// //     <div className="r-card-img">
// //       {r.image
// //         ? <img src={r.image} alt={r.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
// //         : <span className="r-emoji">🍽️</span>
// //       }
// //       <span className="r-tag" style={{ background: tagColors[index % 6] }}>
// //         {r.isOpen ? 'Open Now' : 'Closed'}
// //       </span>
// //     </div>
// //     <div className="r-card-body">
// //       <h3>{r.name}</h3>
// //       <p className="r-cuisine">{r.cuisines.join(' · ')}</p>
// //       <div className="r-meta">
// //         <span className="r-rating">⭐ {r.rating}</span>
// //         <span className="r-dot">·</span>
// //         <span className="r-time">⏱ {r.deliveryTime} mins</span>
// //       </div>
// //       <div className="r-footer">
// //         <span className="r-price">₹{r.avgPrice} for two</span>
// //         <button className="r-order-btn" onClick={e => { e.stopPropagation(); onSelect(r); }}>
// //           Order Now
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // );





// // new
// const RestaurantCard = ({ r, index, onSelect, onDelete, currentUserId }) => (
//   <div className="r-card" onClick={() => onSelect(r)}>
//     <div className="r-card-img">
//       {r.image
//         ? <img src={r.image} alt={r.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
//         : <span className="r-emoji">🍽️</span>
//       }
//       <span className="r-tag" style={{ background: tagColors[index % 6] }}>
//         {r.isOpen ? 'Open Now' : 'Closed'}
//       </span>
//       {/* Show delete only to the person who added it */}
//       {currentUserId && r.addedBy === currentUserId && (
//         <button
//           className="r-delete-btn"
//           onClick={e => { e.stopPropagation(); onDelete(r._id, r.name); }}
//           title="Delete restaurant"
//         >
//           🗑️
//         </button>
//       )}
//     </div>
//     <div className="r-card-body">
//       <h3>{r.name}</h3>
//       <p className="r-cuisine">{r.cuisines.join(' · ')}</p>
//       <div className="r-meta">
//         <span className="r-rating">⭐ {r.rating}</span>
//         <span className="r-dot">·</span>
//         <span className="r-time">⏱ {r.deliveryTime} mins</span>
//       </div>
//       <div className="r-footer">
//         <span className="r-price">₹{r.avgPrice} for two</span>
//         <button className="r-order-btn" onClick={e => { e.stopPropagation(); onSelect(r); }}>
//           Order Now
//         </button>
//       </div>
//     </div>
//   </div>
// );




// //end

// const FeaturedRestaurants = ({ filters, onSelectRestaurant ,onClearFilters }) => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading]         = useState(true);
//   const [error, setError]             = useState(null);

//   useEffect(() => {
//     setLoading(true);

//     // Build query string from filters
//     const params = new URLSearchParams();
//     if (filters?.city)   params.append('city',   filters.city);
//     if (filters?.search) params.append('search', filters.search);

//     fetch(`http://localhost:5000/api/restaurants?${params.toString()}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) setRestaurants(data.data);
//         else setError('Failed to load restaurants');
//         setLoading(false);
//       })
//       .catch(() => {
//         setError('Could not connect to server');
//         setLoading(false);
//       });
//   }, [filters]); // re-fetch whenever filters change

//   if (loading) return (
//     <section className="featured-section">
//       <div className="featured-header">
//         <div><h2>Featured Restaurants</h2></div>
//       </div>
//       <div className="loading-grid">
//         {[1,2,3,4,5,6].map(i => (
//           <div key={i} className="r-card skeleton">
//             <div className="skeleton-img"></div>
//             <div className="skeleton-body">
//               <div className="skeleton-line"></div>
//               <div className="skeleton-line short"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   if (error) return (
//     <section className="featured-section">
//       <p style={{ color: '#ef4f5f', textAlign: 'center' }}>⚠️ {error}</p>
//     </section>
//   );

//   return (
//     <section className="featured-section">
//       <div className="featured-header">
//         <div>
//           <h2>
//             {filters?.city || filters?.search
//               ? `Results for "${filters.city || filters.search}"`
//               : 'Featured Restaurants'
//             }
//           </h2>
//           <p>{restaurants.length} restaurants found</p>
//         </div>
//         {(filters?.city || filters?.search) && (
//           <button className="see-all-btn" onClick={onClearFilters}>
//             Clear filters ✕
//           </button>
//         )}
//       </div>

//       {restaurants.length === 0 ? (
//         <div className="no-results">
//           <p>😕 No restaurants found</p>
//           <p>Try a different city or cuisine</p>
//         </div>
//       ) : (
//         <div className="restaurants-grid">
//           {restaurants.map((r, i) => (
//             <RestaurantCard
//               key={r._id}
//               r={r}
//               index={i}
//               onSelect={onSelectRestaurant}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default FeaturedRestaurants;























import React, { useState, useEffect } from 'react';
import './FeaturedRestaurants.css';

const tagColors = {
  0: '#ff6b35', 1: '#2ecc71', 2: '#9b59b6',
  3: '#3498db', 4: '#e67e22', 5: '#ef4f5f',
};

const RestaurantCard = ({ r, index, onSelect, onDelete, currentUserId }) => (
  <div className="r-card" onClick={() => onSelect(r)}>
    <div className="r-card-img">
      {r.image
        ? <img src={r.image} alt={r.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        : <span className="r-emoji">🍽️</span>
      }
      <span className="r-tag" style={{ background: tagColors[index % 6] }}>
        {r.isOpen ? 'Open Now' : 'Closed'}
      </span>
      {currentUserId && r.addedBy === currentUserId && (
        <button
          className="r-delete-btn"
          onClick={e => { e.stopPropagation(); onDelete(r._id, r.name); }}
          title="Delete restaurant"
        >
          🗑️
        </button>
      )}
    </div>
    <div className="r-card-body">
      <h3>{r.name}</h3>
      <p className="r-cuisine">{r.cuisines.join(' · ')}</p>
      <div className="r-meta">
        <span className="r-rating">⭐ {r.rating}</span>
        <span className="r-dot">·</span>
        <span className="r-time">⏱ {r.deliveryTime} mins</span>
      </div>
      <div className="r-footer">
        <span className="r-price">₹{r.avgPrice} for two</span>
        <button className="r-order-btn" onClick={e => { e.stopPropagation(); onSelect(r); }}>
          Order Now
        </button>
      </div>
    </div>
  </div>
);

const FeaturedRestaurants = ({ filters, onSelectRestaurant, onClearFilters, currentUserId }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters?.city   && filters.city.trim())   params.append('city',   filters.city.trim());
    if (filters?.search && filters.search.trim()) params.append('search', filters.search.trim());

    console.log('Fetching:', `http://localhost:5000/api/restaurants?${params.toString()}`);

    fetch(`http://localhost:5000/api/restaurants?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setRestaurants(data.data);
        else setError('Failed to load restaurants');
        setLoading(false);
      })
      .catch(() => {
        setError('Could not connect to server');
        setLoading(false);
      });
  }, [filters]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const res  = await fetch(`http://localhost:5000/api/restaurants/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setRestaurants(prev => prev.filter(r => r._id !== id));
      }
    } catch (err) {
      alert('Failed to delete. Please try again.');
    }
  };

  if (loading) return (
    <section className="featured-section">
      <div className="featured-header">
        <div><h2>Featured Restaurants</h2></div>
      </div>
      <div className="loading-grid">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="r-card skeleton">
            <div className="skeleton-img"></div>
            <div className="skeleton-body">
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  if (error) return (
    <section className="featured-section">
      <p style={{ color: '#ef4f5f', textAlign: 'center' }}>⚠️ {error}</p>
    </section>
  );

  return (
    <section className="featured-section">
      <div className="featured-header">
        <div>
          <h2>
            {filters?.city || filters?.search
              ? `Results for "${filters.city || filters.search}"`
              : 'Featured Restaurants'
            }
          </h2>
          <p>{restaurants.length} restaurants found</p>
        </div>
        {(filters?.city || filters?.search) && (
          <button className="see-all-btn" onClick={onClearFilters}>
            Clear filters ✕
          </button>
        )}
      </div>

      {restaurants.length === 0 ? (
        <div className="no-results">
          <p>😕 No restaurants found</p>
          <p>Try a different city or cuisine</p>
        </div>
      ) : (
        <div className="restaurants-grid">
          {restaurants.map((r, i) => (
            <RestaurantCard
              key={r._id}
              r={r}
              index={i}
              onSelect={onSelectRestaurant}
              onDelete={handleDelete}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedRestaurants;