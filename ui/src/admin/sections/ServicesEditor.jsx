import { useState } from 'react';
import { Field, TextareaField, ArrayField, SectionHeader, SaveButton, Toast, useSectionEditor, s } from './EditorHelpers';

const ServiceCardEditor = ({ card, onChange, onRemove }) => (
  <div style={{ ...s.subCard, paddingBottom: 6 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
      <span style={{ fontWeight: 600, color: '#374151', fontSize: 13 }}>{card.icon} {card.title || 'Untitled Card'}</span>
      <button style={s.removeBtn} onClick={onRemove}>Remove</button>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 8, marginBottom: 8 }}>
      <div>
        <label style={s.label}>Icon</label>
        <input style={s.input} value={card.icon ?? ''} onChange={e => onChange({ ...card, icon: e.target.value })} placeholder="🎧" />
      </div>
      <div>
        <label style={s.label}>Title</label>
        <input style={s.input} value={card.title ?? ''} onChange={e => onChange({ ...card, title: e.target.value })} />
      </div>
    </div>
    <label style={s.label}>Description</label>
    <textarea style={{ ...s.textarea, minHeight: 56 }} value={card.description ?? ''} onChange={e => onChange({ ...card, description: e.target.value })} />
  </div>
);

const CategoryEditor = ({ cat, onChange, onRemove, index }) => {
  const [open, setOpen] = useState(false);
  const setServices = (svcs) => onChange({ ...cat, services: svcs });
  const updateCard = (i, updated) => { const a = [...cat.services]; a[i] = updated; setServices(a); };
  const removeCard = (i) => setServices(cat.services.filter((_, idx) => idx !== i));
  const addCard = () => setServices([...cat.services, { title: 'New Service', description: '', icon: '📌' }]);

  return (
    <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', marginBottom: 14, overflow: 'hidden' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', cursor: 'pointer', background: open ? '#f5f3ff' : '#fff', borderBottom: open ? '1px solid #e5e7eb' : 'none' }}
      >
        <span style={{ fontWeight: 700, color: '#1e1b4b', fontSize: 15 }}>{cat.icon} {cat.category || `Category ${index + 1}`}</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#6b7280' }}>{cat.services?.length ?? 0} cards</span>
          <button style={s.removeBtn} onClick={e => { e.stopPropagation(); onRemove(); }}>Remove</button>
          <span style={{ color: '#6d28d9' }}>{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && (
        <div style={{ padding: '18px 18px 14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 8, marginBottom: 8 }}>
            <div>
              <label style={s.label}>Icon</label>
              <input style={s.input} value={cat.icon ?? ''} onChange={e => onChange({ ...cat, icon: e.target.value })} />
            </div>
            <div>
              <label style={s.label}>Category Name</label>
              <input style={s.input} value={cat.category ?? ''} onChange={e => onChange({ ...cat, category: e.target.value })} />
            </div>
          </div>
          <Field label="Tagline" value={cat.tagline} onChange={v => onChange({ ...cat, tagline: v })} />
          <TextareaField label="Description" value={cat.description} onChange={v => onChange({ ...cat, description: v })} minHeight={60} />
          <hr style={s.divider} />
          <label style={{ ...s.label, marginBottom: 10 }}>Service Cards ({cat.services?.length ?? 0})</label>
          {cat.services?.map((card, i) => (
            <ServiceCardEditor key={i} card={card} onChange={u => updateCard(i, u)} onRemove={() => removeCard(i)} />
          ))}
          <button style={s.addBtn} onClick={addCard}>+ Add Service Card</button>
        </div>
      )}
    </div>
  );
};

const ServicesEditor = ({ data, onSave }) => {
  const { draft, setDraft, toast, setToast, save } = useSectionEditor(data, onSave);
  const set = (key) => (val) => setDraft(d => ({ ...d, [key]: val }));
  const updateCat = (i, updated) => { const a = [...draft.categories]; a[i] = updated; setDraft(d => ({ ...d, categories: a })); };
  const removeCat = (i) => setDraft(d => ({ ...d, categories: d.categories.filter((_, idx) => idx !== i) }));
  const addCat = () => setDraft(d => ({ ...d, categories: [...d.categories, { category: 'New Category', tagline: '', description: '', icon: '📋', services: [] }] }));

  return (
    <div>
      <SectionHeader title="⚙️ Services" subtitle="Edit service section headings and all service category cards." />
      <div style={s.card}>
        <Field label="Section Pill Label" value={draft.pill} onChange={set('pill')} />
        <Field label="Main Heading" value={draft.heading} onChange={set('heading')} />
        <Field label="Subheading" value={draft.subheading} onChange={set('subheading')} />
        <TextareaField label="Body Text" value={draft.body} onChange={set('body')} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontWeight: 700, color: '#1e1b4b', fontSize: 16 }}>Service Categories ({draft.categories?.length ?? 0})</h3>
          <button style={s.addBtn} onClick={addCat}>+ Add Category</button>
        </div>
        {draft.categories?.map((cat, i) => (
          <CategoryEditor key={i} cat={cat} index={i} onChange={u => updateCat(i, u)} onRemove={() => removeCat(i)} />
        ))}
      </div>
      <SaveButton onClick={save} />
      <Toast message="Services updated!" visible={toast} onHide={() => setToast(false)} />
    </div>
  );
};

export default ServicesEditor;
