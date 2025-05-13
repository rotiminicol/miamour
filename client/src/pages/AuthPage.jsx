import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import banner from '../assets/wedding19.png';
import logo from '../assets/miLogo.png';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignUpForm';
import GoogleAuthFlow from '../components/GoogleAuthFlow';
import IjeuwaAuthFlow from '../components/IjeuwaAuthFlow';
import { useAuthStore } from '../store/useAuthStore';

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState('signup');
  const [authMode, setAuthMode] = useState('signup');
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser, checkingAuth } = useAuthStore();

  useEffect(() => {
    if (checkingAuth) {
      return; // Don't perform any navigation while checking auth
    }

    if (authUser) {
      navigate('/homepage', { replace: true });
    }
  }, [authUser, checkingAuth, navigate]);

  if (checkingAuth) {
    return null; // Don't render anything while checking auth
  }

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
    navigate('/profile', { replace: true });
  };

  const handleAuthCancel = () => {
    setActiveForm(authMode);
  };

  // Determine the title based on active form
  const getFormTitle = () => {
    switch (activeForm) {
      case 'login':
        return 'Welcome Back';
      case 'signup':
        return 'Find Your Perfect Match';
      case 'google':
        return authMode === 'login' ? 'Login with Google' : 'Sign up with Google';
      case 'ijeuwa':
        return authMode === 'login' ? 'Login with Ijeuwa' : 'Sign up with Ijeuwa';
      default:
        return 'Join miamour';
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="h-full w-full bg-white shadow-2xl rounded-none">
        <div className="h-full flex flex-col md:flex-row">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-center gap-4 p-4 bg-pink-600">
            <img
              src={logo}
              alt="miamour Logo"
              className="w-10 h-10 object-cover rounded-full"
              loading="lazy"
            />
            <h1 className="font-serif text-xl font-bold text-white">
              miamour
            </h1>
          </div>

          {/* Form Section */}
          <div className="flex-1 h-full flex flex-col p-6 md:p-8">
            {activeForm === 'login' && (
              <LoginForm
                toggleForm={toggleForm}
                onGoogleClick={handleGoogleAuth}
                onIjeuwaClick={handleIjeuwaAuth}
              />
            )}
            {activeForm === 'signup' && (
              <SignupForm
                toggleForm={toggleForm}
                onGoogleClick={handleGoogleAuth}
                onIjeuwaClick={handleIjeuwaAuth}
              />
            )}
            {activeForm === 'google' && (
              <GoogleAuthFlow
                isLogin={authMode === 'login'}
                onSuccess={handleAuthSuccess}
                onCancel={handleAuthCancel}
              />
            )}
            {activeForm === 'ijeuwa' && (
              <IjeuwaAuthFlow
                isLogin={authMode === 'login'}
                onSuccess={handleAuthSuccess}
                onCancel={handleAuthCancel}
              />
            )}
          </div>

          {/* Banner Section */}
          <div className="hidden md:flex flex-1 relative bg-gradient-to-br from-pink-500 to-purple-600">
            <img
              src={banner}
              alt="Authentication illustration"
              className="w-full h-full object-cover opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-pink-500/30 to-purple-600/40"></div>
            <div className="absolute top-8 left-8 flex items-center gap-4">
              <img
                src={logo}
                alt="miamour Logo"
                className="w-12 h-12 object-cover rounded-full border-2 border-white"
                loading="lazy"
              />
              <h1 className="font-serif text-2xl font-bold text-white">
                miamour
              </h1>
            </div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h2 className="text-3xl font-serif font-bold mb-4">
                {getFormTitle()}
              </h2>
              <p className="text-lg">
                {activeForm === 'login'
                  ? 'Welcome back to your journey to lasting love'
                  : 'Join miamour and begin your journey to lasting love'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;