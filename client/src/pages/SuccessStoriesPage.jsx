import { motion } from "framer-motion";
import { Heart, Quote } from "lucide-react";

const stories = [
  {
    id: 1,
    quote: "Miamour helped me find my soulmate when I had almost given up hope. We're getting married next spring!",
    author: "Sarah & Michael",
    date: "Married 2023",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    quote: "After just two months on Miamour, I met the love of my life. The compatibility matching is incredible!",
    author: "James & Emily",
    date: "Engaged 2023",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    quote: "We connected over our shared love of hiking and travel. Thanks to Miamour, we're now exploring the world together.",
    author: "David & Jessica",
    date: "Together since 2022",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent mb-4"
          >
            Love Stories That Inspire
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Real couples who found love through Miamour. Your success story could be next!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.author} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-start mb-4 text-pink-500">
                  <Quote className="w-6 h-6" />
                </div>
                <p className="text-gray-600 italic mb-6">{story.quote}</p>
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-pink-500 mr-2" />
                  <span className="font-medium text-gray-800">{story.author}</span>
                  <span className="ml-auto text-sm text-gray-500">{story.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Share Your Story</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Found love through Miamour? Wed love to hear your story and possibly feature it here!
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105">
            Share Your Success Story
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}