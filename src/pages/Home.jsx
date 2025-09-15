import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [time, setTime] = useState(new Date());
  const [marketData, setMarketData] = useState({
    nifty50: { value: 19876.50, change: +85.20, percentChange: +0.43 },
    sensex: { value: 66890.34, change: +290.75, percentChange: +0.44 },
    bankNifty: { value: 46210.15, change: -120.50, percentChange: -0.26 },
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);

    // Simulate real-time market data updates
    const marketTimer = setInterval(() => {
      setMarketData((prevData) => {
        const newData = {};
        for (const key in prevData) {
          const randomChange = (Math.random() - 0.5) * 50; // Random change between -25 and +25
          const newChange = parseFloat((prevData[key].change + randomChange / 10).toFixed(2));
          const newValue = parseFloat((prevData[key].value + randomChange).toFixed(2));
          const newPercentChange = parseFloat(((newChange / (newValue - newChange)) * 100).toFixed(2));

          newData[key] = {
            value: newValue,
            change: newChange,
            percentChange: newPercentChange,
          };
        }
        return newData;
      });
    }, 5000); // Update market data every 5 seconds

    return () => {
      clearInterval(timer);
      clearInterval(marketTimer);
    };
  }, []);

  const formatTime = (date, timeZone) =>
    new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone,
      hour12: false,
    }).format(date);

  const formatDate = (date, timeZone) =>
    new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone,
    }).format(date);

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="group relative flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      {children}
    </Link>
  );

  const MarketIndexCard = ({ name, data }) => {
    const isPositive = data.change >= 0;
    const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
    const arrow = isPositive ? '▲' : '▼';

    return (
      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow flex flex-col items-center">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">{name}</h3>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {data.value.toLocaleString()}
        </div>
        <div className="flex items-center text-sm">
          <span className={`${changeColor} font-medium mr-1`}>{arrow} {Math.abs(data.change).toFixed(2)}</span>
          <span className={`${changeColor} text-xs`}>({Math.abs(data.percentChange).toFixed(2)}%)</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 max-w-6xl w-full transform transition-all duration-300 ease-out">
        {/* Header and Live Clocks */}
        <header className="mb-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              PaisaFintech
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Your real-time market insights and essential trading tools.
            </p>
          </div>

          <div className="flex space-x-4">
            <div className="text-right">
              <h3 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold">UTC</h3>
              <div className="text-2xl font-mono text-gray-800 dark:text-gray-200">{formatTime(time, 'UTC')}</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">{formatDate(time, 'UTC')}</div>
            </div>
            <div className="text-right">
              <h3 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold">IST</h3>
              <div className="text-2xl font-mono text-gray-800 dark:text-gray-200">{formatTime(time, 'Asia/Kolkata')}</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">{formatDate(time, 'Asia/Kolkata')}</div>
            </div>
          </div>
        </header>

        {/* Market Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Market Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MarketIndexCard name="NIFTY 50" data={marketData.nifty50} />
            <MarketIndexCard name="SENSEX" data={marketData.sensex} />
            <MarketIndexCard name="BANKNIFTY" data={marketData.bankNifty} />
          </div>
        </section>

        {/* Quick Tools & Navigation */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Quick Tools</h2>
          <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <NavLink to="/scripmaster">Broker Scriptmaster</NavLink>
            <NavLink to="/totp">TOTP Generator</NavLink>
            <NavLink to="/word-counter">Word Counter</NavLink>
            <NavLink to="/surveillance-stocks">Surveillance Stocks</NavLink> {/* New Dummy Link */}

          </nav>
        </section>

        {/* Latest News & Updates */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Latest News & Updates</h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-inner">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">●</span>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <span className="font-semibold">RBI Rate Decision:</span> Markets await key announcements this week. <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">5 min ago</span>
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">●</span>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <span className="font-semibold">Tech Stocks Surge:</span> Global tech sector shows strong recovery. <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">30 min ago</span>
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">●</span>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <span className="font-semibold">Crude Oil Prices:</span> Volatility expected due to geopolitical tensions. <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">1 hour ago</span>
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">●</span>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <span className="font-semibold">Earnings Season:</span> Major Indian companies report Q3 results. <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">2 hours ago</span>
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} PaisaFintech. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Home;