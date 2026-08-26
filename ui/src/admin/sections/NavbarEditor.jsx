import { Field, ArrayField, SectionHeader, SaveButton, Toast, useSectionEditor, s } from './EditorHelpers';

const NavbarEditor = ({ data, onSave }) => {
  const { draft, setDraft, toast, setToast, save } = useSectionEditor(data, onSave);
  const set = (key) => (val) => setDraft(d => ({ ...d, [key]: val }));

  return (
    <div>
      <SectionHeader title="🧭 Navbar" subtitle="Edit the navigation bar brand name, CTA button text, and nav link labels." />
      <div style={s.card}>
        <Field label="Brand Name" value={draft.brandName} onChange={set('brandName')} />
        <Field label="CTA Button Text" value={draft.chatCta} onChange={set('chatCta')} />
        <ArrayField label="Navigation Item Labels" values={draft.navItems} onChange={set('navItems')} />
        <SaveButton onClick={save} />
      </div>
      <Toast message="Navbar updated!" visible={toast} onHide={() => setToast(false)} />
    </div>
  );
};

export default NavbarEditor;
