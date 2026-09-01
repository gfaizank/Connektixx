import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Logo from './Logo';
import { useContent } from '../context/ContentContext';

const Navbar = ({ navItems, scrollToSection, menuOpen, setMenuOpen, contactRef }) => {
  const { content } = useContent();
  const nb = content.navbar;
  const [scrolled, setScrolled] = useState(false);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Desktop Navbar ──────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(255,255,255,0.94)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid #E3E7EA' : '1px solid transparent',
          boxShadow: scrolled ? '0 6px 24px -18px rgba(45,49,58,0.3)' : 'none',
        }}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              onAnimationComplete={() => setLogoAnimationComplete(true)}
            >
              <Logo size={40} />
            </motion.div>
            <motion.span
              initial={{ x: -16, opacity: 0 }}
              animate={logoAnimationComplete ? { x: 0, opacity: 1 } : { x: -16, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-xl font-black tracking-widest uppercase"
              style={{
                fontFamily: "'Chakra Petch', 'Orbitron', sans-serif",
                color: '#2D313A',
              }}
            >
              {nb.brandName}
            </motion.span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => scrollToSection(item.ref)}
                whileHover={{ color: '#FF8A5B' }}
                className="font-medium text-sm transition-colors"
                style={{ color: '#2D313A' }}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,84,28,0.4)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection(contactRef)}
              className="px-5 py-2.5 rounded-lg font-bold text-white text-sm shimmer-btn"
              style={{ background: 'linear-gradient(135deg, #FF541C, #D9430F)' }}
            >
              {nb.cta}
            </motion.button>
          </div>

          {/* Mobile burger */}
          <button className="md:hidden p-1" style={{ color: '#2D313A' }} onClick={() => setMenuOpen(!menuOpen)}>
            <motion.div animate={{ rotate: menuOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Overlay ─────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 md:hidden animated-bg"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4"
              style={{ borderBottom: '1px solid rgba(255, 84, 28, 0.25)' }}>
              <div className="flex items-center gap-2">
                <Logo size={40} />
                <span className="text-lg font-black tracking-widest uppercase"
                  style={{ fontFamily: "'Chakra Petch','Orbitron',sans-serif", background: 'linear-gradient(135deg, #FF8A5B, #FF541C, #FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {nb.brandName}
                </span>
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-white/70 p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Nav items */}
            <div className="flex flex-col p-6 gap-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  onClick={() => scrollToSection(item.ref)}
                  className="text-left text-xl font-semibold text-white/80 hover:text-orange-400 py-3 px-4 rounded-xl hover:bg-white/5 transition-all"
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.06 + 0.1 }}
                onClick={() => scrollToSection(contactRef)}
              className="mt-4 py-4 rounded-xl font-bold text-white text-lg shimmer-btn"
                style={{ background: 'linear-gradient(135deg, #FF541C, #D9430F)' }}
              >
                {nb.cta}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
