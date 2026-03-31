// import React, { useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import './AddRestaurantPage.css';
// import { useState } from 'react';
// import OtpModal from '../components/OtpModal';


// const [showOtp, setShowOtp]   = useState(false);

// const CUISINES = ['North Indian', 'South Indian', 'Chinese', 'Italian', 'Japanese',
//   'Mexican', 'American', 'Mughlai', 'Continental', 'Fast Food',
//   'Desserts', 'Seafood', 'Bakery', 'Beverages'];

// const CITIES = ['Agra', 'Ahmedabad', 'Bengaluru', 'Chennai', 'Delhi',
//   'Hyderabad', 'Jaipur', 'Kolkata', 'Mumbai', 'Pune', 'Surat', 'Vadodara'];

// const steps = ['Restaurant Info', 'Location & Hours', 'Menu & Pricing', 'Review & Submit'];

// const AddRestaurantPage = ({ navigate }) => {
//   const { user, isSignedIn } = useUser();
//   const [step, setStep]         = useState(0);
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading]   = useState(false);
//   const [error, setError]       = useState('');
//   const [form, setForm] = useState({
//     name: '', tagline: '', cuisines: [], phone: '', email: '',
//     city: '', address: '', pincode: '',
//     openTime: '09:00', closeTime: '22:00', daysOpen: [],
//     avgPrice: '', deliveryTime: '', minOrder: '',
//     description: '', image: '',
//   });

//   const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

//   const toggleCuisine = (c) => setForm(f => ({
//     ...f, cuisines: f.cuisines.includes(c)
//       ? f.cuisines.filter(x => x !== c)
//       : [...f.cuisines, c]
//   }));

//   const toggleDay = (d) => setForm(f => ({
//     ...f, daysOpen: f.daysOpen.includes(d)
//       ? f.daysOpen.filter(x => x !== d)
//       : [...f.daysOpen, d]
//   }));

//   const nextStep = () => setStep(s => Math.min(s + 1, 3));
//   const prevStep = () => setStep(s => Math.max(s - 1, 0));

//   // ── Submit to real API ──
//   const handleSubmit = async () => {
//     if (!isSignedIn) {
//       setError('You must be logged in to add a restaurant.');
//       return;
//     }

//     // Basic validation
//     if (!form.name || !form.city || !form.cuisines.length) {
//       setError('Please fill in restaurant name, city and at least one cuisine.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch('http://localhost:5000/api/restaurants', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name:         form.name,
//           tagline:      form.tagline,
//           cuisines:     form.cuisines,
//           city:         form.city,
//           address:      form.address,
//           avgPrice:     Number(form.avgPrice)    || 0,
//           deliveryTime: Number(form.deliveryTime) || 30,
//           minOrder:     Number(form.minOrder)    || 0,
//           rating:       0,
//           isOpen:       true,
//           image:        form.image || '',
//           addedBy:      user.id,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSubmitted(true);
//       } else {
//         setError(data.message || 'Something went wrong. Please try again.');
//       }
//     } catch (err) {
//       setError('Could not connect to server. Make sure your backend is running.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── Success screen ──
//   if (submitted) {
//     return (
//       <div className="ar-page">
//         <nav className="ar-nav">
//           <span className="ar-logo" onClick={() => navigate('home')}>Eatoza</span>
//         </nav>
//         <div className="ar-success">
//           <div className="success-icon">🎉</div>
//           <h2>Restaurant Added!</h2>
//           <p>
//             <strong>{form.name}</strong> has been successfully added to Eatoza
//             and is now visible to customers!
//           </p>
//           <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
//             <button className="ar-primary-btn" onClick={() => navigate('home')}>
//               Back to Home
//             </button>
//             <button className="ar-secondary-btn" onClick={() => {
//               setSubmitted(false);
//               setStep(0);
//               setForm({
//                 name: '', tagline: '', cuisines: [], phone: '', email: '',
//                 city: '', address: '', pincode: '',
//                 openTime: '09:00', closeTime: '22:00', daysOpen: [],
//                 avgPrice: '', deliveryTime: '', minOrder: '',
//                 description: '', image: '',
//               });
//             }}>
//               Add Another
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="ar-page">
//       <nav className="ar-nav">
//         <span className="ar-logo" onClick={() => navigate('home')}>Eatoza</span>
//         {user && <span className="ar-user">Hi, {user.firstName || user.emailAddresses[0].emailAddress.split('@')[0]} 👋</span>}
//         <button className="ar-back-btn" onClick={() => navigate('home')}>← Back</button>
//       </nav>

//       <div className="ar-container">
//         <div className="ar-header">
//           <h1>Add Your Restaurant</h1>
//           <p>Partner with Eatoza and reach millions of hungry customers</p>
//         </div>

//         {/* Stepper */}
//         <div className="stepper">
//           {steps.map((s, i) => (
//             <div key={i} className={`step-item ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
//               <div className="step-circle">{i < step ? '✓' : i + 1}</div>
//               <span>{s}</span>
//               {i < steps.length - 1 && <div className="step-line"></div>}
//             </div>
//           ))}
//         </div>

//         <div className="ar-form-card">

//           {/* ── Step 0: Basic Info ── */}
//           {step === 0 && (
//             <div className="ar-step">
//               <h3>Basic Information</h3>
//               <div className="ar-form-grid">
//                 <div className="ar-field full">
//                   <label>Restaurant Name *</label>
//                   <input name="name" value={form.name} onChange={handle}
//                     placeholder="e.g. Spice Garden" />
//                 </div>
//                 <div className="ar-field full">
//                   <label>Tagline</label>
//                   <input name="tagline" value={form.tagline} onChange={handle}
//                     placeholder="e.g. Authentic flavours from the heart of India" />
//                 </div>
//                 <div className="ar-field full">
//                   <label>Image URL</label>
//                   <input name="image" value={form.image} onChange={handle}
//                     placeholder="https://images.unsplash.com/..." />
//                   <small style={{ color: '#888', marginTop: '4px' }}>
//                     Paste any image URL from Unsplash or your own hosted image
//                   </small>
//                 </div>
//                 <div className="ar-field">
//                   <label>Phone Number</label>
//                   <input name="phone" value={form.phone} onChange={handle}
//                     placeholder="+91 99999 99999" />
//                 </div>
//                 <div className="ar-field">
//                   <label>Email</label>
//                   <input name="email" type="email" value={form.email} onChange={handle}
//                     placeholder="restaurant@example.com" />
//                 </div>
//               </div>
//               <div className="ar-field full">
//                 <label>Cuisines * (select all that apply)</label>
//                 <div className="cuisine-chips">
//                   {CUISINES.map(c => (
//                     <button key={c} type="button"
//                       className={`chip ${form.cuisines.includes(c) ? 'selected' : ''}`}
//                       onClick={() => toggleCuisine(c)}>{c}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ── Step 1: Location & Hours ── */}
//           {step === 1 && (
//             <div className="ar-step">
//               <h3>Location & Opening Hours</h3>
//               <div className="ar-form-grid">
//                 <div className="ar-field">
//                   <label>City *</label>
//                   <select name="city" value={form.city} onChange={handle}>
//                     <option value="">Select city</option>
//                     {CITIES.map(c => <option key={c}>{c}</option>)}
//                   </select>
//                 </div>
//                 <div className="ar-field">
//                   <label>Pincode</label>
//                   <input name="pincode" value={form.pincode} onChange={handle}
//                     placeholder="400001" />
//                 </div>
//                 <div className="ar-field full">
//                   <label>Full Address</label>
//                   <input name="address" value={form.address} onChange={handle}
//                     placeholder="Street, Area, Landmark" />
//                 </div>
//                 <div className="ar-field">
//                   <label>Opening Time</label>
//                   <input name="openTime" type="time" value={form.openTime} onChange={handle} />
//                 </div>
//                 <div className="ar-field">
//                   <label>Closing Time</label>
//                   <input name="closeTime" type="time" value={form.closeTime} onChange={handle} />
//                 </div>
//               </div>
//               <div className="ar-field full">
//                 <label>Open On</label>
//                 <div className="day-chips">
//                   {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
//                     <button key={d} type="button"
//                       className={`chip day-chip ${form.daysOpen.includes(d) ? 'selected' : ''}`}
//                       onClick={() => toggleDay(d)}>{d}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ── Step 2: Menu & Pricing ── */}
//           {step === 2 && (
//             <div className="ar-step">
//               <h3>Menu &amp; Pricing Details</h3>
//               <div className="ar-form-grid">
//                 <div className="ar-field">
//                   <label>Average Cost for Two (₹)</label>
//                   <input name="avgPrice" value={form.avgPrice} onChange={handle}
//                     placeholder="e.g. 500" type="number" />
//                 </div>
//                 <div className="ar-field">
//                   <label>Avg. Delivery Time (mins)</label>
//                   <input name="deliveryTime" value={form.deliveryTime} onChange={handle}
//                     placeholder="e.g. 30" type="number" />
//                 </div>
//                 <div className="ar-field">
//                   <label>Minimum Order (₹)</label>
//                   <input name="minOrder" value={form.minOrder} onChange={handle}
//                     placeholder="e.g. 150" type="number" />
//                 </div>
//               </div>
//               <div className="ar-field full">
//                 <label>About Your Restaurant</label>
//                 <textarea name="description" value={form.description} onChange={handle}
//                   rows={4} placeholder="Tell customers what makes your restaurant special…" />
//               </div>
//             </div>
//           )}

//           {/* ── Step 3: Review ── */}
//           {step === 3 && (
//             <div className="ar-step">
//               <h3>Review Your Details</h3>
//               <div className="review-grid">
//                 <div className="review-block">
//                   <h4>🍽️ Restaurant</h4>
//                   <p><strong>{form.name || '—'}</strong></p>
//                   <p>{form.tagline}</p>
//                   <p>{form.cuisines.join(', ') || '—'}</p>
//                 </div>
//                 <div className="review-block">
//                   <h4>📞 Contact</h4>
//                   <p>{form.phone || '—'}</p>
//                   <p>{form.email || '—'}</p>
//                 </div>
//                 <div className="review-block">
//                   <h4>📍 Location</h4>
//                   <p>{form.address || '—'}</p>
//                   <p>{form.city} {form.pincode}</p>
//                 </div>
//                 <div className="review-block">
//                   <h4>🕐 Hours</h4>
//                   <p>{form.openTime} – {form.closeTime}</p>
//                   <p>{form.daysOpen.join(', ') || '—'}</p>
//                 </div>
//                 <div className="review-block">
//                   <h4>💰 Pricing</h4>
//                   <p>₹{form.avgPrice || '—'} for two</p>
//                   <p>Min. order: ₹{form.minOrder || '—'}</p>
//                   <p>Delivery: ~{form.deliveryTime || '—'} mins</p>
//                 </div>
//                 {form.image && (
//                   <div className="review-block">
//                     <h4>🖼️ Image</h4>
//                     <img src={form.image} alt="preview"
//                       style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', marginTop: '8px' }} />
//                   </div>
//                 )}
//               </div>
//               {error && <p className="ar-error">{error}</p>}
//               <p className="review-note">
//                 ✅ By submitting, you agree to Eatoza's Partner Terms and Conditions.
//               </p>
//             </div>
//           )}

//           {/* Actions */}
//           <div className="ar-actions">
//             {step > 0 && (
//               <button className="ar-secondary-btn" onClick={prevStep}>← Previous</button>
//             )}
//             <div style={{ flex: 1 }} />
//             {step < 3
//               ? <button className="ar-primary-btn" onClick={nextStep}>Next Step →</button>
//               : <button
//                   className="ar-primary-btn submit"
//                   onClick={handleSubmit}
//                   disabled={loading}
//                 >
//                   {loading ? 'Saving...' : '🚀 Submit Restaurant'}
//                 </button>
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddRestaurantPage;





























import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import './AddRestaurantPage.css';
import OtpModal from '../components/OtpModal';

const CUISINES = ['North Indian', 'South Indian', 'Chinese', 'Italian', 'Japanese',
  'Mexican', 'American', 'Mughlai', 'Continental', 'Fast Food',
  'Desserts', 'Seafood', 'Bakery', 'Beverages'];

const CITIES = ['Agra', 'Ahmedabad', 'Bengaluru', 'Chennai', 'Delhi',
  'Hyderabad', 'Jaipur', 'Kolkata', 'Mumbai', 'Pune', 'Surat', 'Vadodara'];

const steps = ['Restaurant Info', 'Location & Hours', 'Menu & Pricing', 'Review & Submit'];

const AddRestaurantPage = ({ navigate }) => {
  const { user, isSignedIn } = useUser();
  const [step, setStep]           = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [showOtp, setShowOtp]     = useState(false);
  const [form, setForm] = useState({
    name: '', tagline: '', cuisines: [], phone: '', email: '',
    city: '', address: '', pincode: '',
    openTime: '09:00', closeTime: '22:00', daysOpen: [],
    avgPrice: '', deliveryTime: '', minOrder: '',
    description: '', image: '',
  });

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const toggleCuisine = (c) => setForm(f => ({
    ...f, cuisines: f.cuisines.includes(c)
      ? f.cuisines.filter(x => x !== c)
      : [...f.cuisines, c]
  }));

  const toggleDay = (d) => setForm(f => ({
    ...f, daysOpen: f.daysOpen.includes(d)
      ? f.daysOpen.filter(x => x !== d)
      : [...f.daysOpen, d]
  }));

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  // ── Step 1: Validate then show OTP modal ──
  const handleSubmitClick = () => {
    if (!isSignedIn) {
      setError('You must be logged in to add a restaurant.');
      return;
    }
    if (!form.name || !form.city || !form.cuisines.length) {
      setError('Please fill in restaurant name, city and at least one cuisine.');
      return;
    }
    setError('');
    setShowOtp(true);
  };

  // ── Step 2: Called after OTP verified ──
  const handleSubmit = async () => {
    setShowOtp(false);
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/restaurants', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:         form.name,
          tagline:      form.tagline,
          cuisines:     form.cuisines,
          city:         form.city,
          address:      form.address,
          avgPrice:     Number(form.avgPrice)     || 0,
          deliveryTime: Number(form.deliveryTime) || 30,
          minOrder:     Number(form.minOrder)     || 0,
          rating:       0,
          isOpen:       true,
          image:        form.image || '',
          addedBy:      user.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Could not connect to server. Make sure your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ──
  if (submitted) {
    return (
      <div className="ar-page">
        <nav className="ar-nav">
          <span className="ar-logo" onClick={() => navigate('home')}>Eatoza</span>
        </nav>
        <div className="ar-success">
          <div className="success-icon">🎉</div>
          <h2>Restaurant Added!</h2>
          <p>
            <strong>{form.name}</strong> has been successfully added to Eatoza
            and is now visible to customers!
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="ar-primary-btn" onClick={() => navigate('home')}>
              Back to Home
            </button>
            <button className="ar-secondary-btn" onClick={() => {
              setSubmitted(false);
              setStep(0);
              setForm({
                name: '', tagline: '', cuisines: [], phone: '', email: '',
                city: '', address: '', pincode: '',
                openTime: '09:00', closeTime: '22:00', daysOpen: [],
                avgPrice: '', deliveryTime: '', minOrder: '',
                description: '', image: '',
              });
            }}>
              Add Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ar-page">
      <nav className="ar-nav">
        <span className="ar-logo" onClick={() => navigate('home')}>Eatoza</span>
        {user && (
          <span className="ar-user">
            Hi, {user.firstName || user.emailAddresses[0].emailAddress.split('@')[0]} 👋
          </span>
        )}
        <button className="ar-back-btn" onClick={() => navigate('home')}>← Back</button>
      </nav>

      <div className="ar-container">
        <div className="ar-header">
          <h1>Add Your Restaurant</h1>
          <p>Partner with Eatoza and reach millions of hungry customers</p>
        </div>

        {/* Stepper */}
        <div className="stepper">
          {steps.map((s, i) => (
            <div key={i} className={`step-item ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <div className="step-circle">{i < step ? '✓' : i + 1}</div>
              <span>{s}</span>
              {i < steps.length - 1 && <div className="step-line"></div>}
            </div>
          ))}
        </div>

        <div className="ar-form-card">

          {/* ── Step 0: Basic Info ── */}
          {step === 0 && (
            <div className="ar-step">
              <h3>Basic Information</h3>
              <div className="ar-form-grid">
                <div className="ar-field full">
                  <label>Restaurant Name *</label>
                  <input name="name" value={form.name} onChange={handle}
                    placeholder="e.g. Spice Garden" />
                </div>
                <div className="ar-field full">
                  <label>Tagline</label>
                  <input name="tagline" value={form.tagline} onChange={handle}
                    placeholder="e.g. Authentic flavours from the heart of India" />
                </div>
                <div className="ar-field full">
                  <label>Image URL</label>
                  <input name="image" value={form.image} onChange={handle}
                    placeholder="https://images.unsplash.com/..." />
                  <small style={{ color: '#888', marginTop: '4px' }}>
                    Paste any image URL from Unsplash or your own hosted image
                  </small>
                </div>
                <div className="ar-field">
                  <label>Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handle}
                    placeholder="+91 99999 99999" />
                </div>
                <div className="ar-field">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handle}
                    placeholder="restaurant@example.com" />
                </div>
              </div>
              <div className="ar-field full">
                <label>Cuisines * (select all that apply)</label>
                <div className="cuisine-chips">
                  {CUISINES.map(c => (
                    <button key={c} type="button"
                      className={`chip ${form.cuisines.includes(c) ? 'selected' : ''}`}
                      onClick={() => toggleCuisine(c)}>{c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 1: Location & Hours ── */}
          {step === 1 && (
            <div className="ar-step">
              <h3>Location & Opening Hours</h3>
              <div className="ar-form-grid">
                <div className="ar-field">
                  <label>City *</label>
                  <select name="city" value={form.city} onChange={handle}>
                    <option value="">Select city</option>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="ar-field">
                  <label>Pincode</label>
                  <input name="pincode" value={form.pincode} onChange={handle}
                    placeholder="400001" />
                </div>
                <div className="ar-field full">
                  <label>Full Address</label>
                  <input name="address" value={form.address} onChange={handle}
                    placeholder="Street, Area, Landmark" />
                </div>
                <div className="ar-field">
                  <label>Opening Time</label>
                  <input name="openTime" type="time" value={form.openTime} onChange={handle} />
                </div>
                <div className="ar-field">
                  <label>Closing Time</label>
                  <input name="closeTime" type="time" value={form.closeTime} onChange={handle} />
                </div>
              </div>
              <div className="ar-field full">
                <label>Open On</label>
                <div className="day-chips">
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                    <button key={d} type="button"
                      className={`chip day-chip ${form.daysOpen.includes(d) ? 'selected' : ''}`}
                      onClick={() => toggleDay(d)}>{d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Menu & Pricing ── */}
          {step === 2 && (
            <div className="ar-step">
              <h3>Menu &amp; Pricing Details</h3>
              <div className="ar-form-grid">
                <div className="ar-field">
                  <label>Average Cost for Two (₹)</label>
                  <input name="avgPrice" value={form.avgPrice} onChange={handle}
                    placeholder="e.g. 500" type="number" />
                </div>
                <div className="ar-field">
                  <label>Avg. Delivery Time (mins)</label>
                  <input name="deliveryTime" value={form.deliveryTime} onChange={handle}
                    placeholder="e.g. 30" type="number" />
                </div>
                <div className="ar-field">
                  <label>Minimum Order (₹)</label>
                  <input name="minOrder" value={form.minOrder} onChange={handle}
                    placeholder="e.g. 150" type="number" />
                </div>
              </div>
              <div className="ar-field full">
                <label>About Your Restaurant</label>
                <textarea name="description" value={form.description} onChange={handle}
                  rows={4} placeholder="Tell customers what makes your restaurant special…" />
              </div>
            </div>
          )}

          {/* ── Step 3: Review ── */}
          {step === 3 && (
            <div className="ar-step">
              <h3>Review Your Details</h3>
              <div className="review-grid">
                <div className="review-block">
                  <h4>🍽️ Restaurant</h4>
                  <p><strong>{form.name || '—'}</strong></p>
                  <p>{form.tagline}</p>
                  <p>{form.cuisines.join(', ') || '—'}</p>
                </div>
                <div className="review-block">
                  <h4>📞 Contact</h4>
                  <p>{form.phone || '—'}</p>
                  <p>{form.email || '—'}</p>
                </div>
                <div className="review-block">
                  <h4>📍 Location</h4>
                  <p>{form.address || '—'}</p>
                  <p>{form.city} {form.pincode}</p>
                </div>
                <div className="review-block">
                  <h4>🕐 Hours</h4>
                  <p>{form.openTime} – {form.closeTime}</p>
                  <p>{form.daysOpen.join(', ') || '—'}</p>
                </div>
                <div className="review-block">
                  <h4>💰 Pricing</h4>
                  <p>₹{form.avgPrice || '—'} for two</p>
                  <p>Min. order: ₹{form.minOrder || '—'}</p>
                  <p>Delivery: ~{form.deliveryTime || '—'} mins</p>
                </div>
                {form.image && (
                  <div className="review-block">
                    <h4>🖼️ Image</h4>
                    <img src={form.image} alt="preview"
                      style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', marginTop: '8px' }} />
                  </div>
                )}
              </div>
              {error && <p className="ar-error">{error}</p>}
              <p className="review-note">
                ✅ By submitting, you agree to Eatoza's Partner Terms and Conditions.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="ar-actions">
            {step > 0 && (
              <button className="ar-secondary-btn" onClick={prevStep}>← Previous</button>
            )}
            <div style={{ flex: 1 }} />
            {step < 3
              ? <button className="ar-primary-btn" onClick={nextStep}>Next Step →</button>
              : <button
                  className="ar-primary-btn submit"
                  onClick={handleSubmitClick}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : '🚀 Submit Restaurant'}
                </button>
            }
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtp && (
        <OtpModal
          action="add a new restaurant"
          onVerified={handleSubmit}
          onClose={() => setShowOtp(false)}
        />
      )}
    </div>
  );
};

export default AddRestaurantPage;


































































































































































