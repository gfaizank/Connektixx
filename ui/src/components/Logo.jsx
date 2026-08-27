const Logo = ({ size = 40, id = 'a' }) => {
  const grad = `logoGrad-${id}`;
  const hub = `hubGrad-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
        <radialGradient id={hub} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6366f1" />
        </radialGradient>
      </defs>

      {/* C arc */}
      <path
        d="M 34 12 A 15 15 0 1 0 34 32"
        stroke={`url(#${grad})`}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Connection lines from hub to outer nodes */}
      <line x1="22" y1="22" x2="34" y2="12" stroke={`url(#${grad})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      <line x1="22" y1="22" x2="34" y2="32" stroke={`url(#${grad})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      <line x1="22" y1="22" x2="7"  y2="22" stroke={`url(#${grad})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />

      {/* Outer nodes */}
      <circle cx="34" cy="12" r="3"   fill={`url(#${grad})`} />
      <circle cx="34" cy="32" r="3"   fill={`url(#${grad})`} />
      <circle cx="7"  cy="22" r="3"   fill={`url(#${grad})`} />

      {/* Center hub */}
      <circle cx="22" cy="22" r="4.5" fill={`url(#${hub})`} />
    </svg>
  );
};

export default Logo;
