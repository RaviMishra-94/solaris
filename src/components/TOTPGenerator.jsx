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
      const response = await axios.post('https://api.paisafintech.com/paisafintech/api/generate-totp', {
        secret: secret.trim()
      });
      if (response.data && response.data.totp) setResult(response.data.totp);
      else setError('Failed to generate TOTP');
    } catch (err) {
      setError(err.response?.data?.error || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [secret]);

  const copyToClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = result;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          const successful = document.execCommand('copy');
          if (!successful) throw new Error('Copy command failed');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch {
      setError('Failed to copy to clipboard');
    }
  }, [result]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-2xl w-full mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
            🔐 TOTP Generator
          </h1>

          <div className="space-y-6">
            {/* Secret Input */}
            <div>
              <label
                htmlFor="totp-secret"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Secret Key
              </label>
              <input
                id="totp-secret"
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Enter TOTP secret key"
                disabled={loading}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm transition-all duration-300"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateTOTP}
              disabled={loading || !secret.trim()}
              className={`w-full font-semibold py-3 rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${loading || !secret.trim()
                  ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed opacity-70'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              {loading ? 'Generating...' : 'Generate TOTP'}
            </button>

            {/* Result Box */}
            {result && (
              <div className="bg-white dark:bg-gray-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-6 py-4 rounded-2xl shadow-sm flex items-center justify-between transition-colors duration-300">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-green-600 dark:text-green-500">TOTP Code</span>
                  <span className="text-2xl font-mono font-bold tracking-wider">{result}</span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-800/30 text-green-700 dark:text-green-400 transition-colors duration-200"
                  title={copied ? 'Copied!' : 'Copy to clipboard'}
                >
                  {copied ? <CheckCircle size={24} /> : <Copy size={24} />}
                </button>
              </div>
            )}

            {/* Error Box */}
            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-2xl shadow-sm flex items-center transition-colors duration-300">
                <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Info Text */}
            <div className="mt-6 text-gray-600 dark:text-gray-400 text-sm">
              <p className="mb-2 font-medium">
                <strong>What is TOTP?</strong> Time-based One-Time Password (TOTP) is a temporary passcode used for two-factor authentication.
              </p>
              <p>
                Use this tool to generate TOTP codes from your secret key for services that use this authentication method.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TOTPGenerator;
