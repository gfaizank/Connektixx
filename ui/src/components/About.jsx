import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const About = () => {
  const { content } = useContent();
  const ab = content.about;

  return (
    <section style={{ background: '#ffffff' }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-20 md:py-28 text-center">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
            style={{
              background: 'rgba(255,84,28,0.12)',
              borderColor: 'rgba(255,84,28,0.3)',
              color: '#D9430F',
            }}
          >
            {ab.pill}
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5 leading-tight">
            {ab.heading}
          </h2>

          <div
            className="w-20 h-1 mx-auto rounded-full mb-8"
            style={{ background: 'linear-gradient(90deg, #FF541C, #FF8A5B)' }}
          />

          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            {ab.lead}
          </p>
        </motion.div>

        {/* ── Operating Principles ── */}
        <div className="text-left">
          {(ab.principles ?? []).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-5 rounded-xl p-6 mb-4"
              style={{
                background: 'rgba(255,84,28,0.03)',
                border: '1px solid rgba(255,84,28,0.08)',
              }}
            >
              {/* Orange accent bar */}
              <div
                className="w-1 self-stretch rounded flex-shrink-0"
                style={{ background: '#FF541C', minHeight: '100%' }}
              />

              <div>
                <h3 className="text-gray-900 font-bold text-base mb-1.5">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
