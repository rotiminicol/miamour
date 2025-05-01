import Logo from "../public/assets/miLogo2.png"; // Your logo path
import { useEffect, useState } from "react";

const WeddingLoader = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : prev));
    }, 30);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-ivory/95 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="relative flex flex-col items-center justify-center w-full max-w-md">
        {/* Floral Elements */}
        <div className="absolute -top-10 -left-10 opacity-30">
          <svg className="w-32 h-32 text-rose-300 animate-float-slow" viewBox="0 0 100 100">
            <path d="M50 10 Q60 30 70 10 Q80 30 90 10 Q80 40 90 50 Q80 60 90 70 Q80 80 70 70 Q60 80 50 70 Q40 80 30 70 Q20 80 10 70 Q20 60 10 50 Q20 40 10 10 Q20 30 30 10 Q40 30 50 10" fill="currentColor" />
          </svg>
        </div>
        
        <div className="absolute -bottom-10 -right-10 opacity-30">
          <svg className="w-32 h-32 text-rose-300 animate-float-slow animation-delay-2000" viewBox="0 0 100 100">
            <path d="M50 10 Q60 30 70 10 Q80 30 90 10 Q80 40 90 50 Q80 60 90 70 Q80 80 70 70 Q60 80 50 70 Q40 80 30 70 Q20 80 10 70 Q20 60 10 50 Q20 40 10 10 Q20 30 30 10 Q40 30 50 10" fill="currentColor" />
          </svg>
        </div>

        {/* Diamond Ring Animation */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
          {/* Ring Circle */}
          <div className="absolute w-full h-full rounded-full border-8 border-platinum border-opacity-70"></div>
          
          {/* Diamond */}
          <div className="absolute w-16 h-16 rotate-45 bg-gradient-to-br from-white to-gray-200 shadow-diamond animate-sparkle z-10">
            <div className="absolute inset-0 bg-white opacity-70 animate-pulse"></div>
          </div>
          
          {/* Ring Details */}
          <div className="absolute w-full h-full rounded-full border-t-8 border-r-8 border-b-2 border-l-2 border-platinum border-opacity-50 animate-spin-slow"></div>
        </div>

        {/* Logo with Elegant Frame */}
        <div className="relative z-20 mb-6">
          <div className="absolute -inset-4 bg-rose-100 rounded-full opacity-20 blur-md"></div>
          <div className="relative w-24 h-24 flex items-center justify-center">
            <img 
              src={Logo} 
              alt="Wedding Match" 
              className="w-20 h-20 object-contain animate-soft-pulse" 
            />
          </div>
        </div>

        {/* Romantic Progress Text */}
        <div className="w-full max-w-xs mb-4">
          <div className="text-center text-rose-800 font-serif italic mb-2">
            {progress < 30 && "Finding your perfect match..."}
            {progress >= 30 && progress < 60 && "Aligning the stars..."}
            {progress >= 60 && progress < 90 && "Preparing something special..."}
            {progress >= 90 && "Almost ready..."}
          </div>
          
          {/* Progress Bar */}
          <div className="h-1.5 bg-rose-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-rose-300 to-rose-500 transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Floating Hearts */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-rose-300 animate-float opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 12 + 8}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            >
              ♥
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeddingLoader;