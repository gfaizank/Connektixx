import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const API_URL = import.meta.env.VITE_API_URL || 'https://connektixx.onrender.com';

const TypingDots = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    {[0, 1, 2].map(i => (
      <span key={i} className="w-2 h-2 rounded-full"
        style={{ background: '#FF8A5B', animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
    ))}
  </div>
);

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Connie, your Connektixx assistant. How can I help you today? 👋" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg = { role: 'user', content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || data.message }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again!' }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  const widget = (
    <div style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 9999, pointerEvents: 'none' }}>
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'absolute', bottom: '5.5rem', right: '1.5rem',
              width: 360, borderRadius: 16, overflow: 'hidden',
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
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, lineHeight: 1 }}>Connie</p>
                <p style={{ color: '#FF8A5B', fontSize: 11, marginTop: 2 }}>Connektixx AI Assistant</p>
              </div>
              <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="animate-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                <span style={{ color: '#34d399', fontSize: 11, fontWeight: 600 }}>Online</span>
              </span>
            </div>

            {/* Messages */}
            <div style={{ height: 280, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12, scrollbarWidth: 'none' }}>
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
                  style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  {m.role === 'assistant' && (
                    <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginRight: 8, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #FF541C, #D9430F)', fontSize: 11, fontWeight: 700, color: '#fff' }}>C</div>
                  )}
                  <div style={{
                    maxWidth: '75%', padding: '10px 14px', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    fontSize: 13, lineHeight: 1.5,
                    background: m.role === 'user' ? 'linear-gradient(135deg, #FF541C, #D9430F)' : 'rgba(255,255,255,0.07)',
                    backdropFilter: m.role === 'assistant' ? 'blur(16px)' : 'none',
                    border: m.role === 'assistant' ? '1px solid rgba(255,255,255,0.12)' : 'none',
                    color: m.role === 'user' ? '#fff' : 'rgba(255,255,255,0.85)',
                  }}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginRight: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #FF541C, #D9430F)', fontSize: 11, fontWeight: 700, color: '#fff' }}>C</div>
                  <div style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px 16px 16px 4px' }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '8px 12px 12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '8px 12px' }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKey}
                  rows={1}
                  placeholder="Ask me anything..."
                  style={{ flex: 1, background: 'transparent', color: '#fff', fontSize: 13, outline: 'none', resize: 'none', lineHeight: 1.5, maxHeight: 80, border: 'none', fontFamily: 'inherit' }}
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #FF541C, #D9430F)', border: 'none', cursor: 'pointer', opacity: (!input.trim() || loading) ? 0.3 : 1, transition: 'opacity 0.2s' }}
                >
                  <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                </button>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10, textAlign: 'center', marginTop: 6 }}>Powered by Connektixx AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', pointerEvents: 'auto' }}>
        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Open chat"
          style={{
            width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
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
