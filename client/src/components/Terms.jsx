import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <motion.div
      className="min-h-screen bg-pink-50 p-8 text-pink-900"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-pink-600">Terms of Service</h1>
        <p className="mb-4">
          Welcome to Miamour.me! These terms govern your use of our wedding matching platform. By accessing or using our site, you agree to be bound by these terms.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Eligibility</h2>
        <p>You must be 18 or older to use Miamour.me.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Account Responsibilities</h2>
        <p>You are responsible for maintaining the confidentiality of your account and password.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. User Conduct</h2>
        <p>Respect others. No harassment, abuse, or inappropriate content is allowed.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Termination</h2>
        <p>We reserve the right to suspend or terminate accounts that violate our terms.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
        <p>We may update these terms at any time. Continued use means you accept the changes.</p>
      </div>
    </motion.div>
  );
};

export default Terms;
