import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);
  const [hoverGetStarted, setHoverGetStarted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();

  const testimonials = [
    { name: "Sarah & Michael", text: "We found each other here and couldn't be happier!", emoji: "❤️" },
    { name: "Jessica & David", text: "From the first message to marriage in just one year!", emoji: "✨" },
    { name: "Aisha & James", text: "The algorithm really works! Perfect match from day one.", emoji: "🥰" }
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const handleFindMatch = () => {
    navigate('/auth');
  };

  const handleGetStarted = () => {
    navigate('/auth');
  };

  // Staggered text animation for heading
  const headingVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const headingText = "Find Your Better Half";
  const headingWords = headingText.split(' ');

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      {/* Enhanced gradient background with radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-primary/15 z-0">
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent rounded-full scale-150 blur-3xl"></div>
      </div>
      
      {/* Container with proper spacing and alignment */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content with enhanced animations */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-6 md:space-y-8"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-gray-900"
                variants={headingVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
              >
                {headingWords.map((word, i) => (
                  <span key={i} className="inline-block mr-4">
                    {word.split('').map((letter, j) => (
                      <motion.span 
                        key={j} 
                        variants={letterVariants}
                        transition={{ duration: 0.4 }}
                        className={`inline-block ${word === 'Perfect' ? 'text-primary' : ''}`}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-600 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Where meaningful connections blossom into lifelong partnerships. Begin your journey to love today.
              </motion.p>
            </div>
            
            {/* CTA buttons with enhanced animations */}
            <motion.div 
              className="flex flex-col xs:flex-row gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                onClick={handleFindMatch}
                className="px-8 py-3.5 rounded-lg bg-primary text-white font-medium transition-all duration-300 shadow-lg"
                whileHover={{ 
                  y: -4, 
                  boxShadow: "0 12px 20px -4px rgba(var(--color-primary-rgb), 0.4)"
                }}
                whileTap={{ scale: 0.97 }}
                onHoverStart={() => setHoverButton(true)}
                onHoverEnd={() => setHoverButton(false)}
                style={{ 
                  boxShadow: "0 8px 16px -4px rgba(var(--color-primary-rgb), 0.3)"
                }}
              >
                <motion.span
                  initial={{ scale: 1 }}
                  animate={hoverButton ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center gap-2"
                >
                  Start Matching Now
                  <motion.svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    animate={hoverButton ? { x: [0, 4, 0] } : {}}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <path d="M8 1L15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </motion.span>
              </motion.button>
              
              <motion.button
                onClick={handleGetStarted}
                className="px-8 py-3.5 rounded-lg bg-white text-primary border-2 border-primary font-medium transition-all duration-300 shadow-lg"
                whileHover={{ 
                  y: -4, 
                  boxShadow: "0 12px 20px -4px rgba(var(--color-primary-rgb), 0.3)"
                }}
                whileTap={{ scale: 0.97 }}
                onHoverStart={() => setHoverGetStarted(true)}
                onHoverEnd={() => setHoverGetStarted(false)}
                style={{ 
                  boxShadow: "0 8px 16px -4px rgba(var(--color-primary-rgb), 0.2)"
                }}
              >
                <motion.span
                  initial={{ scale: 1 }}
                  animate={hoverGetStarted ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center gap-2"
                >
                  Get Started
                  <motion.svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    animate={hoverGetStarted ? { x: [0, 4, 0] } : {}}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <path d="M8 1L15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </motion.span>
              </motion.button>
              
              <motion.a
                href="#how-it-works"
                className="px-8 py-3.5 rounded-lg border-2 border-gray-300 font-medium hover:border-primary hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                How It Works
                <motion.svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop" }}
                >
                  <path d="M8 3L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3 8L8 13L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </motion.a>
            </motion.div>
            
            {/* Enhanced trust indicators */}
            <motion.div 
              className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <motion.img 
                    key={item}
                    src={`https://i.pravatar.cc/150?img=${item + 10}`}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full border-2 border-white"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 1 + item * 0.1 }}
                    whileHover={{ y: -4, zIndex: 10 }}
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700">Join 10,000+ happy couples</span>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.svg
                      key={star}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#FFB800"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 1.2 + star * 0.1 }}
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </motion.svg>
                  ))}
                  <span className="ml-2 text-gray-600">4.9/5 rating</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Enhanced image section with 3D effect and floating elements */}
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="relative aspect-[4/5] md:aspect-square lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl"
              animate={{ rotateY: [0, 2, 0, -2, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Main image */}
              <img 
                src="/assets/mi4.png" 
                alt="Happy couple in love"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
              
              {/* Decorative floating elements */}
              <motion.div
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                <motion.div
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  ❤️
                </motion.div>
              </motion.div>
              
              {/* Animated floating message */}
              <motion.div
                className="absolute bottom-24 right-6 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-2xl">
                  💌
                </div>
              </motion.div>
              
              {/* Rotating testimonial cards */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTestimonial}
                  className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-xl max-w-xs border-l-4 border-primary"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="text-primary text-lg">{testimonials[activeTestimonial].emoji}</span>
                    </motion.div>
                    <span className="font-medium">{testimonials[activeTestimonial].name}</span>
                  </div>
                  <p className="text-sm text-gray-700">{testimonials[activeTestimonial].text}</p>
                  
                  {/* Testimonial indicators */}
                  <div className="mt-3 flex gap-1 justify-center">
                    {testimonials.map((_, i) => (
                      <motion.div 
                        key={i}
                        className={`w-2 h-2 rounded-full ${i === activeTestimonial ? 'bg-primary' : 'bg-gray-300'}`}
                        animate={i === activeTestimonial ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 1 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Subtle pulsing highlight effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(var(--color-primary-rgb), 0)",
                    "0 0 0 10px rgba(var(--color-primary-rgb), 0.1)",
                    "0 0 0 0 rgba(var(--color-primary-rgb), 0)"
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 hidden md:block"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-8 h-14 border-2 border-gray-400 rounded-full flex items-center justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-primary rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;