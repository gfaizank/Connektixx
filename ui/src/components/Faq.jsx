import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FaqItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <motion.div
      className="border-b border-gray-200 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="text-lg md:text-xl font-medium text-gray-800">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-purple-600 text-xl ml-2"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-4 pb-2 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Faq = () => {
  const faqData = [
    {
      id: 1,
      question: "What services does Connektixx offer?",
      answer:
        "We specialize in Marketing Consultancy, Digital Marketing, and BPO/Call Centre Services—all under one strategic umbrella. Whether you're looking to elevate your brand, boost customer engagement, or streamline backend operations, we deliver AI-enabled solutions that scale with your growth.",
    },
    {
      id: 2,
      question: "How is Connektixx different from other agencies or BPO providers?",
      answer:
        "We blend human empathy with machine intelligence. Our hybrid model offers high-performance digital marketing and seamless customer support, backed by real-time analytics, automation, and dedicated experts. We're not just vendors—we're growth partners.",
    },
    {
      id: 3,
      question: "Can I customize the services based on my business needs?",
      answer:
        "Absolutely. At Connektixx, customization is our core strength. We tailor our workflows, communication strategies, and reporting to suit your unique business goals. No cookie-cutter plans—just results that matter.",
    },
    {
      id: 4,
      question: "Do you work with startups or only established businesses?",
      answer:
        "We work with ambitious startups, scaling businesses, and large enterprises alike. If you're serious about growth, we're serious about helping you get there—fast.",
    },
    {
      id: 5,
      question: "What technologies or tools do you use?",
      answer:
        "Our stack includes AI-driven CRMs, automation tools, predictive analytics platforms, and leading ad tech. From smart workflows to insightful dashboards, we equip your brand with future-ready solutions.",
    },
    {
      id: 6,
      question: "How quickly can I get started?",
      answer:
        "In most cases, you can be up and running with us in 7–10 working days. From onboarding to execution, our streamlined setup process ensures you experience impact, not delays.",
    },
    {
      id: 7,
      question: "Is multilingual or regional support available in your call centre services?",
      answer:
        "Yes! We offer multilingual capabilities and regional adaptability to ensure your customers feel heard—wherever they are. This makes us ideal for businesses with diverse audiences.",
    },
    {
      id: 8,
      question: "How do you ensure quality and performance?",
      answer:
        "We have strict SLAs, performance dashboards, and continuous agent training in place. Our culture is built around excellence, and our results reflect it.",
    },
    {
      id: 9,
      question: "What industries do you serve?",
      answer:
        "From agriculture to e-commerce, edtech to fintech, and everything in between—we bring our cross-industry experience to create sharper strategies and richer experiences for your customers.",
    },
    {
      id: 10,
      question: "How can I get in touch or request a consultation?",
      answer:
        "Just drop us a message, book a discovery call, or send us a WhatsApp ping—we're always ready to Connekt. Your growth story begins with a hello.",
    },
  ];

  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-600">
              Need Help?
            </h2>
            <span className="text-4xl ml-4">👨‍💻</span>
          </div>
          <div className="w-24 h-1 bg-purple-500 mx-auto mt-4"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore the answers to what makes Connektixx the smart choice for
            your business.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqData.map((faq) => (
            <FaqItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              toggleOpen={() => toggleFaq(faq.id)}
            />
          ))}
        </motion.div>
      </div>

      {/* Dot Navigation (visible on larger screens) */}
      <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col space-y-4">
          {[0, 1, 2, 3, 4].map((dot) => (
            <div
              key={dot}
              className={`w-3 h-3 rounded-full ${
                dot === 4 ? "bg-purple-600" : "bg-gray-300"
              } cursor-pointer`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;