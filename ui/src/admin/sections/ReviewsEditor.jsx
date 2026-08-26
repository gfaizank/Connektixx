import { Field, TextareaField, SectionHeader, SaveButton, Toast, useSectionEditor, s } from './EditorHelpers';

const ReviewsEditor = ({ data, onSave }) => {
  const { draft, setDraft, toast, setToast, save } = useSectionEditor(data, onSave);
  const set = (key) => (val) => setDraft(d => ({ ...d, [key]: val }));
  const updateReview = (i, key, val) => {
    const a = [...draft.list];
    a[i] = { ...a[i], [key]: val };
    setDraft(d => ({ ...d, list: a }));
  };
  const removeReview = (i) => setDraft(d => ({ ...d, list: d.list.filter((_, idx) => idx !== i) }));
  const addReview = () => setDraft(d => ({ ...d, list: [...d.list, { id: Date.now(), name: 'New Reviewer', initial: 'N', company: 'Company Name', rating: 5, text: 'Review text here.' }] }));

  return (
    <div>
      <SectionHeader title="⭐ Reviews" subtitle="Edit the client reviews section and individual review cards." />
      <div style={s.card}>
        <Field label="Section Heading" value={draft.heading} onChange={set('heading')} />
        <TextareaField label="Subheading" value={draft.subheading} onChange={set('subheading')} />
        <Field label="CTA Button Text" value={draft.cta} onChange={set('cta')} />
      </div>
      <div style={s.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <label style={s.label}>Review Cards ({draft.list?.length ?? 0})</label>
          <button style={s.addBtn} onClick={addReview}>+ Add Review</button>
        </div>
        {draft.list?.map((review, i) => (
          <div key={review.id ?? i} style={s.subCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontWeight: 700, color: '#374151' }}>{review.name || `Review ${i + 1}`}</span>
              <button style={s.removeBtn} onClick={() => removeReview(i)}>Remove</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 50px', gap: 8, marginBottom: 8 }}>
              <div>
                <label style={s.label}>Name</label>
                <input style={s.input} value={review.name ?? ''} onChange={e => updateReview(i, 'name', e.target.value)} />
              </div>
              <div>
                <label style={s.label}>Company</label>
                <input style={s.input} value={review.company ?? ''} onChange={e => updateReview(i, 'company', e.target.value)} />
              </div>
              <div>
                <label style={s.label}>Initial</label>
                <input style={s.input} value={review.initial ?? ''} onChange={e => updateReview(i, 'initial', e.target.value)} maxLength={2} />
              </div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={s.label}>Rating (1–5)</label>
              <select style={s.input} value={review.rating ?? 5} onChange={e => updateReview(i, 'rating', Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} ★</option>)}
              </select>
            </div>
            <label style={s.label}>Review Text</label>
            <textarea style={{ ...s.textarea, minHeight: 72 }} value={review.text ?? ''} onChange={e => updateReview(i, 'text', e.target.value)} />
          </div>
        ))}
      </div>
      <SaveButton onClick={save} />
      <Toast message="Reviews updated!" visible={toast} onHide={() => setToast(false)} />
    </div>
  );
};

export default ReviewsEditor;
