import { useState } from 'react';
import { motion } from 'framer-motion';

const ReviewCard = ({ review, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
          {review.initial}
        </div>
        <div className="ml-4">
          <h3 className="font-bold text-gray-800">{review.name}</h3>
          <p className="text-gray-500 text-sm">{review.company}</p>
        </div>
      </div>
      <div className="mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-${i < review.rating ? 'yellow-500' : 'gray-300'}`}>★</span>
        ))}
      </div>
      <p className="text-gray-600">{review.text}</p>
    </motion.div>
  );
};

const About = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      initial: "S",
      company: "E-commerce Store",
      rating: 5,
      text: "Connektixx completely transformed our ad strategy. Within just 3 months, our CPA decreased by 42% while our overall sales doubled. Their team is responsive and truly understands what drives results."
    },
    {
      id: 2,
      name: "Michael Chen",
      initial: "M",
      company: "SaaS Platform",
      rating: 5,
      text: "We've worked with several agencies before, but none delivered like Connektixx. Their data-driven approach and strategic insights have helped us scale our customer acquisition efforts while maintaining profitability."
    },
    {
      id: 3,
      name: "Priya Sharma",
      initial: "P",
      company: "D2C Brand",
      rating: 5,
      text: "The expertise at Connektixx is unmatched. They took the time to understand our unique business challenges and created a customized strategy that has consistently outperformed our expectations."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextReview = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Client Reviews</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto mt-4"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - see what our clients have to say about working with Connektixx
          </p>
        </motion.div>
        
        {/* Desktop Reviews Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
        
        {/* Mobile Reviews Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <ReviewCard review={reviews[activeIndex]} index={0} />
            
            <button 
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
            >
              ‹
            </button>
            <button 
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
            >
              ›
            </button>
          </div>
          
          <div className="flex justify-center mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 mx-1 rounded-full ${
                  index === activeIndex ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium"
          >
            View All Reviews
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;