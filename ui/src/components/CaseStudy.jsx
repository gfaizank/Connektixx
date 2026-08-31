import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const CaseStudy = () => {
  const revealRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const els = revealRefs.current.filter(Boolean);
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const addReveal = i => el => { revealRefs.current[i] = el; };

  return (
    <>
      <style>{`
        .cs-wrap { max-width: 780px; margin: 0 auto; padding: 0 24px; }
        .cs-wrap--wide { max-width: 980px; }
        .cs-furrows {
          background-image: repeating-linear-gradient(to bottom, rgba(35,38,46,0.06) 0px, rgba(35,38,46,0.06) 1px, transparent 1px, transparent 34px);
        }
        .cs-reveal { opacity: 0; transform: translateY(14px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .cs-reveal.is-visible { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .cs-reveal { opacity: 1; transform: none; transition: none; } }
        .cs-layers { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 32px; }
        @media (max-width: 680px) { .cs-layers { grid-template-columns: 1fr; } }
        .cs-ledger { margin-top: 8px; border-top: 1px solid #e2e4e8; }
        .cs-ledger-row { display: grid; grid-template-columns: 120px 1fr; gap: 24px; padding: 22px 0; border-bottom: 1px solid #e2e4e8; align-items: baseline; }
        @media (max-width: 560px) { .cs-ledger-row { grid-template-columns: 1fr; gap: 6px; } }
        .cs-outcome-box { display: flex; gap: 20px; align-items: flex-start; background: #f1f2f4; border-radius: 10px; padding: 26px 28px; margin-top: 24px; }
        @media (max-width: 560px) { .cs-outcome-box { flex-direction: column; } }
      `}</style>

      <div style={{ background: '#f7f7f8', minHeight: '100vh', color: '#23262d', fontFamily: "'Inter', -apple-system, 'Segoe UI', Roboto, sans-serif", fontSize: 16, lineHeight: 1.6, WebkitFontSmoothing: 'antialiased' }}>

        {/* Header */}
        <div className="cs-furrows">
          <div className="cs-wrap cs-wrap--wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 24px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <Logo size={36} />
              <span style={{ fontFamily: "'Noto Serif', Georgia, serif", fontWeight: 700, fontSize: 15, color: '#2D313A', letterSpacing: '0.02em' }}>CONNEKTIXX</span>
            </Link>
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a93a0' }}>Case Study</span>
          </div>

          {/* Hero */}
          <div className="cs-wrap" style={{ paddingTop: 64, paddingBottom: 56 }}>
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FF541C', fontWeight: 600, marginBottom: 18, display: 'block' }}>
              Market Research &amp; Launch Strategy
            </span>
            <h1 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontWeight: 700, fontSize: 'clamp(2.1rem, 1.5rem + 2.6vw, 3.4rem)', lineHeight: 1.08, letterSpacing: '-0.01em', maxWidth: '15ch', margin: 0, color: '#23262d', textWrap: 'balance' }}>
              Every Number Traced Back to a Farmer&rsquo;s Own Field
            </h1>
            <p style={{ marginTop: 22, fontSize: '1.15rem', color: '#5b6472', maxWidth: '62ch', lineHeight: 1.55 }}>
              Ahead of a national launch of a new herbicide-tolerant crop variety, a leading Indian agri-input company needed proof that farmer enthusiasm held up field by field — not just on a national average.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, marginTop: 40, paddingTop: 28, borderTop: '1px solid #e2e4e8' }}>
              {[
                { k: 'Client', v: 'Agri-input manufacturer' },
                { k: 'Scope', v: 'Multiple states · matched-farmer study' },
                { k: 'Discipline', v: 'Farmer research & GTM strategy' },
              ].map(item => (
                <div key={item.k} style={{ minWidth: 130 }}>
                  <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a93a0', marginBottom: 6 }}>{item.k}</div>
                  <div style={{ fontSize: '0.95rem', color: '#23262d', fontWeight: 500 }}>{item.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Challenge */}
        <section ref={addReveal(0)} className="cs-reveal" style={{ padding: '56px 0', borderTop: '1px solid #e2e4e8' }}>
          <div className="cs-wrap">
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8f6e10', fontWeight: 600, marginBottom: 14, display: 'block' }}>The Challenge</span>
            <h2 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: 'clamp(1.5rem, 1.2rem + 1vw, 2rem)', marginBottom: 20, maxWidth: '22ch', margin: '0 0 20px' }}>Enthusiasm Isn&rsquo;t the Same as Economics</h2>
            <p style={{ color: '#5b6472', maxWidth: '66ch', fontSize: '1.02rem', margin: 0 }}>Field teams were reporting strong early interest. But a national launch is a bet on averages — and averages hide exactly the geography-by-geography variation that can sink a rollout. The client needed to know, before committing marketing spend nationally, whether the product was actually paying off for farmers, and whether that held true in every state or only in some.</p>
            <p style={{ color: '#5b6472', maxWidth: '66ch', fontSize: '1.02rem', marginTop: 14 }}>That meant going past sentiment and into the ledger: what did this product cost a farmer to grow, against what they already knew, on their own land, in their own season?</p>
          </div>
        </section>

        {/* Our Approach */}
        <section ref={addReveal(1)} className="cs-reveal" style={{ padding: '56px 0', borderTop: '1px solid #e2e4e8' }}>
          <div className="cs-wrap">
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8f6e10', fontWeight: 600, marginBottom: 14, display: 'block' }}>Our Approach</span>
            <h2 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: 'clamp(1.5rem, 1.2rem + 1vw, 2rem)', margin: '0 0 20px', maxWidth: '22ch' }}>Two Layers, One Farmer at a Time</h2>
            <p style={{ color: '#5b6472', maxWidth: '66ch', fontSize: '1.02rem', margin: 0 }}>We designed the study around a simple discipline: never compare a stranger&rsquo;s plot to another stranger&rsquo;s plot. Every economics comparison in this study is the same farmer, the same season, their own conventional plot against their own trial plot.</p>
            <div className="cs-layers">
              {[
                { tag: 'Layer 1 · Sentiment', title: 'Farmer interviews', desc: 'Telephonic interviews with trial farmers across multiple states covering adoption behavior, satisfaction, word-of-mouth advocacy, and intent to expand acreage next season.' },
                { tag: 'Layer 2 · Economics', title: 'Matched cost-of-cultivation study', desc: "A same-farmer, same-season cost-of-cultivation comparison, drawn from every trial state — each farmer weighed against their own conventional practice, not a stranger's." },
              ].map(card => (
                <div key={card.tag} style={{ background: '#fff', border: '1px solid #e2e4e8', borderRadius: 10, padding: '26px 24px' }}>
                  <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a93a0', marginBottom: 10 }}>{card.tag}</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 10, color: '#a6360f', fontFamily: 'inherit', margin: '0 0 10px' }}>{card.title}</h3>
                  <p style={{ color: '#5b6472', fontSize: '0.95rem', margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Found */}
        <section ref={addReveal(2)} className="cs-reveal" style={{ padding: '56px 0', borderTop: '1px solid #e2e4e8' }}>
          <div className="cs-wrap">
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8f6e10', fontWeight: 600, marginBottom: 14, display: 'block' }}>What We Found</span>
            <h2 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: 'clamp(1.5rem, 1.2rem + 1vw, 2rem)', margin: '0 0 8px', maxWidth: '22ch' }}>The Headline Numbers</h2>
            <div className="cs-ledger">
              {[
                { stat: '80%', desc: <>of surveyed farmers were <b>aggressive adopters</b> — repeat users who bought in without hesitation.</> },
                { stat: '84%', desc: <>were <b>actively recommending</b> the product to other farmers — strong, organic word-of-mouth.</> },
                { stat: '+216%', desc: <><b>acreage growth intent</b> among repeat-intent farmers going into next season.</> },
                { stat: '+9.2pt', desc: <>full <b>weed-control edge</b> over the conventional practice — the core performance claim, holding up in the field.</> },
              ].map(row => (
                <div key={row.stat} className="cs-ledger-row">
                  <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontWeight: 600, fontSize: '1.9rem', color: '#FF541C', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>{row.stat}</div>
                  <div style={{ color: '#23262d', fontSize: '1rem', paddingTop: 4 }}>{row.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Outcome */}
        <section ref={addReveal(3)} className="cs-reveal" style={{ padding: '56px 0', borderTop: '1px solid #e2e4e8' }}>
          <div className="cs-wrap">
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8f6e10', fontWeight: 600, marginBottom: 14, display: 'block' }}>The Outcome</span>
            <h2 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: 'clamp(1.5rem, 1.2rem + 1vw, 2rem)', margin: '0 0 20px', maxWidth: '22ch' }}>A Sequenced Launch, Not a National Bet</h2>
            <p style={{ color: '#5b6472', maxWidth: '66ch', fontSize: '1.02rem', margin: 0 }}>The finished picture wasn&rsquo;t uniformly positive — and that was the point. Three states showed strong, provable economics; two needed an agronomic fix before the numbers would hold. That difference reshaped the plan.</p>
            <div className="cs-outcome-box">
              <div style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: '2rem', lineHeight: 1, color: '#FF541C', fontWeight: 600, flexShrink: 0 }}>→</div>
              <p style={{ margin: 0, color: '#23262d', fontSize: '1.02rem' }}>A single national launch plan was replaced with a <b>phased, state-sequenced go-to-market strategy</b> — prioritizing the states with proven farmer economics, and holding the others back for an agronomic fix before scale-up.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="cs-wrap">
          <footer style={{ borderTop: '1px solid #e2e4e8', padding: '48px 0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: '1.2rem', color: '#23262d', maxWidth: '26ch' }}>Considering a launch of your own?</div>
            <div>
              <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a93a0', marginBottom: 8 }}>Connektixx Strategic Solutions · Let&rsquo;s Connect</div>
              <Link to="/#contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #FF541C, #D9430F)', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 22px', borderRadius: 8, textDecoration: 'none' }}>
                Discuss Your Business Challenge
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default CaseStudy;
