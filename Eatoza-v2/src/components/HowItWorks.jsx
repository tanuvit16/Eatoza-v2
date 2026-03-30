import React from 'react';
import './HowItWorks.css';

const steps = [
  { emoji: '🔍', title: 'Search', desc: 'Find the best restaurants and dishes near you using our smart search.' },
  { emoji: '🛒', title: 'Choose & Order', desc: 'Browse menus, pick your favourites, and place your order in seconds.' },
  { emoji: '🚴', title: 'Fast Delivery', desc: 'Track your order in real-time as it races to your doorstep.' },
  { emoji: '😋', title: 'Enjoy!', desc: 'Sit back, relax and enjoy restaurant-quality food at home.' },
];

const HowItWorks = () => (
  <section className="hiw-section">
    <div className="hiw-inner">
      <h2>How Eatoza Works</h2>
      <p className="hiw-sub">From craving to table in four simple steps</p>
      <div className="hiw-grid">
        {steps.map((s, i) => (
          <div key={i} className="hiw-card">
            <div className="hiw-num">{i + 1}</div>
            <div className="hiw-emoji">{s.emoji}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
