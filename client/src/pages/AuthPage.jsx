import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import BannerImg from "../assets/myguy.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl shadow-xl">
      {/* Left Side - Brand / Image */}
      <div className="hidden lg:block relative bg-pink-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-purple-800 opacity-90"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <img
          src={BannerImg}
          alt="Mi Amour Brand"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>



        {/* Right Side - Form */}
        <div className="bg-white p-8 md:p-12 lg:p-16">
          {/* Logo on mobile only */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-600">MI AMOUR</h1>
            <div className="w-12 h-1 bg-purple-200 mx-auto my-4"></div>
          </div>

          
          {/* Form */}
          <div className="mb-8 w-full">
            {isLogin ? <LoginForm /> : <SignUpForm />}
          </div>

          {/* Social Login */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Ijeuwa Button */}
          <button className="w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Continue with Ijeuwa
          </button>

          {/* Toggle Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <p className="text-slate-500 mb-4 md:mb-0">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className="px-6 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-all duration-300"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </div>
          
          {/* Social proof with logos */}
          <div className="mt-12 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-400 mb-4 text-center">Trusted by over 2 million users worldwide</p>
            <div className="flex justify-center space-x-8">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                </svg>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;