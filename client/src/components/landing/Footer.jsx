import {  Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary-800 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
                <img 
                src="/assets/miLogo2.png" 
                alt="MiAmour Logo" 
                className="h-10 w-auto mr-2"
              />
              <span className="font-serif text-xl font-bold">
                Mi<span className="text-primary-400">amour</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              Where true love meets wedding dreams. Start your forever journey today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-300 hover:text-primary-400 transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-300 hover:text-primary-400 transition-colors">Success Stories</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-primary-400 transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/about-us" className="text-gray-300 hover:text-primary-400 transition-colors">About Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/dating-tips" className="text-gray-300 hover:text-primary-400 transition-colors">Dating Tips</Link>
              </li>
              <li>
                <Link to="/safety-guide" className="text-gray-300 hover:text-primary-400 transition-colors">Safety Guide</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-primary-400 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/help-center" className="text-gray-300 hover:text-primary-400 transition-colors">Help Center</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="text-gray-300">
                
              </li>
              <li className="text-gray-300">
                
              </li>
              <li>
                <a href="mailto:hello@miamour.me" className="text-gray-300 hover:text-primary-400 transition-colors">info@miamour.me</a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-gray-300 hover:text-primary-400 transition-colors"></a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {currentYear} MiAmour. All rights reserved. <Link to="/privacy-policy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link> | <Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link></p>
          <p className="mt-2">Developed by <a href="https://arigotechnologies.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">Arigo Technologies</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;