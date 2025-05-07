
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/wedding19.png';
import logo from '../assets/miLogo.png';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignUpForm';
import GoogleAuthFlow from '../components/GoogleAuthFlow';
import IjeuwaAuthFlow from '../components/IjeuwaAuthFlow';

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState('signup'); // signup, login, google, ijeuwa
  const [authMode, setAuthMode] = useState('signup'); // tracks if we're in login or signup flow
  const navigate = useNavigate();

  const toggleForm = () => {
    setActiveForm(activeForm === 'login' ? 'signup' : 'login');
    setAuthMode(activeForm === 'login' ? 'signup' : 'login');
  };

  const handleGoogleAuth = () => {
    setActiveForm('google');
  };

  const handleIjeuwaAuth = () => {
    setActiveForm('ijeuwa');
  };

  const handleAuthSuccess = () => {
    navigate('/profile');
  };

  const handleAuthCancel = () => {
    setActiveForm(authMode); // Go back to the original form (login or signup)
  };

  // Determine the title based on active form
  const getFormTitle = () => {
    switch (activeForm) {
      case 'login': return 'Welcome Back';
      case 'signup': return 'Find Your Perfect Match';
      case 'google': return authMode === 'login' ? 'Login with Google' : 'Sign up with Google';
      case 'ijeuwa': return authMode === 'login' ? 'Login with Ijeuwa' : 'Sign up with Ijeuwa';
      default: return 'Join miamour';
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
      {/* Main Card - Fullscreen on mobile, max-width on desktop */}
      <div className="w-full h-full md:w-[90vw] md:max-w-6xl md:h-[80vh] md:max-h-[700px] bg-white/90 rounded-none md:rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row relative z-10">
        {/* Logo Section - Hidden on mobile */}
        <div className="hidden md:flex absolute top-4 left-4 md:top-6 md:left-6 z-20 items-center gap-3">
          <img
            src={logo}
            alt="miamour Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full"
          />
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-pink-600">
            miamour
          </h1>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 h-full bg-white/95 flex items-center justify-center order-2 md:order-2">
          {activeForm === 'login' && (
            <div className="w-full h-full flex items-center justify-center">
              <LoginForm
                toggleForm={toggleForm}
                onGoogleClick={handleGoogleAuth}
                onIjeuwaClick={handleIjeuwaAuth}
              />
            </div>
          )}

          {activeForm === 'signup' && (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <SignupForm
                toggleForm={toggleForm}
                onGoogleClick={handleGoogleAuth}
                onIjeuwaClick={handleIjeuwaAuth}
              />
            </div>
          )}

          {activeForm === 'google' && (
            <div className="w-full h-full flex items-center justify-center">
              <GoogleAuthFlow
                isLogin={authMode === 'login'}
                onSuccess={handleAuthSuccess}
                onCancel={handleAuthCancel}
              />
            </div>
          )}

          {activeForm === 'ijeuwa' && (
            <div className="w-full h-full flex items-center justify-center">
              <IjeuwaAuthFlow
                isLogin={authMode === 'login'}
                onSuccess={handleAuthSuccess}
                onCancel={handleAuthCancel}
              />
            </div>
          )}
        </div>

        {/* Image Section - Hidden on mobile for performance */}
        <div className="hidden md:block w-1/2 h-full bg-pink-100 relative order-1">
          <img
            src={banner}
            alt="Authentication illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-purple-600/30"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
              {getFormTitle()}
            </h2>
            <p className="text-base md:text-lg">
              {activeForm === 'login'
                ? 'Welcome back to your journey to lasting love'
                : 'Join miamour and begin your journey to lasting love'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
