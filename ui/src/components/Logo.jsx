import logoSrc from '../assets/PNG-1.png';

const Logo = ({ size = 40 }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: 8,
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    flexShrink: 0,
  }}>
    <img src={logoSrc} alt="Connektixx" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
  </div>
);

export default Logo;
