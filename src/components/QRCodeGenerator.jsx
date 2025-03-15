import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeGenerator = () => {
  const [data, setData] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleDownload = () => {
    const svg = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-2xl w-full mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center mb-8 transition-colors duration-200">QR Code Generator</h1>

          <div className="space-y-6">
            <div>
              <label htmlFor="qr-data" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">QR Code Content</label>
              <textarea
                id="qr-data"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                rows="4"
                placeholder="Enter text, URL, or data for your QR code"
              />
            </div>

            <button
              onClick={() => setQrGenerated(true)}
              disabled={!data.trim()}
              className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                !data.trim() 
                  ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed opacity-70' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Generate QR Code
            </button>

            {qrGenerated && data && (
              <div className="flex flex-col items-center space-y-6 pt-4">
                <div className="bg-white p-6 rounded-lg shadow-md dark:shadow-gray-900/30">
                  <QRCodeSVG
                    id="qr-code"
                    value={data}
                    size={256}
                    level="H"
                    includeMargin={true}
                    bgColor={"#FFFFFF"}
                    fgColor={"#000000"}
                  />
                </div>

                <button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download QR Code
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;