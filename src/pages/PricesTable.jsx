import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Download, BarChart2, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';

// City mapping for the frontend display
const regionToCityMap = {
  'North': 'Riyadh',
  'South': 'Jeddah',
  'East': 'Dammam',
  'West': 'Madina'
};

// Mapping for unique product names, base prices, and distance per region and rate type.
const productMapping = {
  South: {
    Standard: { productName: 'Wireless Mouse', basePrice: 25.00, distance: 10 },
    Overnight: { productName: 'Mechanical Keyboard', basePrice: 40.00, distance: 10 }
  },
  East: {
    Standard: { productName: 'LED Monitor', basePrice: 120.00, distance: 15 },
    Overnight: { productName: 'Ergonomic Chair', basePrice: 150.00, distance: 15 }
  },
  West: {
    Standard: { productName: 'USB-C Charger', basePrice: 15.00, distance: 20 },
    Overnight: { productName: 'Portable SSD', basePrice: 70.00, distance: 20 }
  },
  North: {
    Standard: { productName: 'Bluetooth Speaker', basePrice: 50.00, distance: 25 },
    Overnight: { productName: 'Smartphone', basePrice: 300.00, distance: 25 }
  }
};

function PricesTable() {
  const [prices, setPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch prices from the API and remap price_per_kwh to price_per_km.
  const fetchPrices = () => {
    setLoading(true);
    fetch('https://env568262.apigw-aw-us.webmethods.io/gateway/PricesAPI/1.0.1/prices', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        toast.success('Prices fetched successfully!');
        // Remap each result, renaming price_per_kwh to price_per_km, and adding default status.
        const fetchedPrices = data.results.map((price, index) => ({
          id: index + 1,
          region: price.region, // Keep region as is for backend compatibility
          rate_type: price.rate_type,
          price_per_km: price.price_per_kwh,
          effective_from: price.effective_from,
          status: price.status || 'Active'
        }));
        // Sort by effective_from in descending order (most recent first)
        fetchedPrices.sort((a, b) => new Date(b.effective_from) - new Date(a.effective_from));
        setPrices(fetchedPrices);
      })
      .catch(error => {
        console.error('Error fetching prices:', error);
        toast.error('Failed to fetch prices.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  // Filter prices by region/city, rate type, or product (derived from the mapping)
  const filteredPrices = prices.filter(price => {
    const regionMapping = productMapping[price.region];
    const product = regionMapping ? regionMapping[price.rate_type] : null;
    const productName = product ? product.productName : '';
    const cityName = regionToCityMap[price.region] || price.region;
    
    return (
      cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      price.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (price.rate_type && price.rate_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
      productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate dynamic card values: total price for each entry is calculated as:
  // Total Price = Base Price + (Price per km × Distance)
  const totalPricesArray = prices.map(price => {
    const regionMapping = productMapping[price.region];
    const product = regionMapping ? regionMapping[price.rate_type] : { basePrice: 0, distance: 0 };
    return product.basePrice + (price.price_per_km * product.distance);
  });

  const averageTotalPrice = totalPricesArray.length
    ? (totalPricesArray.reduce((sum, tp) => sum + tp, 0) / totalPricesArray.length).toFixed(2)
    : 0;

  const activeRatesCount = prices.filter(price => price.status === 'Active').length;

  // Get the latest entry by effective_from.
  const latestEntry = prices.length
    ? prices[0]
    : null;

  // Function to download CSV.
  const downloadCSV = () => {
    if (prices.length === 0) return;

    // CSV Headers.
    const headers = [
      'City',
      'Rate Type',
      'Product',
      'Base Price (SAR)',
      'Price per km (SAR)',
      'Distance (km)',
      'Total Price (SAR)',
      'Effective From'
    ];
    const rows = prices.map(price => {
      const regionMapping = productMapping[price.region];
      const product = regionMapping ? regionMapping[price.rate_type] : { productName: 'N/A', basePrice: 0, distance: 0 };
      const totalPrice = product.basePrice + (price.price_per_km * product.distance);
      return [
        regionToCityMap[price.region] || price.region,
        price.rate_type,
        product.productName,
        product.basePrice.toFixed(2),
        price.price_per_km.toFixed(2),
        product.distance,
        totalPrice.toFixed(2),
        new Date(price.effective_from).toLocaleString()
      ];
    });

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "prices.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white relative">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full filter blur-[128px] opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-20 animate-float" style={{ animationDelay: '-3s' }}></div>

      <div className="relative">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold">Prices Table</h1>
          </div>

          {/* Dynamic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Average Total Price Card */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Average Total Price</h3>
                <BarChart2 className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-3xl font-bold">SAR {averageTotalPrice}</p>
              <p className="text-sm text-gray-400 mt-2">Based on {prices.length} entries</p>
            </div>
            
            {/* Active Rates Card */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Active Rates</h3>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <p className="text-3xl font-bold">{activeRatesCount}</p>
              <p className="text-sm text-gray-400 mt-2">Across all cities</p>
            </div>
            
            {/* Latest Entry Card */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Latest Entry</h3>
              </div>
              {latestEntry ? (() => {
                const regionMapping = productMapping[latestEntry.region];
                const product = regionMapping ? regionMapping[latestEntry.rate_type] : { productName: 'N/A' };
                const cityName = regionToCityMap[latestEntry.region] || latestEntry.region;
                return (
                  <>
                    <p className="text-3xl font-bold">
                      {cityName} | {latestEntry.rate_type} | {product.productName}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(latestEntry.effective_from).toLocaleString()}
                    </p>
                  </>
                );
              })() : (
                <p className="text-sm text-gray-400 mt-2">No entries available</p>
              )}
            </div>
          </div>

          {/* Search and Export */}
          <div className="glass-card rounded-xl overflow-hidden mb-8">
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by city, rate type, or product..."
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={fetchPrices}
                    className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center"
                    disabled={loading}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </button>
                  <button 
                    onClick={downloadCSV}
                    className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <Link
                    to="/price-updater"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Price
                  </Link>
                </div>
              </div>
            </div>

            {/* Loader or Table */}
            {loading ? (
              <div className="p-6 flex justify-center items-center">
                <ClipLoader color="#ffffff" size={50} />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">City</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rate Type</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Base Price (SAR)</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Price per km (SAR)</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Distance (km)</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Total Price (SAR)</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Effective From</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredPrices.map((price) => {
                      const regionMapping = productMapping[price.region];
                      const product = regionMapping ? regionMapping[price.rate_type] : { productName: 'N/A', basePrice: 0, distance: 0 };
                      const totalPrice = product.basePrice + (price.price_per_km * product.distance);
                      const cityName = regionToCityMap[price.region] || price.region;
                      
                      return (
                        <tr key={price.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-sm">{cityName}</td>
                          <td className="px-6 py-4 text-sm">{price.rate_type}</td>
                          <td className="px-6 py-4 text-sm">{product.productName}</td>
                          <td className="px-6 py-4 text-sm">SAR {product.basePrice.toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm">SAR {price.price_per_km.toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm">{product.distance}</td>
                          <td className="px-6 py-4 text-sm">SAR {totalPrice.toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm">
                            {new Date(price.effective_from).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricesTable;