import { motion } from "framer-motion";
import { Heart, Sparkles, Shield, Users, MessageSquare, Bell } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="w-8 h-8 text-pink-500" />,
    title: "Smart Matching",
    description: "Our advanced algorithm finds your perfect match based on personality, interests, and values."
  },
  {
    icon: <Shield className="w-8 h-8 text-pink-500" />,
    title: "Verified Profiles",
    description: "All profiles are thoroughly verified to ensure authenticity and safety."
  },
  {
    icon: <Users className="w-8 h-8 text-pink-500" />,
    title: "Community Events",
    description: "Join our exclusive singles events and meet potential matches in person."
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-pink-500" />,
    title: "Secure Messaging",
    description: "Chat with your matches in a safe and private environment."
  },
  {
    icon: <Bell className="w-8 h-8 text-pink-500" />,
    title: "Real-time Notifications",
    description: "Never miss a connection with instant alerts for messages and matches."
  },
  {
    icon: <Heart className="w-8 h-8 text-pink-500" />,
    title: "Relationship Coaching",
    description: "Get expert advice to help you navigate your journey to finding love."
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent mb-4"
          >
            Our Amazing Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Discover how Miamour makes finding your perfect match easier, safer, and more enjoyable than ever before.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-pink-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-pink-50 mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <button className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105">
            Start Your Journey Today
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}