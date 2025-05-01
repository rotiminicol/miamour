import  { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const particles = [];
    
    // Create particles
    const createParticles = () => {
      const particleCount = Math.min(window.innerWidth / 20, 40); // Responsive particle count
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 10 + 5;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const speedX = (Math.random() - 0.5) * 0.5;
        const speedY = (Math.random() - 0.5) * 0.5;
        
        // Create particle element
        const element = document.createElement('div');
        element.classList.add('particle');
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.opacity = (Math.random() * 0.5 + 0.2).toString();
        
        container.appendChild(element);
        
        particles.push({
          x, 
          y, 
          size, 
          speedX, 
          speedY, 
          element
        });
      }
      
      particlesRef.current = particles;
    };
    
    // Animate particles
    const animateParticles = () => {
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.speedY *= -1;
        }
        
        // Update DOM
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
      });
      
      animationRef.current = requestAnimationFrame(animateParticles);
    };
    
    // Handle window resize
    const handleResize = () => {
      // Clear existing particles
      container.innerHTML = '';
      
      // Create new particles
      createParticles();
    };
    
    createParticles();
    animateParticles();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Clean up particles
      container.innerHTML = '';
    };
  }, []);
  
  return <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0"></div>;
};

export default ParticleBackground;