import { useState } from "react";
import AuthPopup from "./AuthPopup"; // Import the Popup Component

const Deals = () => {
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  return (
    <div
      id="deals"
      className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 flex justify-center items-center text-gray-900 relative overflow-hidden"
    >
      {/* Decorative Blurred Circles */}
      <div className="absolute w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl -top-32 -left-32 animate-float"></div>
      <div className="absolute w-96 h-96 bg-red-200 rounded-full opacity-20 blur-3xl -bottom-32 -right-32 animate-float-delay"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1
            data-aos="fade-up"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold font-[Playfair Display] leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
              Choose Your Plan
            </span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-xl sm:text-2xl text-gray-700 max-w-2xl mx-auto mt-4"
          >
            Start your journey to a stronger relationship with our flexible plans. All plans include a <span className="font-semibold text-pink-600">7-day free trial</span>.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-white p-8 rounded-2xl shadow-lg border-2 border-pink-100 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Free</h2>
            <p className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-lg text-gray-500">/month</span></p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Access to basic features
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Limited counseling sessions
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Community support
              </li>
            </ul>
            <button
              onClick={() => setShowPopup(true)}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-500 hover:to-pink-500 transition-all duration-300"
            >
              Start Free Trial
            </button>
          </div>

          {/* Premium Plan */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="bg-white p-8 rounded-2xl shadow-lg border-2 border-pink-100 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Premium</h2>
            <p className="text-4xl font-bold text-gray-900 mb-6">$49<span className="text-lg text-gray-500">/month</span></p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Unlimited counseling sessions
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Personalized counseling plans
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Priority support
              </li>
            </ul>
            <button
              onClick={() => setShowPopup(true)}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-500 hover:to-pink-500 transition-all duration-300"
            >
              Start Free Trial
            </button>
          </div>

          {/* Classic Plan */}
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="bg-white p-8 rounded-2xl shadow-lg border-2 border-pink-100 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Classic</h2>
            <p className="text-4xl font-bold text-gray-900 mb-6">$29<span className="text-lg text-gray-500">/month</span></p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Weekly counseling sessions
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Access to premium resources
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Email support
              </li>
            </ul>
            <button
              onClick={() => setShowPopup(true)}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-500 hover:to-pink-500 transition-all duration-300"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </div>

      {/* Render Popup Conditionally */}
      {showPopup && <AuthPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Deals;