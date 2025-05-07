import { useState } from 'react';
import { Send, Check } from 'lucide-react';

/**
 * Contact section without any animation or framer-motion logic.
 * - Form and submission logic is preserved.
 * - All transitions and intersection observer logic removed.
 * - Accessible and senior-level code clarity.
 */
const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formState);

    // Simulate a successful submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <section id="contact" className="section py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-4xl mb-4 text-secondary-800">
            Begin Your <span className="text-primary-500">Journey</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ready to find your soulmate? Contact us today and take the first step towards forever.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft p-8">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="bg-primary-100 rounded-full p-4 mb-6">
                  <Check className="h-12 w-12 text-primary-500" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4 text-secondary-800">Thank You!</h3>
                <p className="text-gray-600 mb-6">
                  We have received your message and will be in touch shortly to help you begin your journey to finding love.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-2xl font-serif font-semibold mb-6 text-secondary-800">Contact Us</h3>

                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none transition-all"
                    placeholder="Tell us a bit about what you're looking for"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div className="p-6 lg:p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-serif font-semibold mb-6 text-secondary-800">Why Join Us?</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary-100 rounded-full p-2 mr-4">
                  <div className="bg-primary-500 h-2 w-2 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-2">Meaningful Connections</h4>
                  <p className="text-gray-600">Our platform focuses on deep compatibility beyond surface-level interests.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-100 rounded-full p-2 mr-4">
                  <div className="bg-primary-500 h-2 w-2 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-2">Expert Guidance</h4>
                  <p className="text-gray-600">Relationship specialists available to support your journey at every step.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-100 rounded-full p-2 mr-4">
                  <div className="bg-primary-500 h-2 w-2 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-2">Proven Results</h4>
                  <p className="text-gray-600">Thousands of successful matches and marriages from our platform.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-100 rounded-full p-2 mr-4">
                  <div className="bg-primary-500 h-2 w-2 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-2">Complete Journey</h4>
                  <p className="text-gray-600">From first match to wedding day, we are with you every step of the way.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
