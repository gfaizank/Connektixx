import { createContext, useContext, useState } from 'react';
import { defaultContent } from '../content/siteContent';

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('connektixx_content');
      return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
    } catch {
      return defaultContent;
    }
  });

  const updateSection = (section, data) => {
    setContent(prev => {
      const next = { ...prev, [section]: data };
      try { localStorage.setItem('connektixx_content', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const resetContent = () => {
    setContent(defaultContent);
    try { localStorage.removeItem('connektixx_content'); } catch {}
  };

  return (
    <ContentContext.Provider value={{ content, updateSection, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
};
