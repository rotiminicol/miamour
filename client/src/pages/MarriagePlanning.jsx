import { Link } from 'react-router-dom';

const MarriagePlanning = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-secondary-800 text-white py-20">
        <div className="container text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Plan Your Dream Wedding with <span className="text-primary-400">Miamour</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            From venues to vows, our expert planners make your wedding day unforgettable.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-serif text-3xl font-semibold text-center mb-12">Our Wedding Planning Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-serif text-xl font-semibold mb-4">Venue Selection & Church Arrangements</h3>
              <p className="text-gray-600">
                We find the perfect venue, from romantic churches to elegant banquet halls, and coordinate all religious or ceremonial requirements, including securing officiants and scheduling.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-serif text-xl font-semibold mb-4">Event Planning & Coordination</h3>
              <p className="text-gray-600">
                Our team handles every detail—catering, decor, entertainment, and timelines—so you can enjoy your day stress-free, like a perfectly orchestrated party.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-serif text-xl font-semibold mb-4">Legal Certificates & Documentation</h3>
              <p className="text-gray-600">
                We assist with obtaining marriage licenses, certificates, and other legal documents, ensuring everything is in order for your big day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-400 text-white py-16">
        <div className="container text-center">
          <h2 className="font-serif text-3xl font-semibold mb-6">Ready to Start Planning?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Contact our expert planners today to bring your dream wedding to life.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-primary-400 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MarriagePlanning;