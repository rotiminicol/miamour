import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah & Michael',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      quote: "MiAmour changed our lives forever. We connected instantly and knew we were meant to be together.",
      story: "After countless disappointing experiences on other dating apps, MiAmour's approach to matching based on values and life goals brought us together. We got married last summer and couldn't be happier!",
    },
    {
      id: 2,
      name: 'James & David',
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      quote: "We were matched within a week of joining and immediately felt a deep connection.",
      story: "MiAmour understood our preferences and values better than any other platform we tried. Their inclusive approach helped us find exactly what we were looking for in a partner.",
    },
    {
      id: 3,
      name: 'Aisha & Omar',
      location: 'Chicago, IL',
      image: 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      quote: "From our first conversation to our wedding day, MiAmour was there every step of the way.",
      story: "The detailed profiles and compatibility metrics helped us find each other despite living in different cities. Their event planning resources made our wedding day absolutely perfect.",
    },
    {
      id: 4,
      name: 'Emily & Carlos',
      location: 'Miami, FL',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      quote: "We never believed in online dating until we tried MiAmour.",
      story: "The compatibility matching was scarily accurate. We're now celebrating our 2nd anniversary and expecting our first child!",
    },
    {
      id: 5,
      name: 'Priya & Raj',
      location: 'Austin, TX',
      image: 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      quote: "Cultural compatibility was important to us, and MiAmour delivered.",
      story: "We found each other through MiAmour's cultural matching system. Our families connected instantly and we had the most beautiful traditional wedding last year.",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="testimonials" className="section bg-primary-50 py-20">
      <div className="container">
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={ { opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif font-bold text-4xl mb-4 text-secondary">
            Success <span className="text-primary">Stories</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real couples who found their forever love through MiAmour. Your love story could be next.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-soft p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-2/5">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-md relative">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </div>
                
                <div className="w-full md:w-3/5">
                  <MessageSquareQuote className="h-10 w-10 text-primary-300 mb-4" />
                  <p className="text-lg md:text-xl italic text-gray-700 mb-6">
                    {testimonials[currentIndex].quote}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {testimonials[currentIndex].story}
                  </p>
                  <div className="font-serif">
                    <h4 className="text-xl font-semibold text-secondary">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-primary">{testimonials[currentIndex].location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-5 md:-translate-x-10 bg-white rounded-full p-3 shadow-md focus:outline-none text-primary hover:text-primary-600 transition-colors z-10 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-5 md:translate-x-10 bg-white rounded-full p-3 shadow-md focus:outline-none text-primary hover:text-primary-600 transition-colors z-10 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary w-6' : 'bg-primary-200'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;