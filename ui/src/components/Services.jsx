import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Services = () => {
  const { content } = useContent();
  const cap = content.capabilities;
  const items = cap.items ?? [];
  const engagementAreas = cap.engagementAreas ?? [];

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #23262E, #2D313A)' }}
    >
      {/* Subtle ambient glows */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF541C, transparent 70%)', filter: 'blur(80px)' }}
      />
      <div
        className="absolute bottom-0 left-10 w-80 h-80 rounded-full opacity-8 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF8A5B, transparent 70%)', filter: 'blur(70px)' }}
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
              background: 'rgba(255,84,28,0.15)',
              border: '1px solid rgba(255,84,28,0.3)',
              color: '#FF8A5B',
            }}
          >
            {cap.pill}
          </span>

          <h2 className="text-white text-4xl md:text-5xl mb-5 leading-tight" style={{ fontFamily: 'Noto Serif, serif' }}>
            {cap.heading}
          </h2>

          <div
            className="mb-5 rounded-full"
            style={{
              width: 80,
              height: 3,
              background: 'linear-gradient(90deg, #FF541C, #FF8A5B)',
            }}
          />

          <p className="text-base leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {cap.subheading}
          </p>
        </motion.div>

        {/* Capability rows — 2 columns on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {items.map((item, i) => {
            const num = String(i + 1).padStart(2, '0');
            const isLastRow = i >= items.length - (items.length % 2 === 0 ? 2 : 1);
            const isRightCol = i % 2 === 1;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="flex gap-5 p-6 md:p-8"
                style={{
                  borderBottom: isLastRow ? 'none' : '1px solid rgba(255,84,28,0.1)',
                  borderRight: isRightCol ? 'none' : '1px solid rgba(255,84,28,0.1)',
                }}
              >
                {/* Number badge */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
                  style={{
                    background: 'rgba(255,84,28,0.15)',
                    color: '#FF541C',
                  }}
                >
                  {num}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-1.5">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Engagement Areas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 pt-10"
          style={{ borderTop: '1px solid rgba(255,84,28,0.12)' }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Selected Engagement Areas
          </p>

          <div className="flex flex-wrap gap-2.5">
            {engagementAreas.map((area, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="glass-dark rounded-full px-3 py-1 text-sm"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {area}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Services;
