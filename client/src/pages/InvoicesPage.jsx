import { useState, useRef } from 'react';
import { History, ChevronLeft, Search, Filter, RefreshCw } from 'lucide-react';

// Sleek BackButton component
const BackButton = () => (
  <button
    onClick={() => window.history.back()}
    className="fixed top-8 left-8 z-30 flex items-center bg-white/90 border border-pink-100 shadow-lg rounded-full px-4 py-2 text-pink-600 font-semibold hover:bg-pink-50 transition-colors"
    aria-label="Go back"
  >
    <ChevronLeft className="h-5 w-5 mr-1" />
    Back
  </button>
);

const TransactionHistoryPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Parallax effect using scroll
  const parallaxRef = useRef(null);
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (parallaxRef.current) {
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
  };
  
  // Attach scroll event
  if (typeof window !== "undefined") {
    window.onscroll = handleScroll;
  }

  const refreshTransactions = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-x-hidden">
      {/* Enhanced Parallax geometric background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg
          ref={parallaxRef}
          width="100%" height="100%" viewBox="0 0 1440 900"
          className="absolute top-0 left-0"
          style={{ transition: 'transform 0.2s linear' }}
        >
          <circle cx="1300" cy="150" r="280" fill="#f0f4ff" opacity="0.7" />
          <rect x="100" y="500" width="400" height="160" rx="80" fill="#ffe4f0" opacity="0.5" />
          <ellipse cx="500" cy="180" rx="220" ry="100" fill="#f7faff" opacity="0.7" />
          <rect x="900" y="450" width="300" height="120" rx="60" fill="#ffd6ec" opacity="0.4" />
          <circle cx="200" cy="250" r="120" fill="#f5eeff" opacity="0.6" />
          <ellipse cx="1100" cy="700" rx="180" ry="100" fill="#fff0f7" opacity="0.5" />
        </svg>
        {/* Enhanced glowing effects */}
        <div className="absolute -top-64 -right-64 w-[40rem] h-[40rem] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-64 -left-64 w-[40rem] h-[40rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-[30rem] h-[30rem] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Sleek Back Button */}
      <BackButton />

      <div className="max-w-5xl mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 shadow-lg p-4">
              <History className="h-12 w-12 text-white" />
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Transaction History
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            View and track all your financial activities in one secure place.
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-100 p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Recent Transactions</h2>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <button className="p-2 bg-purple-50 rounded-xl text-purple-600 hover:bg-purple-100 transition-colors">
                <Filter className="h-5 w-5" />
              </button>
              
              <button 
                onClick={refreshTransactions}
                className="p-2 bg-pink-50 rounded-xl text-pink-600 hover:bg-pink-100 transition-colors"
              >
                <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Empty state */}
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 mb-6 rounded-full bg-pink-50 flex items-center justify-center">
              <History className="h-12 w-12 text-pink-300" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No transactions yet</h3>
            <p className="text-gray-500 max-w-md mb-8">
              Your transaction history will appear here once you start making payments or receive funds.
            </p>
            <button
              onClick={refreshTransactions}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
        
        {/* Help section */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-white/10 backdrop-blur-sm p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Need help with your transactions?</h3>
                <p className="opacity-90">Our support team is available 24/7 to assist you.</p>
              </div>
              <button className="whitespace-nowrap px-8 py-3 bg-white text-purple-600 font-medium rounded-xl shadow-lg hover:bg-opacity-90 transition-all">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;