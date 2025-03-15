// pages/ScriptmasterLinks.jsx
import { useState } from 'react';
import { Search, ExternalLink, Clock, Download, X, List } from 'lucide-react';

const ScriptmasterLinks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showFormatsDialog, setShowFormatsDialog] = useState(false);
  const [currentLink, setCurrentLink] = useState(null);
  const [currentFormats, setCurrentFormats] = useState(null);
  const [dialogTitle, setDialogTitle] = useState('');

  const brokerLinks = [
    {
      name: 'Alicblue',
      links: [
        {
          title: 'All Exchanges & Segments Scripmaster',
          url: 'https://drive.google.com/file/d/1-UFYCi8lsfQgtbgpuVW_trey7QGMwcDk/view?usp=sharing',
          lastUpdated: '2025-03-13',
          format: 'SQLITE(.db)'
        },
        {
          title: 'Exchange-Specific Scriptmasters',
          formats: [
            {
              name: 'All Exchanges (JSON)',
              url: 'https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json'
            },
            {
              name: 'NSE (CSV)',
              url: 'https://v2api.aliceblueonline.com/restpy/static/contract_master/NSE.csv'
            },
            {
              name: 'BSE (CSV)',
              url: 'https://v2api.aliceblueonline.com/restpy/static/contract_master/BSE.csv'
            },
            {
              name: 'BSE F&O (CSV)',
              url: 'https://v2api.aliceblueonline.com/restpy/static/contract_master/BFO.csv'
            },
            {
              name: 'MCX (CSV)',
              url: 'https://v2api.aliceblueonline.com/restpy/static/contract_master/MCX.csv'
            },
            {
              name: 'Currency Derivatives (CSV)',
              url: 'https://v2api.aliceblueonline.com/restpy/static/contract_master/CDS.csv'
            },
            {
              name: 'NSE F&O (CSV)',
              url: 'https://v2api.aliceblueonline.com/restpy/static/contract_master/NFO.csv'
            },
            {
              name: 'BSE Currency Derivatives (CSV)',
              url: 'https://v2api.aliceblueonline.com/restpy/static/contract_master/BCD.csv'
            }
          ],
          lastUpdated: '2025-03-15'
        }
      ]
    },
    {
      name: 'Angel One',
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
      name: 'Dhan',
      links: [
        {
          title: 'All Exchanges & Segments Scripmaster',
          url: 'https://images.dhan.co/api-data/api-scrip-master.csv',
          lastUpdated: '2025-03-13',
          format: 'CSV'
        },
        {
          title: 'All Exchanges & Segments Scripmaster',
          url: 'https://drive.google.com/file/d/1WlUhqS_DY5M-ip5k9wCKWSnULchtqDUk/view?usp=sharing',
          lastUpdated: '2025-03-13',
          format: 'SQLITE(.db)'
        }
      ]
    },
    {
      name: 'ICICI Direct',
      links: [
        {
          title: 'All Exchanges & Segments Scripmaster',
          url: 'https://directlink.icicidirect.com/NewSecurityMaster/SecurityMaster.zip',
          lastUpdated: '2025-03-13',
          format: 'ZIP(CSV)'
        },
        {
          title: 'All Exchanges & Segments Scripmaster',
          url: 'https://drive.google.com/file/d/13FLd0EFilmvrBJ_06tsLfzW1wfj44sJW/view?usp=sharing',
          lastUpdated: '2025-03-13',
          format: 'SQLITE(.db)'
        }
      ]
    },
    {
      name: 'IIFL',
      links: [
        {
          title: 'All Exchanges & Segments Scripmaster',
          url: 'https://drive.google.com/file/d/1j163DOCHSLw0firIAuZJl4Vv3kWkE0E5/view?usp=sharing',
          lastUpdated: '2025-03-13',
          format: 'SQLITE(.db)'
        },
        {
          title: 'Exchange-Specific Scriptmasters',
          formats: [
            {
              name: 'NSE Equity (JSON)',
              url: 'https://api.iiflcapital.com/v1/contractfiles/NSEEQ.json'
            },
            {
              name: 'BSE Equity (JSON)',
              url: 'https://api.iiflcapital.com/v1/contractfiles/BSEEQ.json'
            }
          ],
          lastUpdated: '2025-03-15'
        }
      ]
    },
    {
      name: 'Kotak',
      links: [
        {
          title: 'All Exchanges & Segments Scripmaster',
          url: 'https://gw-napi.kotaksecurities.com/Files/1.0/masterscrip/v2/file-paths',
          lastUpdated: '2025-03-13',
          format: 'CSV (Need authorization to download)'
        },
        {
          title: 'All Exchanges & Segments Scripmaster',
          url: 'https://drive.google.com/file/d/1ZgmzrmsWnoj3ePluYp98gfwBGWXWjG5T/view?usp=sharing',
          lastUpdated: '2025-03-13',
          format: 'SQLITE(.db)'
        }
      ]
    },
    {
      name: 'Upstox',
      links: [
        {
          title: 'All Exchanges & Segments Scripmaster',
          url: 'https://assets.upstox.com/market-quote/instruments/exchange/complete.json.gz',
          lastUpdated: '2025-03-13',
          format: 'ZIP(JSON)'
        },
        {
          title: 'All Exchanges & Segments Scripmaster',
          url: 'https://drive.google.com/file/d/1iXZq1dpNRChPFpj6xWYGuMxaDqsLGxT1/view?usp=sharing',
          lastUpdated: '2025-03-13',
          format: 'SQLITE(.db)'
        }
      ]
    }
  ];

  const filteredBrokers = brokerLinks.filter(broker =>
    broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (broker.category && broker.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleLinkClick = (e, link, brokerName) => {
    if (link.url === '#') {
      e.preventDefault();
      setCurrentLink(link);
      setDialogTitle('Coming Soon');
      setShowDialog(true);
    } else if (link.formats) {
      e.preventDefault();
      setCurrentFormats(link.formats);
      setDialogTitle(`${brokerName} - ${link.title}`);
      setShowFormatsDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4 transition-colors duration-200">
            Broker Scriptmaster Repository
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-200">
            Access the latest scriptmaster files from various brokers. Files are available in multiple formats.
            SQLite(.db) files are best for quick queries and can be used in Algos.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 transition-colors duration-200" size={20} />
            <input
              type="text"
              placeholder="Search by broker name or category..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBrokers.map((broker) => (
            <div key={broker.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30 p-6 hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700 transition-colors">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-black dark:text-white transition-colors duration-200">{broker.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">{broker.category}</p>
              </div>

              <div className="space-y-3">
                {broker.links.map((link) => (
                  <div key={link.title} className="group">
                    <a
                      href={link.url}
                      target={link.url !== '#' && !link.formats ? "_blank" : ""}
                      rel={link.url !== '#' && !link.formats ? "noopener noreferrer" : ""}
                      className="block p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                      onClick={(e) => handleLinkClick(e, link, broker.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {link.formats ? (
                            <List size={18} className="text-gray-600 dark:text-gray-300 transition-colors duration-200" />
                          ) : (
                            <Download size={18} className="text-gray-600 dark:text-gray-300 transition-colors duration-200" />
                          )}
                          <span className="text-gray-900 dark:text-gray-100 transition-colors duration-200">{link.title}</span>
                        </div>
                        {link.formats ? (
                          <ExternalLink size={18} className="text-gray-400 group-hover:text-black dark:text-gray-500 dark:group-hover:text-white transition-colors duration-200" />
                        ) : (
                          <ExternalLink size={18} className="text-gray-400 group-hover:text-black dark:text-gray-500 dark:group-hover:text-white transition-colors duration-200" />
                        )}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 flex-wrap transition-colors duration-200">
                        <Clock size={14} className="mr-1" />
                        <span>Updated: {link.lastUpdated}</span>
                        {link.format && (
                          <span className="ml-3 px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs text-gray-800 dark:text-gray-200 transition-colors duration-200">
                            {link.format}
                          </span>
                        )}
                        {link.formats && (
                          <span className="ml-3 px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs text-gray-800 dark:text-gray-200 transition-colors duration-200">
                            Multiple Formats
                          </span>
                        )}
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
          <p>
            More will be added soon.
          </p>
        </div>
      </div>

      {/* Coming Soon Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-black dark:text-white transition-colors duration-200">{dialogTitle}</h3>
              <button
                onClick={() => setShowDialog(false)}
                className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">
              {currentLink && `The ${currentLink.title} for this broker will be available soon. We are working on making this data accessible.`}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formats Dialog */}
      {showFormatsDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-black dark:text-white transition-colors duration-200">{dialogTitle}</h3>
              <button
                onClick={() => setShowFormatsDialog(false)}
                className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {currentFormats && currentFormats.map((format, index) => (
                <a
                  key={index}
                  href={format.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <Download size={16} className="text-gray-600 dark:text-gray-300 transition-colors duration-200" />
                    <span className="text-gray-900 dark:text-gray-100 transition-colors duration-200">{format.name}</span>
                  </div>
                  <ExternalLink size={16} className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors duration-200" />
                </a>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowFormatsDialog(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
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