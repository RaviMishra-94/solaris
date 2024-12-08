// src/components/NavbarLogo.jsx
const NavbarLogo = () => (
  <svg
    className="w-8 h-8 mr-2"
    viewBox="0 0 96 96"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="48" cy="48" r="46" fill="#0ea5e9"/>
    <circle cx="48" cy="48" r="44" fill="#ffffff"/>
    <circle cx="48" cy="48" r="18" fill="#0ea5e9"/>
    <g stroke="#0ea5e9" strokeWidth="8" strokeLinecap="round">
      <line x1="48" y1="15" x2="48" y2="30"/>
      <line x1="48" y1="66" x2="48" y2="81"/>
      <line x1="15" y1="48" x2="30" y2="48"/>
      <line x1="66" y1="48" x2="81" y2="48"/>
      <line x1="25" y1="25" x2="35" y2="35"/>
      <line x1="61" y1="61" x2="71" y2="71"/>
      <line x1="25" y1="71" x2="35" y2="61"/>
      <line x1="61" y1="35" x2="71" y2="25"/>
    </g>
    <path
      d="M48 37 Q54 37 54 43 L54 47 Q54 53 48 53 L46 53 Q40 53 40 59 L40 63 Q40 69 46 69"
      fill="none"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export default NavbarLogo;