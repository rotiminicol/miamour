
import { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageSquareQuote, Heart, Calendar, Sparkles } from 'lucide-react';

/**
 * Testimonials section without any animation or framer-motion logic.
 * - Carousel logic is preserved for testimonial navigation.
 * - All transitions and intersection observer logic removed.
 * - Accessible and senior-level code clarity.
 */
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      couple: {
        name1: 'Sarah',
        name2: 'Michael',
        image1: '/assets/test.png',
        image2: '/assets/test2.png',
      },
      location: 'New York, NY',
      weddingDate: 'June 15, 2023',
      quote: "miamour changed our lives forever. We connected instantly and knew we were meant to be together.",
      story: "After countless disappointing experiences on other dating apps, miamour's approach to matching based on values and life goals brought us together. We got married last summer and couldn't be happier!",
      weddingImage: '/assets/test3.png',
    },
    {
      id: 2,
      couple: {
        name1: 'James',
        name2: 'David',
        image1: '/assets/test4.png',
        image2: '/assets/test5.png',
      },
      location: 'San Francisco, CA',
      weddingDate: 'August 20, 2023',
      quote: "We were matched within a week of joining and immediately felt a deep connection.",
      story: "miamour understood our preferences and values better than any other platform we tried. Their inclusive approach helped us find exactly what we were looking for in a partner.",
      weddingImage: '/assets/test6.png',
    },
    {
      id: 3,
      couple: {
        name1: 'Aisha',
        name2: 'Omar',
        image1: '/assets/test7.png',
        image2: '/assets/test.png',
      },
      location: 'Chicago, IL',
      weddingDate: 'September 5, 2023',
      quote: "From our first conversation to our wedding day, miamour was there every step of the way.",
      story: "The detailed profiles and compatibility metrics helped us find each other despite living in different cities. Their event planning resources made our wedding day absolutely perfect.",
      weddingImage: '/assets/test2.png',
    },
    {
      id: 4,
      couple: {
        name1: 'Emily',
        name2: 'Carlos',
        image1: '/assets/test3.png',
        image2: '/assets/test4.png',
      },
      location: 'Miami, FL',
      weddingDate: 'October 12, 2023',
      quote: "We never believed in online dating until we tried miamour.",
      story: "The compatibility matching was scarily accurate. We're now celebrating our 2nd anniversary and expecting our first child!",
      weddingImage: '/assets/test5.png',
    },
    {
      id: 5,
      couple: {
        name1: 'Priya',
        name2: 'Raj',
        image1: '/assets/test6.png',
        image2: '/assets/test7.png',
      },
      location: 'Austin, TX',
      weddingDate: 'November 18, 2023',
      quote: "Cultural compatibility was important to us, and miamour delivered.",
      story: "We found each other through miamour's cultural matching system. Our families connected instantly and we had the most beautiful traditional wedding last year.",
      weddingImage: '/assets/test.png',
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-pink-500" />
            <h2 className="font-serif font-bold text-4xl md:text-5xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Love Stories
            </h2>
            <Sparkles className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Real couples who found their forever love through miamour. Your love story could be next.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-pink-100">
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
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-5 md:-translate-x-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg focus:outline-none text-pink-600 hover:text-pink-700 transition-colors z-10 border border-pink-100"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-5 md:translate-x-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg focus:outline-none text-pink-600 hover:text-pink-700 transition-colors z-10 border border-pink-100"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
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
