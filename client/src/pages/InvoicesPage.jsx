
import { useState, useRef } from 'react';
import { Download, FileText, Sparkles, CheckCircle, Clock, AlertCircle, ChevronLeft } from 'lucide-react';

// Sleek BackButton component
const BackButton = () => (
  <button
    onClick={() => window.history.back()}
    className="fixed top-8 left-8 z-30 flex items-center bg-white/90 border border-pink-100 shadow-lg rounded-full px-4 py-2 text-pink-600 font-semibold hover:bg-pink-50 transition-colors"
    aria-label="Go back"
  >
    <ChevronLeft className="h-5 w-5 mr-1" />
    Back
  </button>
);

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
      alert('Failed to download invoices. Please try again later.');
    }
  };

  // Parallax effect using scroll
  const parallaxRef = useRef(null);
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (parallaxRef.current) {
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
  };
  // Attach scroll event
  if (typeof window !== "undefined") {
    window.onscroll = handleScroll;
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-x-hidden">
      {/* Parallax geometric background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          ref={parallaxRef}
          width="100%" height="100%" viewBox="0 0 1440 600"
          className="absolute top-0 left-0"
          style={{ transition: 'transform 0.2s linear' }}
        >
          <circle cx="1200" cy="100" r="180" fill="#f0f4ff" opacity="0.7" />
          <rect x="100" y="400" width="300" height="120" rx="60" fill="#ffe4f0" opacity="0.5" />
          <ellipse cx="400" cy="120" rx="120" ry="60" fill="#f7faff" opacity="0.7" />
          <rect x="900" y="350" width="220" height="80" rx="40" fill="#ffd6ec" opacity="0.4" />
        </svg>
        {/* Pink splash */}
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Sleek Back Button */}
      <BackButton />

      <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 shadow">
              <Sparkles className="h-10 w-10 text-pink-500" />
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Your Invoices
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            View and download your payment invoices. Keep track of your subscription history.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-pink-100 p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Invoice History</h2>
            <button
              onClick={handleDownloadAll}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Download All
            </button>
          </div>

          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="bg-white border border-pink-100 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-pink-300 transition-all duration-300"
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
                  <button
                    onClick={() => handleDownload(invoice.invoiceFile)}
                    className="p-2 bg-pink-50 rounded-lg text-pink-600 hover:bg-pink-100 transition-colors"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
