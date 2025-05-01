import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const HelpCenter = () => {
  const supportOptions = [
    {
      title: "Email Support",
      description: "Reach out to our team at info@miamour_me.com for personalized assistance.",
      icon: (
        <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Live Chat",
      description: "Connect with our support team in real-time for quick answers to your questions.",
      icon: (
        <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      title: "FAQ",
      description: "Browse our frequently asked questions for quick solutions to common issues.",
      icon: (
        <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4a8 8 0 100 16 8 8 0 000-16zm0 10h.01M11 7h2v4h-2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-pink-300 text-white py-4">
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Heart className="text-white w-8 h-8 mr-2" />
            <span className="text-2xl font-bold">Miamour</span>
          </Link>
          <nav>
            <Link to="/" className="text-white hover:text-pink-100 mx-4">Home</Link>
            <Link to="/help-center" className="text-white hover:text-pink-100 mx-4">Help Center</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-pink-500 mb-4">Help Center</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We’re here to assist you every step of the way. Explore our support options below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supportOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-pink-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="mb-4">{option.icon}</div>
              <h3 className="text-xl font-semibold text-pink-500 mb-2">{option.title}</h3>
              <p className="text-gray-600">{option.description}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white to-pink-50 pt-16 pb-8 border-t border-pink-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <Heart className="text-pink-500 w-8 h-8 mr-2" />
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent">Miamour</span>
              </div>
              <p className="text-gray-600 mb-4">
                Where true love meets wedding dreams. Start your forever journey today.
              </p>
              <div className="flex space-x-4">
                {/* Facebook */}
                <a href="#" className="text-pink-500 hover:text-pink-600" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                {/* Twitter */}
                <a href="#" className="text-pink-500 hover:text-pink-600" aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743A11.65 11.65 0 013.17 4.912a4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="text-pink-500 hover:text-pink-600" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 2C5.68 4 4 5.68 4 7.75v8.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5C20 5.68 18.32 4 16.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.5-2a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Additional footer sections can be added here if needed */}
          </div>
          <p className="text-center text-sm text-gray-500">&copy; {new Date().getFullYear()} Miqmour. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenter;
