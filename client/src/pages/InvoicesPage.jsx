import { useState } from 'react';
import { Download, FileText,  } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from "../components/Header";

const InvoicesPage = () => {
  const [invoices] = useState([
    {
      id: 1,
      date: '2023-10-01',
      amount: '$49.99',
      status: 'Paid',
      downloadLink: '#'
    },
    {
      id: 2,
      date: '2023-09-01',
      amount: '$49.99',
      status: 'Paid',
      downloadLink: '#'
    },
    {
      id: 3,
      date: '2023-08-01',
      amount: '$49.99',
      status: 'Paid',
      downloadLink: '#'
    }
  ]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-pink-700 mb-3">Your Invoices</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">View and download your payment invoices.</p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Invoice History</h2>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <motion.div
                    key={invoice.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 text-pink-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-800">Invoice #{invoice.id}</p>
                        <p className="text-sm text-gray-500">{invoice.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-4">{invoice.amount}</span>
                      <a 
                        href={invoice.downloadLink}
                        className="text-pink-600 hover:text-pink-700"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                    </div>
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

export default InvoicesPage;