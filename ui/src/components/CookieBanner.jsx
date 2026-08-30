import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'cookieConsent';

const CookieBanner = () => {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setDismissed(false);
    } catch {
      // localStorage unavailable — don't show banner
    }
  }, []);

  const handleChoice = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            background: 'rgba(35,38,46,0.97)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255,84,28,0.2)',
          }}
        >
          <div style={{ maxWidth: 896, margin: '0 auto', padding: '14px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 1.55, flex: '1 1 280px', margin: 0 }}>
              We use essential cookies to run this site. We don't yet use any non-essential tracking or marketing cookies — if that changes, this notice will be updated and you'll be asked again. See our Cookie Policy for details.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flexShrink: 0 }}>
              <button
                onClick={() => handleChoice('accepted')}
                style={{
                  background: '#FF541C',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Accept
              </button>
              <button
                onClick={() => handleChoice('rejected')}
                style={{
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,84,28,0.4)',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.15s, color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,84,28,0.7)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,84,28,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              >
                Reject Non-Essential
              </button>
              <button
                onClick={() => handleChoice('managed')}
                style={{
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.5)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 12px',
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                Manage Preferences
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
