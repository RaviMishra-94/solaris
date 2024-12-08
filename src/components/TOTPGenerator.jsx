// src/components/TOTPGenerator.jsx
import { useState } from 'react';
import axios from 'axios';

const TOTPGenerator = () => {
  const [secret, setSecret] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const generateTOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/generate_totp', { secret });
      setResult(response.data.totp);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      setResult('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl text-blue-600 text-center mb-6">TOTP Generator</h1>
        <div className="space-y-4">
          <input
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter secret key"
          />
          <button
            onClick={generateTOTP}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Generate TOTP
          </button>
          {result && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              TOTP: {result}
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Error: {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TOTPGenerator;