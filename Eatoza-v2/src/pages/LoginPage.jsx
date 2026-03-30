// import React, { useState } from 'react';
// import './AuthPages.css';

// const LoginPage = ({ navigate, onLogin }) => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

//   const submit = (e) => {
//     e.preventDefault();
//     setError('');
//     if (!form.email || !form.password) return setError('Please fill in all fields.');
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       onLogin({ name: form.email.split('@')[0], email: form.email });
//     }, 900);
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-left">
//         <div className="auth-brand" onClick={() => navigate('home')}>Eatoza</div>
//         <div className="auth-art">
//           <div className="food-circle">🍕</div>
//           <div className="food-circle sm">🍔</div>
//           <div className="food-circle xs">🍣</div>
//           <div className="food-circle sm2">🌮</div>
//         </div>
//         <p className="auth-left-text">Your favourite food, delivered fast 🚀</p>
//       </div>

//       <div className="auth-right">
//         <div className="auth-card">
//           <h2>Welcome back!</h2>
//           <p className="auth-sub">Log in to your Eatoza account</p>

//           <form onSubmit={submit}>
//             <div className="form-group">
//               <label>Email address</label>
//               <input name="email" type="email" placeholder="you@example.com"
//                 value={form.email} onChange={handle} />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input name="password" type="password" placeholder="••••••••"
//                 value={form.password} onChange={handle} />
//             </div>
//             <div className="auth-options">
//               <label className="remember"><input type="checkbox" /> Remember me</label>
//               <span className="forgot">Forgot password?</span>
//             </div>
//             {error && <p className="auth-error">{error}</p>}
//             <button className="auth-btn" type="submit" disabled={loading}>
//               {loading ? 'Logging in…' : 'Log In'}
//             </button>
//           </form>

//           <div className="auth-divider"><span>or continue with</span></div>
//           <div className="social-auth">
//             <button className="social-btn">🌐 Google</button>
//             <button className="social-btn">📘 Facebook</button>
//           </div>

//           <p className="auth-switch">
//             Don't have an account?{' '}
//             <span onClick={() => navigate('signup')}>Sign up</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;















import { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import './AuthPages.css';

const LoginPage = ({ navigate }) => {
  const { signIn, setActive } = useSignIn();
  const [form, setForm]   = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await signIn.create({
        identifier: form.email,
        password:   form.password,
      });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('home');
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand" onClick={() => navigate('home')}>Eatoza</div>
        <div className="auth-art">
          <div className="food-circle">🍕</div>
          <div className="food-circle sm">🍔</div>
          <div className="food-circle xs">🍣</div>
          <div className="food-circle sm2">🌮</div>
        </div>
        <p className="auth-left-text">Your favourite food, delivered fast 🚀</p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Welcome back!</h2>
          <p className="auth-sub">Log in to your Eatoza account</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input name="email" type="email" value={form.email}
                onChange={handle} placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" value={form.password}
                onChange={handle} placeholder="••••••••" required />
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{' '}
            <span onClick={() => navigate('signup')}>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;