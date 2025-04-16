import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Shield, Settings, ChevronRight, Sparkles } from 'lucide-react';
import RClogo from '../../RClogo.png'; // Adjust the path as needed

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white overflow-hidden relative">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-[128px] opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-20 animate-float" style={{ animationDelay: '-3s' }}></div>

      <div className="relative">
        <nav className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg">
              <div className="flex items-center">
              <img src={RClogo} alt="Royal Cyber Logo" className="h-12" />
            </div>
              </div>
             
            </div>
          

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              <Link
                to="/price-updater"
                className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
              >
                <span>Price Updates</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/prices"
                className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
              >
                Price Table
              </Link>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-6 pt-20 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/5 rounded-full mb-8">
              <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm">Powered by IBM WebMethods</span>
            </div>
            
            <h1 className="text-7xl p-4 font-bold mb-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
  Revolutionizing Retail & <br />E-commerce
</h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Transform your retail management with real-time pricing updates and intelligent rate optimization
            </p>

            <div className="flex justify-center space-x-6">
              <Link
                to="/price-updater"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:opacity-90 transition-opacity"
              >
                Update Prices
              </Link>
              <Link
                to="/prices"
                className="px-8 py-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
              >
                View Catalogue
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-32">
            <div className="glass-card p-8 rounded-2xl transform hover:-translate-y-2 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Dynamic Pricing</h3>
              <p className="text-gray-400">Experience instant price updates, powered by IBM Webmethods’ cutting-edge innovation.</p>
            </div>
            
            <div className="glass-card p-8 rounded-2xl transform hover:-translate-y-2 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secured Environment</h3>
              <p className="text-gray-400">Streamline. Secure. Succeed — Experience API Policy Excellence with IBM Webmethods.</p>
            </div>
            
            <div className="glass-card p-8 rounded-2xl transform hover:-translate-y-2 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Management</h3>
              <p className="text-gray-400">Intuitive dashboard for effortless control over regional energy rates</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;
