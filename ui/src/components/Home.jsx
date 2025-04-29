// Updated Home component that uses the context
import { motion } from "framer-motion";
import { useActiveSection } from "../context/ActiveSectionContext";

const Home = () => {
  // Get active section data from context
  const { activeSection } = useActiveSection();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-50 to-white min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="pt-24 md:pt-32 lg:pt-36 pb-12">
          {/* Main headline - Center alignment */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              <span className="text-blue-700">Bridging Connections, </span>
              <br />
              <span className="text-purple-600">Driving Success</span>
              <motion.div
                className="w-40 h-1 bg-purple-500 mt-2 mx-auto md:mt-4"
                initial={{ width: 0 }}
                animate={{ width: 180 }}
                transition={{ delay: 1, duration: 0.5 }}
              />
            </motion.h1>

            <motion.div
              variants={fadeIn}
              className="mt-6 md:mt-8 text-base md:text-lg text-gray-700"
            >
              <p className="mb-2">
                5+ years | 511+ Brands | 60+ Crore Ad spent
              </p>
              <p>
                A dedicated team of specialists, delivering remarkable work to
                our clients worldwide!
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-8 md:mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 text-white px-8 py-4 rounded font-medium text-lg"
              >
                Let's Connect
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Certification Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 md:mt-12 text-center"
        >
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Our Performance Marketing Services are Certified by
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {/* Partner logos */}
            <div className="w-32 h-12 bg-gray-100 flex items-center justify-center rounded">
              <span className="text-gray-500">Meta Partner</span>
            </div>
            <div className="w-32 h-12 bg-gray-100 flex items-center justify-center rounded">
              <span className="text-gray-500">Shopify</span>
            </div>
            <div className="w-32 h-12 bg-gray-100 flex items-center justify-center rounded">
              <span className="text-gray-500">Google</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Debug Panel - Remove in production */}
      {/* {process.env.NODE_ENV !== 'production' && (
        <div className="fixed bottom-4 left-4 bg-white p-4 shadow-lg rounded-lg z-50 text-sm opacity-75 hover:opacity-100 transition-opacity">
          <h3 className="font-bold mb-2">Debug Info:</h3>
          <p>Active Section Index: {activeSection}</p>
        </div>
      )} */}
    </div>
  );
};

export default Home;