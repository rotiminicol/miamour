import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Mail, MessageCircle, HelpCircle, Sparkles } from "lucide-react";

const HelpCenter = () => {
  const supportOptions = [
    {
      title: "Email Support",
      description: "Reach out to our team at info@miamour_me.com for personalized assistance.",
      icon: <Mail className="w-8 h-8 text-pink-500" />,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Live Chat",
      description: "Connect with our support team in real-time for quick answers to your questions.",
      icon: <MessageCircle className="w-8 h-8 text-purple-500" />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "FAQ",
      description: "Browse our frequently asked questions for quick solutions to common issues.",
      icon: <HelpCircle className="w-8 h-8 text-amber-500" />,
      color: "from-amber-500 to-orange-500"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Heart className="text-white w-8 h-8 mr-2" />
            <span className="text-2xl font-bold">Miamour</span>
          </Link>
          <nav>
            <Link to="/" className="text-white hover:text-pink-100 mx-4 transition-colors duration-300">Home</Link>
            <Link to="/help-center" className="text-white hover:text-pink-100 mx-4 transition-colors duration-300">Help Center</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-16 relative">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 relative"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-pink-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Help Center
            </h1>
            <Sparkles className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Were here to assist you every step of the way. Explore our support options below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {supportOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className={`p-3 rounded-full bg-gradient-to-r ${option.color} text-white shadow-lg w-fit mx-auto mb-6`}>
                {option.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{option.title}</h3>
              <p className="text-gray-600 text-center">{option.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-white/30 backdrop-blur-sm rounded-2xl p-8 border border-pink-100 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Need More Help?</h2>
          <p className="text-gray-600 text-center mb-6">
            Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(236,72,153,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300"
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HelpCenter;
