import React, { useState } from 'react';
import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';

const S = {
  screen: {
    minHeight: '100vh', background: '#f7f5f0', display: 'flex',
    flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '24px 20px', fontFamily: "'Source Sans Pro','Segoe UI',system-ui,sans-serif",
  },
  logo: {
    width: 64, height: 64, borderRadius: 16, background: '#244a3b',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Georgia',serif", fontWeight: 700, fontSize: 22, color: '#fff',
    marginBottom: 16,
  },
  title: { fontWeight: 800, fontSize: 22, color: '#22301f', marginBottom: 4 },
  sub: { fontSize: 13.5, color: '#8a9a8e', marginBottom: 32 },
  card: {
    background: '#fff', borderRadius: 16, border: '1px solid #e2e0d6',
    padding: '24px 20px', width: '100%', maxWidth: 380,
  },
  label: { fontSize: 12, fontWeight: 700, color: '#5c6b56', marginBottom: 5, display: 'block', letterSpacing: '0.04em' },
  input: {
    width: '100%', padding: '12px 14px', borderRadius: 10,
    border: '1.5px solid #e2e0d6', fontSize: 16, color: '#22301f',
    background: '#fcfbf8', marginBottom: 14, boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  btn: {
    width: '100%', padding: '14px 0', borderRadius: 10, border: 'none',
    background: '#2f5d4a', color: '#fff', fontSize: 15, fontWeight: 700,
    cursor: 'pointer', marginTop: 4,
  },
  toggle: {
    marginTop: 16, textAlign: 'center', fontSize: 13.5, color: '#8a9a8e',
  },
  toggleLink: { color: '#2f5d4a', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' },
  error: {
    background: '#fdf0e8', border: '1px solid #f0d8d3', borderRadius: 8,
    padding: '10px 12px', fontSize: 13, color: '#9c4a26', marginBottom: 14,
  },
};

export default function Login() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setError(''); setLoading(true);
    try {
      if (mode === 'signin') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (e) {
      const msgs = {
        'auth/user-not-found': 'No account found for that email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/email-already-in-use': 'An account with that email already exists.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/invalid-credential': 'Incorrect email or password.',
      };
      setError(msgs[e.code] || e.message);
    }
    setLoading(false);
  };

  return (
    <div style={S.screen}>
      <div style={S.logo}>IEL</div>
      <div style={S.title}>Field Cost Log</div>
      <div style={S.sub}>Incredible Edible Landscapes</div>
      <div style={S.card}>
        <div style={{ fontWeight: 700, fontSize: 16, color: '#22301f', marginBottom: 18 }}>
          {mode === 'signin' ? 'Sign in to your account' : 'Create a device account'}
        </div>
        {error && <div style={S.error}>{error}</div>}
        <label style={S.label}>EMAIL</label>
        <input
          style={S.input} type="email" placeholder="you@example.com"
          value={email} onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handle()}
          onClick={e => e.target.focus()}
          autoCapitalize="none" autoCorrect="off" autoComplete="email"
        />
        <label style={S.label}>PASSWORD</label>
        <input
          style={S.input} type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handle()}
          onClick={e => e.target.focus()}
          autoComplete="current-password"
        />
        <button style={{ ...S.btn, opacity: loading ? 0.6 : 1 }} onClick={handle} disabled={loading}>
          {loading ? 'Please waitâ€¦' : mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>
        <div style={S.toggle}>
          {mode === 'signin' ? (
            <>First time on this device? <span style={S.toggleLink} onClick={() => { setMode('signup'); setError(''); }}>Create account</span></>
          ) : (
            <>Already have an account? <span style={S.toggleLink} onClick={() => { setMode('signin'); setError(''); }}>Sign in</span></>
          )}
        </div>
      </div>
      <div style={{ marginTop: 24, fontSize: 12, color: '#aaa', textAlign: 'center', maxWidth: 300 }}>
        Each device (your phone, foreman's phone) signs in once and stays logged in.
      </div>
    </div>
  );
}
