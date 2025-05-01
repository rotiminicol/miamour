import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleFindMatch = () => {
    navigate('/auth');
  };

  return (
    <section id="hero" className="relative min-h-screen pt-20 flex items-center">
      <div className="absolute inset-0 hero-gradient"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-serif font-bold text-5xl md:text-6xl mb-6 text-secondary">
              Find Your <span className="text-primary">Soulmate</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto md:mx-0">
              Where true love meets wedding dreams. Start your forever journey today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                onClick={handleFindMatch}
                className="btn btn-primary w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Find Your Match
              </motion.button>
              <motion.a
                href="#how-it-works"
                className="btn btn-secondary w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 h-[400px] md:h-[500px] relative"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="w-full h-full rounded-lg overflow-hidden">
              <img 
                src="/assets/hero3.png" 
                alt="Happy interracial couple in love"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;