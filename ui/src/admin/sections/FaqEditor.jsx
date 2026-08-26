import { Field, TextareaField, SectionHeader, SaveButton, Toast, useSectionEditor, s } from './EditorHelpers';

const FaqEditor = ({ data, onSave }) => {
  const { draft, setDraft, toast, setToast, save } = useSectionEditor(data, onSave);
  const set = (key) => (val) => setDraft(d => ({ ...d, [key]: val }));
  const updateItem = (i, key, val) => {
    const a = [...draft.items];
    a[i] = { ...a[i], [key]: val };
    setDraft(d => ({ ...d, items: a }));
  };
  const removeItem = (i) => setDraft(d => ({ ...d, items: d.items.filter((_, idx) => idx !== i) }));
  const addItem = () => setDraft(d => ({ ...d, items: [...d.items, { id: Date.now(), question: 'New question?', answer: 'Answer here.' }] }));

  return (
    <div>
      <SectionHeader title="❓ FAQ" subtitle="Edit the FAQ section heading and all Q&A items." />
      <div style={s.card}>
        <Field label="Heading Text" value={draft.heading} onChange={set('heading')} />
        <Field label="Heading Emoji" value={draft.headingEmoji} onChange={set('headingEmoji')} />
        <TextareaField label="Subheading" value={draft.subheading} onChange={set('subheading')} />
      </div>
      <div style={s.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <label style={s.label}>FAQ Items ({draft.items?.length ?? 0})</label>
          <button style={s.addBtn} onClick={addItem}>+ Add Question</button>
        </div>
        {draft.items?.map((item, i) => (
          <div key={item.id ?? i} style={s.subCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontWeight: 600, color: '#374151', fontSize: 13 }}>Q{i + 1}</span>
              <button style={s.removeBtn} onClick={() => removeItem(i)}>Remove</button>
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={s.label}>Question</label>
              <input style={s.input} value={item.question ?? ''} onChange={e => updateItem(i, 'question', e.target.value)} />
            </div>
            <label style={s.label}>Answer</label>
            <textarea style={{ ...s.textarea, minHeight: 72 }} value={item.answer ?? ''} onChange={e => updateItem(i, 'answer', e.target.value)} />
          </div>
        ))}
      </div>
      <SaveButton onClick={save} />
      <Toast message="FAQ updated!" visible={toast} onHide={() => setToast(false)} />
    </div>
  );
};

export default FaqEditor;
