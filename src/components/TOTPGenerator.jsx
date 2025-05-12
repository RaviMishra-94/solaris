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

      if (response.data && response.data.totp) {
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
      // First try the modern navigator.clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement('textarea');
        textArea.value = result;
        // Make it non-visible without removing it
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          if (!successful) {
            throw new Error('Copy command was unsuccessful');
          }
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
          setError('Failed to copy to clipboard');
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
      setError('Failed to copy to clipboard');
    }
  }, [result]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-2xl w-full mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center mb-8 transition-colors duration-200">TOTP Generator</h1>

          <div className="space-y-6">
            <div>
              <label htmlFor="totp-secret" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                Secret Key
              </label>
              <input
                id="totp-secret"
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                placeholder="Enter TOTP secret key"
                disabled={loading}
              />
            </div>

            <button
              onClick={generateTOTP}
              disabled={loading || !secret.trim()}
              className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                loading || !secret.trim()
                  ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed opacity-70'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {loading ? 'Generating...' : 'Generate TOTP'}
            </button>

            {result && (
              <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-6 py-4 rounded-lg relative transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-green-600 dark:text-green-500 transition-colors duration-200">TOTP Code</span>
                    <span className="text-2xl font-mono font-bold tracking-wider transition-colors duration-200">{result}</span>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 p-2 rounded-full hover:bg-green-200 dark:hover:bg-green-800/30 transition-colors duration-200"
                    title={copied ? 'Copied!' : 'Copy to clipboard'}
                  >
                    {copied ? <CheckCircle size={24} /> : <Copy size={24} />}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg transition-colors duration-200">
                <div className="flex items-center">
                  <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
              <p className="mb-2">
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