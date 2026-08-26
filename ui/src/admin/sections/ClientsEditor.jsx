import { Field, TextareaField, SectionHeader, SaveButton, Toast, useSectionEditor, s } from './EditorHelpers';

const ClientsEditor = ({ data, onSave }) => {
  const { draft, setDraft, toast, setToast, save } = useSectionEditor(data, onSave);
  const set = (key) => (val) => setDraft(d => ({ ...d, [key]: val }));
  const updateClient = (i, key, val) => {
    const a = [...draft.list];
    a[i] = { ...a[i], [key]: val };
    setDraft(d => ({ ...d, list: a }));
  };
  const removeClient = (i) => setDraft(d => ({ ...d, list: d.list.filter((_, idx) => idx !== i) }));
  const addClient = () => setDraft(d => ({ ...d, list: [...d.list, { name: 'New Client', logo: '🏢' }] }));

  return (
    <div>
      <SectionHeader title="👥 Clients" subtitle="Edit the clients section heading and client entries." />
      <div style={s.card}>
        <Field label="Section Heading" value={draft.heading} onChange={set('heading')} />
        <TextareaField label="Subheading" value={draft.subheading} onChange={set('subheading')} />
        <Field label="CTA Button Text" value={draft.cta} onChange={set('cta')} />
      </div>
      <div style={s.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <label style={s.label}>Client Entries ({draft.list?.length ?? 0})</label>
          <button style={s.addBtn} onClick={addClient}>+ Add Client</button>
        </div>
        {draft.list?.map((client, i) => (
          <div key={i} style={{ ...s.subCard, display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 8, alignItems: 'center' }}>
            <div>
              <label style={{ ...s.label, marginBottom: 4 }}>Logo</label>
              <input style={s.input} value={client.logo ?? ''} onChange={e => updateClient(i, 'logo', e.target.value)} placeholder="🏢" />
            </div>
            <div>
              <label style={{ ...s.label, marginBottom: 4 }}>Name</label>
              <input style={s.input} value={client.name ?? ''} onChange={e => updateClient(i, 'name', e.target.value)} />
            </div>
            <button style={{ ...s.removeBtn, alignSelf: 'flex-end', marginBottom: 2 }} onClick={() => removeClient(i)}>✕</button>
          </div>
        ))}
      </div>
      <SaveButton onClick={save} />
      <Toast message="Clients section updated!" visible={toast} onHide={() => setToast(false)} />
    </div>
  );
};

export default ClientsEditor;
