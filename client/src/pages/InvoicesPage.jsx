import { useState } from 'react';
import { Download, FileText, Sparkles, CheckCircle, Clock, AlertCircle, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from "../components/Header";

const InvoicesPage = () => {
  const [invoices] = useState([
    {
      id: 1,
      date: '2023-10-01',
      amount: '$49.99',
      status: 'Paid',
      invoiceFile: '/invoices/invoice-2023-10.pdf',
      dueDate: '2023-10-15'
    },
    {
      id: 2,
      date: '2023-09-01',
      amount: '$49.99',
      status: 'Paid',
      invoiceFile: '/invoices/invoice-2023-09.pdf',
      dueDate: '2023-09-15'
    },
    {
      id: 3,
      date: '2023-08-01',
      amount: '$49.99',
      status: 'Pending',
      invoiceFile: '/invoices/invoice-2023-08.pdf',
      dueDate: '2023-08-15'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-red-100 text-red-700';
    }
  };

  const handleDownload = async (invoiceFile) => {
    try {
      const response = await fetch(invoiceFile);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = invoiceFile.split('/').pop();
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Please try again later.');
    }
  };

  const handleDownloadAll = async () => {
    try {
      const response = await fetch('/invoices/all-invoices.zip');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'all-invoices.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading all invoices:', error);
      alert('Failed to download invoices. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-[#FF1493] mb-6 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back
        </motion.button>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white py-12 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <Sparkles className="h-12 w-12 text-pink-500 mx-auto" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Your Invoices
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              View and download your payment invoices. Keep track of your subscription history.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-10 border border-pink-100"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Invoice History</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadAll}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Download All
              </motion.button>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {invoices.map((invoice, index) => (
                  <motion.div
                    key={invoice.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 8px 30px rgba(236, 72, 153, 0.15)"
                    }}
                    className="bg-white/50 backdrop-blur-sm border border-pink-100 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-pink-200 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Invoice #{invoice.id}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>Issued: {invoice.date}</span>
                          <span>•</span>
                          <span>Due: {invoice.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(invoice.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </div>
                      <span className="text-xl font-semibold text-gray-800">{invoice.amount}</span>
                      <motion.button 
                        onClick={() => handleDownload(invoice.invoiceFile)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-pink-50 rounded-lg text-pink-600 hover:bg-pink-100 transition-colors"
                      >
                        <Download className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;