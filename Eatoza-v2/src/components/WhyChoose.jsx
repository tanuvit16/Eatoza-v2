// // // import React from "react";
// // // import "./WhyChoose.css";

// // // const features = [
// // //   { title: "Lightning Fast Delivery", desc: "Get your food delivered in under 30 minutes." },
// // //   { title: "Top Rated Restaurants", desc: "Only the best restaurants curated for you." },
// // //   { title: "Best Price Guarantee", desc: "Enjoy meals at the most affordable prices." },
// // //   { title: "Exclusive Offers", desc: "Unlock special deals and discounts daily." }
// // // ];

// // // const categories = [
// // //   { name: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80" },
// // //   { name: "Biryani", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=300&q=80" },
// // //   { name: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80" },
// // //   { name: "Desserts", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80" },
// // // ];

// // // const WhyChoose = () => {
// // //   return (
// // //     <section className="why-section">

// // //       {/* WHY CHOOSE US */}
// // //       <div className="why-header">
// // //         <h2>Why Choose Eatoza</h2>
// // //         <p>Experience food delivery like never before</p>
// // //       </div>

// // //       <div className="why-grid">
// // //         {features.map((f, i) => (
// // //           <div key={i} className="why-card">
// // //             <h3>{f.title}</h3>
// // //             <p>{f.desc}</p>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* CATEGORIES */}
// // //       <div className="cat-header">
// // //         <h2>Explore Categories</h2>
// // //       </div>

// // //       <div className="cat-grid">
// // //         {categories.map((c, i) => (
// // //           <div key={i} className="cat-card">
// // //             <img src={c.image} alt={c.name} />
// // //             <span>{c.name}</span>
// // //           </div>
// // //         ))}
// // //       </div>

// // //     </section>
// // //   );
// // // };

// // // export default WhyChoose;


// // import React from "react";
// // import "./WhyChoose.css";

// // const features = [
// //   { title: "Lightning Fast Delivery", desc: "Get your food delivered in under 30 minutes." },
// //   { title: "Top Rated Restaurants", desc: "Only the best restaurants curated for you." },
// //   { title: "Best Price Guarantee", desc: "Enjoy meals at the most affordable prices." },
// //   { title: "Exclusive Offers", desc: "Unlock special deals and discounts daily." }
// // ];

// // const WhyChoose = () => {
// //   return (
// //     <section className="why-section">

// //       <div className="why-header">
// //         <h2>Why Choose Eatoza</h2>
// //         <p>Experience food delivery like never before</p>
// //       </div>

// //       <div className="why-grid">
// //         {features.map((f, i) => (
// //           <div key={i} className="why-card">
// //             <h3>{f.title}</h3>
// //             <p>{f.desc}</p>
// //           </div>
// //         ))}
// //       </div>

// //     </section>
// //   );
// // };

// // export default WhyChoose;


// import React from "react";
// import "./WhyChoose.css";

// const features = [
//   {
//     title: "Lightning Fast Delivery",
//     desc: "Get your food delivered in under 30 minutes.",
//     icon: "⚡"
//   },
//   {
//     title: "Top Rated Restaurants",
//     desc: "Only the best restaurants curated for you.",
//     icon: "⭐"
//   },
//   {
//     title: "Best Price Guarantee",
//     desc: "Enjoy meals at the most affordable prices.",
//     icon: "💰"
//   },
//   {
//     title: "Exclusive Offers",
//     desc: "Unlock special deals and discounts daily.",
//     icon: "🎁"
//   }
// ];

// const WhyChoose = () => {
//   return (
//     <section className="why-section">

//       <div className="why-header">
//         <h2>Why Choose Eatoza</h2>
//         <p>Experience food delivery like never before</p>
//       </div>

//       <div className="why-grid">
//         {features.map((f, i) => (
//           <div key={i} className="why-card">
//             <div className="why-icon">{f.icon}</div>
//             <h3>{f.title}</h3>
//             <p>{f.desc}</p>
//           </div>
//         ))}
//       </div>

//     </section>
//   );
// };

// export default WhyChoose;









// import React from "react";
// import "./WhyChoose.css";
// import {
//   Pizza,
//   Clock,
//   CreditCard,
//   Gift,
//   MapPin,
//   HeartHandshake
// } from "lucide-react";

// const features = [
//   { icon: Pizza, title: "Wide Variety", desc: "From street food to gourmet dining" },
//   { icon: Clock, title: "On-Time Guarantee", desc: "Or we make it right" },
//   { icon: CreditCard, title: "Seamless Payments", desc: "Fast, secure checkout" },
//   { icon: Gift, title: "Exclusive Offers", desc: "Premium deals you won’t find elsewhere" },
//   { icon: MapPin, title: "Real-Time Tracking", desc: "Watch your food arrive live" },
//   { icon: HeartHandshake, title: "Customer First", desc: "24/7 support that actually cares" }
// ];

// const WhyChoose = () => {
//   return (
//     <section className="why-section">

//       <div className="why-header">
//         <h2>Why We Stand Out</h2>
//         <p>Experience food delivery like never before</p>
//       </div>

//       <div className="why-grid">
//         {features.map((f, i) => {
//           const Icon = f.icon;
//           return (
//             <div key={i} className="why-card">
//               <div className="icon-wrap">
//                 <Icon size={28} strokeWidth={2.2} />
//               </div>
//               <h3>{f.title}</h3>
//               <p>{f.desc}</p>
//             </div>
//           );
//         })}
//       </div>

//     </section>
//   );
// };

// export default WhyChoose;





import React from "react";
import "./WhyChoose.css";
import {
  Pizza,
  Clock,
  CreditCard,
  Gift,
  MapPin,
  HeartHandshake
} from "lucide-react";

const features = [
  { icon: Pizza, title: "Wide Variety", desc: "From street food to gourmet dining" },
  { icon: Clock, title: "On-Time Guarantee", desc: "Or we make it right" },
  { icon: CreditCard, title: "Seamless Payments", desc: "Fast, secure checkout" },
  { icon: Gift, title: "Exclusive Offers", desc: "Premium deals you won’t find elsewhere" },
  { icon: MapPin, title: "Real-Time Tracking", desc: "Watch your food arrive live" },
  { icon: HeartHandshake, title: "Customer First", desc: "24/7 support that actually cares" }
];

const WhyChoose = () => {
  return (
    <section className="why-section">

      <div className="why-header">
        <h2>Why We Stand Out</h2>
        <p>Experience food delivery like never before</p>
      </div>

      <div className="why-grid">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="why-card">
              <Icon className="why-icon" size={34} strokeWidth={2.2} />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default WhyChoose;