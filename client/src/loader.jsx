import Logo from "./assets/miLogo.png"; // Replace with your logo path

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
      <div className="relative flex flex-col items-center justify-center">
        {/* Gradient Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 opacity-30 blur-3xl animate-gradient-shift"></div>

        {/* Animated Rings */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute w-full h-full rounded-full border-4 border-transparent border-t-pink-500 border-r-purple-600 animate-spin-slow"></div>
          
          {/* Middle Ring */}
          <div className="absolute w-3/4 h-3/4 rounded-full border-4 border-transparent border-t-purple-600 border-r-indigo-700 animate-spin-slow animation-delay-1000"></div>
          
          {/* Inner Ring */}
          <div className="absolute w-1/2 h-1/2 rounded-full border-4 border-transparent border-t-indigo-700 border-r-pink-500 animate-spin-slow animation-delay-2000"></div>
          
          {/* Logo with Gradient Border and Pulse Animation */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin-slow bg-gradient-to-r from-pink-500 to-purple-600"></div>
            <img
              src={Logo}
              alt="Loading..."
              className="w-24 h-24 animate-pulse"
            />
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-50 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Loading Text with Typing Animation */}
        <p className="mt-8 text-xl font-medium text-white animate-typing overflow-hidden whitespace-nowrap border-r-2 border-white">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;