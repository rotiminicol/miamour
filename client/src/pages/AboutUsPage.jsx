import { motion } from "framer-motion";
import { ChevronLeft, Heart, Users, Globe, Award } from "lucide-react";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";

const stats = [
  { number: "50,000+", label: "Happy Couples", icon: <Heart className="w-6 h-6 text-[#FF1493]" /> },
  { number: "100+", label: "Countries", icon: <Globe className="w-6 h-6 text-[#FF1493]" /> },
  { number: "1M+", label: "Active Users", icon: <Users className="w-6 h-6 text-[#FF1493]" /> },
  { number: "15+", label: "Years Experience", icon: <Award className="w-6 h-6 text-[#FF1493]" /> }
];

export default function AboutUsPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header />
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
                About Miamour
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600 max-w-3xl mx-auto"
              >
                Were on a mission to help people find meaningful connections and lasting love
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg border-2 border-[#FF1493]/20 p-6 text-center"
                >
                  <div className="inline-block p-3 rounded-full bg-[#FF1493]/10 mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-[#FF1493] mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-gray-900">Our Story</h3>
                <p className="text-gray-600">
                  Founded in 2008, Miamour has grown from a small startup to one of the worlds leading matchmaking platforms. Our journey began with a simple idea: to create a space where people could find genuine connections based on shared values and interests.
                </p>
                <p className="text-gray-600">
                  Today, were proud to have helped thousands of couples find love and build meaningful relationships. Our success is measured not just in numbers, but in the happiness of our members who have found their perfect match through our platform.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                <p className="text-gray-600">
                  We believe that everyone deserves to find love and happiness. Our mission is to create meaningful connections that lead to lasting relationships, using technology and human expertise to bring people together.
                </p>
                <p className="text-gray-600">
                  Were committed to maintaining the highest standards of safety and privacy, ensuring that our platform remains a trusted space for people to find their perfect match.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(255,20,147,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#FF1493] text-white px-8 py-3 rounded-lg font-medium"
              >
                Join Our Community
              </motion.button>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}