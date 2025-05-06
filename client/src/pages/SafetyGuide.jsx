import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";

const SafetyGuide = () => {
  const guidelines = [
    {
      title: "Meet in Public Places",
      description: "For initial meetings, choose well-lit, public locations to ensure safety.",
    },
    {
      title: "Inform a Friend",
      description: "Let someone you trust know your plans, including where you're going and who you're meeting.",
    },
    {
      title: "Trust Your Instincts",
      description: "If something feels off, don't hesitate to end the date or leave the situation.",
    },
    {
      title: "Protect Personal Information",
      description: "Avoid sharing sensitive details like your address or financial information early on.",
    },
  ];

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
                Safety Guide
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600 max-w-3xl mx-auto"
              >
                Stay safe while dating with these essential tips to protect yourself and your heart.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {guidelines.map((guide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg border-2 border-[#FF1493]/20 p-6"
                >
                  <h3 className="text-xl font-semibold text-[#FF1493] mb-2">{guide.title}</h3>
                  <p className="text-gray-600">{guide.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default SafetyGuide;