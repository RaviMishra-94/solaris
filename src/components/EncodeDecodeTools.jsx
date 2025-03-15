import { useState, useCallback } from 'react';
import axios from 'axios';
import { AlertCircle, Copy, CheckCircle } from 'lucide-react';

const EncodeDecodeTools = () => {
  const [hashText, setHashText] = useState('');
  const [base64Text, setBase64Text] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [base64Result, setBase64Result] = useState('');
  const [algorithm, setAlgorithm] = useState('md5');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({
    hash: false,
    encode: false,
    decode: false
  });
  const [copied, setCopied] = useState({
    hash: false,
    base64: false
  });

  const generateHash = async () => {
    if (!hashText.trim()) {
      setError('Please enter text to hash');
      return;
    }

    setLoading(prev => ({ ...prev, hash: true }));
    setError('');

    try {
      const response = await axios.post('https://heliosravi.pythonanywhere.com/generate_hash', {
        text: hashText,
        algorithm
      });
      setHashResult(response.data.hash);
    } catch (err) {
      setError(err.response?.data?.error || 'Error generating hash');
      setHashResult('');
    } finally {
      setLoading(prev => ({ ...prev, hash: false }));
    }
  };

  const handleEncode = async () => {
    if (!base64Text.trim()) {
      setError('Please enter text to encode');
      return;
    }

    setLoading(prev => ({ ...prev, encode: true }));
    setError('');

    try {
      const response = await axios.post('https://heliosravi.pythonanywhere.com/encode_base64', {
        text: base64Text
      });
      setBase64Result(response.data.encoded);
    } catch (err) {
      setError(err.response?.data?.error || 'Error encoding text');
      setBase64Result('');
    } finally {
      setLoading(prev => ({ ...prev, encode: false }));
    }
  };

  const handleDecode = async () => {
    if (!base64Text.trim()) {
      setError('Please enter text to decode');
      return;
    }

    setLoading(prev => ({ ...prev, decode: true }));
    setError('');

    try {
      const response = await axios.post('https://heliosravi.pythonanywhere.com/decode_base64', {
        text: base64Text
      });
      setBase64Result(response.data.decoded);
    } catch (err) {
      setError(err.response?.data?.error || 'Error decoding text');
      setBase64Result('');
    } finally {
      setLoading(prev => ({ ...prev, decode: false }));
    }
  };

  const copyToClipboard = useCallback(async (text, type) => {
    try {
      // First try the modern navigator.clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopied(prev => ({ ...prev, [type]: true }));
        setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 2000);
      } else {
        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement('textarea');
        textArea.value = text;
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
          setCopied(prev => ({ ...prev, [type]: true }));
          setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 2000);
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
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl w-full mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center mb-8 transition-colors duration-200">Hash and Base64 Tool</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hash Generator Section */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200">Hash Generator</h2>

              <div>
                <label htmlFor="hash-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">Text to Hash</label>
                <textarea
                  id="hash-text"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                  rows="4"
                  value={hashText}
                  onChange={(e) => setHashText(e.target.value)}
                  placeholder="Enter text to hash"
                  disabled={loading.hash}
                />
              </div>

              <div>
                <label htmlFor="hash-algorithm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">Hash Algorithm</label>
                <select
                  id="hash-algorithm"
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                  disabled={loading.hash}
                >
                  <option value="md5">MD5</option>
                  <option value="sha1">SHA-1</option>
                  <option value="sha256">SHA-256</option>
                  <option value="sha512">SHA-512</option>
                  <option value="sha3_256">SHA3-256</option>
                  <option value="sha3_512">SHA3-512</option>
                </select>
              </div>

              <button
                onClick={generateHash}
                disabled={loading.hash}
                className={`w-full font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 ${
                  loading.hash 
                    ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed opacity-70' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {loading.hash ? 'Generating...' : 'Generate Hash'}
              </button>

              {hashResult && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg break-all relative transition-colors duration-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 dark:text-gray-200 transition-colors duration-200 pr-8">{hashResult}</span>
                    <button
                      onClick={() => copyToClipboard(hashResult, 'hash')}
                      className="absolute right-3 top-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                      title={copied.hash ? 'Copied!' : 'Copy to clipboard'}
                    >
                      {copied.hash ? <CheckCircle size={20} className="text-green-500" /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Base64 Encoder/Decoder Section */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200">Base64 Encoder/Decoder</h2>

              <div>
                <label htmlFor="base64-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">Text to Encode/Decode</label>
                <textarea
                  id="base64-text"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                  rows="4"
                  value={base64Text}
                  onChange={(e) => setBase64Text(e.target.value)}
                  placeholder="Enter text to encode/decode"
                  disabled={loading.encode || loading.decode}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleEncode}
                  disabled={loading.encode}
                  className={`flex-1 font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 ${
                    loading.encode 
                      ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed opacity-70' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {loading.encode ? 'Encoding...' : 'Encode'}
                </button>
                <button
                  onClick={handleDecode}
                  disabled={loading.decode}
                  className={`flex-1 font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 ${
                    loading.decode 
                      ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed opacity-70' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {loading.decode ? 'Decoding...' : 'Decode'}
                </button>
              </div>

              {base64Result && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg break-all relative transition-colors duration-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 dark:text-gray-200 transition-colors duration-200 pr-8">{base64Result}</span>
                    <button
                      onClick={() => copyToClipboard(base64Result, 'base64')}
                      className="absolute right-3 top-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                      title={copied.base64 ? 'Copied!' : 'Copy to clipboard'}
                    >
                      {copied.base64 ? <CheckCircle size={20} className="text-green-500" /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-8 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg transition-colors duration-200">
              <div className="flex items-center">
                <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EncodeDecodeTools;