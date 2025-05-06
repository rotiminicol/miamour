import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(-1)}
      className="flex items-center space-x-2 text-gray-600 hover:text-rose-600 transition-colors duration-300 mb-6"
      whileHover={{ x: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <ArrowLeft size={20} />
      <span className="font-medium">Back</span>
    </motion.button>
  );
};

export default BackButton; 