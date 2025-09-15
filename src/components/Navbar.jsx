// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react"; // Added useRef for click outside detection
import NavbarLogo from "./NavbarLogo";
import { Sun, Moon, Menu, X, Bell, Info } from "lucide-react"; // Added Bell and Info icons

// --- Constants for better organization ---
const NAV_ITEMS = [
  { to: "/scripmaster", label: "Scripmasters" },
  { to: "/resources", label: "Broker Resources" },
  { to: "/totp", label: "TOTP Generator" },
  { to: "/surveillance-stocks", label: "Surveillance Stocks" },
  { to: "/word-counter", label: "Word Counter" },
];

const SPONSORED_LINK = {
  href: "https://otieu.com/4/9720153",
  label: "Sponsored",
};

// Dummy Notifications Data (replace with real data)
const DUMMY_NOTIFICATIONS = [
  {
    id: "notif1",
    type: "update",
    title: "New Exchange Holiday Declared!",
    summary: "NSE/BSE will be closed on Nov 14, 2023 for Diwali.",
    details: "All trading segments (Equity, F&O, Currency, Commodity) will remain closed on Tuesday, November 14, 2023, on account of Diwali Balipratipada. Trading will resume on Wednesday, November 15, 2023. Plan your trades accordingly!",
    date: "2023-11-10",
    read: false,
  },
  {
    id: "notif2",
    type: "circular",
    title: "SEBI Circular on Margin Pledging",
    summary: "Changes effective from Dec 1, 2023.",
    details: "SEBI has issued a new circular regarding the revised framework for margin pledging and repledging of securities. All brokers are mandated to implement these changes by December 1, 2023. Please review the updated policy on our resources page.",
    date: "2023-11-05",
    read: false,
  },
  {
    id: "notif3",
    type: "feature",
    title: "New Algo Trading Feature Launched!",
    summary: "Automate your strategies with our new API features.",
    details: "We are excited to announce the launch of several new features in our Algo Trading platform. You can now set advanced stop-loss orders, implement trailing stop-loss, and integrate with custom indicators via our updated API. Check out the developer documentation for more details.",
    date: "2023-10-30",
    read: true,
  },
  {
    id: "notif4",
    type: "maintenance",
    title: "Scheduled System Maintenance",
    summary: "Sunday, Nov 12, 02:00 AM - 04:00 AM IST.",
    details: "Our systems will undergo scheduled maintenance on Sunday, November 12, 2023, from 02:00 AM to 04:00 AM IST. During this period, some services might be temporarily unavailable. We apologize for any inconvenience.",
    date: "2023-11-08",
    read: false,
  },
];


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return (
      storedDarkMode === "true" ||
      (storedDarkMode === null &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const [marketOpen, setMarketOpen] = useState(false);
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const notificationsRef = useRef(null); // Ref for the notifications panel
  const notificationButtonRef = useRef(null); // Ref for the notification button

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Effect to apply/remove dark class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Market status check (NSE/BSE: Mon-Fri, 9:15–15:30 IST)
  useEffect(() => {
    const checkMarketStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0=Sun, 6=Sat
      const hours = now.getUTCHours(); // Use UTC to avoid local timezone issues for IST check
      const minutes = now.getUTCMinutes();

      // Convert UTC to IST (+5:30)
     // Convert UTC to IST (+5:30)
let istHours = (hours + 5) % 24;
let istMinutes = minutes + 30;

if (istMinutes >= 60) {
  istHours = (istHours + 1) % 24;
  istMinutes -= 60;
}
const timeInISTMinutes = istHours * 60 + istMinutes;

   

      const marketOpenTime = 9 * 60 + 15; // 9:15 AM IST
      const marketCloseTime = 15 * 60 + 30; // 3:30 PM IST

      if (day >= 1 && day <= 5 && timeInISTMinutes >= marketOpenTime && timeInISTMinutes <= marketCloseTime) {
        setMarketOpen(true);
      } else {
        setMarketOpen(false);
      }
    };

    checkMarketStatus();
    const interval = setInterval(checkMarketStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Handle clicks outside the notifications panel to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(event.target)
      ) {
        setShowNotificationsPanel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const toggleNotificationsPanel = () => {
    setShowNotificationsPanel((prev) => !prev);
    // Optionally, mark all current notifications as read when panel opens
    if (!showNotificationsPanel) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };

  const openNotificationModal = (notification) => {
    setSelectedNotification(notification);
    setShowNotificationModal(true);
    setShowNotificationsPanel(false); // Close panel when modal opens
  };

  const closeNotificationModal = () => {
    setSelectedNotification(null);
    setShowNotificationModal(false);
  };

  // --- Reusable Navigation Link Component (Desktop) ---
const DesktopNavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative text-base font-medium whitespace-nowrap transition-colors duration-200 group
       ${isActive
        ? "text-blue-600 dark:text-blue-400"
        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
       }`
    }
  >
    {({ isActive }) => (
      <>
        {label}
        {/* Active link indicator */}
        <span
          className={`absolute bottom-[-6px] left-1/2 h-[3px] bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-300 transform -translate-x-1/2
            ${isActive ? "w-full" : "w-0 group-hover:w-2/3 group-hover:bg-blue-300 dark:group-hover:bg-blue-600"}`}
        ></span>
      </>
    )}
  </NavLink>
);


  // --- Reusable Mobile Navigation Link Component ---
  const MobileNavItem = ({ to, label, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-5 py-3 rounded-lg text-base font-semibold transition-all duration-200 ease-in-out
         ${isActive
            ? "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 shadow-sm"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
         }`
      }
    >
      {label}
    </NavLink>
  );

  // --- Notification Type Icon Helper ---
  const getNotificationIcon = (type) => {
    switch (type) {
      case "update": return <Bell size={18} className="text-blue-500 dark:text-blue-400" />;
      case "circular": return <Info size={18} className="text-purple-500 dark:text-purple-400" />;
      case "feature": return <Sun size={18} className="text-yellow-500 dark:text-yellow-400" />;
      case "maintenance": return <Moon size={18} className="text-red-500 dark:text-red-400" />; // Using Moon for maintenance, can be any other icon
      default: return <Info size={18} className="text-gray-500 dark:text-gray-400" />;
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-lg border-b border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out">
     <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo + Branding */}
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-extrabold text-gray-900 dark:text-white group"
            onClick={() => { setIsMenuOpen(false); setShowNotificationsPanel(false); }} // Close all on logo click
            aria-label="Paisa Fintech Home"
          >
            <NavbarLogo className="h-9 w-9 transition-transform duration-300 group-hover:scale-110" />
            <span className="transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Paisa Fintech
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {NAV_ITEMS.map((item) => (
              <DesktopNavItem key={item.to} to={item.to} label={item.label} />
            ))}
            <a
              href={SPONSORED_LINK.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 group flex items-center gap-1"
              aria-label="Sponsored Link"
              onClick={() => { setIsMenuOpen(false); setShowNotificationsPanel(false); }}
            >
              {SPONSORED_LINK.label}
              <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                AD
              </span>
            </a>
          </div>

          {/* Right section: Market Status, Notifications, Dark Mode, Mobile Menu */}
          <div className="flex items-center ml-auto md:ml-0 gap-3">
            {/* Market Status Badge */}
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                marketOpen
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {marketOpen ? "🟢 Market Open" : "🔴 Market Closed"}
            </span>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                ref={notificationButtonRef}
                onClick={toggleNotificationsPanel}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm hover:scale-110 active:scale-95 transition-all duration-300 p-2.5"
                aria-label="Notifications"
              >
                <Bell size={22} />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full animate-bounce-short">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notifications Pop-down Panel */}
              {showNotificationsPanel && (
                <div
                  ref={notificationsRef}
                  className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform opacity-100 scale-100 translate-y-0
                             origin-top-right animate-fade-in-down transition-all duration-300 ease-out"
                >
                  <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                    <button
                      onClick={() => setShowNotificationsPanel(false)}
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      aria-label="Close notifications panel"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`flex items-start gap-3 p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200
                                       ${!notif.read ? "bg-blue-50 dark:bg-gray-900/50" : ""}`}
                          onClick={() => openNotificationModal(notif)}
                        >
                          <div className="flex-shrink-0 mt-1">{getNotificationIcon(notif.type)}</div>
                          <div className="flex-grow">
                            <h4 className={`text-sm font-semibold ${!notif.read ? "text-blue-800 dark:text-blue-300" : "text-gray-900 dark:text-white"}`}>
                              {notif.title}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {notif.summary}
                            </p>
                            <span className="text-xxs text-gray-500 dark:text-gray-500 mt-1 block">
                              {new Date(notif.date).toLocaleDateString()}
                            </span>
                          </div>
                          {!notif.read && (
                            <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-1"></div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="p-4 text-center text-gray-500 dark:text-gray-400">No new notifications.</p>
                    )}
                  </div>
                  {/* Optional: "View All" button
                  {notifications.length > 0 && (
                    <div className="p-4 text-center border-t border-gray-100 dark:border-gray-700">
                      <Link
                        to="/notifications" // Link to a dedicated notifications page
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                        onClick={() => { setShowNotificationsPanel(false); setIsMenuOpen(false); }}
                      >
                        View All Notifications
                      </Link>
                    </div>
                  )} */}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm hover:scale-110 active:scale-95 transition-all duration-300 p-2.5"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={22} className="text-yellow-500" />
              ) : (
                <Moon size={22} className="text-blue-600" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden ml-1">
              <button
                onClick={() => { setIsMenuOpen(!isMenuOpen); setShowNotificationsPanel(false); }} // Close notifications panel when mobile menu toggles
                className="p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          } bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 absolute w-full left-0 shadow-lg`}
        >
          <div className="flex flex-col space-y-2 px-4 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <MobileNavItem
                key={item.to}
                to={item.to}
                label={item.label}
                onClick={() => { setIsMenuOpen(false); setShowNotificationsPanel(false); }}
              />
            ))}
            <a
              href={SPONSORED_LINK.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { setIsMenuOpen(false); setShowNotificationsPanel(false); }}
              className="block px-5 py-3 rounded-lg text-base font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
              aria-label="Sponsored Link"
            >
              {SPONSORED_LINK.label}
              <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-bold">
                AD
              </span>
            </a>
          </div>
        </div>
      </div>

{/* Notification Details Modal */}
{/* Notification Details Modal */}
{showNotificationModal && selectedNotification && (
  <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-[100] min-h-screen">
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in-up mx-4">
      <div className="flex justify-between items-center mb-5 sticky top-0 bg-white dark:bg-gray-800 z-10">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          {getNotificationIcon(selectedNotification.type)}
          {selectedNotification.title}
        </h3>
        <button
          onClick={closeNotificationModal}
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          aria-label="Close notification details"
        >
          <X size={24} />
        </button>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {new Date(selectedNotification.date).toLocaleDateString()}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        {selectedNotification.details}
      </p>
      <div className="flex justify-end">
        <button
          onClick={closeNotificationModal}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-semibold"
        >
          Got It!
        </button>
      </div>
    </div>
  </div>
)}

    </nav>
  );
};

export default Navbar;