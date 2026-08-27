import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const categoryThemes = [
  { gradient: 'from-indigo-950 via-violet-950 to-indigo-900', accent: '#818cf8', tag: 'bg-indigo-500/20 text-indigo-300', glow: 'rgba(99,102,241,0.3)' },
  { gradient: 'from-purple-950 via-fuchsia-950 to-purple-900', accent: '#c084fc', tag: 'bg-purple-500/20 text-purple-300', glow: 'rgba(168,85,247,0.3)' },
  { gradient: 'from-slate-950 via-emerald-950 to-slate-900', accent: '#34d399', tag: 'bg-emerald-500/20 text-emerald-300', glow: 'rgba(52,211,153,0.3)' },
];

const Services = () => {
  const { content } = useContent();
  const sv = content.services;
  const serviceCategories = sv.categories ?? [];

  return (
    <div className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8f7ff 50%, #f0edff 100%)' }}>
      {/* Subtle bg orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)', filter: 'blur(50px)' }} />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(99,102,241,0.1))', border: '1px solid rgba(124,58,237,0.2)', color: '#7c3aed' }}>
            {sv.pill}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{sv.heading}</h2>
          <div className="w-20 h-1 mx-auto rounded-full mb-5" style={{ background: 'linear-gradient(90deg, #7c3aed, #3b82f6)' }} />
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">{sv.subheading}</p>
          <p className="text-gray-400 max-w-2xl mx-auto mt-3 text-sm leading-relaxed">{sv.body}</p>
        </motion.div>

        {/* Category blocks */}
        <div className="space-y-20">
          {serviceCategories.map((cat, catIdx) => {
            const theme = categoryThemes[catIdx % categoryThemes.length];
            return (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
                className={`rounded-3xl bg-gradient-to-br ${theme.gradient} relative overflow-hidden`}
                style={{ boxShadow: `0 25px 60px ${theme.glow}, 0 0 0 1px rgba(255,255,255,0.05)` }}
              >
                {/* Orbs inside card */}
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${theme.accent}, transparent 70%)`, filter: 'blur(40px)' }} />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-15 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${theme.accent}, transparent 70%)`, filter: 'blur(30px)' }} />

                <div className="relative z-10 p-8 md:p-12">
                  {/* Category header */}
                  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
                    <div className="text-5xl mb-4">{cat.icon}</div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-3">{cat.category}</h3>
                    <div className="w-16 h-0.5 mx-auto mb-4 rounded-full" style={{ background: theme.accent }} />
                    <p className="font-semibold mb-2" style={{ color: theme.accent }}>{cat.tagline}</p>
                    <p className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed">{cat.description}</p>
                  </motion.div>

                  {/* Service cards grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(cat.services ?? []).map((svc, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        whileHover={{ y: -6, boxShadow: `0 20px 40px rgba(0,0,0,0.3)` }}
                        className="glass-card rounded-2xl p-6 text-center cursor-default"
                      >
                        <div className="text-3xl mb-3">{svc.icon}</div>
                        <h4 className="text-white font-bold text-base mb-2">{svc.title}</h4>
                        <p className="text-white/55 text-sm leading-relaxed">{svc.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
