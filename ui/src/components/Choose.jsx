import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Choose = () => {
  const { content } = useContent();
  const sol = content.solutions;
  const pillars = sol.pillars ?? [];

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff, #F2EFEA)' }}
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF541C, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-28 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span
            className="inline-block mb-5 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide"
            style={{
              background: 'rgba(255,84,28,0.1)',
              border: '1px solid rgba(255,84,28,0.25)',
              color: '#D9430F',
            }}
          >
            {sol.pill}
          </span>

          <h2 className="text-gray-900 text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ fontFamily: 'Noto Serif, serif' }}>
            {sol.heading}
          </h2>

          <div
            className="mb-5 rounded-full"
            style={{
              width: 80,
              height: 3,
              background: 'linear-gradient(90deg, #FF541C, #FF8A5B)',
            }}
          />

          <p className="text-gray-500 text-base leading-relaxed max-w-2xl">
            {sol.subheading}
          </p>
        </motion.div>

        {/* Pillar cards — 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{
                y: -4,
                boxShadow: '0 20px 48px rgba(255,84,28,0.12)',
                transition: { duration: 0.2 },
              }}
              className="glass-card rounded-2xl p-8"
              style={{
                background: '#ffffff',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              }}
            >
              {/* Pillar tag */}
              <span
                className="inline-block mb-4 px-3 py-1 rounded-md font-mono text-xs font-semibold"
                style={{
                  background: 'rgba(255,84,28,0.1)',
                  color: '#D9430F',
                }}
              >
                {pillar.tag}
              </span>

              {/* Promise */}
              <h3 className="text-gray-900 font-bold text-xl mb-2">
                {pillar.promise}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {pillar.description}
              </p>

              {/* Offerings */}
              <div className="space-y-0">
                {(pillar.offerings ?? []).map((offering, j) => (
                  <div key={j}>
                    <div
                      className="pl-3 py-3"
                      style={{ borderLeft: '2px solid rgba(255,84,28,0.4)' }}
                    >
                      <p className="text-gray-800 font-semibold text-sm mb-0.5">
                        {offering.title}
                      </p>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {offering.description}
                      </p>
                    </div>
                    {j < (pillar.offerings ?? []).length - 1 && (
                      <div
                        className="ml-3"
                        style={{ height: 1, background: 'rgba(0,0,0,0.06)' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Choose;
