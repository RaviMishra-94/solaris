// pages/Home.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  const formatUTCTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
      hour12: false,
    }).format(date);
  };

  const formatUTCDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  };

  const formatISTTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata',
      hour12: false,
    }).format(date);
  };

  const formatISTDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata',
    }).format(date);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-2xl w-full transition-colors duration-200">
        <h1 className="text-3xl font-bold text-black dark:text-white text-center mb-8 transition-colors duration-200">
          Welcome to Paisa Fintech
        </h1>

        <div className="text-center mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-200">
              <div className="text-4xl font-mono text-blue-600 dark:text-blue-400 mb-2 transition-colors duration-200">
                {formatUTCTime(time)}
              </div>
              <div className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                {formatUTCDate(time)} UTC
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-200">
              <div className="text-4xl font-mono text-blue-600 dark:text-blue-400 mb-2 transition-colors duration-200">
                {formatISTTime(time)}
              </div>
              <div className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                {formatISTDate(time)} IST
              </div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4 transition-colors duration-200">
            Tools to help you with your trading journey.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg transition-colors duration-200">
            Explore our scrip master, broker links, setup guides, and calculators:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/scripmaster"
            className="bg-black dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white text-lg font-semibold py-3 px-6 rounded-lg text-center transition-all duration-200 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
          >
            Broker Scriptmaster
          </Link>
          <Link
            to="/totp"
            className="bg-black dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white text-lg font-semibold py-3 px-6 rounded-lg text-center transition-all duration-200 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
          >
            TOTP Generator
          </Link>
          <Link
            to="/encode-decode"
            className="bg-black dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white text-lg font-semibold py-3 px-6 rounded-lg text-center transition-all duration-200 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
          >
            Encode/Decode Tool
          </Link>
          <Link
            to="/qrcode"
            className="bg-black dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white text-lg font-semibold py-3 px-6 rounded-lg text-center transition-all duration-200 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
          >
            QR Code Generator
          </Link>
          <Link
            to="/barcode"
            className="bg-black dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white text-lg font-semibold py-3 px-6 rounded-lg text-center transition-all duration-200 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
          >
            Barcode Generator
          </Link>
          <Link
            to="/word-counter"
            className="bg-black dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white text-lg font-semibold py-3 px-6 rounded-lg text-center transition-all duration-200 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700 sm:col-span-2"
          >
            Word Counter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;