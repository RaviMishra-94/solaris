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
      name: 'Aliceblue',
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
      name: 'Fyers',
      links: [
        {
          title: 'All Exchanges & Segments Scripmaster',
          url: 'https://drive.google.com/file/d/1y3HRRl8200DQByvR6D9x7OaWULFdCCR9/view?usp=sharing',
          lastUpdated: '2025-03-13',
          format: 'SQLITE(.db)'
        },
        {
          title: 'Exchange-Specific Scriptmasters',
          formats: [
            {
              name: 'NSE - Currency Derivatives (CSV)',
              url: 'https://public.fyers.in/sym_details/NSE_CD.csv'
            },
            {
              name: 'NSE - Equity Derivatives (CSV)',
              url: 'https://public.fyers.in/sym_details/NSE_FO.csv'
            },
            {
              name: 'NSE - Commodity (CSV)',
              url: 'https://public.fyers.in/sym_details/NSE_COM.csv'
            },
            {
              name: 'NSE - Capital Market (CSV)',
              url: 'https://public.fyers.in/sym_details/NSE_CM.csv'
            },
            {
              name: 'BSE - Capital Market (CSV)',
              url: 'https://public.fyers.in/sym_details/BSE_COM.csv'
            },
            {
              name: 'BSE - Equity Derivatives (CSV)',
              url: 'https://public.fyers.in/sym_details/BSE_FO.csv'
            },
            {
              name: 'MCX - Commodity (CSV)',
              url: 'https://public.fyers.in/sym_details/MCX_COM.csv'
            }
          ],
          lastUpdated: '2025-03-15'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-3">
            Broker Scriptmaster Repository
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-light max-w-3xl mx-auto">
            Access the latest scriptmaster files from various brokers. Files are available in multiple formats, with SQLite(.db) being ideal for quick queries and algorithmic trading.
          </p>
        </header>

        <div className="mb-10 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search by broker name or category..."
              className="w-full pl-12 pr-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-400 dark:focus:border-blue-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredBrokers.map((broker) => (
            <div key={broker.name} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-950/30 p-7 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1">
              <div className="mb-5">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{broker.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{broker.category}</p>
              </div>

              <div className="space-y-4">
                {broker.links.map((link) => (
                  <div key={link.title} className="group">
                    <a
                      href={link.url}
                      target={link.url !== '#' && !link.formats ? "_blank" : ""}
                      rel={link.url !== '#' && !link.formats ? "noopener noreferrer" : ""}
                      className="block p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md"
                      onClick={(e) => handleLinkClick(e, link, broker.name)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {link.formats ? (
                            <List size={20} className="text-blue-600 dark:text-blue-400" />
                          ) : (
                            <Download size={20} className="text-green-600 dark:text-green-400" />
                          )}
                          <span className="text-gray-900 dark:text-gray-100 font-medium">{link.title}</span>
                        </div>
                        <ExternalLink size={18} className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                        <Clock size={14} className="mr-1" />
                        <span>Updated: {link.lastUpdated}</span>
                        {link.format && (
                          <span className="ml-3 px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-md text-xs text-blue-800 dark:text-blue-200 font-semibold">
                            {link.format}
                          </span>
                        )}
                        {link.formats && (
                          <span className="ml-3 px-2 py-1 bg-indigo-100 dark:bg-indigo-900 rounded-md text-xs text-indigo-800 dark:text-indigo-200 font-semibold">
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

        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>More will be added soon.</p>
          <p className="mt-2 text-xs">Developed with ❤️ by Paisa Fintech Team</p>
        </footer>
      </div>

      {/* Coming Soon Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700 transform scale-95 animate-fade-in-up">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{dialogTitle}</h3>
              <button
                onClick={() => setShowDialog(false)}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-7 text-lg">
              {currentLink && `The "${currentLink.title}" for this broker will be available soon. We are actively working to make this data accessible.`}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDialog(false)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formats Dialog */}
      {showFormatsDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700 transform scale-95 animate-fade-in-up">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{dialogTitle}</h3>
              <button
                onClick={() => setShowFormatsDialog(false)}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {currentFormats && currentFormats.map((format, index) => (
                <a
                  key={index}
                  href={format.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <Download size={20} className="text-purple-600 dark:text-purple-400" />
                    <span className="text-gray-900 dark:text-gray-100 font-medium">{format.name}</span>
                  </div>
                  <ExternalLink size={18} className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200" />
                </a>
              ))}
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setShowFormatsDialog(false)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-semibold"
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