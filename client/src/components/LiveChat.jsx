import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, MessageSquare } from 'lucide-react';
import PropTypes from 'prop-types';

const LiveChat = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! Welcome to Mi Amour support. How can I help you today?", 
      sender: 'agent', 
      timestamp: new Date() 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Sample automated responses based on user input
  const getAutomatedResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return "Hi there! How can I assist you today?";
    } else if (lowerCaseMessage.includes('price') || lowerCaseMessage.includes('cost')) {
      return "Our pricing information can be found on our website. Is there a specific product you're interested in?";
    } else if (lowerCaseMessage.includes('delivery') || lowerCaseMessage.includes('shipping')) {
      return "We offer standard shipping (3-5 business days) and express shipping (1-2 business days). Shipping costs vary based on location and order value.";
    } else if (lowerCaseMessage.includes('return') || lowerCaseMessage.includes('refund')) {
      return "We have a 30-day return policy. If you're not satisfied with your purchase, you can return it for a full refund within 30 days of delivery.";
    } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('email')) {
      return "You can reach our customer service team at info@miamour.me or call us at +234 9044130171.";
    } else {
      return "Thank you for your message. One of our representatives will get back to you shortly. Is there anything else I can help you with?";
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate agent typing
    setIsTyping(true);
    
    // Generate automated response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      const agentMessage = {
        id: messages.length + 2,
        text: getAutomatedResponse(inputMessage),
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
    }, 1500);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed bottom-6 right-6 bg-white rounded-lg shadow-xl w-96 z-50 overflow-hidden flex flex-col"
        style={{ height: '500px' }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {/* Chat Header */}
        <div className="bg-pink-500 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <MessageSquare className="w-6 h-6 mr-2" />
            <h3 className="text-lg font-medium">Mi Amour Support</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:bg-pink-600 rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
          {messages.map(message => (
            <motion.div
              key={message.id}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`flex items-start ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`rounded-full p-2 flex items-center justify-center ${message.sender === 'user' ? 'bg-pink-100 ml-2' : 'bg-gray-200 mr-2'}`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-pink-500" />
                  ) : (
                    <MessageSquare className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className={`px-4 py-2 rounded-lg max-w-xs ${message.sender === 'user' ? 'bg-pink-500 text-white' : 'bg-white text-gray-800 border border-gray-200'}`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-pink-100' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="flex items-center bg-white border border-gray-200 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <motion.div 
                    className="w-2 h-2 bg-gray-500 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-gray-500 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-gray-500 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                  />
                </div>
                <span className="ml-2 text-sm text-gray-500">Agent is typing...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-pink-500 text-white p-2 rounded-r-md hover:bg-pink-600 transition-colors"
              disabled={!inputMessage.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

LiveChat.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default LiveChat;