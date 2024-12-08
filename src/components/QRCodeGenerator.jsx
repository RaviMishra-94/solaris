import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';  // Changed from default import to named import

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
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl text-blue-600 text-center mb-6">QR Code Generator</h1>
        <div className="space-y-4">
          <textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="Enter data for QR code"
          />
          <button
            onClick={() => setQrGenerated(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Generate QR Code
          </button>
          {qrGenerated && data && (
            <div className="flex flex-col items-center space-y-4">
              <QRCodeSVG  // Changed from QRCode to QRCodeSVG
                id="qr-code"
                value={data}
                size={256}
                level="H"
                includeMargin={true}
              />
              <button
                onClick={handleDownload}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Download QR Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;