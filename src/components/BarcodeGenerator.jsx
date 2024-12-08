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
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl text-blue-600 text-center mb-6">Barcode Generator</h1>
        <div className="space-y-4">
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter barcode data"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="code128">Code 128</option>
            <option value="ean13">EAN-13</option>
            <option value="ean8">EAN-8</option>
            <option value="upc">UPC</option>
          </select>
          <button
            onClick={generateBarcode}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Generate Barcode
          </button>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="flex flex-col items-center space-y-4">
            <svg ref={svgRef}></svg>
            {data && (
              <button
                onClick={handleDownload}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Download Barcode
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeGenerator;