import { useState, useCallback } from 'react';
import axios from 'axios';
import { AlertCircle, Copy, CheckCircle } from 'lucide-react';

const TOTPGenerator = () => {
  const [secret, setSecret] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateTOTP = useCallback(async () => {
    if (!secret.trim()) {
      setError('Secret is required');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await axios.post('http://localhost:5000/api/generate-totp', {
        secret: secret.trim()
      });

      if (response.data.status) {
        setResult(response.data.totp);
      } else {
        setError('Failed to generate TOTP');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [secret]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  }, [result]);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl text-blue-600 text-center mb-6">TOTP Generator</h1>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter secret key"
              disabled={loading}
            />
          </div>

          <button
            onClick={generateTOTP}
            disabled={loading}
            className={`w-full font-bold py-2 px-4 rounded ${
              loading 
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {loading ? 'Generating...' : 'Generate TOTP'}
          </button>

          {result && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <div className="flex items-center justify-between">
                <span>TOTP: {result}</span>
                <button
                  onClick={copyToClipboard}
                  className="text-green-700 hover:text-green-800"
                  title={copied ? 'Copied!' : 'Copy to clipboard'}
                >
                  {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <div className="flex items-center">
                <AlertCircle size={20} className="mr-2" />
                <span>Error: {error}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TOTPGenerator;