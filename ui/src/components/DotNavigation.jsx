// Create a new component: src/components/DotNavigation.js
import { motion } from 'framer-motion';
import { useActiveSection } from '../context/ActiveSectionContext';

const DotNavigation = () => {
  const { activeSection, sectionNames, navigateToSection } = useActiveSection();
  
  return (
    <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col space-y-4">
        {sectionNames.map((name, index) => (
          <div key={index} className="relative group">
            {/* Animated dot with track line */}
            <div className="flex items-center">
              {/* Track line connecting dots */}
              {index < sectionNames.length - 1 && (
                <motion.div 
                  className="absolute h-8 w-0.5 bg-gray-200 left-1/2 transform -translate-x-1/2 top-3"
                  initial={{ scaleY: 0 }}
                  animate={{ 
                    scaleY: 1,
                    backgroundColor: index < activeSection && index + 1 > activeSection 
                      ? "#9333ea" : "#e5e7eb"
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              {/* The dot */}
              <motion.button
                onClick={() => navigateToSection(index)}
                className="w-3 h-3 rounded-full relative z-10"
                whileHover={{ scale: 1.25 }}
                animate={{ 
                  scale: index === activeSection ? 1.25 : 1,
                  backgroundColor: index === activeSection
                    ? "#FF541C"
                    : index < activeSection
                      ? "#FF8A5B"
                      : "#d1d5db"
                }}
                transition={{ 
                  duration: 0.3,
                  backgroundColor: { duration: 0.5 } 
                }}
                aria-label={`Navigate to ${name} section`}
                aria-current={index === activeSection ? "true" : "false"}
              />
            </div>
            
            {/* Tooltip that appears on hover */}
            <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-gray-900 text-white text-sm py-1 px-3 rounded whitespace-nowrap">
                {name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DotNavigation;