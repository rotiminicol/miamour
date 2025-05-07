import { useState, useEffect, useRef } from 'react';
import { ChevronRightIcon, ArrowLeft } from 'lucide-react';

const ResourcesPage = () => {
  const [selectedResource, setSelectedResource] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Refs for parallax elements
  const heroBgRef = useRef(null);
  const cardContainerRef = useRef(null);
  
  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply parallax effects
  useEffect(() => {
    if (heroBgRef.current) {
      heroBgRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    }
    if (cardContainerRef.current) {
      cardContainerRef.current.style.transform = `translateY(${-scrollPosition * 0.05}px)`;
    }
  }, [scrollPosition]);

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
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 overflow-hidden relative">
      {/* Fixed Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm shadow-md rounded-full transition-colors hover:bg-pink-50 text-pink-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back</span>
        </button>
      </div>
      
      {/* Subtle Parallax Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          ref={heroBgRef}
          className="absolute inset-0 bg-gradient-to-br from-pink-50 to-white"
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-5" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z' fill='%23ff69b4' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
            }}
          ></div>
          
          {/* Gradient blobs */}
          <div className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 opacity-30 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tl from-pink-200 to-pink-100 opacity-30 blur-3xl"></div>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10">
        {/* Hero Banner */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-pink-900 mb-6">Resources</h1>
          <p className="text-xl text-pink-700 max-w-2xl mx-auto">
            Find helpful guides, tutorials, and community resources to get the most out of our platform.
          </p>
        </div>

        {/* Resources Cards */}
        <div 
          ref={cardContainerRef}
          className="max-w-5xl mx-auto space-y-6"
        >
          {resourceCategories.map((category, index) => (
            <div 
              key={category.id}
              className="border border-pink-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              style={{ 
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <div 
                className="flex justify-between items-center p-6 cursor-pointer hover:bg-pink-50"
                onClick={() => handleResourceClick(category.id)}
              >
                <div>
                  <h3 className="text-xl font-medium text-pink-800">{category.title}</h3>
                  <p className="text-gray-600 mt-1">{category.description}</p>
                </div>
                <div
                  className="transition-transform duration-300"
                  style={{ transform: `rotate(${selectedResource === category.id ? 90 : 0}deg)` }}
                >
                  <ChevronRightIcon className="w-6 h-6 text-pink-500" />
                </div>
              </div>
              
              {/* Expandable Content */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ 
                  height: selectedResource === category.id ? 'auto' : '0',
                  opacity: selectedResource === category.id ? 1 : 0,
                }}
              >
                <div className="p-6 pt-0 bg-pink-50 border-t border-pink-100">
                  <ul className="grid md:grid-cols-2 gap-4">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <button className="text-pink-700 hover:text-pink-900 text-left flex items-center py-2 text-lg group">
                          <span className="mr-2 text-pink-400">•</span> 
                          <span className="group-hover:underline">{item}</span>
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
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="pt-20 pb-10 text-center text-pink-400 text-sm">
          <p>© 2025 miamour. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;