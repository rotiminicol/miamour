import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const DatingTips = () => {
  const tips = [
    {
      title: "Be Yourself",
      description: "Authenticity is key. Let your true personality shine to build genuine connections.",
    },
    {
      title: "Communicate Clearly",
      description: "Open and honest communication fosters trust and understanding in any relationship.",
    },
    {
      title: "Plan Thoughtful Dates",
      description: "Choose activities that allow you to connect, like a cozy coffee date or a scenic walk.",
    },
    {
      title: "Listen Actively",
      description: "Show interest in your partner’s thoughts and feelings to deepen your bond.",
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
            <Link to="/dating-tips" className="text-white hover:text-pink-100 mx-4">Marriage tips</Link>
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
          <h1 className="text-4xl font-bold text-pink-500 mb-4">Relationship Tips</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover expert advice to make your dating journey enjoyable and successful.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-pink-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-pink-500 mb-2">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
    
    </div>
  );
};

export default DatingTips;