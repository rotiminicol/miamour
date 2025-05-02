import { motion } from 'framer-motion';

const Policy = () => {
  return (
    <motion.div
      className="min-h-screen bg-pink-50 p-8 text-pink-900"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-pink-600">Privacy Policy</h1>
        <p className="mb-4">
          At Miamour.me, our mission is to create a trusted space where adults ready for marriage can connect authentically and build meaningful relationships. We are committed to protecting your privacy and ensuring your personal information is handled with the utmost care, transparency, and respect. This Privacy Policy explains how we collect, use, share, and protect your data to help you find your lifelong partner.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-2">
          We collect information you provide to create a personalized and authentic experience, including:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Personal details: Name, email, age, gender, and marital preferences.</li>
          <li>Profile information: Photos, bio, interests, and relationship goals.</li>
          <li>Usage data: Interactions on the platform, such as messages and profile views.</li>
          <li>Technical data: IP address, device type, and browser information for security and functionality.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <p className="mb-2">
          We use your data to fulfill our vision of fostering lasting, marriage-focused connections by:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Matching you with compatible partners based on your preferences and goals.</li>
          <li>Personalizing your experience to enhance meaningful interactions.</li>
          <li>Improving platform features and user safety through analytics.</li>
          <li>Communicating with you about account updates, matches, or promotions (with your consent).</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
        <p className="mb-4">
          Trust is at the core of Miamour.me. We do not sell your personal information. We may share limited data with:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Trusted service providers for platform functionality, such as hosting or payment processing, under strict confidentiality agreements.</li>
          <li>Legal authorities, if required by law, to protect the safety of our community.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
        <p className="mb-4">
          We prioritize your safety by using industry-standard encryption and secure storage to protect your data. We regularly review our security practices to ensure your information remains safe.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights and Choices</h2>
        <p className="mb-2">
          You are in control of your data. You have the right to:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Access, update, or delete your personal information at any time.</li>
          <li>Opt out of promotional communications.</li>
          <li>Request information about how your data is used or shared.</li>
        </ul>
        <p className="mb-4">
          To exercise these rights, contact us at [insert contact email]. We will respond promptly in accordance with applicable data protection laws.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Data Retention</h2>
        <p className="mb-4">
          We retain your data only for as long as necessary to provide our services or comply with legal obligations. If you delete your account, we will securely remove your personal information, except where required by law.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Updates to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or through the platform.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
        <p className="mb-4">
          If you have questions about this Privacy Policy or how we handle your data, please reach out to us at [insert contact email]. We are here to support you in your journey to find lifelong happiness.
        </p>
      </div>
    </motion.div>
  );
};

export default Policy;