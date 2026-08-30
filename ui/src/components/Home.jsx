import { motion } from "framer-motion";
import { useActiveSection } from "../context/ActiveSectionContext";
import { useContent } from "../context/ContentContext";

const Home = ({ scrollToSection, contactRef }) => {
  const { activeSection } = useActiveSection();
  const { content } = useContent();
  const h = content.home;

  return (
    <div className="relative min-h-screen overflow-hidden animated-bg flex flex-col">
      {/* ── Animated gradient orbs ───────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="orb-a absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #FF541C 0%, #D9430F 40%, transparent 70%)' }} />
        <div className="orb-b absolute top-1/4 right-0 w-[420px] h-[420px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #FF541C 0%, #FF8A5B 50%, transparent 70%)' }} />
        <div className="orb-c absolute bottom-0 left-1/3 w-[380px] h-[380px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #FF8A5B 0%, #D9430F 50%, transparent 70%)' }} />
        <div className="orb-a absolute top-2/3 right-1/4 w-[260px] h-[260px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FF541C 0%, #FF8A5B 50%, transparent 70%)', animationDelay: '-7s' }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* ── Main hero content ────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-28 pb-12 md:pt-40 md:pb-16 text-center">

        {/* Badge pill */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass text-sm font-semibold tracking-wide"
          style={{ background: 'rgba(255,84,28,0.2)', border: '1px solid rgba(255,84,28,0.3)', color: '#FF8A5B' }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#FF541C' }} />
          {h.eyebrow}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight max-w-4xl mx-auto"
        >
          <span className="gradient-text">{h.headline}</span>
        </motion.h1>

        {/* Underline accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="mt-4 h-1 w-32 mx-auto rounded-full"
          style={{ background: 'linear-gradient(90deg, #FF541C, #FF8A5B)' }}
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed"
        >
          {h.subtext}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(255,84,28,0.45)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection(contactRef)}
            className="shimmer-btn relative px-8 py-4 rounded-xl font-bold text-white text-base"
            style={{ background: 'linear-gradient(135deg, #FF541C, #D9430F)' }}
          >
            {h.cta}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.12)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-xl font-bold text-white text-base glass"
            style={{ border: '1px solid rgba(255,84,28,0.4)' }}
          >
            {h.ctaSecondary}
          </motion.button>
        </motion.div>

        {/* Chip pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {(h.chips ?? []).map((chip, i) => (
            <div key={i} className="glass px-4 py-2 rounded-full text-sm text-white/70 font-medium">
              {chip}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom fade into next section ───────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.04))' }} />
    </div>
  );
};

export default Home;
