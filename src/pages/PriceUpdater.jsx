import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ArrowLeft, Zap, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './PriceUpdater.css'; // Make sure this CSS file exists

function PriceUpdater() {
  const navigate = useNavigate();
  // Define allowed rate types for all regions as only Standard and Overnight
  const rateOptions = {
    North: ['Standard', 'Overnight'],
    South: ['Standard', 'Overnight'],
    East: ['Standard', 'Overnight'],
    West: ['Standard', 'Overnight']
  };

  const [formData, setFormData] = useState({
    region: 'North',
    rate_type: 'Standard', // default for North
    price_per_kWh: '', // Updated to match the API payload key
    effective_from: new Date()
  });

  const fetchPrices = () => {
    navigate('/prices');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Sending Update Request...");
    try {
      // Update payload with correct key: price_per_kWh
      const payload = {
        ...formData,
        price_per_kWh: parseFloat(formData.price_per_kWh),
        effective_from: formData.effective_from.toISOString()
      };

<<<<<<< HEAD
      const response = await fetch('https://env568262.apigw-aw-us.webmethods.io/gateway/notificationApi/1.0.0', {
=======
      const response = await fetch('http://env568262.apigw-aw-us.webmethods.io/gateway/notificationApi/1.0.0', {
>>>>>>> ab143d5 (first commit)
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([payload]) // The API expects an array
      });

      const data = await response.json();
      console.log('Response:', response);
      toast.success(data.data || 'Price updated successfully', { id: toastId });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update price', { id: toastId });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // When region changes, update the rate_type to the first available option for that region
    if (name === 'region') {
      setFormData({
        ...formData,
        region: value,
        rate_type: rateOptions[value][0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Custom styles for the date picker
  const customDatePickerStyles = {
    datePickerContainer: "dark-theme-datepicker",
    datePickerInput: "w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-40 left-20 w-72 h-72 bg-blue-500 rounded-full filter blur-[128px] opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-20 animate-float" style={{ animationDelay: '-3s' }}></div>

      <div className="container mx-auto px-6 py-8 relative">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-xl mx-auto">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-8 border-b border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Zap className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Update Shipping Prices</h2>
              </div>
              
              <p className="text-gray-400">
                Set new energy rates that will be automatically applied across the system.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Region Select */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Region
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/10 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             bg-gray-900 text-white appearance-none"
                >
                  {Object.keys(rateOptions).map(region => (
                    <option key={region} className="bg-gray-900 text-white" value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rate Type Select */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Rate Type
                </label>
                <select
                  name="rate_type"
                  value={formData.rate_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/10 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             bg-gray-900 text-white appearance-none"
                >
                  {rateOptions[formData.region].map(rate => (
                    <option key={rate} className="bg-gray-900 text-white" value={rate}>
                      {rate}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price per km
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    name="price_per_kWh"
                    step="0.01"
                    value={formData.price_per_kWh}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 bg-gray-900 border border-white/10 
                               rounded-lg focus:ring-2 focus:ring-blue-500 
                               focus:border-transparent text-white"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Styled Dark Theme DatePicker */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Effective From
                </label>
                <div className={customDatePickerStyles.datePickerContainer}>
                  <DatePicker
                    selected={formData.effective_from}
                    onChange={(date) => setFormData({ ...formData, effective_from: date })}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="Pp"
                    className={customDatePickerStyles.datePickerInput}
                    popperClassName="dark-theme-datepicker-popper"
                    popperPlacement="bottom-start"
                    calendarStartDay={1}
                    renderCustomHeader={({
                      date,
                      changeYear,
                      changeMonth,
                      decreaseMonth,
                      increaseMonth,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                    }) => (
                      <div className="flex items-center justify-between px-4 py-2">
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                          type="button"
                          className="p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <svg className="w-5 h-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <div className="text-white font-medium">
                          <select
                            value={date.getFullYear()}
                            onChange={({ target: { value } }) => changeYear(value)}
                            className="bg-gray-800 text-white border border-gray-700 rounded mr-2"
                          >
                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <select
                            value={date.getMonth()}
                            onChange={({ target: { value } }) => changeMonth(value)}
                            className="bg-gray-800 text-white border border-gray-700 rounded"
                          >
                            {[
                              "January", "February", "March", "April", "May", "June", 
                              "July", "August", "September", "October", "November", "December"
                            ].map((month, i) => (
                              <option key={month} value={i}>
                                {month}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                          type="button"
                          className="p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <svg className="w-5 h-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400">
                  Changes will be applied immediately across all systems. Make sure to verify the details before updating.
                </p>
              </div>

              <div className="flex justify-between gap-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Update Price
                </button>
                <button
                  type="button"
                  onClick={fetchPrices}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Fetch Prices
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceUpdater;
