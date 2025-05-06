import { motion } from "framer-motion";
import { Heart, Sparkles, Shield, Users, MessageSquare, Bell, ChevronLeft } from "lucide-react";


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
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
    
      <div className="flex-grow flex flex-col">
     
        <main className="flex-grow overflow-y-auto px-4 py-6 lg:px-6 lg:py-8">
          <div className="container mx-auto px-4 py-6">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-[#FF1493] mb-6 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </motion.button>
          </div>

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
                className="text-4xl font-bold text-[#FF1493] mb-4"
              >
                Our Amazing Features
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600 max-w-3xl mx-auto"
              >
                Discover how miamour makes finding your perfect match easier, safer, and more enjoyable than ever before.
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
                  className="bg-white p-8 rounded-xl shadow-lg border-2 border-[#FF1493]/20 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-[#FF1493]/10 mr-4">
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
              <motion.button 
                whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(255,20,147,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#FF1493] text-white px-8 py-3 rounded-lg font-medium"
              >
                Start Your Journey Today
              </motion.button>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}