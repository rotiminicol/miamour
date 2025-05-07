
import { useState, useEffect } from 'react';

/**
 * Navbar component without any animation or Framer Motion logic.
 * - Responsive, sticky, and clean.
 * - Maintains scroll and mobile menu logic.
 * - Accessible and senior-level code clarity.
 */
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

  return (
    <nav className={navbarClasses} role="navigation" aria-label="Main Navigation">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center" aria-label="Miamour Home">
          <img
            src="/assets/miLogo2.png"
            alt="Miamour Logo"
            className="h-10 w-auto mr-2"
          />
          <span className="font-serif text-2xl font-bold text-secondary-800">
            Mi<span className="text-primary-500">amour</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`font-medium transition-colors duration-200 ${
                isScrolled ? 'text-gray-800' : 'text-gray-800'
              } hover:text-primary-500`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
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
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white shadow-lg"
          role="menu"
          aria-label="Mobile Navigation"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-medium text-gray-800 hover:text-primary-500 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
