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
        
        <div className="mt-8 pt-6 border-t border-pink-100">
          <h1 className="text-2xl font-bold mb-4 text-pink-600">Disclaimer</h1>
          
          <p className="mb-4">
            Welcome to miamour.me! By accessing and using our website, you acknowledge and agree to the following:
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-2">General Information</h2>
          <p>
            miamour.me provides a platform designed to connect individuals for dating, relationships, and marriage purposes. 
            While we strive to foster genuine connections, we do not guarantee the accuracy, completeness, or reliability 
            of any user profiles, communications, or interactions conducted through our site.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-2">User Responsibility</h2>
          <p>
            Users are solely responsible for verifying the identity, background, and intentions of anyone they choose 
            to communicate or meet with. miamour.me does not conduct background checks or screenings on users and 
            disclaims any liability for the actions, conduct, or behavior of any user both online and offline.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-2">No Guarantees</h2>
          <p>
            We make no guarantees regarding the success of any relationship initiated through our platform. 
            Meeting and building a relationship involves personal judgment, risk, and mutual effort, and outcomes 
            vary based on individual circumstances.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
          <p>
            miamour.me, its owners, partners, and affiliates shall not be held responsible for any damages, 
            losses, or disputes arising out of the use of our services. Users engage with the platform and each 
            other at their own risk.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-2">Changes to This Disclaimer</h2>
          <p>
            We reserve the right to update or modify this disclaimer at any time without prior notice. 
            Continued use of the site after changes are posted constitutes acceptance of those changes.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
          <p>
            If you have any questions about this disclaimer, please contact us at{" "}
            <a href="mailto:support@miamour.me" className="text-pink-600 hover:underline">
              support@miamour.me
            </a>.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Terms;