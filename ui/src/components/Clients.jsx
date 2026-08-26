import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Clients = () => {
  const { content } = useContent();
  const cl = content.clients;

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{cl.heading}</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto mt-4"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{cl.subheading}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {(cl.list ?? []).map((client, index) => (
            <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center h-24 gap-1">
              <div className="text-3xl">{client.logo}</div>
              {client.name && <span className="text-xs text-gray-400 text-center leading-tight">{client.name}</span>}
            </motion.div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-10">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium">
            {cl.cta}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Clients;
