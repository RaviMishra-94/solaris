// components/Layout.jsx
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user preference exists in localStorage
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference !== null) {
      return savedPreference === 'true';
    }
    // Otherwise check for OS-level preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Update class on document based on dark mode state
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;