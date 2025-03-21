import { useState } from 'react';
import { Gift,  } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from "../components/Header";

const DiscountsPage = () => {
  const [discounts] = useState([
    {
      id: 1,
      code: 'LOVE2023',
      description: 'Get 20% off your first month',
      validUntil: '2023-12-31'
    },
    {
      id: 2,
      code: 'FOREVERLOVE',
      description: '50% off Lifetime Love plan',
      validUntil: '2023-11-15'
    }
  ]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-pink-700 mb-3">Available Discounts</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Apply discounts to your subscription and save big!</p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Discount Codes</h2>
              <div className="space-y-4">
                {discounts.map((discount) => (
                  <motion.div
                    key={discount.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <Gift className="h-6 w-6 text-pink-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-800">{discount.code}</p>
                        <p className="text-sm text-gray-500">{discount.description}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">Valid until {discount.validUntil}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountsPage;