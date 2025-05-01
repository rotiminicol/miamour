import { Header } from "../components/Header";
const DatingApp = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100">
      <Header />
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-rose-500">MiAmour</span>
                <svg className="ml-2 h-6 w-6 text-rose-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a href="#features" className="text-gray-700 hover:text-rose-500 px-3 py-2 font-medium">Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-rose-500 px-3 py-2 font-medium">How It Works</a>
                <a href="#testimonials" className="text-gray-700 hover:text-rose-500 px-3 py-2 font-medium">Testimonials</a>
                <a href="#faq" className="text-gray-700 hover:text-rose-500 px-3 py-2 font-medium">FAQ</a>
              </div>
              <button className="ml-6 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md font-medium">Download App</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Find Your Perfect Match with MiAmour</h1>
                <p className="text-lg text-gray-600 mb-8">The dating app that uses advanced AI to connect you with compatible partners based on personality, interests, and values.</p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                    </svg>
                    App Store
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
                    </svg>
                    Google Play
                  </button>
                </div>
              </div>
              <div className="relative">
                <img src="/api/placeholder/300/600" alt="MiAmour App" className="mx-auto rounded-xl shadow-xl" />
                <div className="absolute -right-4 -top-4 bg-rose-100 p-3 rounded-lg shadow-md">
                  <div className="text-rose-500 font-bold text-xl">500K+</div>
                  <div className="text-gray-600 text-sm">Active Users</div>
                </div>
                <div className="absolute -left-4 -bottom-4 bg-rose-100 p-3 rounded-lg shadow-md">
                  <div className="text-rose-500 font-bold text-xl">95%</div>
                  <div className="text-gray-600 text-sm">Match Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose MiAmour?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our unique approach to matchmaking sets us apart from other dating apps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-rose-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI-Powered Matching</h3>
              <p className="text-gray-600">Our proprietary algorithm analyzes over 100 compatibility factors to find your ideal match.</p>
            </div>
            <div className="bg-rose-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Advanced Verification</h3>
              <p className="text-gray-600">All profiles are verified using our secure ID verification process for a safe dating experience.</p>
            </div>
            <div className="bg-rose-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Personality-Based</h3>
              <p className="text-gray-600">Go beyond physical attraction with our in-depth personality assessment and compatibility scores.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How MiAmour Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Finding your match is simple with our easy-to-use platform.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-rose-500 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Create Profile</h3>
              <p className="text-gray-600">Sign up and build your detailed profile with photos and personal information.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-rose-500 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Take Assessment</h3>
              <p className="text-gray-600">Complete our comprehensive personality and preference assessment.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-rose-500 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Receive Matches</h3>
              <p className="text-gray-600">Get daily matches based on your compatibility and preferences.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-rose-500 font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect</h3>
              <p className="text-gray-600">Start meaningful conversations and plan to meet in person when ready.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-rose-500 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500K+</div>
              <div>Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">75%</div>
              <div>Find Match in 1 Month</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div>Successful Relationships</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8/5</div>
              <div>App Store Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from couples who found their perfect match on MiAmour.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/50/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-800">Sarah & Michael</h4>
                  <div className="text-rose-500">Matched April 2024</div>
                </div>
              </div>
              <p className="text-gray-600 italic">The personality matching on MiAmour was spot on! Michael and I had so much in common from the start. Were now planning our wedding for next year.</p>
              <div className="flex text-yellow-400 mt-4">
                ★★★★★
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/50/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-800">David & James</h4>
                  <div className="text-rose-500">Matched January 2024</div>
                </div>
              </div>
              <p className="text-gray-600 italic">After trying several dating apps with no luck, I found James on MiAmour within two weeks. The compatibility matching really works! Weve been inseparable ever since.</p>
              <div className="flex text-yellow-400 mt-4">
                ★★★★★
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/50/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-800">Priya & Aisha</h4>
                  <div className="text-rose-500">Matched October 2023</div>
                </div>
              </div>
              <p className="text-gray-600 italic">MiAmour helped me find someone who shares my values and goals. The detailed profiles and meaningful conversations led me to meet Aisha, and weve been together ever since.</p>
              <div className="flex text-yellow-400 mt-4">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Get answers to common questions about MiAmour.</p>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Is MiAmour free to use?</h3>
              <p className="text-gray-600">MiAmour offers both free and premium membership options. Basic matching is free, while premium features include unlimited matches, read receipts, and priority profile visibility.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How does the matching algorithm work?</h3>
              <p className="text-gray-600">Our AI-powered algorithm analyzes over 100 factors including personality traits, values, life goals, and interests to find compatible matches. We use both psychological principles and machine learning to improve matches over time.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">Yes, we take privacy and security seriously. All personal data is encrypted, and we never share your information with third parties. Our verification process ensures that all users are genuine.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How many matches will I receive?</h3>
              <p className="text-gray-600">Free members receive up to 5 quality matches per day. Premium members receive unlimited matches and can also see who has liked their profile.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-rose-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Find Your Perfect Match?</h2>
          <p className="text-gray-600 mb-8 text-lg">Join over 500,000 singles who have found meaningful connections on MiAmour.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center mx-auto sm:mx-0">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
              </svg>
              Download on App Store
            </button>
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center mx-auto sm:mx-0">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
              </svg>
              Get it on Google Play
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-rose-400">MiAmour</span>
                <svg className="ml-2 h-6 w-6 text-rose-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                </svg>
              </div>
              <p className="text-gray-400">Find your perfect match with our AI-powered dating app.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Dating Tips</li>
                <li>Success Stories</li>
                <li>Safety Guidelines</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>Community Guidelines</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Miamour Dating App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DatingApp;