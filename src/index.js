import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import App from './App';
import Login from './Login';

function Root() {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u));
    return unsub;
  }, []);

  if (user === undefined) {
    return (
      <div style={{
        minHeight: '100vh', background: '#f7f5f0', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Source Sans Pro','Segoe UI',system-ui,sans-serif",
        flexDirection: 'column', gap: 12,
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12, background: '#244a3b',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Georgia',serif", fontWeight: 700, fontSize: 18, color: '#fff',
        }}>IEL</div>
        <div style={{ color: '#8a9a8e', fontSize: 13 }}>Loading…</div>
      </div>
    );
  }

  if (!user) return <Login />;

  return <App accountId={user.uid} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
