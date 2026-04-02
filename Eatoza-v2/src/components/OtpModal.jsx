// import React, { useState, useRef, useEffect } from 'react';
// import './OtpModal.css';

// const OtpModal = ({ onVerified, onClose, action }) => {
//   const [step, setStep]       = useState('send'); // 'send' | 'verify'
//   const [otp, setOtp]         = useState(['', '', '', '', '', '']);
//   const [token, setToken]     = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError]     = useState('');
//   const [timer, setTimer]     = useState(0);
//   const inputs                = useRef([]);

//   useEffect(() => {
//     if (timer > 0) {
//       const t = setTimeout(() => setTimer(timer - 1), 1000);
//       return () => clearTimeout(t);
//     }
//   }, [timer]);

//   const handleSendOTP = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const res  = await fetch('${import.meta.env.VITE_API_URL}/api/otp/send', {
//         method:  'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body:    JSON.stringify({ action }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setToken(data.token);
//         setStep('verify');
//         setTimer(300); // 5 min countdown
//       } else {
//         setError(data.message);
//       }
//     } catch {
//       setError('Could not connect to server.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value.slice(-1);
//     setOtp(newOtp);
//     if (value && index < 5) inputs.current[index + 1]?.focus();
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   const handleVerify = async () => {
//     const otpString = otp.join('');
//     if (otpString.length !== 6) {
//       setError('Please enter all 6 digits.');
//       return;
//     }
//     setLoading(true);
//     setError('');
//     try {
//       const res  = await fetch('${import.meta.env.VITE_API_URL}/api/otp/verify', {
//         method:  'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body:    JSON.stringify({ token, otp: otpString }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         onVerified();
//       } else {
//         setError(data.message);
//         setOtp(['', '', '', '', '', '']);
//         inputs.current[0]?.focus();
//       }
//     } catch {
//       setError('Could not connect to server.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatTimer = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

//   return (
//     <div className="otp-backdrop" onClick={onClose}>
//       <div className="otp-modal" onClick={e => e.stopPropagation()}>
//         <button className="otp-close" onClick={onClose}>✕</button>

//         {step === 'send' ? (
//           <>
//             <div className="otp-icon">🔐</div>
//             <h2>Security Verification</h2>
//             <p>To <strong>{action}</strong>, we need to verify your identity.</p>
//             {/* <p className="otp-email">An OTP will be sent to:<br/><strong>tanuyadavkccf@gmail.com</strong></p> */}
//             <p className="otp-email">
//   An OTP will be sent to the admin for verification.
// </p>
//             {error && <p className="otp-error">{error}</p>}
//             <button className="otp-btn" onClick={handleSendOTP} disabled={loading}>
//               {loading ? 'Sending...' : 'Send OTP →'}
//             </button>
//           </>
//         ) : (
//           <>
//             <div className="otp-icon">📧</div>
//             <h2>Enter OTP</h2>
//             {/* <p>Check your email <strong>tanuyadavkccf@gmail.com</strong></p> */}
//             <p>OTP has been sent to the admin email.</p>

//             <div className="otp-inputs">
//               {otp.map((digit, i) => (
//                 <input
//                   key={i}
//                   ref={el => inputs.current[i] = el}
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={1}
//                   value={digit}
//                   onChange={e => handleOtpChange(i, e.target.value)}
//                   onKeyDown={e => handleKeyDown(i, e)}
//                   className="otp-input"
//                   autoFocus={i === 0}
//                 />
//               ))}
//             </div>

//             {error && <p className="otp-error">{error}</p>}

//             {timer > 0 && (
//               <p className="otp-timer">⏱ Expires in {formatTimer(timer)}</p>
//             )}

//             <button
//               className="otp-btn"
//               onClick={handleVerify}
//               disabled={loading || otp.join('').length !== 6}
//             >
//               {loading ? 'Verifying...' : 'Verify OTP ✓'}
//             </button>

//             <button
//               className="otp-resend"
//               onClick={() => { setStep('send'); setOtp(['','','','','','']); setError(''); }}
//             >
//               Resend OTP
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OtpModal;













import React, { useState, useRef, useEffect } from 'react';
import './OtpModal.css';

const OtpModal = ({ onVerified, onClose, action }) => {
  const [step, setStep]       = useState('send');
  const [otp, setOtp]         = useState(['', '', '', '', '', '']);
  const [token, setToken]     = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [timer, setTimer]     = useState(0);
  const inputs                = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  // ✅ FIXED
  const handleSendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      const data = await res.json();

      if (data.success) {
        setToken(data.token);
        setStep('verify');
        setTimer(300);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // ✅ FIXED
  const handleVerify = async () => {
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, otp: otpString }),
      });

      const data = await res.json();

      if (data.success) {
        onVerified();
      } else {
        setError(data.message);
        setOtp(['', '', '', '', '', '']);
        inputs.current[0]?.focus();
      }
    } catch {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const formatTimer = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="otp-backdrop" onClick={onClose}>
      <div className="otp-modal" onClick={e => e.stopPropagation()}>
        <button className="otp-close" onClick={onClose}>✕</button>

        {step === 'send' ? (
          <>
            <div className="otp-icon">🔐</div>
            <h2>Security Verification</h2>
            <p>To <strong>{action}</strong>, we need to verify your identity.</p>

            <p className="otp-email">
              An OTP will be sent to the admin for verification.
            </p>

            {error && <p className="otp-error">{error}</p>}

            <button className="otp-btn" onClick={handleSendOTP} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP →'}
            </button>
          </>
        ) : (
          <>
            <div className="otp-icon">📧</div>
            <h2>Enter OTP</h2>
            <p>OTP has been sent to the admin email.</p>

            <div className="otp-inputs">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => (inputs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className="otp-input"
                  autoFocus={i === 0}
                />
              ))}
            </div>

            {error && <p className="otp-error">{error}</p>}

            {timer > 0 && (
              <p className="otp-timer">⏱ Expires in {formatTimer(timer)}</p>
            )}

            <button
              className="otp-btn"
              onClick={handleVerify}
              disabled={loading || otp.join('').length !== 6}
            >
              {loading ? 'Verifying...' : 'Verify OTP ✓'}
            </button>

            <button
              className="otp-resend"
              onClick={() => {
                setStep('send');
                setOtp(['', '', '', '', '', '']);
                setError('');
              }}
            >
              Resend OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OtpModal;











