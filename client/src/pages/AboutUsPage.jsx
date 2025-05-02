import { motion } from "framer-motion";
import { Heart, Users, Globe, Shield, Sparkles, Star, Home, MessageCircle } from "lucide-react";

const stats = [
  { id: 1, name: 'Successful Matches', value: '10,000+', icon: <Heart className="w-8 h-8 text-pink-500" /> },
  { id: 2, name: 'Happy Members', value: '50,000+', icon: <Users className="w-8 h-8 text-pink-500" /> },
  { id: 3, name: 'Countries', value: '30+', icon: <Globe className="w-8 h-8 text-pink-500" /> },
  { id: 4, name: 'Verified Profiles', value: '98%', icon: <Shield className="w-8 h-8 text-pink-500" /> },
];

const values = [
  { 
    title: "Commitment-Focused",
    icon: <Star className="w-10 h-10 text-pink-500" />,
    description: "We exclusively serve individuals who are serious about finding marriage and lasting partnerships."
  },
  { 
    title: "Shared Values",
    icon: <Home className="w-10 h-10 text-pink-500" />,
    description: "We believe lasting relationships start with mutual respect and aligned life goals."
  },
  { 
    title: "Meaningful Connections",
    icon: <MessageCircle className="w-10 h-10 text-pink-500" />,
    description: "Our platform encourages sincere conversations that develop into lifelong bonds."
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "Passionate about connecting hearts after her own journey to find love online.",
    image: "/api/placeholder/500/500"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Tech visionary who built our matching algorithm with psychology principles.",
    image: "/api/placeholder/500/500"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Matchmaking",
    bio: "Relationship expert with 10 years of experience in couples counseling.",
    image: "/api/placeholder/500/500"
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
        {/* Hero Section - Updated with new tagline */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent mb-4"
          >
            Where True Commitment Begins
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            miamour.me is a purpose-driven platform designed to connect adults who are ready to find love, commitment, and marriage.
          </motion.p>
        </div>

        {/* About Us Statement - New Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16 border border-pink-100"
        >
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">About Us</h3>
              <p className="text-gray-600 mb-4">
                We understand that building a lasting relationship starts with shared values, mutual respect, and a true desire for a committed future. That why miamour.me focuses exclusively on helping individuals who are serious about marriage find their perfect match.
              </p>
              <p className="text-gray-600">
                Our platform offers a safe, welcoming, and sincere environment where meaningful conversations turn into lifelong connections. We empower our members with tools, guidance, and community support to help them navigate their journey toward a fulfilling and lasting partnership.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Our Values - New Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md p-6 text-center border border-pink-100 flex flex-col items-center"
              >
                <div className="mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
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
          transition={{ delay: 0.7 }}
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