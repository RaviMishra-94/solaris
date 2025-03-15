// src/components/NavbarLogo.jsx
const NavbarLogo = () => (
  <svg
    className="w-8 h-8 mr-2"
    viewBox="0 0 96 96"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background circle */}
    <circle cx="48" cy="48" r="46" fill="#1a2a3a"/>

    {/* Letters PF */}
    <text
      x="48"
      y="60"
      fontFamily="Arial, sans-serif"
      fontSize="42"
      fontWeight="bold"
      fill="#FFFFFF"
      textAnchor="middle"
      letterSpacing="-1"
    >
      P
    </text>

    <text
      x="48"
      y="60"
      fontFamily="Arial, sans-serif"
      fontSize="42"
      fontWeight="bold"
      fill="#4ECDC4"
      textAnchor="middle"
      dx="18"
      letterSpacing="-1"
    >
      F
    </text>

    {/* Accent line */}
    <path
      d="M28 68 L68 68"
      stroke="#4ECDC4"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export default NavbarLogo;