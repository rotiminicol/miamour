import { Header } from "../components/Header";
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const DatingApp = () => {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 300], [0, 100]);
  const featuresParallax = useTransform(scrollY, [300, 600], [0, 50]);
  const howItWorksParallax = useTransform(scrollY, [600, 900], [0, 50]);
  const testimonialsParallax = useTransform(scrollY, [900, 1200], [0, 50]);

  const features = [
    { title: "AI-Powered Matching", description: "Our algorithm analyzes over 100 factors to find your ideal match.", icon: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" },
    { title: "Advanced Verification", description: "Secure ID verification ensures a safe dating experience.", icon: "M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" },
  ];

  const howItWorks = [
    { step: 1, title: "Create Profile", description: "Sign up and build your profile with photos and details." },
    { step: 2, title: "Receive Matches", description: "Get daily matches based on compatibility." },
  ];

  const testimonials = [
    { names: "Sarah & Michael", date: "April 2024", quote: "MiAmour’s personality matching was spot on! We’re planning our wedding.", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="relative bg-gradient-to-r from-pink-500 to-pink-700 text-white overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-20" 
          style={{ y: heroParallax }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} 
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }} 
          css={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Find Your Match with MiAmour</h1>
            <p className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto">Our AI connects you with compatible partners based on personality and values.</p>
            <Link to="/counseling" className="inline-flex items-center text-pink-200 hover:text-white transition-colors mb-8">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              Back to Counseling
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          id="features"
          style={{ y: featuresParallax }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose MiAmour?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} whileHover={{ y: -5 }} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d={feature.icon} clipRule="evenodd"/></svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          id="how-it-works"
          style={{ y: howItWorksParallax }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How MiAmour Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div key={index} whileHover={{ y: -5 }} className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-pink-600 font-bold text-xl">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          id="testimonials"
          style={{ y: testimonialsParallax }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} whileHover={{ y: -5 }} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.names}</h4>
                    <div className="text-pink-600">Matched {testimonial.date}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.quote}</p>
                <div className="flex text-yellow-400 mt-4">{Array(testimonial.rating).fill('★').join('')}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-pink-500 to-pink-700 rounded-2xl p-8 text-center max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Match?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://play.google.com/store/apps/details?id=com.miamour" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
              Google Play
            </a>
            <a 
              href="https://apps.apple.com/app/id1234567890" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
              </svg>
              App Store
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DatingApp;