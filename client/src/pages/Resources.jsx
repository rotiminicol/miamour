import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from "../components/Header";
import { ChevronRightIcon } from 'lucide-react';

const ResourcesPage = () => {
  const [selectedResource, setSelectedResource] = useState(null);

  const resourceCategories = [
    {
      id: "kb",
      title: "Knowledge Base",
      description: "Browse our extensive collection of articles and guides.",
      items: [
        "Getting Started Guide", 
        "Advanced Features Tutorial", 
        "Troubleshooting Common Issues", 
        "Account Management"
      ]
    },
    {
      id: "videos",
      title: "Video Tutorials",
      description: "Learn how to use our product with step-by-step video guides.",
      items: [
        "Quick Start Video", 
        "Feature Spotlight Series", 
        "Expert Tips & Tricks", 
        "Integration Tutorials"
      ]
    },
    {
      id: "guides",
      title: "User Guides",
      description: "Download comprehensive guides for our products.",
      items: [
        "Complete User Manual", 
        "Developer Documentation", 
        "API Reference Guide", 
        "Migration Guide"
      ]
    },
    {
      id: "community",
      title: "Community Forum",
      description: "Connect with other users and share your experiences.",
      items: [
        "Feature Requests", 
        "User Showcase", 
        "Integration Examples", 
        "Technical Discussions"
      ]
    }
  ];

  const handleResourceClick = (categoryId) => {
    setSelectedResource(selectedResource === categoryId ? null : categoryId);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-white to-pink-50">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white w-full parallax-hero">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold mb-4">Resources</h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Find helpful guides, tutorials, and community resources to get the most out of our platform.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {resourceCategories.map((category, index) => (
              <motion.div 
                key={category.id}
                className="border border-pink-200 rounded-lg overflow-hidden bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div 
                  className="flex justify-between items-center p-6 cursor-pointer hover:bg-pink-50"
                  onClick={() => handleResourceClick(category.id)}
                >
                  <div>
                    <h3 className="text-xl font-medium text-pink-900">{category.title}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: selectedResource === category.id ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRightIcon className="w-6 h-6 text-pink-500" />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {selectedResource === category.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 bg-pink-50 border-t border-pink-200">
                        <ul className="grid md:grid-cols-2 gap-4">
                          {category.items.map((item, idx) => (
                            <li key={idx} className="flex items-center">
                              <button className="text-pink-600 hover:text-pink-800 hover:underline text-left flex items-center py-2 text-lg">
                                <span className="mr-2">•</span> {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 text-right">
                          <button className="text-pink-600 hover:text-pink-800 font-medium hover:underline">
                            View All {category.title}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Inline CSS for parallax effect
const styles = `
  html, body {
    scroll-behavior: smooth;
  }
  .parallax-hero {
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E");
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ResourcesPage;