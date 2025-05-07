
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hero section for the landing page.
 * - All animation and Framer Motion logic removed for performance and clarity.
 * - Testimonial rotation retained for interactivity.
 * - Clean, accessible, and maintainable code.
 */
const Hero = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();

  const testimonials = [
    { name: "Sarah & Michael", text: "We found each other here and couldn't be happier!", emoji: "❤️" },
    { name: "Jessica & David", text: "From the first message to marriage in just one year!", emoji: "✨" },
    { name: "Aisha & James", text: "The algorithm really works! Perfect match from day one.", emoji: "🥰" }
  ];

  // Rotate testimonials every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleFindMatch = () => navigate('/auth');
  const handleGetStarted = () => navigate('/auth');

  const headingText = "Find Your Better Half";
  const headingWords = headingText.split(' ');

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Static background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-primary/15 z-0">
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent rounded-full scale-150 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-gray-900">
                {headingWords.map((word, i) => (
                  <span key={i} className="inline-block mr-4">
                    {word.split('').map((letter, j) => (
                      <span
                        key={j}
                        className={`inline-block ${word === 'Perfect' ? 'text-primary' : ''}`}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                Where meaningful connections blossom into lifelong partnerships. Begin your journey to love today.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col xs:flex-row gap-4 pt-2">
              <button
                onClick={handleFindMatch}
                className="px-8 py-3.5 rounded-lg bg-primary text-white font-medium transition-colors duration-200 shadow-lg hover:bg-primary/90"
                type="button"
              >
                <span className="flex items-center justify-center gap-2">
                  Start Matching Now
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 1L15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              <button
                onClick={handleGetStarted}
                className="px-8 py-3.5 rounded-lg bg-white text-primary border-2 border-primary font-medium transition-colors duration-200 shadow-lg hover:bg-primary/10"
                type="button"
              >
                <span className="flex items-center justify-center gap-2">
                  Get Started
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 1L15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              <a
                href="#how-it-works"
                className="px-8 py-3.5 rounded-lg border-2 border-gray-300 font-medium hover:border-primary hover:text-primary transition-colors duration-200 flex items-center justify-center gap-2"
              >
                How It Works
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 3L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3 8L8 13L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <img
                    key={item}
                    src={`https://i.pravatar.cc/150?img=${item + 10}`}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700">Join 10,000+ happy couples</span>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#FFB800"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image and testimonial section */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl">
              {/* Main image */}
              <img
                src="/assets/mi4.png"
                alt="Happy couple in love"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
              {/* Decorative floating elements (static) */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-2xl">
                  ❤️
                </div>
              </div>
              <div className="absolute bottom-24 right-6 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-2xl">
                  💌
                </div>
              </div>
              {/* Testimonial card */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-xl max-w-xs border-l-4 border-primary transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-lg">{testimonials[activeTestimonial].emoji}</span>
                  </div>
                  <span className="font-medium">{testimonials[activeTestimonial].name}</span>
                </div>
                <p className="text-sm text-gray-700">{testimonials[activeTestimonial].text}</p>
                {/* Testimonial indicators */}
                <div className="mt-3 flex gap-1 justify-center">
                  {testimonials.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i === activeTestimonial ? 'bg-primary' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>
      {/* Scroll indicator (static, no animation) */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 hidden md:block">
        <div className="w-8 h-14 border-2 border-gray-400 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
