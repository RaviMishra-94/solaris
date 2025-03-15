// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ScripmasterLinks from './pages/ScripmasterLinks';
import TOTPGenerator from './components/TOTPGenerator';
import EncodeDecodeTools from './components/EncodeDecodeTools';
import QRCodeGenerator from './components/QRCodeGenerator';
import BarcodeGenerator from './components/BarcodeGenerator';
import WordCounter from './components/WordCounter';
import BrokerResources from "./pages/BrokerResources";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="totp" element={<TOTPGenerator />} />
          <Route path="encode-decode" element={<EncodeDecodeTools />} />
          <Route path="qrcode" element={<QRCodeGenerator />} />
          <Route path="barcode" element={<BarcodeGenerator />} />
          <Route path="word-counter" element={<WordCounter />} />
          <Route path="/scripmaster" element={<ScripmasterLinks />} />
          <Route path="/resources" element={<BrokerResources />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;