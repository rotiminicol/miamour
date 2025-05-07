import { useState, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { MapPin, Users, Calendar, Clock, ChevronLeft, X, Phone, Mail, Sparkles } from 'lucide-react';

const CeremonyPlanningPage = () => {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 300], [0, 100]);
  const venuesParallax = useTransform(scrollY, [300, 600], [0, 50]);
  const ctaParallax = useTransform(scrollY, [600, 900], [0, 50]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth < 768 ? 'mobile' : 'desktop');
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const venues = [
    {
      id: 1,
      name: "Grand Ballroom",
      location: "New York, NY",
      capacity: 300,
      price: 5000,
      image: "/assets/ceremony.png",
      description: "A luxurious ballroom with stunning chandeliers and a spacious dance floor.",
      features: ["Indoor", "Outdoor Garden", "Catering Included", "Parking Available"],
      category: "indoor",
      rating: 4.9,
      reviews: 127,
      images: ["/assets/ceremony.png", "/assets/ceremony1.png", "/assets/ceremony1.png"]
    },
    {
      id: 2,
      name: "Beachfront Resort",
      location: "Miami, FL",
      capacity: 200,
      price: 7000,
      image: "/assets/ceremony1.png",
      description: "A beautiful beachfront venue with ocean views and a tropical vibe.",
      features: ["Beach Access", "Outdoor Ceremony", "Catering Options", "Accommodations"],
      category: "outdoor",
      rating: 4.8,
      reviews: 98,
      images: ["/assets/ceremony1.png", "/assets/ceremony.png", "/assets/ceremony.png"]
    },
    {
      id: 3,
      name: "Rustic Barn",
      location: "Austin, TX",
      capacity: 150,
      price: 4000,
      image: "/assets/ceremony.png",
      description: "A charming barn venue with a rustic feel, perfect for a country-style wedding.",
      features: ["Indoor/Outdoor", "Catering Options", "Parking Available", "Photography Spots"],
      category: "rustic",
      rating: 4.7,
      reviews: 85,
      images: ["/assets/ceremony.png", "/assets/ceremony.png", "/assets/ceremony1.png"]
    },
    {
      id: 4,
      name: "Modern Loft",
      location: "Chicago, IL",
      capacity: 180,
      price: 4500,
      image: "/assets/ceremony.png",
      description: "A contemporary loft space with industrial charm and city views.",
      features: ["Indoor", "City Views", "Modern Amenities", "Flexible Layout"],
      category: "modern",
      rating: 4.8,
      reviews: 92,
      images: ["/assets/ceremony.png", "/assets/ceremony1.png", "/assets/ceremony1.png"]
    },
    {
      id: 5,
      name: "Garden Estate",
      location: "Los Angeles, CA",
      capacity: 250,
      price: 6000,
      image: "/assets/ceremony1.png",
      description: "An elegant estate with manicured gardens and classic architecture.",
      features: ["Garden Ceremony", "Indoor Reception", "Historic Setting", "Full Service"],
      category: "outdoor",
      rating: 4.9,
      reviews: 156,
      images: ["/assets/ceremony1.png", "/assets/ceremony.png", "/assets/ceremony.png"]
    },
    {
      id: 6,
      name: "Mountain Lodge",
      location: "Denver, CO",
      capacity: 120,
      price: 5500,
      image: "/assets/ceremony1.png",
      description: "A cozy mountain lodge with breathtaking views and natural surroundings.",
      features: ["Mountain Views", "Indoor/Outdoor", "Lodging Available", "Scenic Location"],
      category: "rustic",
      rating: 4.7,
      reviews: 78,
      images: ["/assets/ceremony1.png", "/assets/ceremony.png", "/assets/ceremony1.png"]
    }
  ];

  const filteredVenues = activeFilter === 'all' ? venues : venues.filter(venue => venue.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-pink-100 hover:bg-pink-50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-pink-600 group-hover:text-pink-700" />
          <span className="text-sm font-medium text-pink-600 group-hover:text-pink-700">Back</span>
        </button>
      </div>

      <div className="relative bg-gradient-to-br from-pink-50 to-white text-gray-800 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><path d='M30 0C13.431 0 0 13.431 0 30s13.431 30 30 30 30-13.431 30-30S46.569 0 30 0zm0 54C16.745 54 6 43.255 6 30S16.745 6 30 6s24 10.745 24 24-10.745 24-24 24zm0-48C14.327 6 6 14.327 6 30s8.327 24 24 24 24-8.327 24-24S45.673 6 30 6z' fill='%23EC4899' fill-opacity='0.3' fill-rule='evenodd'/></svg>")`,
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <div style={{ transform: `translateY(${heroParallax.get()}px)` }} className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-gray-900">
              Plan Your <span className="text-pink-600">Dream Ceremony</span>
            </h1>
            <p className="text-lg md:text-xl mb-12 text-gray-600 max-w-2xl mx-auto">
              Discover the perfect venue to make your special day unforgettable.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => document.getElementById('venues').scrollIntoView({ behavior: 'smooth' })}
                className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
              >
                Explore Venues
              </button>
              <button
                onClick={() => setShowContactModal(true)}
                className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'indoor', 'outdoor', 'rustic', 'modern'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-xl font-medium transition-colors border ${
                activeFilter === filter 
                  ? 'bg-pink-600 text-white border-pink-600' 
                  : 'bg-white text-gray-700 border-pink-100 hover:bg-pink-50'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div id="venues" style={{ transform: `translateY(${venuesParallax.get()}px)` }} className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-center mb-4 text-gray-900">Featured Venues</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore our curated selection of top-rated venues for your ceremony.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <div
                key={venue.id}
                className="bg-white rounded-xl border border-pink-100 hover:shadow-lg cursor-pointer"
                onClick={() => setSelectedVenue(venue)}
              >
                <div className="relative">
                  <img src={venue.image} alt={venue.name} className="w-full h-48 object-cover rounded-t-xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-xl opacity-0 hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{venue.name}</h3>
                    <span className="bg-pink-50 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">${venue.price}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                    {venue.location}
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-yellow-400 mr-2">
                      {Array(Math.floor(venue.rating)).fill('★').join('')}
                    </div>
                    <span className="text-gray-600 text-sm">({venue.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {venue.features.map((feature, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{feature}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ transform: `translateY(${ctaParallax.get()}px)` }} className="bg-pink-50 rounded-2xl p-8 text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">Need Help Planning?</h2>
          <p className="text-gray-600 mb-8 text-lg">Our team is here to make your dream ceremony a reality.</p>
          <button
            onClick={() => setShowContactModal(true)}
            className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>

      {selectedVenue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={() => setSelectedVenue(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{selectedVenue.name}</h2>
              <button onClick={() => setSelectedVenue(null)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {selectedVenue.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedVenue.name} - Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
            <div className="bg-pink-50 p-4 rounded-xl mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="mb-3 md:mb-0">
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-400 mr-2">
                      {Array(Math.floor(selectedVenue.rating)).fill('★').join('')}
                    </div>
                    <span className="text-gray-600">({selectedVenue.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                    {selectedVenue.location}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">${selectedVenue.price}</div>
                  <div className="text-gray-600">per day</div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">About</h3>
              <p className="text-gray-600">{selectedVenue.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Features</h3>
                <ul className="space-y-2">
                  {selectedVenue.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Details</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-pink-500" />
                    Capacity: {selectedVenue.capacity} guests
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-pink-500" />
                    Available year-round
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-pink-500" />
                    Flexible booking times
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                Book Venue
              </button>
              <button
                onClick={() => setShowContactModal(true)}
                className="flex-1 bg-white border-2 border-pink-600 text-pink-600 py-3 px-6 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowContactModal(false)}>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl max-w-md w-full p-6 border border-pink-100" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
                <Sparkles className="h-6 w-6 text-pink-500 ml-2" />
              </div>
              <button onClick={() => setShowContactModal(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              {[
                { icon: <Phone className="h-6 w-6 text-pink-500" />, title: "Phone", content: "+234 9044130171" },
                { icon: <Mail className="h-6 w-6 text-pink-500" />, title: "Email", content: "info@miamour.me" },
                { 
                  icon: <Clock className="h-6 w-6 text-pink-500" />, 
                  title: "Office Hours", 
                  content: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed" 
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-pink-100">
                  <div className="p-2 bg-pink-100 rounded-lg mr-4">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {item.title === "Phone" ? (
                        <a href={`tel:${item.content}`} className="hover:text-pink-500 transition-colors">{item.content}</a>
                      ) : item.title === "Email" ? (
                        <a href={`mailto:${item.content}`} className="hover:text-pink-500 transition-colors">{item.content}</a>
                      ) : (
                        item.content
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-pink-100">
              <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/miamour_forever"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/miamour.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {screenSize === 'mobile' && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            className="bg-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
            aria-label="Contact Us"
            onClick={() => setShowContactModal(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default CeremonyPlanningPage;