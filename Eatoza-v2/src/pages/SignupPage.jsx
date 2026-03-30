// import React, { useState } from 'react';
// import './AuthPages.css';

// const SignupPage = ({ navigate, onSignup }) => {
//   const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

//   const submit = (e) => {
//     e.preventDefault();
//     setError('');
//     if (!form.name || !form.email || !form.password) return setError('Please fill in all required fields.');
//     if (form.password !== form.confirm) return setError('Passwords do not match.');
//     if (form.password.length < 6) return setError('Password must be at least 6 characters.');
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       onSignup({ name: form.name, email: form.email });
//     }, 900);
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-left">
//         <div className="auth-brand" onClick={() => navigate('home')}>Eatoza</div>
//         <div className="auth-art">
//           <div className="food-circle">🥗</div>
//           <div className="food-circle sm">🍜</div>
//           <div className="food-circle xs">🍩</div>
//           <div className="food-circle sm2">🥘</div>
//         </div>
//         <p className="auth-left-text">Join millions enjoying great food every day 🍽️</p>
//       </div>

//       <div className="auth-right">
//         <div className="auth-card">
//           <h2>Create an account</h2>
//           <p className="auth-sub">Sign up and start exploring</p>

//           <form onSubmit={submit}>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Full Name *</label>
//                 <input name="name" type="text" placeholder="John Doe"
//                   value={form.name} onChange={handle} />
//               </div>
//               <div className="form-group">
//                 <label>Phone Number</label>
//                 <input name="phone" type="tel" placeholder="+91 99999 99999"
//                   value={form.phone} onChange={handle} />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Email address *</label>
//               <input name="email" type="email" placeholder="you@example.com"
//                 value={form.email} onChange={handle} />
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Password *</label>
//                 <input name="password" type="password" placeholder="Min 6 characters"
//                   value={form.password} onChange={handle} />
//               </div>
//               <div className="form-group">
//                 <label>Confirm Password *</label>
//                 <input name="confirm" type="password" placeholder="Repeat password"
//                   value={form.confirm} onChange={handle} />
//               </div>
//             </div>
//             <div className="terms-check">
//               <input type="checkbox" id="terms" required />
//               <label htmlFor="terms">
//                 I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>
//               </label>
//             </div>
//             {error && <p className="auth-error">{error}</p>}
//             <button className="auth-btn" type="submit" disabled={loading}>
//               {loading ? 'Creating account…' : 'Create Account'}
//             </button>
//           </form>

//           <div className="auth-divider"><span>or sign up with</span></div>
//           <div className="social-auth">
//             <button className="social-btn">🌐 Google</button>
//             <button className="social-btn">📘 Facebook</button>
//           </div>

//           <p className="auth-switch">
//             Already have an account?{' '}
//             <span onClick={() => navigate('login')}>Log in</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


















import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import './AuthPages.css';

const SignupPage = ({ navigate }) => {
  const { signUp, setActive } = useSignUp();
  const [form, setForm] = useState({ firstName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState('');

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signUp.create({
        firstName:    form.firstName,
        emailAddress: form.email,
        password:     form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerifying(true);
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('home');
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand" onClick={() => navigate('home')}>Eatoza</div>
        <div className="auth-art">
          <div className="food-circle">🥗</div>
          <div className="food-circle sm">🍜</div>
          <div className="food-circle xs">🍩</div>
          <div className="food-circle sm2">🥘</div>
        </div>
        <p className="auth-left-text">Join millions enjoying great food every day 🍽️</p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          {!verifying ? (
            <>
              <h2>Create an account</h2>
              <p className="auth-sub">Sign up and start exploring</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>First Name</label>
                  <input name="firstName" value={form.firstName}
                    onChange={handle} placeholder="Tanu" required />
                </div>
                <div className="form-group">
                  <label>Email address</label>
                  <input name="email" type="email" value={form.email}
                    onChange={handle} placeholder="you@example.com" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input name="password" type="password" value={form.password}
                    onChange={handle} placeholder="Min 8 characters" required />
                </div>
                {error && <p className="auth-error">{error}</p>}
                <button className="auth-btn" type="submit" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h2>Check your email 📧</h2>
              <p className="auth-sub">We sent a verification code to <strong>{form.email}</strong></p>
              <form onSubmit={handleVerify}>
                <div className="form-group">
                  <label>Verification Code</label>
                  <input
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    required
                    style={{ letterSpacing: '4px', fontSize: '20px', textAlign: 'center' }}
                  />
                </div>
                {error && <p className="auth-error">{error}</p>}
                <button className="auth-btn" type="submit" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify Email'}
                </button>
              </form>
            </>
          )}

          <p className="auth-switch">
            Already have an account?{' '}
            <span onClick={() => navigate('login')}>Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;