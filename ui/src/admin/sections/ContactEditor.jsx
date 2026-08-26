import { Field, TextareaField, SectionHeader, SaveButton, Toast, useSectionEditor, s } from './EditorHelpers';

const ContactEditor = ({ data, onSave }) => {
  const { draft, setDraft, toast, setToast, save } = useSectionEditor(data, onSave);
  const set = (key) => (val) => setDraft(d => ({ ...d, [key]: val }));

  return (
    <div>
      <SectionHeader title="📞 Contact" subtitle="Edit contact section text, contact details, and social media links." />
      <div style={s.card}>
        <Field label="Section Pill Label" value={draft.pill} onChange={set('pill')} />
        <Field label="Main Heading" value={draft.heading} onChange={set('heading')} />
        <TextareaField label="Intro Text" value={draft.intro} onChange={set('intro')} />
        <Field label="Form Heading" value={draft.formHeading} onChange={set('formHeading')} />
        <Field label="Submit Button Text" value={draft.submitBtn} onChange={set('submitBtn')} />
      </div>
      <div style={s.card}>
        <h3 style={{ margin: '0 0 14px', fontWeight: 700, color: '#1e1b4b', fontSize: 15 }}>Contact Information</h3>
        <Field label="Info Section Heading" value={draft.infoHeading} onChange={set('infoHeading')} />
        <Field label="Phone Number" value={draft.phone} onChange={set('phone')} />
        <Field label="Email Address" value={draft.email} onChange={set('email')} />
        <Field label="Address" value={draft.address} onChange={set('address')} />
        <Field label="Business Hours" value={draft.hours} onChange={set('hours')} />
        <hr style={s.divider} />
        <Field label="Consultation Section Heading" value={draft.consultHeading} onChange={set('consultHeading')} />
        <Field label="Consultation CTA Text" value={draft.consultCta} onChange={set('consultCta')} />
      </div>
      <div style={s.card}>
        <h3 style={{ margin: '0 0 14px', fontWeight: 700, color: '#1e1b4b', fontSize: 15 }}>Social Media Links</h3>
        <Field label="Facebook URL" value={draft.facebook} onChange={set('facebook')} placeholder="https://..." />
        <Field label="Twitter URL" value={draft.twitter} onChange={set('twitter')} placeholder="#" />
        <Field label="Instagram URL" value={draft.instagram} onChange={set('instagram')} placeholder="#" />
        <Field label="WhatsApp URL" value={draft.whatsapp} onChange={set('whatsapp')} placeholder="https://wa.me/..." />
        <Field label="LinkedIn URL" value={draft.linkedin} onChange={set('linkedin')} placeholder="#" />
      </div>
      <SaveButton onClick={save} />
      <Toast message="Contact section updated!" visible={toast} onHide={() => setToast(false)} />
    </div>
  );
};

export default ContactEditor;
