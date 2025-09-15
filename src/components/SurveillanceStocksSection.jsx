import { useState, useEffect } from "react";
import { Bell, Search } from "lucide-react";

const SurveillanceStocksSection = () => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setStocks([
      { symbol: "RELIANCE", category: "ASM Stage 1", reason: "High volatility", date: "15 Sep 2025" },
      { symbol: "YESBANK", category: "GSM Stage 2", reason: "Unusual trading pattern", date: "15 Sep 2025" },
      { symbol: "ADANIPOWER", category: "ASM Stage 2", reason: "Price variation", date: "15 Sep 2025" },
    ]);
  }, []);

  // Filter stocks based on search term
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
        <header className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-3">
            📋 Surveillance Stocks
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-light max-w-3xl mx-auto">
            Stocks under surveillance for unusual trading patterns, volatility, or regulatory actions.
          </p>
        </header>

        {/* Search input */}
<div className="flex justify-center mb-10">
  <div className="max-w-xl w-full relative">
    <Search
      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
      size={20}
    />
    <input
      type="text"
      placeholder="Search by symbol or category..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 focus:border-blue-400 dark:focus:border-blue-600 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
    />
  </div>
</div>




        {/* Stocks Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredStocks.map((stock, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-950/30 p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stock.symbol}
                </h3>
                <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 font-semibold">
                  {stock.category}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{stock.reason}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Effective: {stock.date}</span>
                <Bell size={18} className="text-blue-500 dark:text-blue-400" />
              </div>
            </div>
          ))}
          {filteredStocks.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-full mt-6">
              No stocks match your search.
            </p>
          )}
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Updated daily. Monitor changes closely.</p>
        </footer>
      </div>
    </section>
  );
};

export default SurveillanceStocksSection;
