import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";

const WhyChoose = () => {
  const { content } = useContent();
  const wc = content.whyChoose;
  const services = wc.services ?? [];

  const getStyleSet = (color, index) => {
    const styles = [
      { mainBg: "bg-gradient-to-br from-gray-900 to-gray-800", iconColor: "text-blue-400", taglineColor: "text-blue-300", accentColor: "border-blue-500", featureBg: "bg-gray-900 bg-opacity-30", featureBorder: "border-gray-700", featureIconColor: "text-blue-400" },
      { mainBg: "bg-gradient-to-br from-purple-900 to-purple-800", iconColor: "text-purple-400", taglineColor: "text-purple-300", accentColor: "border-purple-500", featureBg: "bg-purple-900 bg-opacity-30", featureBorder: "border-purple-700", featureIconColor: "text-purple-400" },
      { mainBg: "bg-gradient-to-br from-gray-900 to-gray-800", iconColor: "text-emerald-400", taglineColor: "text-emerald-300", accentColor: "border-emerald-500", featureBg: "bg-gray-900 bg-opacity-30", featureBorder: "border-gray-700", featureIconColor: "text-emerald-400" },
    ];
    return styles[index % styles.length];
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-50 opacity-30 blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-gray-100 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-50 opacity-20 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">{wc.pill}</div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">{wc.heading}</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto mt-6"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">{wc.subheading}</p>
        </motion.div>

        <div className="space-y-16">
          {services.map((service, index) => {
            const style = getStyleSet(service.color, index);
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className={`rounded-2xl shadow-xl overflow-hidden relative ${style.mainBg}`}>
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white opacity-5"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-white opacity-5"></div>
                <div className="p-10">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10 relative z-10">
                    <span className={`inline-block text-5xl mb-4 ${style.iconColor}`}>{service.icon}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{service.title}</h3>
                    <div className={`w-24 h-1 ${style.accentColor} border-2 bg-transparent mx-auto my-4`}></div>
                    <p className={`text-xl font-medium ${style.taglineColor}`}>{service.tagline}</p>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                    {(service.features ?? []).map((feature, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: idx * 0.05 }} whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.2)", transition: { duration: 0.2 } }} className={`${style.featureBg} p-4 rounded-xl border ${style.featureBorder} text-center relative z-10 backdrop-blur-sm`}>
                        <div className="flex items-center justify-center mb-2">
                          <span className={`flex items-center justify-center w-8 h-8 rounded-full bg-black bg-opacity-20 ${style.featureIconColor}`}>✓</span>
                        </div>
                        <p className="text-white text-sm md:text-base">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8 bg-black bg-opacity-20 rounded-xl p-5 backdrop-blur-sm max-w-2xl mx-auto">
                    <p className="text-lg text-white italic font-medium text-center">"{service.conclusion}"</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} className="mt-16 text-center">
          <motion.button whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }} whileTap={{ scale: 0.98 }} className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
            {wc.cta}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChoose;
