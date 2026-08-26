import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Services = () => {
  const { content } = useContent();
  const sv = content.services;
  const serviceCategories = sv.categories ?? [
    {
      category: "BPO / Call Centre Services",
      tagline: "Smart, Scalable, Human-Centered Support!",
      description: "At Connektixx, we redefine customer experience by blending empathetic communication with technology-powered operations for effortless scaling.",
      icon: "🎧",
      services: [
        {
          title: "Inbound Support",
          description: "Customer support, order management, and technical helpdesk with a human touch.",
          icon: "🎧"
        },
        {
          title: "Outbound Services",
          description: "Lead generation, telemarketing, customer retention, and market research calls.",
          icon: "📞"
        },
        {
          title: "Omnichannel Support",
          description: "Live chat, email, and social media messaging across all platforms.",
          icon: "💬"
        },
        {
          title: "Back Office & Data",
          description: "Data entry, processing, mining, reporting, and catalogue management.",
          icon: "📊"
        },
        {
          title: "Process Automation",
          description: "AI-enabled workflows, predictive analytics, and real-time dashboards.",
          icon: "⚙️"
        },
        {
          title: "Multichannel CX",
          description: "Unified customer experience across voice, chat, email, SMS, and social platforms.",
          icon: "🔄"
        }
      ]
    },
    {
      category: "Digital Marketing Services",
      tagline: "Data-Driven, Creative, Results-Focused Solutions",
      description: "We combine strategic creativity with technical expertise to drive measurable growth across all digital channels.",
      icon: "🚀",
      services: [
        {
          title: "SEO",
          description: "Boost visibility and drive organic growth with technical and content-led SEO.",
          icon: "🔍"
        },
        {
          title: "Performance Marketing",
          description: "Maximize ROI through Google Ads, Meta Ads, and other paid platforms.",
          icon: "📈"
        },
        {
          title: "Social Media Marketing",
          description: "Engage your community, grow your following, and build a loyal brand presence.",
          icon: "📱"
        },
        {
          title: "Content Strategy",
          description: "From blogs to video, we deliver content that educates, entertains, and converts.",
          icon: "✍️"
        },
        {
          title: "CRM Automation",
          description: "Keep your audience engaged with personalized, automated workflows.",
          icon: "📧"
        },
        {
          title: "Website Development",
          description: "Create high-converting, visually stunning, and responsive websites.",
          icon: "💻"
        }
      ]
    },
    {
      category: "Marketing Consultancy Services",
      tagline: "Strategic Guidance for Sustainable Growth",
      description: "Expert advisory that transforms market insights into actionable strategies for long-term brand success.",
      icon: "💡",
      services: [
        {
          title: "Brand Strategy",
          description: "Build a compelling brand identity that stands out and connects with your audience.",
          icon: "🎯"
        },
        {
          title: "Go-to-Market Strategy",
          description: "Launch your products or services with clarity, confidence, and impact.",
          icon: "🚀"
        },
        {
          title: "Growth Marketing Plans",
          description: "Data-driven roadmaps customized to your goals, industry, and customer base.",
          icon: "📊"
        }
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-50 opacity-30 blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-gray-100 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-50 opacity-20 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
            {sv.pill}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">{sv.heading}</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto mt-6"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">{sv.subheading}</p>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">{sv.body}</p>
        </motion.div>
        
        {serviceCategories.map((category, categoryIndex) => {
          const categoryStyles = [
            { 
              mainBg: "bg-gradient-to-br from-gray-900 to-gray-800",
              cardBg: "bg-white",
              iconColor: "text-blue-400",
              accentColor: "border-blue-500",
              taglineColor: "text-blue-300"
            },
            { 
              mainBg: "bg-gradient-to-br from-purple-800 to-purple-900",
              cardBg: "bg-white",
              iconColor: "text-purple-500",
              accentColor: "border-purple-500",
              taglineColor: "text-purple-300"
            },
            { 
              mainBg: "bg-gradient-to-br from-gray-900 to-gray-800",
              cardBg: "bg-white",
              iconColor: "text-emerald-400",
              accentColor: "border-emerald-500",
              taglineColor: "text-emerald-300"
            }
          ];
          
          const style = categoryStyles[categoryIndex % categoryStyles.length];
          
          return (
            <motion.div 
              key={categoryIndex} 
              className={`mb-24 rounded-2xl ${style.mainBg} shadow-xl p-10 overflow-hidden relative`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white opacity-5"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-white opacity-5"></div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12 relative z-10"
              >
                <span className={`inline-block text-6xl mb-4 ${style.iconColor}`}>
                  {category.icon}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">{category.category}</h3>
                <div className={`w-24 h-1 ${style.accentColor} border-2 bg-transparent mx-auto my-4`}></div>
                <p className={`text-xl font-medium ${style.taglineColor}`}>{category.tagline}</p>
                <p className="text-gray-300 max-w-2xl mx-auto mt-3">{category.description}</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.12)", transition: { duration: 0.2 } }}
                    className={`${style.cardBg} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-200 relative z-10`}
                  >
                    <div className={`text-4xl mb-4 ${style.iconColor}`}>{service.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Bottom decoration */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full flex justify-center mt-10"
              >
                <div className="h-0.5 w-32 bg-white opacity-20 rounded-full"></div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;