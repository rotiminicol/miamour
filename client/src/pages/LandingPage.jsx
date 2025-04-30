import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Heart, Users, Calendar, MessageCircle, Gift } from 'lucide-react';
import { Link } from "react-router-dom";

// Import your images - assuming these are properly set up in your project
import heroImage from '../assets/wedding1.png';
import sarahJamesImage from '../assets/wedding1.png';
import emilyDanielImage from '../assets/wedding4.png';
import jessicaMichaelImage from '../assets/wedding19.png';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const threeContainer = useRef(null);

  useEffect(() => {
    // Set visibility for animations
    setIsVisible(true);
    
    // Setup Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    if (threeContainer.current) {
      threeContainer.current.appendChild(renderer.domElement);
    }

    camera.position.z = 5;

    // Create floating hearts
    const hearts = [];
    const heartShape = new THREE.Shape();
    
    // Draw heart shape
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, 0, 0, 0.5, 0.25, 0.5);
    heartShape.bezierCurveTo(0.4, 0.5, 0.4, 0.25, 0.4, 0.25);
    heartShape.bezierCurveTo(0.4, 0, 0, 0, 0, 0);
    
    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    
    // Create multiple hearts
    for (let i = 0; i < 15; i++) {
      const material = new THREE.MeshPhongMaterial({ 
        color: 0xff69b4, 
        opacity: 0.6, 
        transparent: true 
      });
      
      const heart = new THREE.Mesh(heartGeometry, material);
      
      // Randomize position
      heart.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      // Randomize rotation
      heart.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      // Randomize scale
      heart.scale.set(
        0.1 + Math.random() * 0.2,
        0.1 + Math.random() * 0.2,
        0.1 + Math.random() * 0.2
      );
      
      scene.add(heart);
      hearts.push(heart);
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      hearts.forEach(heart => {
        heart.rotation.x += 0.005;
        heart.rotation.y += 0.005;
        heart.position.y += Math.sin(Date.now() * 0.001) * 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Testimonial rotation
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 5000);

    // Cleanup function
    return () => {
      clearInterval(testimonialInterval);
      window.removeEventListener('resize', handleResize);
      
      hearts.forEach(heart => {
        heart.geometry.dispose();
        heart.material.dispose();
        scene.remove(heart);
      });
      
      renderer.dispose();
      
      if (threeContainer.current) {
        threeContainer.current.innerHTML = '';
      }
    };
  }, []);

  // Scroll to features section
  const handleLearnMoreClick = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah & James",
      image: sarahJamesImage,
      text: "MiAmour helped us find each other and plan our perfect wedding. We couldn't be happier!",
    },
    {
      name: "Emily & Daniel",
      image: emilyDanielImage,
      text: "From our first match to our wedding day, MiAmour was there every step of the way.",
    },
    {
      name: "Jessica & Michael",
      image: jessicaMichaelImage,
      text: "The personalized matching algorithm really works! We're celebrating our 1st anniversary thanks to MiAmour.",
    }
  ];

  // Features data
  const features = [
    { 
      icon: <Users size={24} />, 
      title: "Personalized Matching", 
      description: "Our algorithm finds your perfect match based on compatibility and wedding preference." 
    },
    { 
      icon: <Heart size={24} />, 
      title: "Verified Profiles", 
      description: "Connect with genuine individuals who share your commitment to finding true love." 
    },
    { 
      icon: <Calendar size={24} />, 
      title: "Wedding Planning", 
      description: "From engagement to 'I do', access our suite of tools to plan your perfect day together." 
    },
    { 
      icon: <MessageCircle size={24} />, 
      title: "Marriage Counseling", 
      description: "Our certified counselors are here to help you build a strong and lasting relationship." 
    },
    { 
      icon: <Gift size={24} />, 
      title: "Wedding Services", 
      description: "From venue selection to catering, we provide comprehensive wedding planning services." 
    }
  ];

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white min-h-screen font-sans text-gray-800 relative overflow-x-hidden">
      {/* Three.js Background */}
      <div 
        ref={threeContainer} 
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
      />

      {/* Hero Section */}
      <div className="relative z-10">
        {/* 2D Hearts Animation Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <Heart 
              key={i}
              size={20 + Math.random() * 20}
              className="absolute text-pink-100 animate-pulse opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${15 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 pt-20 pb-12 sm:pt-32 sm:pb-20 relative z-20">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent">
              Find Your Soulmate
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600">
              Where true love meets wedding dreams. Start your forever journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/auth"
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transform transition-transform hover:scale-105 shadow-lg"
              >
                Find Your Match
              </Link>
              <button 
                onClick={handleLearnMoreClick}
                className="bg-white hover:bg-gray-100 text-pink-500 font-bold py-3 px-8 rounded-full border-2 border-pink-500 transform transition-transform hover:scale-105 shadow-lg"
              >
                Learn More
              </button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className={`mt-12 sm:mt-16 mx-auto max-w-2xl relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Happy couple" 
                className="w-full object-cover mx-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-transparent"></div>
            </div>
            
            {/* Stats Overlay */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg w-4/5 flex justify-around">
              <div className="text-center">
                <p className="text-pink-500 font-bold text-2xl">15K+</p>
                <p className="text-sm text-gray-600">Matches</p>
              </div>
              <div className="text-center">
                <p className="text-pink-500 font-bold text-2xl">8K+</p>
                <p className="text-sm text-gray-600">Weddings</p>
              </div>
              <div className="text-center">
                <p className="text-pink-500 font-bold text-2xl">98%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features-section" className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Discover the <span className="text-pink-500">MiAmour</span> Difference
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-white p-6 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="p-4 bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl inline-block mb-4 text-pink-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-pink-50 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="flex justify-center">
            <div className="w-full sm:w-3/4 lg:w-2/3 relative h-64">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 mx-auto p-6 bg-white rounded-lg shadow-lg transition-all duration-1000 ${
                    activeTestimonial === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <h3 className="text-pink-500 font-bold">{testimonial.name}</h3>
                  </div>
                  <p className="text-gray-600 italic">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Find Your Forever?</h2>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of couples who found love and planned their dream wedding with MiAmour.
          </p>
          <Link 
            to="/auth" 
            className="bg-white text-pink-500 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-lg inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white pt-16 pb-8 border-t border-pink-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo and description */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <Heart className="text-pink-500 w-8 h-8 mr-2" />
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent">MiAmour</span>
              </div>
              <p className="text-gray-600 mb-4">
                Where true love meets wedding dreams. Start your forever journey today.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-pink-500 hover:text-pink-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-pink-500 hover:text-pink-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-pink-500 hover:text-pink-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-pink-500">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-pink-500 transition-colors">Home</Link></li>
                <li><Link to="/features" className="text-gray-600 hover:text-pink-500 transition-colors">Features</Link></li>
                <li><Link to="/success-stories" className="text-gray-600 hover:text-pink-500 transition-colors">Success Stories</Link></li>
                <li><Link to="/pricing" className="text-gray-600 hover:text-pink-500 transition-colors">Pricing</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-pink-500">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/blog" className="text-gray-600 hover:text-pink-500 transition-colors">Blog</Link></li>
                <li><Link to="/dating-tips" className="text-gray-600 hover:text-pink-500 transition-colors">Dating Tips</Link></li>
                <li><Link to="/safety-guide" className="text-gray-600 hover:text-pink-500 transition-colors">Safety Guide</Link></li>
                <li><Link to="/faq" className="text-gray-600 hover:text-pink-500 transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-pink-500">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@miamour.com
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (800) 123-4567
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-pink-100 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} MiAmour. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;