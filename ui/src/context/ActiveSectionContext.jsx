// Create a new context file: src/context/ActiveSectionContext.js
import { createContext, useState, useContext, useEffect } from 'react';

// Create a context for the active section
export const ActiveSectionContext = createContext();

// Create a provider component
export const ActiveSectionProvider = ({ children }) => {
  // State to track the active section
  const [activeSection, setActiveSection] = useState(0);
  
  // Define section IDs and names for consistency across the application
  const sectionIds = ["home", "services", "clients", "why-choose", "about", "faq", "contact"];
  const sectionNames = ["Home", "Services", "Clients", "Why Connektixx?", "Reviews", "FAQs", "Contact"];
  
  // Set up intersection observer to detect which section is in view
  useEffect(() => {
    console.log("Setting up intersection observer in context");
    
    // Add debounce to prevent rapid section changes
    let debounceTimer;
    
    // Track the last active section to prevent unnecessary updates
    let lastActiveSection = activeSection;
    
    // Create the observer with optimized thresholds
    const observer = new IntersectionObserver(
      (entries) => {
        // Clear existing timer
        clearTimeout(debounceTimer);
        
        // Set a new debounce timer
        debounceTimer = setTimeout(() => {
          // Sort entries by their intersection ratio to get the most visible one
          const visibleEntries = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          
          if (visibleEntries.length > 0) {
            const mostVisibleEntry = visibleEntries[0];
            const id = mostVisibleEntry.target.id;
            const intersectionRatio = mostVisibleEntry.intersectionRatio;
            
            // Only consider sections that are significantly visible (at least 20%)
            if (intersectionRatio >= 0.2) {
              console.log("Most visible section:", id, "with ratio:", intersectionRatio.toFixed(2));
              
              const index = sectionIds.indexOf(id);
              if (index !== -1 && index !== lastActiveSection) {
                lastActiveSection = index;
                setActiveSection(index);
              }
            }
          }
        }, 100); // 100ms debounce time
      },
      { 
        threshold: [0.2, 0.3, 0.4, 0.6, 0.8],  // Higher thresholds for more stability
        rootMargin: "-5% 0px -5% 0px"  // Smaller margin for more accurate detection
      }
    );

    // Find all section elements and observe them
    const sections = document.querySelectorAll("section[id]");
    
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Clean up function
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Function to navigate to a section
  const navigateToSection = (index) => {
    const sectionId = sectionIds[index];
    const section = document.getElementById(sectionId);
    
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(index);
    }
  };

  return (
    <ActiveSectionContext.Provider 
      value={{ 
        activeSection, 
        setActiveSection, 
        sectionIds, 
        sectionNames, 
        navigateToSection 
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
};

// Custom hook to use the active section context
export const useActiveSection = () => useContext(ActiveSectionContext);