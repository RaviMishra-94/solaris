// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavbarLogo from './NavbarLogo';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Apply dark mode on initial load and when changed
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              <NavbarLogo />
              Paisa Fintech
            </Link>
          </div>

          {/* Dark mode toggle and mobile menu button */}
          <div className="flex items-center">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none mr-2"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={20} className="transition-transform hover:rotate-12" />
              ) : (
                <Moon size={20} className="transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/scripmaster" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              Scripmasters
            </Link>
            <Link to="/totp" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              TOTP Generator
            </Link>
            <Link to="/encode-decode" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              Encode/Decode
            </Link>
            <Link to="/qrcode" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              QR Code
            </Link>
            <Link to="/barcode" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              Barcode
            </Link>
            <Link to="/word-counter" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              Word Counter
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pb-3`}>
          <div className="space-y-1">
            <Link
              to="/scripmaster"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Scripmasters
            </Link>
            <Link
              to="/totp"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              TOTP Generator
            </Link>
            <Link
              to="/encode-decode"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Encode/Decode
            </Link>
            <Link
              to="/qrcode"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              QR Code
            </Link>
            <Link
              to="/barcode"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Barcode
            </Link>
            <Link
              to="/word-counter"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Word Counter
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;