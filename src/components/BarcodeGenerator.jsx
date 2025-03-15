// components/BarcodeGenerator.jsx
import { useState, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator = () => {
  const [data, setData] = useState('');
  const [type, setType] = useState('code128');
  const [error, setError] = useState('');
  const svgRef = useRef();

  const generateBarcode = () => {
    try {
      JsBarcode(svgRef.current, data, {
        format: type,
        width: 2,
        height: 100,
        displayValue: true
      });
      setError('');
    } catch (err) {
      setError('Invalid barcode data for selected format');
    }
  };

  const handleDownload = () => {
    const svg = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'barcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-2xl w-full mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center mb-8 transition-colors duration-200">Barcode Generator</h1>
          <div className="space-y-6">
            <div>
              <label htmlFor="barcode-data" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">Barcode Data</label>
              <input
                id="barcode-data"
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                placeholder="Enter barcode data"
              />
            </div>

            <div>
              <label htmlFor="barcode-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">Barcode Type</label>
              <select
                id="barcode-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
              >
                <option value="code128">Code 128</option>
                <option value="ean13">EAN-13</option>
                <option value="ean8">EAN-8</option>
                <option value="upc">UPC</option>
              </select>
            </div>

            <button
              onClick={generateBarcode}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Generate Barcode
            </button>

            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg transition-colors duration-200">
                {error}
              </div>
            )}

            <div className="flex flex-col items-center space-y-6 mt-8">
              <div className="bg-white p-6 rounded-lg w-full overflow-x-auto flex justify-center">
                <svg ref={svgRef} className="max-w-full"></svg>
              </div>

              {data && (
                <button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Barcode
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeGenerator;