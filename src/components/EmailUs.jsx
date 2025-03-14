import PropTypes from "prop-types"; 

const EmailPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl animate-fadeInRight">
        <h2 className="text-4xl font-bold text-pink-700 mb-6">Connect with Miamour</h2>
        <p className="text-lg text-gray-600 mb-8">
          Let’s make your dream wedding a reality. Share your vision with us, and we’ll craft
          memories that last a lifetime.
        </p>

        <form
          action="https://getform.io/f/miamour-contact"
          method="POST"
          className="space-y-6"
        >
          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                required
                placeholder="Jane & John"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                placeholder="janejohn@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              placeholder="Tell us about your love story or wedding ideas..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 resize-y min-h-32 max-h-80"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-pink-600 hover:to-red-600"
            >
              Send Message
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add PropTypes validation
EmailPopup.propTypes = {
  onClose: PropTypes.func.isRequired, // Validate that onClose is a function and is required
};

export default EmailPopup;