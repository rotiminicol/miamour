import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, MessageSquareQuote, Heart, Calendar, Sparkles } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      couple: {
        name1: 'Sarah',
        name2: 'Michael',
        image1: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        image2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      },
      location: 'New York, NY',
      weddingDate: 'June 15, 2023',
      quote: "Miamour changed our lives forever. We connected instantly and knew we were meant to be together.",
      story: "After countless disappointing experiences on other dating apps, Miamour's approach to matching based on values and life goals brought us together. We got married last summer and couldn't be happier!",
      weddingImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    },
    {
      id: 2,
      couple: {
        name1: 'James',
        name2: 'David',
        image1: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        image2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      },
      location: 'San Francisco, CA',
      weddingDate: 'August 20, 2023',
      quote: "We were matched within a week of joining and immediately felt a deep connection.",
      story: "Miamour understood our preferences and values better than any other platform we tried. Their inclusive approach helped us find exactly what we were looking for in a partner.",
      weddingImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    },
    {
      id: 3,
      couple: {
        name1: 'Aisha',
        name2: 'Omar',
        image1: 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        image2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      },
      location: 'Chicago, IL',
      weddingDate: 'September 5, 2023',
      quote: "From our first conversation to our wedding day, Miamour was there every step of the way.",
      story: "The detailed profiles and compatibility metrics helped us find each other despite living in different cities. Their event planning resources made our wedding day absolutely perfect.",
      weddingImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    },
    {
      id: 4,
      couple: {
        name1: 'Emily',
        name2: 'Carlos',
        image1: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        image2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      },
      location: 'Miami, FL',
      weddingDate: 'October 12, 2023',
      quote: "We never believed in online dating until we tried Miamour.",
      story: "The compatibility matching was scarily accurate. We're now celebrating our 2nd anniversary and expecting our first child!",
      weddingImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    },
    {
      id: 5,
      couple: {
        name1: 'Priya',
        name2: 'Raj',
        image1: 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        image2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      },
      location: 'Austin, TX',
      weddingDate: 'November 18, 2023',
      quote: "Cultural compatibility was important to us, and Miamour delivered.",
      story: "We found each other through Miamour's cultural matching system. Our families connected instantly and we had the most beautiful traditional wedding last year.",
      weddingImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
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
    <section id="testimonials" className="section bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative">
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-pink-500" />
            <h2 className="font-serif font-bold text-4xl md:text-5xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Love Stories
            </h2>
            <Sparkles className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Real couples who found their forever love through MiAmour. Your love story could be next.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-pink-100"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="w-full lg:w-2/5 space-y-4">
                  {/* Wedding Image */}
                  <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg relative group">
                    <img 
                      src={testimonials[currentIndex].weddingImage} 
                      alt={`${testimonials[currentIndex].couple.name1} & ${testimonials[currentIndex].couple.name2}'s Wedding`}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Calendar className="w-5 h-5" />
                        <span>{testimonials[currentIndex].weddingDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Couple Images */}
                  <div className="flex gap-4">
                    <div className="w-1/2 aspect-square rounded-xl overflow-hidden shadow-md group">
                      <img 
                        src={testimonials[currentIndex].couple.image1} 
                        alt={testimonials[currentIndex].couple.name1}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="w-1/2 aspect-square rounded-xl overflow-hidden shadow-md group">
                      <img 
                        src={testimonials[currentIndex].couple.image2} 
                        alt={testimonials[currentIndex].couple.name2}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="w-full lg:w-3/5">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquareQuote className="h-8 w-8 text-pink-500" />
                    <Heart className="h-6 w-6 text-pink-500 animate-pulse" />
                  </div>
                  <p className="text-xl md:text-2xl italic text-gray-700 mb-6 leading-relaxed">
                    {testimonials[currentIndex].quote}
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {testimonials[currentIndex].story}
                  </p>
                  <div className="font-serif">
                    <h4 className="text-2xl font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      {testimonials[currentIndex].couple.name1} & {testimonials[currentIndex].couple.name2}
                    </h4>
                    <p className="text-gray-600">{testimonials[currentIndex].location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-5 md:-translate-x-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg focus:outline-none text-pink-600 hover:text-pink-700 transition-colors z-10 hover:scale-110 border border-pink-100"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-5 md:translate-x-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg focus:outline-none text-pink-600 hover:text-pink-700 transition-colors z-10 hover:scale-110 border border-pink-100"
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
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-gradient-to-r from-pink-600 to-purple-600 w-8' : 'bg-pink-200 w-2'
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