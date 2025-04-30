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
          Your privacy matters to us at Miamour.me. This policy explains how we collect, use, and protect your data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p>We collect data you provide when signing up, like your name, email, age, preferences, and photos.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <p>To match you with potential partners, personalize your experience, and improve our platform.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
        <p>We never sell your data. We may share limited info with trusted partners for platform functionality.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Security</h2>
        <p>Your data is stored securely and encrypted where necessary.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
        <p>You can request access to or deletion of your data at any time.</p>
      </div>
    </motion.div>
  );
};

export default Policy;
