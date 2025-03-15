// pages/BrokerResources.jsx
import { useState, useEffect } from 'react';
import { Search, ExternalLink, Clock } from 'lucide-react';

const BrokerResources = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    // Load resources from the JSON file
    fetch('/data/broker-resources.json')
      .then(response => response.json())
      .then(data => {
        setResources(data.resources);
        setFilteredResources(data.resources);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading resources:', error);
        setLoading(false);
      });
  }, []);

  // Get unique categories from resources
  const categories = ['All', ...new Set(resources.flatMap(resource => resource.categories))];

  // Filter resources based on search term and active category
  useEffect(() => {
    let result = resources;

    // Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(resource =>
        resource.title.toLowerCase().includes(lowercasedTerm) ||
        resource.description.toLowerCase().includes(lowercasedTerm) ||
        resource.categories.some(category => category.toLowerCase().includes(lowercasedTerm))
      );
    }

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(resource =>
        resource.categories.includes(activeCategory)
      );
    }

    setFilteredResources(result);
  }, [searchTerm, activeCategory, resources]);

  // Format date to readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4 transition-colors duration-200">
            Trading Resources & Broker Guides
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-200">
            A curated collection of helpful resources, articles, and guides for traders. Learn about different brokers, trading strategies, and market analysis.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 transition-colors duration-200" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400 transition-colors duration-200">
            <p>No resources found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700 h-full"
              >
                {/* Resource Thumbnail */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={resource.thumbnailUrl || '/images/default-resource.jpg'}
                    alt={resource.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src = '/images/default-resource.jpg';
                    }}
                  />
                </div>

                {/* Resource Content */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {resource.categories.map((category, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-200">
                    {resource.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-200 line-clamp-3">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{formatDate(resource.publishedDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <ExternalLink size={14} className="mr-1" />
                      <span className="truncate max-w-[140px]">
                        {new URL(resource.url).hostname.replace('www.', '')}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrokerResources;