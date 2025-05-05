// pages/BrokerResources.jsx
import { useState, useEffect } from 'react';
import { Search, ExternalLink, Clock } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const BrokerResources = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
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

  const categories = ['All', ...new Set(resources.flatMap(resource => resource.categories))];

  useEffect(() => {
    let result = resources;

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(resource =>
        resource.title.toLowerCase().includes(lowercasedTerm) ||
        resource.description.toLowerCase().includes(lowercasedTerm) ||
        resource.categories.some(category => category.toLowerCase().includes(lowercasedTerm))
      );
    }

    if (activeCategory !== 'All') {
      result = result.filter(resource => resource.categories.includes(activeCategory));
    }

    setFilteredResources(result);
  }, [searchTerm, activeCategory, resources]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Create a URL-friendly slug from the title
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
            Trading Resources & Broker Guides
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated collection of helpful resources, articles, and guides for traders.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
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

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            <p>No resources found.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource, index) => (
              <Link
                key={index}
                to={`/article/${createSlug(resource.title)}?path=${encodeURIComponent(resource.contentPath)}`}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg border dark:border-gray-700 transition"
              >
                <img
                  src={resource.thumbnailUrl || '/images/default-resource.jpg'}
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.target.src = '/images/default-resource.jpg'; }}
                />
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {resource.categories.map((cat, i) => (
                      <span key={i} className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{resource.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{resource.description}</p>
                  <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center"><Clock size={14} className="mr-1" />{formatDate(resource.publishedDate)}</span>
                    <span className="flex items-center"><ExternalLink size={14} className="mr-1" />{resource.author || 'Trading Tech Team'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrokerResources;