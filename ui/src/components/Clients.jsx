import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Clients = () => {
  const { content } = useContent();
  const hwp = content.howWePartner;

  return (
    <section style={{ background: 'linear-gradient(180deg, #F2EFEA, #F0ECE4)' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-28">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
            style={{
              background: 'rgba(255,84,28,0.12)',
              borderColor: 'rgba(255,84,28,0.3)',
              color: '#D9430F',
            }}
          >
            {hwp.pill}
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5 max-w-2xl mx-auto leading-tight">
            {hwp.heading}
          </h2>

          <div
            className="w-20 h-1 mx-auto rounded-full mb-6"
            style={{ background: 'linear-gradient(90deg, #FF541C, #FF8A5B)' }}
          />

          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            {hwp.subheading}
          </p>
        </motion.div>

        {/* ── Philosophy Rows ── */}
        <div className="mb-20">
          {(hwp.philosophy ?? []).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="md:grid md:grid-cols-12 md:gap-10 items-start py-8">
                {/* Left: number */}
                <div className="hidden md:flex md:col-span-2 justify-end pt-0.5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,84,28,0.15)' }}
                  >
                    <span className="font-bold text-sm" style={{ color: '#FF541C' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Right: content */}
                <div className="md:col-span-10 flex gap-4 md:gap-0">
                  {/* Mobile number */}
                  <div
                    className="md:hidden w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,84,28,0.15)' }}
                  >
                    <span className="font-bold text-sm" style={{ color: '#FF541C' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>

              {/* Separator — not after last row */}
              {i < (hwp.philosophy ?? []).length - 1 && (
                <div
                  className="hidden md:block h-px"
                  style={{ background: 'rgba(45,49,58,0.08)' }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Engagement Ladder ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-gray-900 font-bold text-xl mb-2">{hwp.ladderIntro}</p>
          <p className="text-gray-500 text-sm">{hwp.ladderSub}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(hwp.ladder ?? []).map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                y: -6,
                boxShadow: card.highlight
                  ? '0 20px 48px rgba(45,49,58,0.35)'
                  : '0 20px 48px rgba(255,84,28,0.14)',
              }}
              className="rounded-2xl p-8 shadow-sm transition-all"
              style={
                card.highlight
                  ? { background: 'linear-gradient(135deg, #2D313A, #23262E)' }
                  : { background: '#ffffff' }
              }
            >
              <span
                className="text-xs font-bold uppercase tracking-widest mb-3 block"
                style={{ color: '#FF8A5B' }}
              >
                {card.step}
              </span>
              <h3
                className="font-black text-2xl mb-3"
                style={{ color: card.highlight ? '#ffffff' : '#111827' }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: card.highlight ? 'rgba(255,255,255,0.7)' : '#4B5563' }}
              >
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
