// pages/Article.jsx
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

const Article = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const contentPath = searchParams.get('path');

  const [article, setArticle] = useState({
    title: slug.replace(/-/g, ' '),
    content: '',
    loading: true,
    error: null,
    lastUpdated: null
  });

  useEffect(() => {
    if (contentPath) {
      fetch(contentPath)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to load article content');
          }
          return response.text();
        })
        .then(text => {
          setArticle(prev => ({
            ...prev,
            content: text,
            loading: false,
            // Set a default last updated date if not found in the markdown
            lastUpdated: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }));
        })
        .catch(error => {
          console.error('Error loading article content:', error);
          setArticle(prev => ({
            ...prev,
            loading: false,
            error: error.message
          }));
        });
    } else {
      setArticle(prev => ({
        ...prev,
        loading: false,
        error: 'Article path not provided'
      }));
    }
  }, [contentPath]);

  // Function to extract title and last updated from markdown content
  useEffect(() => {
    if (article.content) {
      const lines = article.content.split('\n');
      let foundTitle = false;

      for (const line of lines) {
        // Extract title from heading
        if (!foundTitle && line.startsWith('# ')) {
          setArticle(prev => ({
            ...prev,
            title: line.replace('# ', '')
          }));
          foundTitle = true;
        }

        // Extract last updated date if format matches "Last updated: Month Day, Year"
        if (line.startsWith('Last updated:')) {
          setArticle(prev => ({
            ...prev,
            lastUpdated: line.replace('Last updated:', '').trim()
          }));
        }
      }
    }
  }, [article.content]);

  // Custom renderers for markdown content to apply Tailwind styles
  const customRenderers = {
    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-5 mb-2 text-gray-900 dark:text-white" {...props} />,
    h4: ({ node, ...props }) => <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white" {...props} />,
    p: ({ node, ...props }) => <p className="my-4 leading-relaxed text-gray-700 dark:text-gray-300" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
    li: ({ node, ...props }) => <li className="text-gray-700 dark:text-gray-300" {...props} />,
    a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline" {...props} />,
    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 text-gray-600 dark:text-gray-400" {...props} />,
    code: ({ node, inline, ...props }) =>
      inline
        ? <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm font-mono" {...props} />
        : <code className="block bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono" {...props} />,
    pre: ({ node, ...props }) => <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono" {...props} />,
    strong: ({ node, ...props }) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,
    em: ({ node, ...props }) => <em className="italic text-gray-800 dark:text-gray-200" {...props} />,
    img: ({ node, ...props }) => <img className="max-w-full h-auto rounded-lg my-4" {...props} alt={props.alt || ''} />,
    hr: ({ node, ...props }) => <hr className="my-6 border-gray-300 dark:border-gray-700" {...props} />,
    table: ({ node, ...props }) => <div className="overflow-x-auto my-4"><table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700" {...props} /></div>,
    thead: ({ node, ...props }) => <thead className="bg-gray-100 dark:bg-gray-800" {...props} />,
    tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-300 dark:divide-gray-700" {...props} />,
    tr: ({ node, ...props }) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-900" {...props} />,
    th: ({ node, ...props }) => <th className="px-4 py-2 text-left text-gray-900 dark:text-white font-semibold border border-gray-300 dark:border-gray-700" {...props} />,
    td: ({ node, ...props }) => <td className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700" {...props} />
  };

  // Calculate reading time based on content length
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const readingTime = article.content ? calculateReadingTime(article.content) : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="flex-grow">
        {/* Back navigation */}
        <div className="max-w-4xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
          <Link to="/resources" className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            <ArrowLeft size={20} className="mr-2" />
            Back to Resources
          </Link>
        </div>

        {/* Top ad space */}
        <div className="max-w-4xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Advertisement Space</p>
          </div>
        </div>

        {/* Main content */}
        <main className="max-w-4xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
          {article.loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : article.error ? (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6 text-red-700 dark:text-red-300">
              <h3 className="text-lg font-medium mb-2">Error Loading Article</h3>
              <p>{article.error}</p>
            </div>
          ) : (
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              {/* Article header */}
              <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
                  {article.lastUpdated && (
                    <div className="flex items-center mr-6 mb-2">
                      <Calendar size={16} className="mr-1" />
                      <span>Last updated: {article.lastUpdated}</span>
                    </div>
                  )}
                  <div className="flex items-center mb-2">
                    <Clock size={16} className="mr-1" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>

              {/* Article content */}
              <div className="px-6 py-6">
                <div className="prose-lg max-w-none">
                  <ReactMarkdown components={customRenderers}>{article.content}</ReactMarkdown>
                </div>
              </div>

              {/* Article footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="mb-2 sm:mb-0">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Share this article:
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button aria-label="Share on Facebook" className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/60 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                      </svg>
                    </button>
                    <button aria-label="Share on Twitter" className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/60 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </button>
                    <button aria-label="Share on LinkedIn" className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/60 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )}
        </main>

        {/* Bottom ad space */}
        <div className="max-w-4xl mx-auto mb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Advertisement Space</p>
          </div>
        </div>
      </div>

      {/* Footer with proper background */}
      <div className="bg-gray-50 dark:bg-gray-900 py-4">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Paisa Fintech. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Article;