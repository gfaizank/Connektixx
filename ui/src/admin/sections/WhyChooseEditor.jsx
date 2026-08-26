import { useState } from 'react';
import { Field, TextareaField, ArrayField, SectionHeader, SaveButton, Toast, useSectionEditor, s } from './EditorHelpers';

const ServiceBlockEditor = ({ block, onChange, onRemove, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', marginBottom: 12, overflow: 'hidden' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', cursor: 'pointer', background: open ? '#f5f3ff' : '#fff', borderBottom: open ? '1px solid #e5e7eb' : 'none' }}
      >
        <span style={{ fontWeight: 700, color: '#1e1b4b', fontSize: 14 }}>{block.icon} {block.title || `Block ${index + 1}`}</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button style={s.removeBtn} onClick={e => { e.stopPropagation(); onRemove(); }}>Remove</button>
          <span style={{ color: '#6d28d9' }}>{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && (
        <div style={{ padding: '18px 18px 14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 8, marginBottom: 8 }}>
            <div>
              <label style={s.label}>Icon</label>
              <input style={s.input} value={block.icon ?? ''} onChange={e => onChange({ ...block, icon: e.target.value })} />
            </div>
            <div>
              <label style={s.label}>Color Theme</label>
              <select style={s.input} value={block.color ?? 'blue'} onChange={e => onChange({ ...block, color: e.target.value })}>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="green">Green</option>
              </select>
            </div>
          </div>
          <Field label="Title" value={block.title} onChange={v => onChange({ ...block, title: v })} />
          <Field label="Tagline" value={block.tagline} onChange={v => onChange({ ...block, tagline: v })} />
          <ArrayField label="Feature Points" values={block.features ?? []} onChange={v => onChange({ ...block, features: v })} />
          <Field label="Conclusion Text" value={block.conclusion} onChange={v => onChange({ ...block, conclusion: v })} />
        </div>
      )}
    </div>
  );
};

const WhyChooseEditor = ({ data, onSave }) => {
  const { draft, setDraft, toast, setToast, save } = useSectionEditor(data, onSave);
  const set = (key) => (val) => setDraft(d => ({ ...d, [key]: val }));
  const updateBlock = (i, updated) => { const a = [...draft.services]; a[i] = updated; setDraft(d => ({ ...d, services: a })); };
  const removeBlock = (i) => setDraft(d => ({ ...d, services: d.services.filter((_, idx) => idx !== i) }));
  const addBlock = () => setDraft(d => ({ ...d, services: [...d.services, { title: 'New Block', tagline: '', features: [], conclusion: '', icon: '⭐', color: 'blue' }] }));

  return (
    <div>
      <SectionHeader title="✅ Why Choose" subtitle="Edit the 'Why Choose Connektixx?' section headings and service blocks." />
      <div style={s.card}>
        <Field label="Section Pill Label" value={draft.pill} onChange={set('pill')} />
        <Field label="Main Heading" value={draft.heading} onChange={set('heading')} />
        <Field label="Subheading" value={draft.subheading} onChange={set('subheading')} />
        <Field label="CTA Button Text" value={draft.cta} onChange={set('cta')} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontWeight: 700, color: '#1e1b4b', fontSize: 16 }}>Service Blocks ({draft.services?.length ?? 0})</h3>
          <button style={s.addBtn} onClick={addBlock}>+ Add Block</button>
        </div>
        {draft.services?.map((block, i) => (
          <ServiceBlockEditor key={i} block={block} index={i} onChange={u => updateBlock(i, u)} onRemove={() => removeBlock(i)} />
        ))}
      </div>
      <SaveButton onClick={save} />
      <Toast message="Why Choose section updated!" visible={toast} onHide={() => setToast(false)} />
    </div>
  );
};

export default WhyChooseEditor;
