import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import logo from '../assets/PNG-1.png';
import { useContent } from '../context/ContentContext';

const Navbar = ({ navItems, scrollToSection, menuOpen, setMenuOpen }) => {
  const { content } = useContent();
  const nb = content.navbar;
  const [scrolled, setScrolled] = useState(false);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white/95'
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Logo with spin animation */}
          <div className="flex items-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              onAnimationComplete={() => setLogoAnimationComplete(true)}
            >
              <img src={logo} alt="Connektixx" className="h-12 mt-2.5" />
            </motion.div>
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={logoAnimationComplete ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="ml-2 text-2xl text-gray-900 tracking-wide uppercase"
              style={{ 
                fontFamily: "'Chakra Petch', 'Saira Semi Condensed', 'Orbitron', sans-serif", 
                fontWeight: 700, 
                letterSpacing: '0.02em',
              }}
            >
              {nb.brandName}
            </motion.span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.ref)}
                className="text-gray-800 hover:text-purple-600 font-medium transition-colors"
              >
                {item.name}
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium"
              onClick={() => window.open('#contact', '_self')}
            >
              {nb.chatCta}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white md:hidden"
          >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              {/* Logo in Mobile Menu with spin animation */}
              <div className="flex items-center">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  onAnimationComplete={() => setLogoAnimationComplete(true)}
                >
                  <img src={logo} alt="Connektixx" className="h-12" />
                </motion.div>
                <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={logoAnimationComplete ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="ml-2 mb-[7px] text-2xl text-gray-900 tracking-wide uppercase"
              style={{ 
                fontFamily: "'Chakra Petch', 'Saira Semi Condensed', 'Orbitron', sans-serif", 
                fontWeight: 700, 
                letterSpacing: '0.02em',
              }}
            >
              {nb.brandName}
            </motion.span>
              </div>

              {/* Close Button */}
              <button
                className="flex items-center"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex flex-col p-8 space-y-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.ref)}
                  className="text-left text-xl font-medium text-gray-800 hover:text-purple-600 transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;