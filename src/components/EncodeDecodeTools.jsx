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
  const [copied, setCopied] = useState(false);

  const generateHash = async () => {
    if (!hashText.trim()) {
      setError('Please enter text to hash');
      return;
    }

    setLoading(prev => ({ ...prev, hash: true }));
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/generate-hash', {
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
      const response = await axios.post('http://localhost:5000/api/encode-base64', {
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
      const response = await axios.post('http://localhost:5000/api/decode_base64', {
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

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-2xl text-blue-600 text-center">Hash and Base64 Tool</h1>

        <div className="space-y-4">
          <h2 className="text-xl text-gray-700">Hash Generator</h2>
          <textarea
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            value={hashText}
            onChange={(e) => setHashText(e.target.value)}
            placeholder="Enter text to hash"
            disabled={loading.hash}
          />
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            disabled={loading.hash}
          >
            <option value="md5">MD5</option>
            <option value="sha1">SHA-1</option>
            <option value="sha256">SHA-256</option>
            <option value="sha512">SHA-512</option>
            <option value="sha3_256">SHA3-256</option>
            <option value="sha3_512">SHA3-512</option>
          </select>
          <button
            onClick={generateHash}
            disabled={loading.hash}
            className={`w-full font-bold py-2 px-4 rounded ${
              loading.hash 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {loading.hash ? 'Generating...' : 'Generate Hash'}
          </button>
          {hashResult && (
            <div className="bg-gray-100 p-3 rounded break-all relative">
              <div className="flex justify-between items-center">
                <span>{hashResult}</span>
                <button
                  onClick={() => copyToClipboard(hashResult)}
                  className="text-gray-600 hover:text-gray-800 ml-2"
                >
                  {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl text-gray-700">Base64 Encoder/Decoder</h2>
          <textarea
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            value={base64Text}
            onChange={(e) => setBase64Text(e.target.value)}
            placeholder="Enter text to encode/decode"
            disabled={loading.encode || loading.decode}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleEncode}
              disabled={loading.encode}
              className={`flex-1 font-bold py-2 px-4 rounded ${
                loading.encode 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {loading.encode ? 'Encoding...' : 'Encode'}
            </button>
            <button
              onClick={handleDecode}
              disabled={loading.decode}
              className={`flex-1 font-bold py-2 px-4 rounded ${
                loading.decode 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {loading.decode ? 'Decoding...' : 'Decode'}
            </button>
          </div>
          {base64Result && (
            <div className="bg-gray-100 p-3 rounded break-all relative">
              <div className="flex justify-between items-center">
                <span>{base64Result}</span>
                <button
                  onClick={() => copyToClipboard(base64Result)}
                  className="text-gray-600 hover:text-gray-800 ml-2"
                >
                  {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <div className="flex items-center">
              <AlertCircle size={20} className="mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EncodeDecodeTools;