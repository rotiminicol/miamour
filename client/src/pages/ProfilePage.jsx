import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { ArrowLeft, Camera } from "lucide-react";
import { useUserStore } from "../store/useUserStore"; // Assuming this is your user store
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ userData }) => {
  const { updateProfile } = useUserStore();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(userData?.profilePic || null);
  const [gallery, setGallery] = useState(userData?.gallery || []);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const profilePicRef = useRef(null);
  const galleryRefs = useRef([]);

  const handleImageUpload = (e, type, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setErrors((prev) => ({ ...prev, [type]: "Only JPG/PNG files are allowed" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [type]: "Image must be less than 5MB" }));
      return;
    }

    setUploading(true);
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      if (type === "profilePic") {
        setProfilePic(url);
        updateProfile({ ...userData, profilePic: url });
      } else if (type === "gallery") {
        const newGallery = index !== null && gallery[index]
          ? gallery.map((item, i) => (i === index ? url : item))
          : [...gallery, url];
        setGallery(newGallery);
        updateProfile({ ...userData, gallery: newGallery });
      }
      setErrors((prev) => ({ ...prev, [type]: null }));
      setUploading(false);
    }, 1000);
  };

  const removeGalleryImage = (index) => {
    const newGallery = gallery.filter((_, i) => i !== index);
    setGallery(newGallery);
    updateProfile({ ...userData, gallery: newGallery });
  };

  const sections = [
    {
      title: "Personal Information",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <p className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">{userData?.name || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <p className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">{userData?.age || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">{userData?.email || "N/A"}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Lifestyle & Values",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Family Values</label>
            <p className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">{userData?.familyValues || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Religious Beliefs</label>
            <p className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">{userData?.religion || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Career Goals</label>
            <p className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">{userData?.careerGoals || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Financial Priorities</label>
            <p className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">{userData?.financialPriorities || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Lifestyle</label>
            <p className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">
              {userData?.lifestylePrefs?.length > 0 ? userData.lifestylePrefs.join(", ") : "N/A"}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Relationship Goals & Personality",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Marriage Goals</label>
            <p className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">{userData?.marriageGoals || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Views on Children</label>
            <p className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">{userData?.children || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Conflict Resolution Style</label>
            <p className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">{userData?.conflictStyle || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Personality Traits</label>
            <p className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">
              {userData?.personalityTraits?.length > 0 ? userData.personalityTraits.join(", ") : "N/A"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo Gallery (2-4 photos)</label>
            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="relative group">
                  {gallery[index] ? (
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img
                        src={gallery[index]}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-32 rounded-lg object-cover shadow-md"
                      />
                      <motion.button
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ×
                      </motion.button>
                    </motion.div>
                  ) : (
                    <label className="relative block">
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(e) => handleImageUpload(e, "gallery", index)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={gallery.length >= 4 && !gallery[index]}
                        ref={(el) => (galleryRefs.current[index] = el)}
                      />
                      <motion.div
                        className="w-full h-32 rounded-lg bg-pink-100/50 border-2 border-dashed border-pink-300 flex items-center justify-center text-pink-600"
                        whileHover={{ scale: 1.02, backgroundColor: "#fce7f3" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Camera size={24} />
                      </motion.div>
                    </label>
                  )}
                </div>
              ))}
            </div>
            {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            {errors.gallery && <p className="text-red-500 text-sm mt-2">{errors.gallery}</p>}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-10 flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg shadow-md backdrop-blur-sm"
        whileHover={{ scale: 1.05, backgroundColor: "#db2777" }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </motion.button>

      {/* Profile Picture Section */}
      <div className="relative pt-20 pb-12">
        <motion.div
          className="absolute inset-0 bg-pink-200/30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617957743165-0e6c5188b6f8')" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            className="relative inline-block"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
              />
            ) : (
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-pink-100 flex items-center justify-center border-4 border-white shadow-lg mx-auto">
                <Camera size={40} className="text-pink-600" />
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-pink-600 text-white rounded-full p-2 cursor-pointer shadow-md">
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={(e) => handleImageUpload(e, "profilePic")}
                className="absolute inset-0 opacity-0 cursor-pointer"
                ref={profilePicRef}
              />
              <Camera size={20} />
            </label>
          </motion.div>
          {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
          {errors.profilePic && <p className="text-red-500 text-sm mt-2">{errors.profilePic}</p>}
          <motion.h1
            className="mt-6 text-3xl sm:text-4xl font-bold text-gray-800"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
          >
            {userData?.name || "Your Profile"}
          </motion.h1>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="max-w-3xl mx-auto px-6 pb-12">
        <AnimatePresence>
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="mb-12 bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 300 }}
              style={{ backgroundParallax: true }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{section.title}</h2>
              {section.content}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
    profilePic: PropTypes.string,
    familyValues: PropTypes.string,
    religion: PropTypes.string,
    careerGoals: PropTypes.string,
    financialPriorities: PropTypes.string,
    lifestylePrefs: PropTypes.arrayOf(PropTypes.string),
    marriageGoals: PropTypes.string,
    children: PropTypes.string,
    conflictStyle: PropTypes.string,
    personalityTraits: PropTypes.arrayOf(PropTypes.string),
    gallery: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProfilePage;