import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Policy = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-6 h-6 text-pink-600 group-hover:text-pink-700" />
      </motion.button>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-8 md:p-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6 leading-relaxed">
              At Miamour.me, our mission is to create a trusted space where adults ready for marriage can connect authentically and build meaningful relationships. We are committed to protecting your privacy and ensuring your personal information is handled with the utmost care, transparency, and respect. This Privacy Policy explains how we collect, use, share, and protect your data to help you find your lifelong partner.
            </p>

            <div className="space-y-8">
              <section className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-pink-700">1. Information We Collect</h2>
                <p className="mb-4 text-gray-700">
                  We collect information you provide to create a personalized and authentic experience, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Personal details: Name, email, age, gender, and marital preferences.</li>
                  <li>Profile information: Photos, bio, interests, and relationship goals.</li>
                  <li>Usage data: Interactions on the platform, such as messages and profile views.</li>
                  <li>Technical data: IP address, device type, and browser information for security and functionality.</li>
                </ul>
              </section>

              <section className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-purple-700">2. How We Use Your Information</h2>
                <p className="mb-4 text-gray-700">
                  We use your data to fulfill our vision of fostering lasting, marriage-focused connections by:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Matching you with compatible partners based on your preferences and goals.</li>
                  <li>Personalizing your experience to enhance meaningful interactions.</li>
                  <li>Improving platform features and user safety through analytics.</li>
                  <li>Communicating with you about account updates, matches, or promotions (with your consent).</li>
                </ul>
              </section>

              <section className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-700">3. Data Sharing</h2>
                <p className="mb-4 text-gray-700">
                  Trust is at the core of Miamour.me. We do not sell your personal information. We may share limited data with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Trusted service providers for platform functionality, such as hosting or payment processing, under strict confidentiality agreements.</li>
                  <li>Legal authorities, if required by law, to protect the safety of our community.</li>
                </ul>
              </section>

              <section className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-pink-700">4. Data Security</h2>
                <p className="text-gray-700">
                  We prioritize your safety by using industry-standard encryption and secure storage to protect your data. We regularly review our security practices to ensure your information remains safe.
                </p>
              </section>

              <section className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-purple-700">5. Your Rights and Choices</h2>
                <p className="mb-4 text-gray-700">
                  You are in control of your data. You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Access, update, or delete your personal information at any time.</li>
                  <li>Opt out of promotional communications.</li>
                  <li>Request information about how your data is used or shared.</li>
                </ul>
                <p className="mt-4 text-gray-700">
                  To exercise these rights, contact us at info@miamour.me. We will respond promptly in accordance with applicable data protection laws.
                </p>
              </section>

              <section className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-700">6. Data Retention</h2>
                <p className="text-gray-700">
                  We retain your data only for as long as necessary to provide our services or comply with legal obligations. If you delete your account, we will securely remove your personal information, except where required by law.
                </p>
              </section>

              <section className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-pink-700">7. Updates to This Policy</h2>
                <p className="text-gray-700">
                  We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or through the platform.
                </p>
              </section>

              <section className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-purple-700">8. Contact Us</h2>
                <p className="text-gray-700">
                  If you have questions about this Privacy Policy or how we handle your data, please reach out to us at info@miamour.me. We are here to support you in your journey to find lifelong happiness.
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Policy;