import { motion } from 'framer-motion';
import Logo from './Logo';
import { useContent } from '../context/ContentContext';

const linkedInPath = "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z";

const Footer = () => {
  const { content } = useContent();
  const ft = content.footer;

  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #23262E 0%, #2D313A 50%, #1A1D23 100%)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #FF541C, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #FF8A5B, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Left col: Logo + tagline + closing */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <Logo size={36} />
            <p className="text-white/60 text-sm max-w-xs leading-relaxed">{ft.tagline}</p>
            <span
              className="font-bold text-base"
              style={{ background: 'linear-gradient(135deg, #FF8A5B, #FF541C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              {ft.closing}
            </span>
          </motion.div>

          {/* Site links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#FF8A5B' }}>Site</p>
            {(ft.siteLinks ?? []).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/50 text-sm hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Legal links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-3"
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#FF8A5B' }}>Legal</p>
            {(ft.legalLinks ?? []).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/50 text-sm hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Contact col */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#FF8A5B' }}>Contact</p>
            <a
              href={`mailto:${ft.email}`}
              className="text-white/50 text-sm hover:text-white transition-colors break-all"
            >
              {ft.email}
            </a>
            <motion.a
              href={ft.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex mt-2 text-white/40 transition-colors"
              onMouseEnter={e => e.currentTarget.style.color = '#FF8A5B'}
              onMouseLeave={e => e.currentTarget.style.color = ''}
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d={linkedInPath} clipRule="evenodd" />
              </svg>
            </motion.a>
          </motion.div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">{ft.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
