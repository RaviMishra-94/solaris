// components/WordCounter.jsx
import { useState } from 'react';

const WordCounter = () => {
  const [text, setText] = useState('');

  const getWordCount = () => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharacterCount = () => {
    return text.length;
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl text-blue-600 text-center mb-6">Word Counter</h1>
        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 min-h-[200px]"
            placeholder="Paste your content here..."
          />
          <div className="space-y-2">
            <div className="bg-blue-100 text-blue-800 p-4 rounded">
              Words: {getWordCount()}
            </div>
            <div className="bg-blue-100 text-blue-800 p-4 rounded">
              Characters: {getCharacterCount()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;