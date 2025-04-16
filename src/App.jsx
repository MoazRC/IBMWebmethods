import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import PriceUpdater from './pages/PriceUpdater';
import PricesTable from './pages/PricesTable';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/price-updater" element={<PriceUpdater />} />
        <Route path="/prices" element={<PricesTable />} />
      </Routes>
    </Router>
  );
}

export default App;