import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Home.jsx - uses Yahoo Finance but with an optional CORS proxy for development/testing.
// WARNING: Using public CORS proxies is INSECURE and UNRELIABLE. Use only for development/experimentation.
// Recommended: deploy a tiny serverless proxy or use a CORS-enabled API for production.

const symbols = {
  nifty50: '^NSEI',
  sensex: '^BSESN',
  bankNifty: '^NSEBANK',
  finNifty: '^CNXFIN'
};

const initialLoadingState = Object.fromEntries(
  Object.keys(symbols).map((k) => [k, { value: 0, change: 0, percentChange: 0, loading: true }])
);

// Toggle this to true to route requests through a CORS proxy (dev only)
const USE_CORS_PROXY = true;

// Default public proxy - dev only. Replace if you prefer another service.
// Example: https://api.allorigins.win/raw?url=ENCODED_URL
const CORS_PROXY_PREFIX = 'https://api.allorigins.win/raw?url='; // lightweight option

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [marketData, setMarketData] = useState(initialLoadingState);
  const [lastUpdated, setLastUpdated] = useState(null);
  const abortRef = useRef(null);

  // Helper: whether it's market hours in IST (9:15 - 15:30, Mon-Fri)
  const isMarketHours = () => {
    const now = new Date();
    const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const day = ist.getDay(); // 0 = Sun, 1 = Mon ...
    const hours = ist.getHours();
    const minutes = ist.getMinutes();

    if (day < 1 || day > 5) return false;
    // after 9:15
    if (hours < 9 || (hours === 9 && minutes < 15)) return false;
    // before 15:30
    if (hours > 15 || (hours === 15 && minutes > 30)) return false;
    return true;
  };

  // Helper to build the fetch URL — optionally wrap in CORS proxy
  const buildFetchUrl = (symbol) => {
    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
      symbol
    )}?interval=1m&range=1d`;

    if (USE_CORS_PROXY) {
      // encode the target url and prefix with the proxy
      return `${CORS_PROXY_PREFIX}${encodeURIComponent(yahooUrl)}`;
    }
    return yahooUrl;
  };

  // Fetch single symbol from Yahoo endpoint and parse current price
  const fetchSymbol = async (symbol, signal) => {
    const url = buildFetchUrl(symbol);

    const res = await fetch(url, {
      method: 'GET',
      // When using a proxy like allorigins, you generally don't need custom headers.
      // Note: adding User-Agent in browser fetch usually has no effect.
      signal
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // If using allorigins.win/raw the response body is the proxied JSON directly.
    // If you use a different proxy that wraps the response (e.g. returns { contents: '...' }), you'll need to adapt parsing.
    const json = await res.json();

    // With proxies you might receive the Yahoo JSON directly, or a wrapper object.
    // Try to detect both cases:
    const chartResult =
      json?.chart?.result?.[0] // direct Yahoo response
      || (json?.contents ? (() => {
        // some proxies return { contents: '<raw-json-as-string>' }
        try {
          const parsed = JSON.parse(json.contents);
          return parsed?.chart?.result?.[0];
        } catch (e) {
          return null;
        }
      })() : null);

    if (!chartResult) throw new Error('Invalid response (no chart result)');

    const meta = chartResult.meta;
    const currentPrice = typeof meta.regularMarketPrice === 'number' ? meta.regularMarketPrice : meta.previousClose;
    const previousClose = meta.previousClose || currentPrice;
    const change = currentPrice - previousClose;
    const percentChange = previousClose === 0 ? 0 : (change / previousClose) * 100;

    return {
      value: parseFloat(currentPrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      percentChange: parseFloat(percentChange.toFixed(2)),
      loading: false
    };
  };

  // Fetch all symbols in parallel and update state
  const fetchMarketData = async () => {
    if (abortRef.current) {
      // Abort any previous inflight fetches
      try { abortRef.current.abort(); } catch (e) {}
    }
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const entries = await Promise.all(
        Object.entries(symbols).map(async ([key, symbol]) => {
          try {
            const data = await fetchSymbol(symbol, controller.signal);
            return [key, data];
          } catch (err) {
            console.warn(`Failed fetching ${key} (${symbol}):`, err.message || err);
            // keep prior value but mark not loading
            return [key, { ...(marketData[key] || { value: 0, change: 0, percentChange: 0 }), loading: false }];
          }
        })
      );

      // Convert to object and set
      const newData = Object.fromEntries(entries);
      setMarketData((prev) => ({ ...prev, ...newData }));
      setLastUpdated(new Date());
    } catch (err) {
      if (err.name === 'AbortError') return; // expected when aborting
      console.error('Failed to fetch market data:', err);
    } finally {
      abortRef.current = null;
    }
  };

  useEffect(() => {
    // clock
    const clock = setInterval(() => setTime(new Date()), 1000);

    // initial fetch on mount
    fetchMarketData();

    // market-hour timer: poll fast during market hours
    const fastPoll = setInterval(() => {
      if (isMarketHours()) fetchMarketData();
    }, 30000); // every 30s during market hours

    // fallback slow poll: every 5 minutes always
    const slowPoll = setInterval(() => fetchMarketData(), 300000);

    return () => {
      clearInterval(clock);
      clearInterval(fastPoll);
      clearInterval(slowPoll);
      if (abortRef.current) try { abortRef.current.abort(); } catch (e) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (date, timeZone) =>
    new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone,
      hour12: false
    }).format(date);

  const formatDate = (date, timeZone) =>
    new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone
    }).format(date);

  // small UI components
  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="group relative flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      {children}
    </Link>
  );

  const MarketIndexCard = ({ name, data }) => {
    if (data.loading) {
      return (
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow flex flex-col items-center">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">{name}</h3>
          <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-24 mb-2 rounded"></div>
          <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-20 rounded"></div>
        </div>
      );
    }

    const isPositive = data.change >= 0;
    const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
    const arrow = isPositive ? '▲' : '▼';

    return (
      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow flex flex-col items-center relative">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">{name}</h3>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {data.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="flex items-center text-sm">
          <span className={`${changeColor} font-medium mr-1`}>{arrow} {Math.abs(data.change).toFixed(2)}</span>
          <span className={`${changeColor} text-xs`}>({data.percentChange >= 0 ? '+' : ''}{data.percentChange.toFixed(2)}%)</span>
        </div>
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 max-w-6xl w-full transform transition-all duration-300 ease-out">
        <header className="mb-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">PaisaFintech</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">Your real-time market insights and essential trading tools.</p>
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

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Market Overview</h2>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST' : '—'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MarketIndexCard name="NIFTY 50" data={marketData.nifty50} />
            <MarketIndexCard name="SENSEX" data={marketData.sensex} />
            <MarketIndexCard name="BANKNIFTY" data={marketData.bankNifty} />
            <MarketIndexCard name="FINNIFTY" data={marketData.finNifty} />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Quick Tools</h2>
          <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <NavLink to="/scripmaster">Broker Scriptmaster</NavLink>
            <NavLink to="/totp">TOTP Generator</NavLink>
            <NavLink to="/word-counter">Word Counter</NavLink>
            <NavLink to="/surveillance-stocks">Surveillance Stocks</NavLink>
          </nav>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Latest News & Updates</h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-inner">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">●</span>
                <p className="text-gray-700 dark:text-gray-300 text-sm"><span className="font-semibold">RBI Rate Decision:</span> Markets await key announcements this week. <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">5 min ago</span></p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">●</span>
                <p className="text-gray-700 dark:text-gray-300 text-sm"><span className="font-semibold">Tech Stocks Surge:</span> Global tech sector shows strong recovery. <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">30 min ago</span></p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">●</span>
                <p className="text-gray-700 dark:text-gray-300 text-sm"><span className="font-semibold">Crude Oil Prices:</span> Volatility expected due to geopolitical tensions. <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">1 hour ago</span></p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">●</span>
                <p className="text-gray-700 dark:text-gray-300 text-sm"><span className="font-semibold">Earnings Season:</span> Major Indian companies report Q3 results. <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">2 hours ago</span></p>
              </li>
            </ul>
          </div>
        </section>

        <footer className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} PaisaFintech. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
