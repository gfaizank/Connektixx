import { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ActiveSectionProvider } from "./context/ActiveSectionContext";
import { ContentProvider, useContent } from "./context/ContentContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Clients from "./components/Clients";
import WhyChoose from "./components/Choose";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import DotNavigation from "./components/DotNavigation";
import ChatWidget from "./components/ChatWidget";
import CookieBanner from "./components/CookieBanner";
import CaseStudy from "./components/CaseStudy";

import AdminApp from "./admin/AdminApp";

const MainSite = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { content } = useContent();

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const clientsRef = useRef(null);
  const whyChooseRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    setMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sectionRefs = [homeRef, servicesRef, clientsRef, aboutRef, faqRef, contactRef];
  const navItems = (content.navbar.navItems ?? []).map((name, i) => ({ name, ref: [servicesRef, clientsRef, aboutRef, faqRef][i] }));

  return (
    <ActiveSectionProvider>
      <div className="relative bg-white min-h-screen">
        <main className="w-full overflow-x-hidden">
          <section ref={homeRef} id="home">
            <div className="absolute top-0 left-0 right-0 z-50">
              <Navbar navItems={navItems} scrollToSection={scrollToSection} menuOpen={menuOpen} setMenuOpen={setMenuOpen} contactRef={contactRef} />
            </div>
            <Home scrollToSection={scrollToSection} contactRef={contactRef} />
          </section>
          <section ref={servicesRef} id="solutions"><Services /></section>
          <section ref={whyChooseRef} id="solutions-pillars"><WhyChoose /></section>
          <section ref={clientsRef} id="how-we-partner"><Clients /></section>
          <section ref={aboutRef} id="about"><About /></section>
          <section ref={faqRef} id="faq"><Faq /></section>
          <section id="case-study"><CaseStudy /></section>
          <section ref={contactRef} id="contact"><Contact /></section>
        </main>
        <DotNavigation />
        <ChatWidget />
        <Footer />
        <CookieBanner />
      </div>
    </ActiveSectionProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin" element={<AdminApp />} />
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </ContentProvider>
    </BrowserRouter>
  );
}

export default App;
