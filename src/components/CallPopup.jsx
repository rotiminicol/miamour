import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Phone } from "lucide-react";
import ContactPopup from "../components/ContactPopup";

const CallPopup = ({ onClose }) => {
    const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Call Us</h2>
        <p className="mb-6 text-gray-600">Please call us on one of the following numbers:</p>
        <div className="flex flex-col gap-4">
            <button 
            onClick={() => setShowPopup(true)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
              <Phone className="w-5 h-5" />
              Call +35796471717
            </button>
          
          
            <button 
            onClick={() => setShowPopup(true)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
              <Phone className="w-5 h-5" />
              Call +35796005009
            </button>
        
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95"
        >
          Close
        </button>
      </div>
      {showPopup && <ContactPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

// Add PropTypes validation
CallPopup.propTypes = {
  onClose: PropTypes.func.isRequired, // Validate that onClose is a function and is required
};

export default CallPopup;