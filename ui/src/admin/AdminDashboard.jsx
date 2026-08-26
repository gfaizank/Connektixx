import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import NavbarEditor from './sections/NavbarEditor';
import HomeEditor from './sections/HomeEditor';
import ServicesEditor from './sections/ServicesEditor';
import WhyChooseEditor from './sections/WhyChooseEditor';
import ClientsEditor from './sections/ClientsEditor';
import ReviewsEditor from './sections/ReviewsEditor';
import FaqEditor from './sections/FaqEditor';
import ContactEditor from './sections/ContactEditor';
import FooterEditor from './sections/FooterEditor';

const NAV = [
  { id: 'navbar',     label: 'Navbar',       icon: '🧭' },
  { id: 'home',       label: 'Home',         icon: '🏠' },
  { id: 'services',   label: 'Services',     icon: '⚙️' },
  { id: 'whyChoose',  label: 'Why Choose',   icon: '✅' },
  { id: 'clients',    label: 'Clients',      icon: '👥' },
  { id: 'reviews',    label: 'Reviews',      icon: '⭐' },
  { id: 'faq',        label: 'FAQ',          icon: '❓' },
  { id: 'contact',    label: 'Contact',      icon: '📞' },
  { id: 'footer',     label: 'Footer',       icon: '🔗' },
  { id: 'settings',   label: 'Settings',     icon: '🔧' },
];

const AdminDashboard = ({ onLogout }) => {
  const [active, setActive] = useState('home');
  const { content, updateSection, resetContent } = useContent();
  const [resetConfirm, setResetConfirm] = useState(false);

  const renderEditor = () => {
    switch (active) {
      case 'navbar':     return <NavbarEditor    data={content.navbar}     onSave={d => updateSection('navbar', d)}     />;
      case 'home':       return <HomeEditor       data={content.home}       onSave={d => updateSection('home', d)}       />;
      case 'services':   return <ServicesEditor   data={content.services}   onSave={d => updateSection('services', d)}   />;
      case 'whyChoose':  return <WhyChooseEditor  data={content.whyChoose}  onSave={d => updateSection('whyChoose', d)}  />;
      case 'clients':    return <ClientsEditor    data={content.clients}    onSave={d => updateSection('clients', d)}    />;
      case 'reviews':    return <ReviewsEditor    data={content.reviews}    onSave={d => updateSection('reviews', d)}    />;
      case 'faq':        return <FaqEditor        data={content.faq}        onSave={d => updateSection('faq', d)}        />;
      case 'contact':    return <ContactEditor    data={content.contact}    onSave={d => updateSection('contact', d)}    />;
      case 'footer':     return <FooterEditor     data={content.footer}     onSave={d => updateSection('footer', d)}     />;
      case 'settings':   return <SettingsPanel resetContent={resetContent} resetConfirm={resetConfirm} setResetConfirm={setResetConfirm} onLogout={onLogout} />;
      default:           return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f1f5f9' }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: '24px 20px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#a5b4fc', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>CONNEKTIXX</div>
          <div style={{ fontSize: 13, color: '#c4b5fd', fontWeight: 500 }}>Content Manager</div>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '0 16px 8px' }} />
        <nav style={{ flex: 1, overflowY: 'auto', padding: '4px 8px' }}>
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', marginBottom: 2, textAlign: 'left', fontSize: 14, fontWeight: active === item.id ? 700 : 500, background: active === item.id ? 'rgba(139,92,246,0.35)' : 'transparent', color: active === item.id ? '#e9d5ff' : '#c4b5fd', transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
              {active === item.id && <span style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: '#a78bfa' }} />}
            </button>
          ))}
        </nav>
        <div style={{ padding: '12px 16px 20px' }}>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '8px 0', fontSize: 13, color: '#a5b4fc', textDecoration: 'none', borderRadius: 6, border: '1px solid rgba(165,180,252,0.2)', marginBottom: 8 }}>
            🌐 View Site
          </a>
          <button onClick={onLogout} style={{ display: 'block', width: '100%', padding: '8px 0', fontSize: 13, color: '#fca5a5', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 6, cursor: 'pointer' }}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: 220, flex: 1, minHeight: '100vh' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 28px' }}>
          {renderEditor()}
        </div>
      </div>
    </div>
  );
};

const SettingsPanel = ({ resetContent, resetConfirm, setResetConfirm, onLogout }) => (
  <div>
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e1b4b', marginBottom: 4 }}>🔧 Settings</h2>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 0 }}>Admin account and content management options.</p>
    </div>
    <div style={{ background: '#fff', borderRadius: 12, padding: '24px 28px', border: '1px solid #e5e7eb', marginBottom: 20 }}>
      <h3 style={{ fontWeight: 700, color: '#374151', fontSize: 15, marginTop: 0, marginBottom: 8 }}>Admin Credentials</h3>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 0 }}>Username: <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>admin</code></p>
      <p style={{ fontSize: 14, color: '#6b7280' }}>Password: <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>Connektixx@2025</code></p>
      <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 8, marginBottom: 0 }}>To change credentials, edit <code>AdminApp.jsx</code>.</p>
    </div>
    <div style={{ background: '#fff', borderRadius: 12, padding: '24px 28px', border: '1px solid #e5e7eb', marginBottom: 20 }}>
      <h3 style={{ fontWeight: 700, color: '#374151', fontSize: 15, marginTop: 0, marginBottom: 8 }}>Content Storage</h3>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 14 }}>All edits are saved to browser localStorage and applied to the live site immediately. Clearing resets all content to factory defaults.</p>
      {!resetConfirm ? (
        <button onClick={() => setResetConfirm(true)} style={{ padding: '9px 20px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
          Reset All Content to Defaults
        </button>
      ) : (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 14, color: '#dc2626', fontWeight: 600 }}>Are you sure? This cannot be undone.</span>
          <button onClick={() => { resetContent(); setResetConfirm(false); }} style={{ padding: '8px 16px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>Yes, Reset</button>
          <button onClick={() => setResetConfirm(false)} style={{ padding: '8px 16px', background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>Cancel</button>
        </div>
      )}
    </div>
  </div>
);

export default AdminDashboard;
