import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const socialLinks = [
  {
    href: 'https://www.facebook.com/miamour/',
    icon: <FaFacebookF className="text-white" size={24} />,
    alt: 'Facebook',
    color: 'bg-gradient-to-r from-pink-500 to-red-500'
  },
  {
    href: 'https://www.instagram.com/miamour/',
    icon: <FaInstagram className="text-white" size={25} />,
    alt: 'Instagram',
    color: 'bg-gradient-to-tr from-purple-500 via-pink-400 to-yellow-300'
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
        <div className="mb-12 lg:mb-0 lg:sticky lg:top-8 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-pink-700 mb-6 lg:max-w-[12ch]">
            Connect with Miamour
          </h2>
          <p className="text-lg text-gray-600 mb-8 lg:max-w-[35ch]">
            Let’s make your dream wedding a reality. Share your vision with us,
            and we’ll craft memories that last a lifetime.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, icon, color }, key) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`w-12 h-12 grid place-items-center rounded-full ${color} shadow-lg transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95`}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <form
          action="https://getform.io/f/miamour-contact"
          method="POST"
          className="bg-white rounded-2xl shadow-xl p-8 animate-fadeInRight"
        >
          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                required
                placeholder="Jane & John"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                placeholder="janejohn@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              placeholder="Tell us about your love story or wedding ideas..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 resize-y min-h-32 max-h-80"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-pink-600 hover:to-red-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
