
import { useState, useEffect, useRef } from 'react';
import { ChevronRightIcon, ArrowLeft, X } from 'lucide-react';
import PropTypes from 'prop-types';

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

// Freestyle reasonable content for each resource item
const resourceContent = {
  "Getting Started Guide": (
    <>
      <h3 className="text-xl font-bold mb-2">Getting Started Guide</h3>
      <p>Welcome! This guide will help you set up your account and explore the main features of our platform. <br /> <br /> <b>Steps:</b>
        <ol className="list-decimal ml-6 mt-2">
          <li>Create your profile</li>
          <li>Set your preferences</li>
          <li>Start connecting with the community</li>
        </ol>
      </p>
    </>
  ),
  "Advanced Features Tutorial": (
    <>
      <h3 className="text-xl font-bold mb-2">Advanced Features Tutorial</h3>
      <p>Unlock the power of advanced features like smart matching, privacy controls, and custom notifications. <br /><br />Check out our <a href="#" className="text-pink-600 underline">video walkthrough</a>!</p>
    </>
  ),
  "Troubleshooting Common Issues": (
    <>
      <h3 className="text-xl font-bold mb-2">Troubleshooting Common Issues</h3>
      <p>Having trouble? Here are solutions to the most common problems users face. <br /><br />If you need more help, <a href="#" className="text-pink-600 underline">contact support</a>.</p>
    </>
  ),
  "Account Management": (
    <>
      <h3 className="text-xl font-bold mb-2">Account Management</h3>
      <p>Learn how to update your profile, change your password, and manage your privacy settings.</p>
    </>
  ),
  "Quick Start Video": (
    <>
      <h3 className="text-xl font-bold mb-2">Quick Start Video</h3>
      <video controls className="w-full rounded shadow">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="mt-2 text-sm text-gray-600">A 2-minute overview of how to get started.</p>
    </>
  ),
  "Feature Spotlight Series": (
    <>
      <h3 className="text-xl font-bold mb-2">Feature Spotlight Series</h3>
      <ul className="list-disc ml-6">
        <li>Smart Matching</li>
        <li>Profile Customization</li>
        <li>Community Events</li>
      </ul>
    </>
  ),
  "Expert Tips & Tricks": (
    <>
      <h3 className="text-xl font-bold mb-2">Expert Tips & Tricks</h3>
      <p>Discover how to make the most of your experience with advice from our top users.</p>
    </>
  ),
  "Integration Tutorials": (
    <>
      <h3 className="text-xl font-bold mb-2">Integration Tutorials</h3>
      <p>Step-by-step guides for integrating with third-party tools and services.</p>
    </>
  ),
  "Complete User Manual": (
    <>
      <h3 className="text-xl font-bold mb-2">Complete User Manual</h3>
      <p>Download the full user manual as a PDF: <a href="#" className="text-pink-600 underline">Download</a></p>
    </>
  ),
  "Developer Documentation": (
    <>
      <h3 className="text-xl font-bold mb-2">Developer Documentation</h3>
      <p>API endpoints, authentication, and integration details for developers.</p>
    </>
  ),
  "API Reference Guide": (
    <>
      <h3 className="text-xl font-bold mb-2">API Reference Guide</h3>
      <p>Comprehensive API reference with code samples and usage notes.</p>
    </>
  ),
  "Migration Guide": (
    <>
      <h3 className="text-xl font-bold mb-2">Migration Guide</h3>
      <p>Instructions for migrating your data from other platforms to ours.</p>
    </>
  ),
  "Feature Requests": (
    <>
      <h3 className="text-xl font-bold mb-2">Feature Requests</h3>
      <p>Submit your ideas and vote on features you want to see next!</p>
    </>
  ),
  "User Showcase": (
    <>
      <h3 className="text-xl font-bold mb-2">User Showcase</h3>
      <p>See how other users are making the most of our platform.</p>
    </>
  ),
  "Integration Examples": (
    <>
      <h3 className="text-xl font-bold mb-2">Integration Examples</h3>
      <p>Real-world examples of integrations with popular tools.</p>
    </>
  ),
  "Technical Discussions": (
    <>
      <h3 className="text-xl font-bold mb-2">Technical Discussions</h3>
      <p>Join the conversation with other users and our engineering team.</p>
    </>
  ),
};

const viewAllContent = {
  "kb": (
    <>
      <h3 className="text-2xl font-bold mb-4">All Knowledge Base Articles</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li>Getting Started Guide</li>
        <li>Advanced Features Tutorial</li>
        <li>Troubleshooting Common Issues</li>
        <li>Account Management</li>
        <li>Security Best Practices</li>
        <li>FAQ</li>
      </ul>
    </>
  ),
  "videos": (
    <>
      <h3 className="text-2xl font-bold mb-4">All Video Tutorials</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li>Quick Start Video</li>
        <li>Feature Spotlight Series</li>
        <li>Expert Tips & Tricks</li>
        <li>Integration Tutorials</li>
        <li>Live Q&A Sessions</li>
      </ul>
    </>
  ),
  "guides": (
    <>
      <h3 className="text-2xl font-bold mb-4">All User Guides</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li>Complete User Manual</li>
        <li>Developer Documentation</li>
        <li>API Reference Guide</li>
        <li>Migration Guide</li>
        <li>Release Notes</li>
      </ul>
    </>
  ),
  "community": (
    <>
      <h3 className="text-2xl font-bold mb-4">All Community Forum Topics</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li>Feature Requests</li>
        <li>User Showcase</li>
        <li>Integration Examples</li>
        <li>Technical Discussions</li>
        <li>Off-topic Lounge</li>
      </ul>
    </>
  ),
};

function Modal({ open, onClose, children }) {
  // Trap focus and close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-pink-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const ResourcesPage = () => {
  const [selectedResource, setSelectedResource] = useState(null); // category id for expanded card
  const [modalContent, setModalContent] = useState(null); // { type: 'item'|'viewAll', categoryId, item }
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

  const handleResourceClick = (categoryId) => {
    setSelectedResource(selectedResource === categoryId ? null : categoryId);
  };

  const handleItemClick = (item) => {
    setModalContent({ type: 'item', item });
  };

  const handleViewAll = (categoryId) => {
    setModalContent({ type: 'viewAll', categoryId });
  };

  const closeModal = () => setModalContent(null);

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
                        <button
                          className="text-pink-700 hover:text-pink-900 text-left flex items-center py-2 text-lg group"
                          onClick={() => handleItemClick(item)}
                          type="button"
                        >
                          <span className="mr-2 text-pink-400">•</span>
                          <span className="group-hover:underline">{item}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-right">
                    <button
                      className="text-pink-600 hover:text-pink-800 font-medium hover:underline"
                      onClick={() => handleViewAll(category.id)}
                      type="button"
                    >
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

      {/* Modal for resource item or view all */}
      <Modal
        open={!!modalContent}
        onClose={closeModal}
      >
        {modalContent?.type === 'item' && (
          <div>
            {resourceContent[modalContent.item] || (
              <div>
                <h3 className="text-xl font-bold mb-2">{modalContent.item}</h3>
                <p>No additional information available for this resource.</p>
              </div>
            )}
          </div>
        )}
        {modalContent?.type === 'viewAll' && (
          <div>
            {viewAllContent[modalContent.categoryId] || (
              <div>
                <h3 className="text-xl font-bold mb-2">All Resources</h3>
                <p>No additional resources available for this category.</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ResourcesPage;
