import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";

const colorMap = {
  blue:   { glow: 'rgba(255,84,28,0.2)',  accent: '#FF8A5B', dot: '#FF541C', bg: 'linear-gradient(135deg, #23262E, #2D313A)' },
  purple: { glow: 'rgba(255,84,28,0.2)', accent: '#FF8A5B', dot: '#FF541C', bg: 'linear-gradient(135deg, #23262E, #2D313A)' },
  green:  { glow: 'rgba(52,211,153,0.35)', accent: '#34d399', dot: '#10b981', bg: 'linear-gradient(135deg, #022c22, #0f172a)' },
};

const WhyChoose = () => {
  const { content } = useContent();
  const wc = content.whyChoose;

  return (
    <div className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0edff 0%, #faf8ff 100%)' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FF541C, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FF8A5B, transparent 70%)', filter: 'blur(70px)' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-bold"
            style={{ background: 'rgba(255,84,28,0.15)', border: '1px solid rgba(255,84,28,0.3)', color: '#FF8A5B' }}>
            {wc.pill}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{wc.heading}</h2>
          <div className="w-20 h-1 mx-auto rounded-full mb-5" style={{ background: 'linear-gradient(90deg, #FF541C, #FF8A5B)' }} />
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{wc.subheading}</p>
        </motion.div>

        <div className="space-y-10">
          {(wc.services ?? []).map((svc, i) => {
            const theme = colorMap[svc.color] ?? colorMap.blue;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7 }}
                className="rounded-3xl relative overflow-hidden"
                style={{ background: theme.bg, boxShadow: `0 20px 60px ${theme.glow}` }}
              >
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${theme.accent}, transparent 70%)`, filter: 'blur(40px)' }} />

                <div className="relative z-10 p-8 md:p-12">
                  <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-8">
                    <div className="text-5xl mb-4">{svc.icon}</div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{svc.title}</h3>
                    <p className="font-semibold text-sm" style={{ color: theme.accent }}>{svc.tagline}</p>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                    {(svc.features ?? []).map((feat, fi) => (
                      <motion.div
                        key={fi}
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: fi * 0.06 }}
                        whileHover={{ scale: 1.03 }}
                        className="glass-card rounded-xl px-4 py-3 flex items-start gap-3"
                      >
                        <span className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ background: theme.dot, color: '#fff' }}>✓</span>
                        <span className="text-white/75 text-sm leading-snug">{feat}</span>
                      </motion.div>
                    ))}
                  </div>

                  {svc.conclusion && (
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
                      className="glass-card rounded-2xl px-6 py-4 text-center max-w-2xl mx-auto">
                      <p className="text-white/80 text-base italic font-medium">"{svc.conclusion}"</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-14 text-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(255,84,28,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 rounded-xl font-bold text-white text-base shimmer-btn"
            style={{ background: 'linear-gradient(135deg, #FF541C, #D9430F)' }}
          >
            {wc.cta}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChoose;
