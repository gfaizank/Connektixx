import { Field, SectionHeader, SaveButton, Toast, useSectionEditor, s } from './EditorHelpers';

const FooterEditor = ({ data, onSave }) => {
  const { draft, setDraft, toast, setToast, save } = useSectionEditor(data, onSave);
  const set = (key) => (val) => setDraft(d => ({ ...d, [key]: val }));

  return (
    <div>
      <SectionHeader title="🔗 Footer" subtitle="Edit footer brand name, copyright text, and social media links." />
      <div style={s.card}>
        <Field label="Brand Name" value={draft.brandName} onChange={set('brandName')} />
        <Field label="Copyright Text" value={draft.copyright} onChange={set('copyright')} />
        <Field label="Privacy Policy Label" value={draft.privacyLabel} onChange={set('privacyLabel')} />
        <Field label="Privacy Policy URL" value={draft.privacyUrl} onChange={set('privacyUrl')} placeholder="#" />
      </div>
      <div style={s.card}>
        <h3 style={{ margin: '0 0 14px', fontWeight: 700, color: '#1e1b4b', fontSize: 15 }}>Social Media Links</h3>
        <Field label="LinkedIn URL" value={draft.linkedin} onChange={set('linkedin')} placeholder="#" />
        <Field label="Instagram URL" value={draft.instagram} onChange={set('instagram')} placeholder="#" />
        <Field label="Twitter URL" value={draft.twitter} onChange={set('twitter')} placeholder="#" />
      </div>
      <SaveButton onClick={save} />
      <Toast message="Footer updated!" visible={toast} onHide={() => setToast(false)} />
    </div>
  );
};

export default FooterEditor;
