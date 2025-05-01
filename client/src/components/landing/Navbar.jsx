import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  const navItems = [ 
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  // Logo animation variants - enhanced with more exciting effects
  const logoVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.5,
      rotateY: -90
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8
      }
    },
    hover: { 
      scale: 1.1,
      filter: "brightness(1.2)",
      rotateZ: [0, -5, 5, -3, 0],
      y: [0, -5, 0],
      transition: { 
        duration: 0.7, 
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 1],
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Nav items animation variants
  const navItemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        delay: i * 0.1 
      }
    }),
    hover: { 
      scale: 1.1,
      color: "#FF5A8A",
      transition: { duration: 0.2 }
    }
  };

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.a 
          href="#" 
          className="flex items-center"
          variants={logoVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          {/* Replace Heart icon with your logo image */}
          <img 
            src="/assets/miLogo2.png" 
            alt="MiAmour Logo" 
            className="h-10 w-auto mr-2"
          />
          <span className="font-serif text-2xl font-bold text-secondary-800">
            Mi<span className="text-primary-500">amour</span>
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`font-medium transition-colors duration-200 ${
                isScrolled ? 'text-gray-800' : 'text-gray-800'
              }`}
              variants={navItemVariants}
              custom={index}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.3 }
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 }
              }
            }}
          >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="font-medium text-gray-800 hover:text-primary-500 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: index * 0.1, duration: 0.3 }
                }}
                whileHover={{ x: 5 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;