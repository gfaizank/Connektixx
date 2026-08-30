const Logo = ({ size = 40, id = 'a' }) => {
  const og = `og-${id}`;   // orange gradient
  const dg = `dg-${id}`;   // dark gradient
  return (
    <svg width={size} height={size} viewBox="0 0 108 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={og} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF8A5B" />
          <stop offset="100%" stopColor="#FF541C" />
        </linearGradient>
        <radialGradient id={dg} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3D424E" />
          <stop offset="100%" stopColor="#2D313A" />
        </radialGradient>
      </defs>

      {/* Outer orange C arc — opens on the right */}
      <path d="M 70 20 A 38 38 0 1 0 70 80"
        stroke={`url(#${og})`} strokeWidth="7" strokeLinecap="round" fill="none" />

      {/* Inner orange C arc */}
      <path d="M 61 31 A 25 25 0 1 0 61 69"
        stroke={`url(#${og})`} strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Small orange arc accent — lower inner ring */}
      <path d="M 66 68 A 25 25 0 0 0 68 60"
        stroke="#FF541C" strokeWidth="5.5" strokeLinecap="round" fill="none" />

      {/* Connector arms */}
      <line x1="41" y1="50" x2="70" y2="18" stroke={`url(#${dg})`} strokeWidth="9" strokeLinecap="round" />
      <line x1="41" y1="50" x2="68" y2="80" stroke={`url(#${dg})`} strokeWidth="9" strokeLinecap="round" />

      {/* Hub circle */}
      <circle cx="41" cy="50" r="9" fill={`url(#${dg})`} />

      {/* Upper node */}
      <circle cx="70" cy="17" r="12" fill={`url(#${dg})`} />

      {/* Lower node (teardrop shape) */}
      <circle cx="68" cy="81" r="10" fill={`url(#${dg})`} />

      {/* Orange accent dot — top right */}
      <circle cx="86" cy="15" r="5.5" fill="#FF541C" />

      {/* Dark accent dot — left */}
      <circle cx="6" cy="44" r="4.5" fill="#2D313A" />

      {/* Small orange dot — lower right */}
      <circle cx="91" cy="70" r="3.5" fill="#FF8A5B" />
    </svg>
  );
};

export default Logo;
