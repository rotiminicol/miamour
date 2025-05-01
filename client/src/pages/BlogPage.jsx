import { motion } from "framer-motion";
import { Calendar,  MessageSquare, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "5 First Date Ideas That Will Impress Your Match",
    excerpt: "Discover creative and memorable first date ideas that will help you make a great impression.",
    date: "June 15, 2023",
    author: "Emily Wilson",
    comments: 12,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "How to Create an Authentic Dating Profile",
    excerpt: "Learn the dos and don'ts of crafting a dating profile that truly represents you.",
    date: "May 28, 2023",
    author: "David Chen",
    comments: 8,
    image: "https://images.unsplash.com/photo-1556157382-97eea696b430?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "The Psychology of Online Dating: What Works",
    excerpt: "Understand the psychological principles behind successful online dating experiences.",
    date: "May 10, 2023",
    author: "Sarah Johnson",
    comments: 15,
    image: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Long Distance Relationships: Making It Work",
    excerpt: "Expert tips on maintaining a strong connection when you're miles apart.",
    date: "April 22, 2023",
    author: "Michael Rodriguez",
    comments: 6,
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Spotting Red Flags in Online Dating",
    excerpt: "Learn to recognize warning signs and protect yourself while dating online.",
    date: "April 5, 2023",
    author: "Lisa Thompson",
    comments: 20,
    image: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "From Online Chat to First Date: A Smooth Transition",
    excerpt: "How to comfortably move from messaging to meeting in person.",
    date: "March 18, 2023",
    author: "James Wilson",
    comments: 9,
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  }
];

export default function BlogPage() {
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
            Miamour Blog
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Expert advice, dating tips, and success stories to help you navigate your journey to love.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {post.comments} comments
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <button className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105">
            Load More Articles
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}



