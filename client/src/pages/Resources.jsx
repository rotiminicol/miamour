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
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
        {/* Hero Banner */}
        <div className="bg-blue-600 text-white w-full">
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
                className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div 
                  className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleResourceClick(category.id)}
                >
                  <div>
                    <h3 className="text-xl font-medium text-gray-800">{category.title}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: selectedResource === category.id ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRightIcon className="w-6 h-6 text-gray-500" />
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
                      <div className="p-6 pt-0 bg-gray-50 border-t border-gray-200">
                        <ul className="grid md:grid-cols-2 gap-4">
                          {category.items.map((item, idx) => (
                            <li key={idx} className="flex items-center">
                              <button className="text-blue-600 hover:text-blue-800 hover:underline text-left flex items-center py-2 text-lg">
                                <span className="mr-2">•</span> {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 text-right">
                          <button className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
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

export default ResourcesPage;