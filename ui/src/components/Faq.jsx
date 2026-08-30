import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "../context/ContentContext";

const FaqItem = ({ question, answer, isOpen, toggleOpen, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.04 }}
    className={`rounded-2xl mb-3 overflow-hidden transition-all ${isOpen ? 'glass-light' : 'glass-light hover:shadow-md'}`}
    style={{
      border: isOpen ? '1px solid rgba(255,84,28,0.3)' : '1px solid rgba(255,255,255,0.85)',
      background: isOpen ? 'rgba(255,84,28,0.08)' : undefined,
    }}
  >
    <button
      className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 focus:outline-none"
      onClick={toggleOpen}
    >
      <span className="text-base font-semibold text-gray-800 leading-snug">{question}</span>
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0, color: isOpen ? '#FF541C' : '#9ca3af' }}
        transition={{ duration: 0.25 }}
        className="text-2xl font-light flex-shrink-0 leading-none"
      >
        +
      </motion.span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const Faq = () => {
  const { content } = useContent();
  const fq = content.faq;
  const [openId, setOpenId] = useState(null);

  return (
    <div className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F2EFEA, #F0ECE4)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-08"
          style={{ background: 'radial-gradient(ellipse, #FF541C, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-bold"
            style={{ background: 'rgba(255,84,28,0.1)', border: '1px solid rgba(255,84,28,0.25)', color: '#D9430F' }}>
            {fq.pill}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {fq.heading}
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full mb-5" style={{ background: 'linear-gradient(90deg, #FF541C, #FF8A5B)' }} />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {(fq.items ?? []).map((item, i) => (
            <FaqItem
              key={item.id ?? i}
              index={i}
              question={item.question}
              answer={item.answer}
              isOpen={openId === (item.id ?? i)}
              toggleOpen={() => setOpenId(openId === (item.id ?? i) ? null : (item.id ?? i))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
