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

  if (checkingAuth) {
    return null; // Don't render anything while checking auth
  }

  // Handle authentication state
  useEffect(() => {
    if (authUser) {
      navigate('/homepage', { replace: true });
    }
  }, [authUser, navigate]);

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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="hidden md:flex items-center gap-4 p-4 border-b">
            <img
              src={logo}
              alt="miamour Logo"
              className="w-12 h-12 object-cover rounded-full"
              loading="lazy"
            />
            <h1 className="font-serif text-2xl font-bold text-pink-600">
              miamour
            </h1>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6">
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
            <div className="hidden md:block p-6 bg-pink-100 relative">
              <img
                src={banner}
                alt="Authentication illustration"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-purple-600/30"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-2xl font-serif font-bold mb-2">
                  {getFormTitle()}
                </h2>
                <p className="text-base">
                  {activeForm === 'login'
                    ? 'Welcome back to your journey to lasting love'
                    : 'Join miamour and begin your journey to lasting love'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;