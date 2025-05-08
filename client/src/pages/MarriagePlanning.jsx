import { useState, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { Sparkles, Calendar, Heart, FileText, Phone, Mail, MapPin, X, ChevronLeft } from 'lucide-react';

const MarriagePlanning = () => {
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 300], [0, 100]);
  const servicesParallax = useTransform(scrollY, [300, 600], [0, 50]);
  const ctaParallax = useTransform(scrollY, [600, 900], [0, 50]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth < 768 ? 'mobile' : 'desktop');
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const services = [
    {
      title: "Venue Selection & Church Arrangements",
      description: "Find the perfect venue, from churches to banquet halls, with full coordination of ceremonial needs and officiants.",
      icon: Calendar,
    },
    {
      title: "Event Planning & Coordination",
      description: "We manage catering, decor, entertainment, and timelines for a stress-free, perfectly orchestrated wedding.",
      icon: Heart,
    },
    {
      title: "Legal Certificates & Documentation",
      description: "Assistance with marriage licenses and legal documents to ensure everything is ready for your big day.",
      icon: FileText,
    }
  ];

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
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-pink-600 mr-2" />
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900">
                Plan Your <span className="text-pink-600">Dream Wedding</span>
              </h1>
              <Sparkles className="h-6 w-6 text-pink-600 ml-2" />
            </div>
            <p className="text-lg md:text-xl mb-12 text-gray-600 max-w-2xl mx-auto">
              Let miamour create an unforgettable wedding experience tailored to your vision.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div style={{ transform: `translateY(${servicesParallax.get()}px)` }} className="mb-20">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="h-6 w-6 text-pink-600 mr-2" />
            <h2 className="text-3xl font-serif font-bold text-gray-900">Our Wedding Planning Services</h2>
            <Sparkles className="h-6 w-6 text-pink-600 ml-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-pink-100 hover:shadow-lg transition-shadow"
              >
                <div className="p-3 bg-pink-100 rounded-xl inline-block mb-4">
                  <service.icon className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ transform: `translateY(${ctaParallax.get()}px)` }} className="bg-pink-50 rounded-2xl p-8 text-center max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-6 w-6 text-pink-600 mr-2" />
            <h2 className="text-3xl font-serif font-bold text-gray-900">Ready to Start Planning?</h2>
            <Sparkles className="h-6 w-6 text-pink-600 ml-2" />
          </div>
          <button
            onClick={() => setShowContactPopup(true)}
            className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {showContactPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowContactPopup(false)}>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl max-w-md w-full p-6 border border-pink-100" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <Sparkles className="h-6 w-6 text-pink-600 mr-2" />
                <h3 className="text-2xl font-bold text-gray-800">Contact miamour</h3>
                <Sparkles className="h-6 w-6 text-pink-600 ml-2" />
              </div>
              <button onClick={() => setShowContactPopup(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              {[
                { icon: <Phone className="h-6 w-6 text-pink-600" />, title: "Phone", content: "+234 9112568963" },
                { icon: <Mail className="h-6 w-6 text-pink-600" />, title: "Email", content: "info@miamour.me" },
                { icon: <MapPin className="h-6 w-6 text-pink-600" />, title: "instagram", content: "Miamour.me & miamour_forever " }
              ].map((item, index) => (
                <div key={index} className="flex items-start bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-pink-100">
                  <div className="p-2 bg-pink-100 rounded-lg mr-4">{item.icon}</div>
                  <div>
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-gray-600 whitespace-pre-line">
                      {item.title === "Phone" ? (
                        <a href={`tel:${item.content}`} className="hover:text-pink-600 transition-colors">{item.content}</a>
                      ) : item.title === "Email" ? (
                        <a href={`mailto:${item.content}`} className="hover:text-pink-600 transition-colors">{item.content}</a>
                      ) : (
                        item.content
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {screenSize === 'mobile' && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            className="bg-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
            aria-label="Contact Us"
            onClick={() => setShowContactPopup(true)}
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

export default MarriagePlanning;