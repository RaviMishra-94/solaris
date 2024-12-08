// src/components/EncodeDecodeTools.jsx
import { useState } from 'react';
import axios from 'axios';

const EncodeDecodeTools = () => {
  const [text, setText] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [base64Result, setBase64Result] = useState('');
  const [algorithm, setAlgorithm] = useState('md5');
  const [error, setError] = useState('');

  const generateHash = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/generate_hash', {
        text,
        algorithm
      });
      setHashResult(response.data.hash);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error generating hash');
      setHashResult('');
    }
  };

  const handleEncode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/encode_base64', { text });
      setBase64Result(response.data.encoded);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error encoding text');
      setBase64Result('');
    }
  };

  const handleDecode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/decode_base64', { text });
      setBase64Result(response.data.decoded);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error decoding text');
      setBase64Result('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-2xl text-blue-600 text-center">Hash and Base64 Tool</h1>

        <div className="space-y-4">
          <h2 className="text-xl text-gray-700">Hash Generator</h2>
          <textarea
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to hash"
          />
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="md5">MD5</option>
            <option value="sha1">SHA-1</option>
            <option value="sha256">SHA-256</option>
            <option value="sha512">SHA-512</option>
          </select>
          <button
            onClick={generateHash}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Generate Hash
          </button>
          {hashResult && (
            <div className="bg-gray-100 p-3 rounded break-all">
              {hashResult}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl text-gray-700">Base64 Encoder/Decoder</h2>
          <textarea
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to encode/decode"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleEncode}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Encode
            </button>
            <button
              onClick={handleDecode}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Decode
            </button>
          </div>
          {base64Result && (
            <div className="bg-gray-100 p-3 rounded break-all">
              {base64Result}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default EncodeDecodeTools;