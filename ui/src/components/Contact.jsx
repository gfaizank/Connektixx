import { motion } from "framer-motion";
import { useState } from "react";
import { useContent } from "../context/ContentContext";

const linkedInPath = "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z";

const emptyForm = {
  fullName: "",
  workEmail: "",
  org: "",
  role: "",
  areaOfInterest: "",
  challenge: "",
  privacyConsent: false,
  marketingConsent: false,
};

const Contact = () => {
  const { content } = useContent();
  const ct = content.contact;
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState({ submitting: false, submitted: false, success: false, message: "" });

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    setFormData(p => ({ ...p, [id]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, success: false, message: "" });
    try {
      const res = await fetch('https://connektixx.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.workEmail,
          company: formData.org,
          role: formData.role,
          areaOfInterest: formData.areaOfInterest,
          message: formData.challenge,
          marketingConsent: formData.marketingConsent,
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setStatus({ submitting: false, submitted: true, success: true, message: data.message });
        setFormData(emptyForm);
      } else {
        setStatus({ submitting: false, submitted: true, success: false, message: data.message || "Something went wrong." });
      }
    } catch {
      setStatus({ submitting: false, submitted: true, success: false, message: "Network error. Please try again." });
    }
  };

  const inputCls = "w-full px-4 py-3.5 rounded-xl text-gray-800 text-sm font-medium outline-none transition-all glass-light focus:border-orange-400 focus:ring-2 focus:ring-orange-100 placeholder:text-gray-400";
  const selectCls = `${inputCls} cursor-pointer`;

  const infoItems = [
    { icon: '✉️', label: 'Email', value: ct.email, href: `mailto:${ct.email}` },
    { icon: '📍', label: 'Where We Work', value: ct.whereWeWork, href: null },
    { icon: '🕐', label: 'Hours', value: ct.hours, href: null },
  ];

  return (
    <div id="contact" className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F2EFEA 0%, #F0ECE4 100%)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #FF541C, transparent 70%)', filter: 'blur(70px)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #FF8A5B, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-bold"
            style={{ background: 'rgba(255,84,28,0.1)', border: '1px solid rgba(255,84,28,0.25)', color: '#D9430F' }}>
            {ct.pill}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{ct.heading}</h2>
          <div className="w-20 h-1 mx-auto rounded-full mb-5" style={{ background: 'linear-gradient(90deg, #FF541C, #FF8A5B)' }} />
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">{ct.intro}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 glass-light rounded-3xl p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full name + Work email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="Full name"
                  required
                />
                <input
                  type="email"
                  id="workEmail"
                  value={formData.workEmail}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="Work email"
                  required
                />
              </div>

              {/* Company / org + Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  id="org"
                  value={formData.org}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="Company / organisation"
                  required
                />
                <input
                  type="text"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="Role / designation (optional)"
                />
              </div>

              {/* Area of interest */}
              <select
                id="areaOfInterest"
                value={formData.areaOfInterest}
                onChange={handleChange}
                className={selectCls}
                required
              >
                <option value="" disabled>Area of interest</option>
                {(ct.dropdownOptions ?? []).map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

              {/* Business challenge */}
              <textarea
                id="challenge"
                value={formData.challenge}
                onChange={handleChange}
                rows={5}
                className={inputCls}
                placeholder="Tell us about your business challenge..."
                required
                style={{ resize: 'vertical' }}
              />

              {/* Privacy consent */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  id="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  required
                  className="mt-0.5 flex-shrink-0 accent-orange-500 w-4 h-4"
                />
                <span className="text-sm text-gray-600 leading-snug group-hover:text-gray-800 transition-colors">
                  I agree to the Privacy Policy and consent to Connektixx contacting me about my enquiry.
                </span>
              </label>

              {/* Marketing consent */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  id="marketingConsent"
                  checked={formData.marketingConsent}
                  onChange={handleChange}
                  className="mt-0.5 flex-shrink-0 accent-orange-500 w-4 h-4"
                />
                <span className="text-sm text-gray-500 leading-snug group-hover:text-gray-700 transition-colors">
                  I'd also like to receive occasional updates from Connektixx (optional).
                </span>
              </label>

              {status.submitted && (
                <p className={`text-sm font-medium ${status.success ? 'text-emerald-600' : 'text-red-500'}`}>
                  {status.message}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status.submitting}
                whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(255,84,28,0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-xl font-bold text-white text-base shimmer-btn"
                style={{ background: 'linear-gradient(135deg, #FF541C, #D9430F)' }}
              >
                {status.submitting ? "Sending..." : ct.submitBtn}
              </motion.button>
            </form>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 rounded-3xl relative overflow-hidden flex flex-col"
            style={{ background: 'linear-gradient(135deg, #2D313A, #23262E)', boxShadow: '0 20px 60px rgba(255,84,28,0.2)' }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-30"
                style={{ background: 'radial-gradient(circle, #FF541C, transparent 70%)', filter: 'blur(30px)' }} />
            </div>

            <div className="relative z-10 p-8 flex flex-col h-full">
              <h3 className="text-xl font-black text-white mb-7">{ct.infoHeading}</h3>

              <div className="space-y-4 flex-1">
                {infoItems.map((item) => {
                  const inner = (
                    <div className="glass-card rounded-xl px-4 py-3.5 flex items-start gap-3 transition-all hover:bg-white/10">
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#FF8A5B' }}>{item.label}</p>
                        <p className="text-white/70 text-sm">{item.value}</p>
                      </div>
                    </div>
                  );
                  return item.href
                    ? <a key={item.label} href={item.href}>{inner}</a>
                    : <div key={item.label}>{inner}</div>;
                })}

                {/* LinkedIn */}
                <div className="glass-card rounded-xl px-4 py-3.5 flex items-center gap-3">
                  <motion.a
                    href={ct.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/40 transition-colors"
                    onMouseEnter={e => e.currentTarget.style.color = '#FF8A5B'}
                    onMouseLeave={e => e.currentTarget.style.color = ''}
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d={linkedInPath} clipRule="evenodd" />
                    </svg>
                  </motion.a>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#FF8A5B' }}>LinkedIn</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
