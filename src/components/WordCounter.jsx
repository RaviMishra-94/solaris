// components/WordCounter.jsx
import { useState } from 'react';
import { Type, Hash } from 'lucide-react';

const WordCounter = () => {
  const [text, setText] = useState('');

  const getWordCount = () => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharacterCount = () => {
    return text.length;
  };

  const getCharacterCountNoSpaces = () => {
    return text.replace(/\s+/g, '').length;
  };

  const getLineCount = () => {
    return text.split('\n').length;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-3xl w-full mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center mb-8 transition-colors duration-200">Word Counter</h1>

          <div className="space-y-6">
            <div>
              <label htmlFor="content-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                Your Content
              </label>
              <textarea
                id="content-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 min-h-[250px] font-mono transition-colors duration-200"
                placeholder="Paste your content here to count words, characters, and lines..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 p-4 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors duration-200">
                <div className="flex items-center">
                  <Type className="mr-2 h-5 w-5" />
                  <span className="font-medium">Words</span>
                </div>
                <div className="text-2xl font-bold mt-2">{getWordCount()}</div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 p-4 rounded-lg border border-purple-200 dark:border-purple-800 transition-colors duration-200">
                <div className="flex items-center">
                  <Hash className="mr-2 h-5 w-5" />
                  <span className="font-medium">Characters</span>
                </div>
                <div className="text-2xl font-bold mt-2">{getCharacterCount()}</div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-4 rounded-lg border border-green-200 dark:border-green-800 transition-colors duration-200">
                <div className="flex items-center">
                  <Hash className="mr-2 h-5 w-5" />
                  <span className="font-medium">Characters (no spaces)</span>
                </div>
                <div className="text-2xl font-bold mt-2">{getCharacterCountNoSpaces()}</div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 p-4 rounded-lg border border-amber-200 dark:border-amber-800 transition-colors duration-200">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
                  </svg>
                  <span className="font-medium">Lines</span>
                </div>
                <div className="text-2xl font-bold mt-2">{getLineCount()}</div>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
              <p>This word counter tool gives you accurate character and word counts for your text. It also displays the number of characters without spaces and total line count.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;