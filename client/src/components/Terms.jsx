import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
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
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Welcome to miamour.me! These terms govern your use of our wedding matching platform. By accessing or using our site, you agree to be bound by these terms.
            </p>

            <div className="space-y-8">
              <section className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-pink-700">1. Eligibility</h2>
                <p className="text-gray-700">You must be 18 or older to use miamour.me.</p>
              </section>

              <section className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-purple-700">2. Account Responsibilities</h2>
                <p className="text-gray-700">You are responsible for maintaining the confidentiality of your account and password.</p>
              </section>

              <section className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-700">3. User Conduct</h2>
                <p className="text-gray-700">Respect others. No harassment, abuse, or inappropriate content is allowed.</p>
              </section>

              <section className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-pink-700">4. Termination</h2>
                <p className="text-gray-700">We reserve the right to suspend or terminate accounts that violate our terms.</p>
              </section>

              <section className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-purple-700">5. Changes to Terms</h2>
                <p className="text-gray-700">We may update these terms at any time. Continued use means you accept the changes.</p>
              </section>

              <div className="mt-12 pt-8 border-t border-pink-100">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Disclaimer
                </h2>
                
                <div className="space-y-8">
                  <section className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-semibold mb-4 text-pink-700">General Information</h3>
                    <p className="text-gray-700">
                      miamour.me provides a platform designed to connect individuals for dating, relationships, and marriage purposes. 
                      While we strive to foster genuine connections, we do not guarantee the accuracy, completeness, or reliability 
                      of any user profiles, communications, or interactions conducted through our site.
                    </p>
                  </section>

                  <section className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-semibold mb-4 text-purple-700">User Responsibility</h3>
                    <p className="text-gray-700">
                      Users are solely responsible for verifying the identity, background, and intentions of anyone they choose 
                      to communicate or meet with. miamour.me does not conduct background checks or screenings on users and 
                      disclaims any liability for the actions, conduct, or behavior of any user both online and offline.
                    </p>
                  </section>

                  <section className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-semibold mb-4 text-indigo-700">No Guarantees</h3>
                    <p className="text-gray-700">
                      We make no guarantees regarding the success of any relationship initiated through our platform. 
                      Meeting and building a relationship involves personal judgment, risk, and mutual effort, and outcomes 
                      vary based on individual circumstances.
                    </p>
                  </section>

                  <section className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-semibold mb-4 text-pink-700">Limitation of Liability</h3>
                    <p className="text-gray-700">
                      miamour.me, its owners, partners, and affiliates shall not be held responsible for any damages, 
                      losses, or disputes arising out of the use of our services. Users engage with the platform and each 
                      other at their own risk.
                    </p>
                  </section>

                  <section className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-semibold mb-4 text-purple-700">Changes to This Disclaimer</h3>
                    <p className="text-gray-700">
                      We reserve the right to update or modify this disclaimer at any time without prior notice. 
                      Continued use of the site after changes are posted constitutes acceptance of those changes.
                    </p>
                  </section>

                  <section className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-semibold mb-4 text-indigo-700">Contact Us</h3>
                    <p className="text-gray-700">
                      If you have any questions about this disclaimer, please contact us at{" "}
                      <a href="mailto:support@miamour.me" className="text-pink-600 hover:text-pink-700 transition-colors">
                        support@miamour.me
                      </a>.
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Terms;