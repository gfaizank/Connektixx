import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";
import logoSrc from '../assets/PNG-1.png';

const CHIP_ICONS = [
  // layers
  <svg key="layers" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, color: '#FF541C' }}><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  // cpu
  <svg key="cpu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, color: '#FF541C' }}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>,
  // scale
  <svg key="scale" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, color: '#FF541C' }}><path d="M12 3v18M3 9l9-6 9 6"/><path d="M5 20h14"/><path d="M7 9l-4 9h8L7 9z"/><path d="M17 9l-4 9h8l-4-9z"/></svg>,
];

const NodeCanvas = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const NODE_COUNT = 22;
    let W, H, nodes = [];

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const initNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 1.4,
      }));
    };

    resize();
    initNodes();

    const onResize = () => { resize(); };
    window.addEventListener('resize', onResize);

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const max = W * 0.22;
          if (dist < max) {
            ctx.strokeStyle = `rgba(45,49,58,${0.10 * (1 - dist / max)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n, i) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = (i === 0 || i === 11)
          ? 'rgba(255,84,28,0.9)'
          : 'rgba(45,49,58,0.45)';
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', onResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
};

const Home = ({ scrollToSection, contactRef }) => {
  const { content } = useContent();
  const h = content.home;

  return (
    <div style={{ background: '#ffffff', overflow: 'hidden', paddingTop: 172, paddingBottom: 108 }}>
      <div style={{
        maxWidth: 1180,
        margin: '0 auto',
        padding: '0 32px',
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        gap: 56,
        alignItems: 'center',
      }}
        className="hero-grid"
      >
        {/* ── Left: Text ─────────────────────────────── */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontWeight: 700, fontSize: 12.5, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: '#565C66', marginBottom: 18,
            }}
          >
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#FF541C',
              boxShadow: '0 0 0 4px rgba(255,84,28,0.15)',
              flexShrink: 0,
              display: 'inline-block',
            }} />
            {h.eyebrow}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Noto Serif', Georgia, serif",
              fontSize: 'clamp(38px, 5vw, 58px)',
              lineHeight: 1.08,
              letterSpacing: '-0.015em',
              color: '#2D313A',
              margin: 0,
              fontWeight: 600,
            }}
          >
            Growth strategy,<br />
            built{' '}
            <em style={{ fontStyle: 'italic', color: '#FF541C' }}>with</em>
            {' '}you<br />
            — not sold to you.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginTop: 26, fontSize: 18.5, lineHeight: 1.65, color: '#565C66', maxWidth: 520 }}
          >
            {h.subtext}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{ marginTop: 38, display: 'flex', gap: 14, flexWrap: 'wrap' }}
          >
            <motion.button
              whileHover={{ background: '#D9430F' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection(contactRef)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                fontFamily: 'inherit', fontWeight: 600, fontSize: 15,
                padding: '14px 26px', borderRadius: 100,
                border: '1.5px solid transparent',
                background: '#FF541C', color: '#fff',
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}
            >
              {h.cta}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </motion.button>
            <motion.button
              whileHover={{ background: '#2D313A', color: '#fff' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center',
                fontFamily: 'inherit', fontWeight: 600, fontSize: 15,
                padding: '14px 26px', borderRadius: 100,
                border: '1.5px solid #2D313A', background: 'transparent',
                color: '#2D313A', cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              {h.ctaSecondary}
            </motion.button>
          </motion.div>

          {/* Trait chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ marginTop: 52, display: 'flex', gap: 14, flexWrap: 'wrap' }}
          >
            {(h.chips ?? []).map((chip, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 13.5, fontWeight: 600, color: '#2D313A',
                background: '#F2EFEA', border: '1px solid #E7E3DC',
                padding: '9px 16px', borderRadius: 100,
              }}>
                {CHIP_ICONS[i]}
                {chip}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Animated node canvas ──────────── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: 'relative', aspectRatio: '1/1', maxWidth: 460, justifySelf: 'end', width: '100%' }}
          className="hero-visual"
        >
          <NodeCanvas />

          {/* Floating badge */}
          <div style={{
            position: 'absolute', bottom: 14, left: 14,
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(6px)',
            border: '1px solid #E3E7EA',
            borderRadius: 100,
            padding: '8px 18px 8px 8px',
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 1px 2px rgba(45,49,58,.06), 0 12px 28px -12px rgba(45,49,58,.16)',
          }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2, flexShrink: 0, border: '1px solid #E3E7EA' }}>
              <img src={logoSrc} alt="Connektixx" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#2D313A' }}>One partner. Full stack.</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-visual {
            justify-self: center !important;
            max-width: 300px !important;
            order: -1;
            margin-bottom: 8px;
          }
        }
        @media (max-width: 640px) {
          .hero-grid {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
