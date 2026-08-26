import { Field, TextareaField, ArrayField, SectionHeader, SaveButton, Toast, useSectionEditor, s } from './EditorHelpers';

const HomeEditor = ({ data, onSave }) => {
  const { draft, setDraft, toast, setToast, save } = useSectionEditor(data, onSave);
  const set = (key) => (val) => setDraft(d => ({ ...d, [key]: val }));

  return (
    <div>
      <SectionHeader title="🏠 Home" subtitle="Edit hero section headlines, stats, CTA text, and partner badge labels." />
      <div style={s.card}>
        <Field label="Headline Line 1" value={draft.headline1} onChange={set('headline1')} />
        <Field label="Headline Line 2" value={draft.headline2} onChange={set('headline2')} />
        <Field label="Stats Line" value={draft.stats} onChange={set('stats')} />
        <TextareaField label="Subtext" value={draft.subtext} onChange={set('subtext')} />
        <Field label="CTA Button Text" value={draft.cta} onChange={set('cta')} />
        <hr style={s.divider} />
        <Field label="Certification Label" value={draft.certLabel} onChange={set('certLabel')} />
        <ArrayField label="Partner Badge Labels" values={draft.partners} onChange={set('partners')} />
        <SaveButton onClick={save} />
      </div>
      <Toast message="Home section updated!" visible={toast} onHide={() => setToast(false)} />
    </div>
  );
};

export default HomeEditor;
