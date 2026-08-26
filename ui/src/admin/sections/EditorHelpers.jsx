import { useState, useEffect } from 'react';

export const s = {
  card: { background: '#fff', borderRadius: 12, padding: '24px 28px', marginBottom: 20, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' },
  input: { width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, color: '#111827', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' },
  textarea: { width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, color: '#111827', boxSizing: 'border-box', outline: 'none', resize: 'vertical', fontFamily: 'inherit' },
  row: { marginBottom: 16 },
  sectionTitle: { fontSize: 22, fontWeight: 700, color: '#1e1b4b', marginBottom: 4 },
  sectionSub: { fontSize: 13, color: '#6b7280', marginBottom: 24 },
  saveBtn: { padding: '10px 24px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer' },
  removeBtn: { padding: '4px 10px', background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600, flexShrink: 0 },
  addBtn: { padding: '8px 16px', background: '#ede9fe', color: '#6d28d9', border: '1px solid #ddd6fe', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, marginTop: 6 },
  subCard: { background: '#f9fafb', borderRadius: 8, padding: '14px 16px', marginBottom: 12, border: '1px solid #e5e7eb' },
  subTitle: { fontSize: 13, fontWeight: 700, color: '#6d28d9', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' },
  divider: { border: 'none', borderTop: '1px solid #e5e7eb', margin: '20px 0' },
};

export const Field = ({ label, value, onChange, placeholder }) => (
  <div style={s.row}>
    <label style={s.label}>{label}</label>
    <input style={s.input} value={value ?? ''} onChange={e => onChange(e.target.value)} placeholder={placeholder ?? ''} />
  </div>
);

export const TextareaField = ({ label, value, onChange, minHeight = 80 }) => (
  <div style={s.row}>
    <label style={s.label}>{label}</label>
    <textarea style={{ ...s.textarea, minHeight }} value={value ?? ''} onChange={e => onChange(e.target.value)} />
  </div>
);

export const ArrayField = ({ label, values, onChange }) => {
  const update = (i, v) => { const a = [...values]; a[i] = v; onChange(a); };
  const remove = (i) => onChange(values.filter((_, idx) => idx !== i));
  const add = () => onChange([...values, '']);
  return (
    <div style={s.row}>
      <label style={s.label}>{label}</label>
      {values.map((v, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
          <input style={{ ...s.input, flex: 1 }} value={v ?? ''} onChange={e => update(i, e.target.value)} />
          <button style={s.removeBtn} onClick={() => remove(i)}>✕</button>
        </div>
      ))}
      <button style={s.addBtn} onClick={add}>+ Add Item</button>
    </div>
  );
};

export const SectionHeader = ({ title, subtitle }) => (
  <div style={{ marginBottom: 28 }}>
    <h2 style={s.sectionTitle}>{title}</h2>
    {subtitle && <p style={s.sectionSub}>{subtitle}</p>}
  </div>
);

export const SaveButton = ({ onClick }) => (
  <div style={{ paddingTop: 8 }}>
    <button style={s.saveBtn} onClick={onClick}>💾 Save Changes</button>
  </div>
);

export const Toast = ({ message, visible, onHide }) => {
  useEffect(() => {
    if (visible) { const t = setTimeout(onHide, 2500); return () => clearTimeout(t); }
  }, [visible, onHide]);
  if (!visible) return null;
  return (
    <div style={{ position: 'fixed', bottom: 32, right: 32, background: '#065f46', color: '#fff', padding: '12px 22px', borderRadius: 10, fontWeight: 600, fontSize: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', zIndex: 9999 }}>
      ✅ {message}
    </div>
  );
};

export const useSectionEditor = (sectionData, onSave) => {
  const [draft, setDraft] = useState(sectionData);
  const [toast, setToast] = useState(false);
  const save = () => { onSave(draft); setToast(true); };
  return { draft, setDraft, toast, setToast, save };
};
