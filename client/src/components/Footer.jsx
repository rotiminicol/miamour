import { FaFacebookF, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";
// import { useState } from "react";

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About Us",
    link: "/#about",
  },
  {
    title: "Gallery",
    link: "/#gallery",
  },
  {
    title: "Packages",
    link: "/#packages",
  },
  {
    title: "Testimonials",
    link: "/#testimonials",
  },
];

const QuickLinks = [
  {
    title: "Privacy Policy",
    link: "/#privacy",
  },
  {
    title: "Terms & Conditions",
    link: "/#terms",
  },
  {
    title: "FAQ",
    link: "/#faq",
  },
  {
    title: "Support",
    link: "/#support",
  },
];

const Footer = () => {
    // const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <footer className="bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 text-gray-700 py-16">
      <div className="container mx-auto px-6 lg:grid lg:grid-cols-4 gap-12">
        {/* Brand and Tagline */}
        <div className="mb-8 lg:mb-0">
          <h2 className="text-4xl font-cursive text-pink-700 mb-4">
            miAmour
          </h2>
          <p className="text-gray-600">
            Crafting unforgettable memories for your special day. Where love blossoms and moments turn magical.
          </p>
          <div className="mt-6 flex space-x-4">
            <a
              href="https://www.instagram.com/miamour.me"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition duration-300"
            >
              <FaFacebookF className="text-white text-xl" />
            </a>
            <a
              href="https://www.instagram.com/miamour.me"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-400 hover:opacity-90 rounded-full flex items-center justify-center transition duration-300"
            >
              <FaInstagram className="text-white text-xl" />
            </a>
            <a
              href="https://www.instagram.com/miamour.me"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition duration-300"
            >
              <FaTwitter className="text-white text-xl" />
            </a>
            <a
              href="https://www.instagram.com/miamour.me"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition duration-300"
            >
              <FaPinterest className="text-white text-xl" />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mb-8 lg:mb-0">
          <h3 className="text-xl font-semibold text-pink-700 mb-4">Explore</h3>
          <ul className="space-y-3">
            {FooterLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.link}
                  className="hover:text-pink-600 transition duration-300"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="mb-8 lg:mb-0">
          <h3 className="text-xl font-semibold text-pink-700 mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {QuickLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.link}
                  className="hover:text-pink-600 transition duration-300"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-pink-700 mb-4">Get In Touch</h3>
          <p className="mb-4">Suite 101, Love Blossom Avenue, Bridal City</p>
          <p className="mb-2">📞 09044130171</p>
          <p className="mb-4">📧 contact@miamour.com</p>
          <button
            // onClick={() => setIsPopupOpen(true)}
            className="mt-4 bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition duration-300"
          >
            Contact Us
          </button>
        </div>
      </div>
      <div className="text-center mt-12 text-gray-600 border-t border-pink-300 pt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} miAmour. All rights reserved. | Designed with 💕 by Arigo Tech        
          </p>
            {/* {isPopupOpen && <EmailPopup onClose={() => setIsPopupOpen(false)} />} */}
      </div>
    </footer>
  );
};

export default Footer;
