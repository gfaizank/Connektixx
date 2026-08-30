import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const OPTIONS = [
  {
    label: "Explore solutions",
    response: "We work across four areas: Market Intelligence & Business Insights, Customer Experience & Engagement, Digital Growth & Demand Generation, and AI Automation & Business Transformation. Head to the Solutions section to see each in detail.",
    scrollToContact: false,
  },
  {
    label: "Discuss a business challenge",
    response: "Tell us a bit about what you're trying to solve and we'll point you to the right starting engagement. Use the contact form and select the closest area of interest.",
    scrollToContact: true,
  },
  {
    label: "Learn how Connektixx works",
    response: "We start with a small, focused pilot on one offering, prove the model, then scale into a full retained partnership. See How We Partner for the details.",
    scrollToContact: false,
  },
  {
    label: "Contact the team",
    response: "You can reach the team at support@connektixx.com, or use the contact form — I'll take you there now.",
    scrollToContact: true,
  },
];

const scrollToContact = (closePanel) => {
  closePanel();
  setTimeout(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, 200);
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [response, setResponse] = useState('');

  const handleOption = (opt) => {
    setResponse(opt.response);
    setAnswered(true);
    if (opt.scrollToContact) {
      scrollToContact(() => setOpen(false));
    }
  };

  const handleReset = () => {
    setAnswered(false);
    setResponse('');
  };

  const handleClose = () => {
    setOpen(false);
    handleReset();
  };

  const widget = (
    <div style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 9999, pointerEvents: 'none' }}>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: '5.5rem',
              right: '1.5rem',
              width: 360,
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              background: 'linear-gradient(160deg, #23262E, #1A1D23)',
              border: '1px solid rgba(255,84,28,0.3)',
              pointerEvents: 'auto',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'linear-gradient(135deg, rgba(255,84,28,0.3), rgba(217,67,15,0.2))', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <Logo size={32} />
              <div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, lineHeight: 1 }}>Connektixx</p>
                <p style={{ color: '#FF8A5B', fontSize: 11, marginTop: 2 }}>Automated assistant</p>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close chat"
                style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>

              {/* Opening assistant message */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #FF541C, #D9430F)', fontSize: 11, fontWeight: 700, color: '#fff' }}>C</div>
                <div style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px 16px 16px 4px', padding: '10px 14px', fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', maxWidth: '88%' }}>
                  Hi, I'm the Connektixx assistant. I can help you find the right place to start — what would you like to do?
                </div>
              </div>

              {/* Automation disclosure */}
              <p style={{ fontSize: 11, fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', paddingLeft: 32, marginTop: -4 }}>
                You're chatting with an automated assistant, not a person.
              </p>

              {/* Option buttons */}
              <AnimatePresence mode="wait">
                {!answered ? (
                  <motion.div
                    key="options"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 32 }}
                  >
                    {OPTIONS.map((opt, i) => (
                      <motion.button
                        key={i}
                        onClick={() => handleOption(opt)}
                        whileHover={{ backgroundColor: 'rgba(255,84,28,0.1)' }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,84,28,0.3)',
                          color: '#fff',
                          fontSize: 13,
                          borderRadius: 12,
                          padding: '10px 14px',
                          width: '100%',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                          fontFamily: 'inherit',
                          lineHeight: 1.4,
                        }}
                      >
                        {opt.label}
                      </motion.button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="response"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 32 }}
                  >
                    <div style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px 16px 16px 4px', padding: '10px 14px', fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
                      {response}
                    </div>
                    <motion.button
                      onClick={handleReset}
                      whileHover={{ borderColor: 'rgba(255,84,28,0.5)', color: '#fff' }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        alignSelf: 'flex-start',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: 12,
                        borderRadius: 8,
                        padding: '6px 12px',
                        cursor: 'pointer',
                        transition: 'border-color 0.15s, color 0.15s',
                        fontFamily: 'inherit',
                      }}
                    >
                      Start over
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Footer link */}
            <div style={{ padding: '8px 16px 14px', borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 6 }}>
              <button
                onClick={() => scrollToContact(() => setOpen(false))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'inherit', padding: 0, textDecoration: 'underline', textUnderlineOffset: 2 }}
                onMouseEnter={e => e.currentTarget.style.color = '#FF8A5B'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
              >
                Prefer a person? Go to the contact form.
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', pointerEvents: 'auto' }}>
        <motion.button
          onClick={() => {
            if (open) {
              handleClose();
            } else {
              setOpen(true);
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Open chat"
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #FF541C, #D9430F)',
            boxShadow: '0 0 28px rgba(255,84,28,0.55)',
          }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.svg key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}
                width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg key="chat" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.2 }}
                width="22" height="22" fill="#fff" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );

  return createPortal(widget, document.body);
};

export default ChatWidget;
