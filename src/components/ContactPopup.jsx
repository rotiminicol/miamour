import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const ContactPopup = ({ onClose }) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Start animation after component mounts
    setTimeout(() => setAnimate(true), 100);
    
    // Add confetti effect
    const confettiElements = [];
    for (let i = 0; i < 100; i++) {
      createConfetti(confettiElements);
    }
    
    return () => {
      // Clean up confetti on unmount
      confettiElements.forEach(element => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, []);
  
  // Function to create a single confetti element
  const createConfetti = (elements) => {
    if (typeof document !== 'undefined') {
      const confetti = document.createElement('div');
      const size = Math.random() * 10 + 5;
      const colors = ['#ff718d', '#fdafc1', '#ffd6e0', '#ffbbd0', '#ff94ab'];
      
      confetti.style.position = 'fixed';
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.top = '-10vh';
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.zIndex = '60';
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.opacity = Math.random() * 0.7 + 0.3;
      confetti.style.pointerEvents = 'none';
      
      document.body.appendChild(confetti);
      elements.push(confetti);
      
      // Animate confetti
      const duration = Math.random() * 3 + 2;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = elapsed / duration;
        
        if (progress < 1) {
          const x = parseFloat(confetti.style.left) + (Math.random() * 2 - 1) * 3;
          const y = progress * 110;
          confetti.style.top = `${y}vh`;
          confetti.style.left = `${x}vw`;
          confetti.style.transform = `rotate(${progress * 360 * 2}deg)`;
          
          requestAnimationFrame(animate);
        } else if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
          const index = elements.indexOf(confetti);
          if (index > -1) elements.splice(index, 1);
        }
      };
      
      requestAnimationFrame(animate);
    }
  };

  // Handle close button click
  const handleClose = () => {
    onClose(); // Call the onClose prop
    window.history.go(-2); // Go back two steps in history
  };

  // Redirect to Instagram
  const redirectToInstagram = () => {
    window.open("https://www.instagram.com/miamour.me", "_blank"); // Replace with your Instagram link
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
      <div 
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-md p-10 relative text-center transform transition-all duration-500 ease-out ${
          animate ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-100 rounded-full opacity-70"></div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-100 rounded-full opacity-70"></div>
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Heart icon */}
        <div className="inline-block mb-4 relative">
          <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-white transform rotate-45 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-pink-500 mb-3">
          Contact This Person
        </h2>
        <p className="text-gray-600 mb-8 px-4">
          To contact this person, download the MiAmour app from the App Store or Play Store. For marriage counseling, register with us.
        </p>

        {/* App Store and Play Store Buttons - Enhanced */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <a
            href="https://www.apple.com/app-store"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gradient-to-br from-gray-800 to-black text-white px-4 py-2 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-700"
          >
            <div className="flex flex-col items-start">
              <span className="text-xs font-light">Download on the</span>
              <span className="text-lg font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.172 16.475a1 1 0 01-1.708 0l-4.5-7A1 1 0 013.536 8h12.928a1 1 0 01.672 1.475l-4.5 7a1 1 0 01-1.464 0z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-1a7 7 0 100-14 7 7 0 000 14z" clipRule="evenodd" />
                </svg>
                App Store
              </span>
            </div>
          </a>
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gradient-to-br from-gray-800 to-black text-white px-4 py-2 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-700"
          >
            <div className="flex flex-col items-start">
              <span className="text-xs font-light">GET IT ON</span>
              <span className="text-lg font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                </svg>
                Google Play
              </span>
            </div>
          </a>
        </div>
        
        {/* Register for Counseling Button */}
        <button
          onClick={redirectToInstagram}
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all transform hover:-translate-y-1 hover:shadow-md"
        >
          Register for Marriage Counseling
        </button>
      </div>
    </div>
  );
};

// Prop validation
ContactPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ContactPopup;