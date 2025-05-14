import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const ProfileForm = ({ onSubmit, initialData }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    age: initialData?.age || "",
    email: initialData?.email || "",
    profilePic: initialData?.profilePic || null,
    familyValues: initialData?.familyValues || "",
    religion: initialData?.religion || "",
    careerGoals: initialData?.careerGoals || "",
    financialPriorities: initialData?.financialPriorities || "",
    lifestylePrefs: initialData?.lifestylePrefs || [],
    marriageGoals: initialData?.marriageGoals || "",
    children: initialData?.children || "",
    conflictStyle: initialData?.conflictStyle || "",
    personalityTraits: initialData?.personalityTraits || [],
    gallery: initialData?.gallery || []
  });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const profilePicRef = useRef(null);
  const galleryRefs = useRef([]);

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Please enter your full name";
      if (!formData.age || formData.age < 18) newErrors.age = "You must be at least 18 years old";
      if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        newErrors.email = "Please enter a valid email address";
      }
    } else if (step === 2) {
      if (!formData.familyValues) newErrors.familyValues = "Please select an option";
      if (!formData.religion) newErrors.religion = "Please select an option";
      if (!formData.careerGoals) newErrors.careerGoals = "Please select an option";
      if (!formData.financialPriorities) newErrors.financialPriorities = "Please select an option";
      if (formData.lifestylePrefs.length === 0) newErrors.lifestylePrefs = "Select at least one preference";
    } else if (step === 3) {
      if (!formData.marriageGoals.trim()) newErrors.marriageGoals = "This field is required";
      if (!formData.children) newErrors.children = "Please select an option";
      if (!formData.conflictStyle) newErrors.conflictStyle = "Please select an option";
      if (formData.personalityTraits.length < 3) newErrors.personalityTraits = "Select at least three traits";
      if (formData.gallery.length < 2) newErrors.gallery = "Upload at least two photos";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
        setFormData((prev) => ({ ...prev, profilePic: url }));
      } else if (type === "gallery") {
        setFormData((prev) => ({
          ...prev,
          gallery: index !== null && prev.gallery[index]
            ? prev.gallery.map((item, i) => (i === index ? url : item))
            : [...prev.gallery, url]
        }));
      }
      setErrors((prev) => ({ ...prev, [type]: null }));
      setUploading(false);
    }, 1000);
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    // Always allow moving to next step, but validate required fields
    if (step < 3) {
      if (validateStep()) {
        setStep(step + 1);
      }
    } else {
      // Only validate and submit on final step
      if (validateStep()) {
        onSubmit(formData);
      } else {
        // Scroll to first error
        const firstError = Object.keys(errors)[0];
        if (firstError) {
          document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value)
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const variants = {
    enter: { x: 100, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  };

  const steps = [
    {
      title: "Personal Information",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
              placeholder="Enter your age"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <span className="text-xs text-gray-500">Recommended</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => handleImageUpload(e, "profilePic")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    ref={profilePicRef}
                    id="profile-picture-upload"
                  />
                  <label
                    htmlFor="profile-picture-upload"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border border-dashed border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    Choose File
                  </label>
                </div>
                {formData.profilePic && (
                  <span className="text-sm text-green-600">✓ Uploaded</span>
                )}
              </div>
              <p className="text-xs text-gray-500">JPG or PNG, max 5MB</p>
              {uploading && <p className="text-xs text-blue-500">Uploading, please wait...</p>}
              {errors.profilePic && (
                <p className="text-red-500 text-xs mt-1">{errors.profilePic}</p>
              )}
              {formData.profilePic && (
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={formData.profilePic}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-white shadow"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Lifestyle & Values",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Family Values</label>
            <select
              name="familyValues"
              value={formData.familyValues}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            >
              <option value="">Select an option</option>
              <option value="Traditional">Traditional (Close-knit, family-first)</option>
              <option value="Modern">Modern (Independent, balanced with family)</option>
              <option value="Mixed">Mixed (Blend of traditional and modern)</option>
            </select>
            {errors.familyValues && <p className="text-red-500 text-sm mt-1">{errors.familyValues}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Religious Beliefs</label>
            <select
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            >
              <option value="">Select an option</option>
              <option value="Christianity">Christianity</option>
              <option value="Islam">Islam</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Other">Other</option>
              <option value="None">None</option>
            </select>
            {errors.religion && <p className="text-red-500 text-sm mt-1">{errors.religion}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Career Goals</label>
            <select
              name="careerGoals"
              value={formData.careerGoals}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            >
              <option value="">Select an option</option>
              <option value="Ambitious">Ambitious (Career-driven, high aspirations)</option>
              <option value="Balanced">Balanced (Work-life balance priority)</option>
              <option value="Flexible">Flexible (Open to change, less career-focused)</option>
            </select>
            {errors.careerGoals && <p className="text-red-500 text-sm mt-1">{errors.careerGoals}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Financial Priorities</label>
            <select
              name="financialPriorities"
              value={formData.financialPriorities}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            >
              <option value="">Select an option</option>
              <option value="Saving">Saving (Long-term security)</option>
              <option value="Investing">Investing (Wealth growth)</option>
              <option value="Spending">Spending (Enjoying life now)</option>
            </select>
            {errors.financialPriorities && <p className="text-red-500 text-sm mt-1">{errors.financialPriorities}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Lifestyle (Select all that apply)</label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              {[
                { value: "Urban", img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390" },
                { value: "Suburban", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
                { value: "Rural", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
                { value: "Travel", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" }
              ].map((pref) => (
                <label key={pref.value} className="relative flex items-center">
                  <input
                    type="checkbox"
                    name="lifestylePrefs"
                    value={pref.value}
                    checked={formData.lifestylePrefs.includes(pref.value)}
                    onChange={handleChange}
                    className="absolute opacity-0"
                  />
                  <motion.div
                    className={`w-full h-24 rounded-lg overflow-hidden shadow-md cursor-pointer ${
                      formData.lifestylePrefs.includes(pref.value) ? "ring-4 ring-fuchsia-500" : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img src={pref.img} alt={pref.value} className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 text-white font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
                      {pref.value}
                    </span>
                  </motion.div>
                </label>
              ))}
            </div>
            {errors.lifestylePrefs && <p className="text-red-500 text-sm mt-1">{errors.lifestylePrefs}</p>}
          </div>
        </div>
      )
    },
    {
      title: "Relationship Goals & Personality",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Marriage Goals</label>
            <textarea
              name="marriageGoals"
              value={formData.marriageGoals}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
              placeholder="What are your expectations for marriage? (e.g., partnership, shared goals)"
              rows="4"
            />
            {errors.marriageGoals && <p className="text-red-500 text-sm mt-1">{errors.marriageGoals}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Views on Children</label>
            <select
              name="children"
              value={formData.children}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            >
              <option value="">Select an option</option>
              <option value="Want">Want children</option>
              <option value="Maybe">Open to children</option>
              <option value="No">Do not want children</option>
            </select>
            {errors.children && <p className="text-red-500 text-sm mt-1">{errors.children}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Conflict Resolution Style</label>
            <select
              name="conflictStyle"
              value={formData.conflictStyle}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            >
              <option value="">Select an option</option>
              <option value="Discuss">Discuss calmly and openly</option>
              <option value="Compromise">Seek compromise quickly</option>
              <option value="Reflect">Take time to reflect before resolving</option>
            </select>
            {errors.conflictStyle && <p className="text-red-500 text-sm mt-1">{errors.conflictStyle}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Personality Traits (Select at least 3)</label>
            <div className="mt-2 space-y-2">
              {["Empathetic", "Ambitious", "Humorous", "Loyal", "Adventurous", "Calm"].map((trait) => (
                <label key={trait} className="flex items-center">
                  <input
                    type="checkbox"
                    name="personalityTraits"
                    value={trait}
                    checked={formData.personalityTraits.includes(trait)}
                    onChange={handleChange}
                    className="h-5 w-5 text-fuchsia-600 focus:ring-fuchsia-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">{trait}</span>
                </label>
              ))}
            </div>
            {errors.personalityTraits && <p className="text-red-500 text-sm mt-1">{errors.personalityTraits}</p>}
          </div>
          <div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Photo Gallery</label>
                <span className="text-xs text-gray-500">Add 2-4 photos</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Showcase different aspects of your life (e.g., hobbies, travel, etc.)</p>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                <div key={index} className="relative">
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => handleImageUpload(e, "gallery", index)}
                    className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                    disabled={formData.gallery.length >= 4 && !formData.gallery[index]}
                    ref={(el) => (galleryRefs.current[index] = el)}
                  />
                  {formData.gallery[index] && (
                    <motion.div
                      className="mt-2 relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img
                        src={formData.gallery[index]}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-32 rounded-lg object-cover"
                      />
                      <button
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </motion.div>
                  )}
                </div>
              ))}
              </div>
              {uploading && <p className="text-xs text-blue-500 mt-1">Uploading, please wait...</p>}
              {errors.gallery && (
                <p className="text-red-500 text-xs mt-1">{errors.gallery}</p>
              )}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative">
      {/* Progress Indicator */}
      <div className="flex justify-between mb-8">
        {steps.map((s, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                step >= index + 1 ? "bg-gradient-to-r from-fuchsia-500 to-pink-500" : "bg-gray-300"
              }`}
              animate={{ scale: step === index + 1 ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {index + 1}
            </motion.div>
            <span className={`text-xs mt-2 ${step >= index + 1 ? "text-gray-800" : "text-gray-500"}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{steps[step - 1].title}</h2>
          {steps[step - 1].content}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Back
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white rounded-lg font-medium hover:from-fuchsia-600 hover:to-pink-600 transition-colors"
        >
          {step === 3 ? "Submit" : "Next"}
        </motion.button>
      </div>
    </div>
  );
};

// PropTypes validation
ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
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
    gallery: PropTypes.arrayOf(PropTypes.string)
  })
};

// Default props
ProfileForm.defaultProps = {
  initialData: {}
};

export default ProfileForm;