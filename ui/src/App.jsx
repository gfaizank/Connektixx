import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Clients from "./components/Clients";
import WhyChoose from "./components/Choose";
import Faq from "./components/Faq";
import Contact from "./components/Contact";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Create refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const clientsRef = useRef(null);
  const whyChooseRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);

  // Function to scroll to a section
  const scrollToSection = (ref) => {
    setMenuOpen(false);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  // Navigation items
  const navItems = [
    { name: "Home", ref: homeRef },
    { name: "Services", ref: servicesRef },
    { name: "Clients", ref: clientsRef },
    { name: "Why Connektixx?", ref: whyChooseRef },
    { name: "Reviews", ref: aboutRef },
    { name: "FAQs", ref: faqRef },
  ];

  return (
    <div className="relative bg-white min-h-screen">
      <main className="w-full overflow-x-hidden">
        <section ref={homeRef} id="home">
          <div className="absolute top-0 left-0 right-0 z-50">
            <Navbar
              navItems={navItems}
              scrollToSection={scrollToSection}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />
          </div>
          <Home />
        </section>

        <section ref={servicesRef} id="services">
          <Services />
        </section>

        <section ref={clientsRef} id="clients">
          <Clients />
        </section>

        <section ref={whyChooseRef} id="why-choose">
          <WhyChoose />
        </section>

        <section ref={aboutRef} id="about">
          <About />
        </section>

        <section ref={faqRef} id="faq">
          <Faq />
        </section>

        <section ref={contactRef} id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
