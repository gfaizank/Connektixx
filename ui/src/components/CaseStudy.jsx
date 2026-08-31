import { motion } from 'framer-motion';

const ledger = [
  { stat: '80%',   desc: <>of surveyed farmers were <b>aggressive adopters</b> — repeat users who bought in without hesitation.</> },
  { stat: '84%',   desc: <>were <b>actively recommending</b> the product to other farmers — strong, organic word-of-mouth.</> },
  { stat: '+216%', desc: <><b>Acreage growth intent</b> among repeat-intent farmers going into next season.</> },
  { stat: '+9.2pt',desc: <>Full <b>weed-control edge</b> over conventional practice — the core performance claim, holding up in the field.</> },
];

const layers = [
  { tag: 'Layer 1 · Sentiment',  title: 'Farmer interviews',              desc: 'Telephonic interviews with trial farmers across multiple states covering adoption behavior, satisfaction, word-of-mouth advocacy, and intent to expand acreage next season.' },
  { tag: 'Layer 2 · Economics',  title: 'Matched cost-of-cultivation study', desc: "A same-farmer, same-season cost-of-cultivation comparison drawn from every trial state — each farmer weighed against their own conventional practice, not a stranger's." },
];

const CaseStudy = () => (
  <div className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #23262E 0%, #2D313A 100%)' }}>

    {/* Ambient orbs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #FF541C, transparent 70%)', filter: 'blur(70px)' }} />
      <div className="absolute bottom-0 -left-16 w-[360px] h-[360px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #FF8A5B, transparent 70%)', filter: 'blur(60px)' }} />
    </div>

    <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-14">
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-bold"
          style={{ background: 'rgba(255,84,28,0.15)', border: '1px solid rgba(255,84,28,0.3)', color: '#FF8A5B' }}>
          Case Study
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 max-w-2xl">
          Every Number Traced Back to a Farmer&rsquo;s Own Field
        </h2>
        <div className="w-20 h-0.5 mb-6" style={{ background: 'linear-gradient(90deg, #FF541C, #FF8A5B)' }} />
        <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
          Ahead of a national launch of a new herbicide-tolerant crop variety, a leading Indian agri-input company needed proof that farmer enthusiasm held up field by field — not just on a national average.
        </p>

        {/* Meta strip */}
        <div className="flex flex-wrap gap-8 mt-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {[
            { k: 'Client',     v: 'Agri-input manufacturer' },
            { k: 'Scope',      v: 'Multiple states · matched-farmer study' },
            { k: 'Discipline', v: 'Farmer research & GTM strategy' },
          ].map(item => (
            <div key={item.k}>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'ui-monospace, monospace' }}>{item.k}</div>
              <div className="text-sm font-medium text-white/80">{item.v}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Two-column: Challenge + Approach */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* Challenge */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#FF8A5B', fontFamily: 'ui-monospace, monospace' }}>The Challenge</div>
          <h3 className="text-xl font-black text-white mb-4">Enthusiasm Isn&rsquo;t the Same as Economics</h3>
          <p className="text-white/60 text-sm leading-relaxed">Field teams were reporting strong early interest. But a national launch is a bet on averages — and averages hide exactly the geography-by-geography variation that can sink a rollout.</p>
          <p className="text-white/60 text-sm leading-relaxed mt-3">That meant going past sentiment and into the ledger: what did this product cost a farmer to grow, against what they already knew, on their own land, in their own season?</p>
        </motion.div>

        {/* Approach */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-2xl p-8 flex flex-col gap-4">
          <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#FF8A5B', fontFamily: 'ui-monospace, monospace' }}>Our Approach</div>
          <h3 className="text-xl font-black text-white mb-2">Two Layers, One Farmer at a Time</h3>
          {layers.map(l => (
            <div key={l.tag} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,84,28,0.2)' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'ui-monospace, monospace' }}>{l.tag}</div>
              <div className="text-sm font-bold mb-1" style={{ color: '#FF8A5B' }}>{l.title}</div>
              <p className="text-white/55 text-xs leading-relaxed">{l.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stat ledger */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="glass-card rounded-2xl p-8 mb-6">
        <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#FF8A5B', fontFamily: 'ui-monospace, monospace' }}>What We Found</div>
        <h3 className="text-xl font-black text-white mb-6">The Headline Numbers</h3>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {ledger.map((row, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              className="grid gap-4 py-5"
              style={{ gridTemplateColumns: '110px 1fr', borderBottom: '1px solid rgba(255,255,255,0.08)', alignItems: 'baseline' }}>
              <div className="font-bold text-3xl" style={{ color: '#FF541C', fontFamily: 'ui-monospace, monospace', fontVariantNumeric: 'tabular-nums' }}>{row.stat}</div>
              <div className="text-white/70 text-sm leading-relaxed">{row.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Outcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="glass-card rounded-2xl p-8">
        <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#FF8A5B', fontFamily: 'ui-monospace, monospace' }}>The Outcome</div>
        <h3 className="text-xl font-black text-white mb-4">A Sequenced Launch, Not a National Bet</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-5">The finished picture wasn&rsquo;t uniformly positive — and that was the point. Three states showed strong, provable economics; two needed an agronomic fix before the numbers would hold. That difference reshaped the plan.</p>
        <div className="flex gap-4 items-start rounded-xl p-5" style={{ background: 'rgba(255,84,28,0.1)', border: '1px solid rgba(255,84,28,0.25)' }}>
          <span className="text-2xl font-black flex-shrink-0" style={{ color: '#FF541C' }}>→</span>
          <p className="text-white/80 text-sm leading-relaxed m-0">
            A single national launch plan was replaced with a <b className="text-white">phased, state-sequenced go-to-market strategy</b> — prioritizing the states with proven farmer economics, and holding the others back for an agronomic fix before scale-up.
          </p>
        </div>
      </motion.div>

    </div>
  </div>
);

export default CaseStudy;
