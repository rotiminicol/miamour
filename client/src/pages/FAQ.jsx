import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does MiAmour match users?",
      answer: "MiAmour uses a combination of user preferences, personality assessments, and advanced algorithms to suggest compatible matches.",
    },
    {
      question: "Is my information secure?",
      answer: "Yes, we prioritize your privacy with industry-standard encryption and strict data protection policies.",
    },
    {
      question: "Can I use MiAmour for free?",
      answer: "MiAmour offers a free basic plan with limited features, and premium plans for enhanced functionality.",
    },
    {
      question: "How do I report an issue?",
      answer: "You can contact our support team via the Help Center or email us at info@miamour_me.com.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-pink-300 text-white py-4">
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Heart className="text-white w-8 h-8 mr-2" />
            <span className="text-2xl font-bold">MiAmour</span>
          </Link>
          <nav>
            <Link to="/" className="text-white hover:text-pink-100 mx-4">Home</Link>
            <Link to="/faq" className="text-white hover:text-pink-100 mx-4">FAQ</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-pink-500 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about using MiAmour.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left bg-pink-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex justify-between items-center"
              >
                <span className="text-lg font-semibold text-pink-500">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-pink-400 transform transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-pink-50 p-4 rounded-b-lg text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
    
    </div>
  );
};

export default FAQ;