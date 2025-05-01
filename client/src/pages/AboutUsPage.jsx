import { motion } from "framer-motion";
import { Heart, Users, Globe, Shield, Sparkles } from "lucide-react";

const stats = [
  { id: 1, name: 'Successful Matches', value: '10,000+', icon: <Heart className="w-8 h-8 text-pink-500" /> },
  { id: 2, name: 'Happy Members', value: '50,000+', icon: <Users className="w-8 h-8 text-pink-500" /> },
  { id: 3, name: 'Countries', value: '30+', icon: <Globe className="w-8 h-8 text-pink-500" /> },
  { id: 4, name: 'Verified Profiles', value: '98%', icon: <Shield className="w-8 h-8 text-pink-500" /> },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "Passionate about connecting hearts after her own journey to find love online.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Tech visionary who built our matching algorithm with psychology principles.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Matchmaking",
    bio: "Relationship expert with 10 years of experience in couples counseling.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  }
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent mb-4"
          >
            Our Story of Love and Connection
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            MiAmour was born from a simple idea: everyone deserves to find meaningful connections in a safe, authentic space.
          </motion.p>
        </div>

        {/* Mission Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16 border border-pink-100"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
              <Sparkles className="w-16 h-16 text-pink-500" />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                To create a dating platform that prioritizes quality over quantity, authenticity over algorithms, 
                and meaningful connections over casual encounters.
              </p>
              <p className="text-gray-600">
                We believe in love that lasts, and weve designed every aspect of MiAmour to help you find your 
                perfect match for a lifelong partnership.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white rounded-lg shadow-md p-6 text-center border border-pink-100">
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600">{stat.name}</p>
            </div>
          ))}
        </motion.div>

        {/* Team Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h4>
                  <p className="text-pink-500 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Your Journey?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of singles who have found meaningful connections through MiAmour.
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105">
            Create Your Profile
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}