import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5 mb-3">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-amber-400' : 'text-gray-600'}`}>★</span>
    ))}
  </div>
);

const ReviewCard = ({ review, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -6, boxShadow: '0 24px 50px rgba(124,58,237,0.18)' }}
    className="glass-light rounded-2xl p-6 md:p-8 transition-all"
  >
    <StarRating rating={review.rating} />
    <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{review.text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-full flex items-center justify-center font-black text-white text-base flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
        {review.initial}
      </div>
      <div>
        <p className="font-bold text-gray-800 text-sm">{review.name}</p>
        <p className="text-gray-500 text-xs">{review.company}</p>
      </div>
    </div>
  </motion.div>
);

const About = () => {
  const { content } = useContent();
  const rv = content.reviews;
  const reviews = rv.list ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative py-20 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0edff 0%, #faf8ff 100%)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)', filter: 'blur(70px)' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{rv.heading}</h2>
          <div className="w-20 h-1 mx-auto rounded-full mb-5" style={{ background: 'linear-gradient(90deg, #7c3aed, #3b82f6)' }} />
          <p className="text-gray-500 max-w-xl mx-auto">{rv.subheading}</p>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => <ReviewCard key={r.id ?? i} review={r} index={i} />)}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {reviews.length > 0 && <ReviewCard review={reviews[activeIndex]} index={0} />}
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center items-center gap-4 mt-6">
            <button onClick={() => setActiveIndex(p => (p === 0 ? reviews.length - 1 : p - 1))}
              className="w-9 h-9 rounded-full flex items-center justify-center text-purple-600 font-bold glass-light text-lg">‹</button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all ${i === activeIndex ? 'w-6 h-2.5' : 'w-2.5 h-2.5'}`}
                  style={{ background: i === activeIndex ? 'linear-gradient(90deg, #7c3aed, #4f46e5)' : '#d1d5db' }} />
              ))}
            </div>
            <button onClick={() => setActiveIndex(p => (p === reviews.length - 1 ? 0 : p + 1))}
              className="w-9 h-9 rounded-full flex items-center justify-center text-purple-600 font-bold glass-light text-lg">›</button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(124,58,237,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl font-bold text-white shimmer-btn"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
          >
            {rv.cta}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
