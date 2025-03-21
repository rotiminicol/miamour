import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { 
  Flame, User, LogOut, Menu, Heart, CreditCard, 
  MessageCircle, HelpCircle, ChevronDown, Bell, Settings, 
  Calendar, ChevronRight, X, Home, Shield, FileText, Gift
} from "lucide-react";

export const Header = () => {
  const { authUser, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const dropdownRef = useRef(null);

  const categories = {
    personal: [
      { icon: <User size={18} />, text: 'My Account', to: '/profile' },
      { icon: <Settings size={18} />, text: 'Preferences', to: '/preference' },
      { icon: <Bell size={18} />, text: 'Notifications', to: '/notifications' },
      { icon: <Shield size={18} />, text: 'Privacy', to: '/privacy' },
    ],
    services: [
      { icon: <Heart size={18} />, text: 'Counseling', to: '/marriage-counseling' },
      { icon: <MessageCircle size={18} />, text: 'MiAmour App', to: '/dating-app' },
      { icon: <Calendar size={18} />, text: 'Schedule', to: '/schedule' },
      { icon: <Home size={18} />, text: 'Marriage Planning', to: '/ceremony-planning' }
    ],
    billing: [
      { icon: <CreditCard size={18} />, text: 'Payment Methods', to: '/billing-process' },
      { icon: <CreditCard size={18} />, text: 'Subscriptions', to: '/subscriptions' },
      { icon: <FileText size={18} />, text: 'Invoices', to: '/invoices' },
      { icon: <Gift size={18} />, text: 'Discounts', to: '/discounts' },
        ],
    support: [
      { icon: <HelpCircle size={18} />, text: 'Get Help', to: '/help-support' },
      { icon: <MessageCircle size={18} />, text: 'Contact Us', to: '/contact-us' },
      { icon: <HelpCircle size={18} />, text: 'FAQs', to: '/faqs' },
      { icon: <HelpCircle size={18} />, text: 'Resources', to: '/resources' },
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setActiveCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className='bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <div className='flex items-center'>
            <Link to='/' className='flex items-center space-x-2'>
              <Flame className='w-8 h-8 text-white' />
              <span className='text-2xl font-bold text-white hidden sm:inline'>MIAMOUR</span>
            </Link>
          </div>

          {/* Desktop Dropdown */}
          <div className='hidden md:flex items-center space-x-4'>
            {authUser ? (
              <div className='relative' ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className='flex items-center space-x-2 focus:outline-none group'
                >
                  <div className='relative'>
                    <img
                      src={authUser.image || "/avatar.png"}
                      className='h-12 w-12 object-cover rounded-full border-2 border-white group-hover:border-pink-200 transition-all duration-300 transform group-hover:scale-110'
                      alt='User image'
                    />
                    <span className='absolute bottom-0 right-0 bg-green-500 h-3 w-3 rounded-full border-2 border-white'></span>
                  </div>
                  <div className='flex flex-col items-start'>
                    <span className='text-white font-medium'>{authUser.name}</span>
                    <span className='text-pink-200 text-xs'>Online</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-white transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {dropdownOpen && (
                  <div className='absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-2xl py-2 z-10 overflow-hidden transform transition-all duration-300 origin-top-right'>
                    {/* User Info Section */}
                    <div className='px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-pink-100'>
                      <div className='flex items-center space-x-4'>
                        <img
                          src={authUser.image || "/avatar.png"}
                          className='h-14 w-14 object-cover rounded-full border-2 border-pink-500 shadow-md'
                          alt='User image'
                        />
                        <div>
                          <p className='font-semibold text-gray-800 text-lg'>{authUser.name}</p>
                          <p className='text-sm text-gray-500'>{authUser.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Main Categories */}
                    <div className={`${activeCategory ? 'hidden' : 'block'}`}>
                      {Object.entries(categories).map(([category], index) => (
                        <div key={category} className={index > 0 ? 'border-t border-gray-100' : ''}>
                          <button
                            onClick={() => setActiveCategory(category)}
                            className='w-full px-5 py-3 text-sm font-medium text-left text-gray-700 hover:bg-pink-50 flex items-center justify-between transition-colors duration-200 hover:text-pink-600'
                          >
                            <span className='capitalize font-semibold'>{category}</span>
                            <ChevronRight size={18} className='text-pink-400' />
                          </button>
                        </div>
                      ))}
                      
                      {/* Logout Button */}
                      <div className='border-t border-gray-100 mt-1'>
                        <button
                          onClick={logout}
                          className='w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-pink-50 flex items-center space-x-3 transition-all duration-200 hover:text-pink-600 group'
                        >
                          <LogOut size={18} className='group-hover:translate-x-1 transition-transform duration-200' />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Subcategory View */}
                    {activeCategory && (
                      <div className='animate-fade-in'>
                        <div className='px-5 py-3 flex items-center border-b border-gray-100 bg-pink-50'>
                          <button 
                            onClick={() => setActiveCategory(null)}
                            className='text-pink-500 hover:text-pink-700 mr-3 transform transition-transform duration-200 hover:translate-x-[-3px]'
                          >
                            <ChevronRight size={18} className='transform rotate-180' />
                          </button>
                          <span className='text-sm font-semibold capitalize text-gray-700'>{activeCategory}</span>
                        </div>
                        <div className='py-2'>
                          {categories[activeCategory].map((item, index) => (
                            <Link
                              key={index}
                              to={item.to}
                              className='px-5 py-3 text-sm text-gray-700 hover:bg-pink-50 flex items-center space-x-3 transition-all duration-200 hover:translate-x-2 hover:text-pink-600'
                              onClick={() => {
                                setDropdownOpen(false);
                                setActiveCategory(null);
                              }}
                            >
                              {item.icon}
                              <span>{item.text}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to='/auth'
                  className='text-white hover:text-pink-200 transition duration-150 ease-in-out text-lg font-medium'
                >
                  Login
                </Link>
                <Link
                  to='/auth'
                  className='bg-white text-pink-600 px-6 py-2 rounded-full font-medium hover:bg-pink-100 transition duration-150 ease-in-out transform hover:scale-105'
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className='md:hidden'>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='text-white focus:outline-none'
            >
              <Menu className='size-6' />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden fixed inset-0 bg-white z-50 flex flex-col'>
          <div className='flex justify-between items-center p-4 border-b border-pink-100 bg-pink-600'>
            <div className='flex items-center space-x-2'>
              <Flame className='w-8 h-8 text-white' />
              <span className='text-2xl font-bold text-white'>MIAMOUR</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className='text-white focus:outline-none bg-pink-700 rounded-full p-2 hover:bg-pink-800 transition-colors duration-200'
            >
              <X className='size-5' />
            </button>
          </div>
          
          <div className='flex-1 overflow-y-auto p-5'>
            {authUser ? (
              <>
                {/* User Info Section */}
                <div className='flex items-center space-x-4 mb-8 p-4 bg-gradient-to-r from-pink-500 to-pink-700 rounded-xl shadow-lg'>
                  <img
                    src={authUser.image || "/avatar.png"}
                    className='h-16 w-16 object-cover rounded-full border-3 border-white shadow-md'
                    alt='User image'
                  />
                  <div>
                    <p className='font-semibold text-white text-lg'>{authUser.name}</p>
                    <p className='text-sm text-pink-200'>{authUser.email}</p>
                  </div>
                </div>
                
                {/* Menu Categories */}
                {Object.entries(categories).map(([category, items]) => (
                  <div key={category} className='mb-8'>
                    <h3 className='text-pink-700 text-lg font-semibold mb-3 capitalize'>{category}</h3>
                    <div className='space-y-3'>
                      {items.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.to}
                          className='flex items-center space-x-4 p-4 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 transition-all duration-200 border border-pink-100 shadow-sm'
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className='bg-white p-2 rounded-full shadow-sm'>
                            {item.icon}
                          </div>
                          <span className='font-medium'>{item.text}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Logout Button */}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className='w-full flex items-center justify-center space-x-3 p-4 mt-4 rounded-xl bg-pink-600 text-white hover:bg-pink-700 transition-all duration-200 shadow-lg font-medium'
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className='space-y-4 flex flex-col items-center justify-center h-full'>
                <Link
                  to='/auth'
                  className='w-full p-4 text-xl font-medium text-center text-white bg-pink-600 rounded-xl hover:bg-pink-700 transition-all duration-200 shadow-lg'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to='/auth'
                  className='w-full p-4 text-xl font-medium text-center text-pink-700 bg-white rounded-xl hover:bg-pink-50 transition-all duration-200 shadow-lg border border-pink-200'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};