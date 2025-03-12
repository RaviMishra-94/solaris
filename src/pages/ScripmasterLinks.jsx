// pages/ScriptmasterLinks.jsx
import { useState } from 'react';
import { Search, ExternalLink, Clock, Download, X } from 'lucide-react';

const ScriptmasterLinks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [currentLink, setCurrentLink] = useState(null);

  const brokerLinks = [
    {
      name: 'Angel One',
      category: 'Full Service Broker',
      links: [
        {
          title: 'All Exchanges & Segments Scripmaster',
          url: 'https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json',
          lastUpdated: '2025-03-13',
          format: 'JSON'
        },
        {
          title: 'All Exchanges & Segments Scripmaster',
          url: 'https://drive.google.com/file/d/1LgYvmbfm3IMMbqfHGWniI0yXR75TMldt/view?usp=sharing',
          lastUpdated: '2025-03-13',
          format: 'SQLITE(.db)'
        }
      ]
    },
    {
      name: 'ICICI Direct',
      category: 'Bank Broker',
      links: [
        {
          title: 'All Exchanges & Segments Scripmaster',
          url: 'https://directlink.icicidirect.com/NewSecurityMaster/SecurityMaster.zip',
          lastUpdated: '2025-03-13',
          format: 'ZIP(CSV)'
        }
      ]
    },
    {
      name: 'Upstox',
      category: 'Discount Broker',
      links: [
        {
          title: 'NSE Scriptmaster',
          url: '#',
          lastUpdated: '2024-12-08',
          format: 'CSV'
        },
        {
          title: 'BSE Scriptmaster',
          url: '#',
          lastUpdated: '2024-12-08',
          format: 'CSV'
        }
      ]
    },
    {
      name: 'Zerodha',
      category: 'Full Service Broker',
      links: [
        {
          title: 'Equity Scriptmaster',
          url: '#',
          lastUpdated: '2024-12-08',
          format: 'CSV'
        },
        {
          title: 'F&O Scriptmaster',
          url: '#',
          lastUpdated: '2024-12-08',
          format: 'CSV'
        }
      ]
    }
  ];

  const filteredBrokers = brokerLinks.filter(broker =>
    broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    broker.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLinkClick = (e, link) => {
    if (link.url === '#') {
      e.preventDefault();
      setCurrentLink(link);
      setShowDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black mb-4">
            Broker Scriptmaster Repository
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access the latest scriptmaster files from various brokers. Files are available in multiple formats.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by broker name or category..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBrokers.map((broker) => (
            <div key={broker.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-black">{broker.name}</h2>
                <p className="text-sm text-gray-500">{broker.category}</p>
              </div>

              <div className="space-y-3">
                {broker.links.map((link) => (
                  <div key={link.title} className="group">
                    <a
                      href={link.url}
                      target={link.url !== '#' ? "_blank" : ""}
                      rel={link.url !== '#' ? "noopener noreferrer" : ""}
                      className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                      onClick={(e) => handleLinkClick(e, link)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Download size={18} className="text-gray-600" />
                          <span className="text-gray-900">{link.title}</span>
                        </div>
                        <ExternalLink size={18} className="text-gray-400 group-hover:text-black transition-colors duration-200" />
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>Updated: {link.lastUpdated}</span>
                        <span className="ml-3 px-2 py-1 bg-gray-200 rounded text-xs">
                          {link.format}
                        </span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            More will be added soon.
          </p>
        </div>
      </div>

      {/* Coming Soon Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-black">Coming Soon</h3>
              <button
                onClick={() => setShowDialog(false)}
                className="text-gray-500 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              {currentLink && `The ${currentLink.title} for this broker will be available soon. We are working on making this data accessible.`}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScriptmasterLinks;