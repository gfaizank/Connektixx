import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "../context/ContentContext";

const FaqItem = ({ question, answer, isOpen, toggleOpen }) => (
  <motion.div className="border-b border-gray-200 py-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <button className="flex justify-between items-center w-full text-left focus:outline-none" onClick={toggleOpen}>
      <span className="text-lg md:text-xl font-medium text-gray-800">{question}</span>
      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="text-purple-600 text-xl ml-2">+</motion.span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
          <p className="pt-4 pb-2 text-gray-600">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const Faq = () => {
  const { content } = useContent();
  const fq = content.faq;
  const faqData = fq.items ?? [];
  const [openId, setOpenId] = useState(null);
  const toggleFaq = (id) => setOpenId(openId === id ? null : id);

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-600">{fq.heading}</h2>
            <span className="text-4xl ml-4">{fq.headingEmoji}</span>
          </div>
          <div className="w-24 h-1 bg-purple-500 mx-auto mt-4"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{fq.subheading}</p>
        </motion.div>
        <motion.div className="max-w-3xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          {faqData.map((faq) => (
            <FaqItem key={faq.id} question={faq.question} answer={faq.answer} isOpen={openId === faq.id} toggleOpen={() => toggleFaq(faq.id)} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Faq;
