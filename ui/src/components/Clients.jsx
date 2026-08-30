import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Clients = () => {
  const { content } = useContent();
  const cl = content.clients;

  return (
    <div className="relative py-20 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #faf8ff 0%, #f5f3ff 100%)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, #FF541C, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{cl.heading}</h2>
          <div className="w-20 h-1 mx-auto rounded-full mb-5" style={{ background: 'linear-gradient(90deg, #FF541C, #FF8A5B)' }} />
          <p className="text-gray-500 max-w-xl mx-auto">{cl.subheading}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5"
        >
          {(cl.list ?? []).map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.06, boxShadow: '0 12px 30px rgba(255,84,28,0.15)' }}
              className="glass-light rounded-2xl flex flex-col items-center justify-center p-6 gap-2 cursor-default"
              style={{ minHeight: 100 }}
            >
              <div className="text-4xl">{client.logo}</div>
              <span className="text-xs text-gray-500 font-semibold text-center">{client.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-10">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(255,84,28,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl font-bold text-white shimmer-btn"
            style={{ background: 'linear-gradient(135deg, #FF541C, #D9430F)' }}
          >
            {cl.cta}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Clients;
