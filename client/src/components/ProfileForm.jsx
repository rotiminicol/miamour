import { useState, useRef } from "react";
import { User, Heart, ArrowRight, ArrowLeft, Check, FileText, X, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from 'prop-types';

const ProfileForm = ({ onSubmit, initialData = {}, isSidebarOpen = true }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    age: initialData.age || "",
    gender: initialData.gender || "",
    location: initialData.location || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    pictures: initialData.pictures || [],
    profession: initialData.profession || "",
    education: initialData.education || "",
    religion: initialData.religion || "",
    familyBackground: initialData.familyBackground || "",
    hobbies: initialData.hobbies || "",
    relationshipStatus: initialData.relationshipStatus || "",
    previousMarriages: initialData.previousMarriages || "",
    divorceDetails: initialData.divorceDetails || "",
    hasChildren: initialData.hasChildren || "",
    numberOfChildren: initialData.numberOfChildren || "",
    childrenAges: initialData.childrenAges || "",
    livingArrangement: initialData.livingArrangement || "",
    partnerAgeRange: initialData.partnerAgeRange || "",
    partnerLocationPreference: initialData.partnerLocationPreference || "",
    partnerReligionPreference: initialData.partnerReligionPreference || "",
    partnerEducationPreference: initialData.partnerEducationPreference || "",
    dealBreakers: initialData.dealBreakers || "",
    marriageTimeframe: initialData.marriageTimeframe || "",
    acceptPartnerWithChildren: initialData.acceptPartnerWithChildren || ""
  });

  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const validateField = (name, value) => {
    if (!value && ['name', 'age', 'gender', 'location', 'email', 'profession', 'education', 'religion', 'relationshipStatus', 'hasChildren', 'partnerAgeRange', 'partnerReligionPreference', 'marriageTimeframe'].includes(name)) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      return 'Invalid email format';
    }
    if (name === 'pictures' && value.length < 5) {
      return `Please upload at least 5 photos (currently ${value.length})`;
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.pictures.length > 10) {
      setErrors(prev => ({ ...prev, pictures: 'You can upload a maximum of 10 photos' }));
      return;
    }

    setUploading(true);
    try {
      const newPictures = files.map(file => ({
        url: URL.createObjectURL(file),
        file,
        isPrimary: false
      }));
      
      const updatedPictures = [...formData.pictures, ...newPictures];
      setFormData(prev => ({ ...prev, pictures: updatedPictures }));
      setErrors(prev => ({ ...prev, pictures: validateField('pictures', updatedPictures) }));
    } catch (error) {
      console.error("Error uploading images:", error);
      setErrors(prev => ({ ...prev, pictures: 'Error uploading images. Please try again.' }));
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newPictures = [...formData.pictures];
    const removed = newPictures.splice(index, 1);
    
    if (removed[0]?.url?.startsWith('blob:')) {
      URL.revokeObjectURL(removed[0].url);
    }
    
    setFormData(prev => ({ ...prev, pictures: newPictures }));
    setErrors(prev => ({ ...prev, pictures: validateField('pictures', newPictures) }));
  };

  const setPrimaryImage = (index) => {
    setFormData(prev => {
      const newPictures = prev.pictures.map((pic, i) => ({
        ...pic,
        isPrimary: i === index
      }));
      return { ...prev, pictures: newPictures };
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleNextStep = () => {
    if (isStepComplete(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isStepComplete(3)) {
      onSubmit(formData);
    }
  };

  const isStepComplete = (step) => {
    if (step === 1) {
      return !validateField('name', formData.name) &&
             !validateField('age', formData.age) &&
             !validateField('gender', formData.gender) &&
             !validateField('location', formData.location) &&
             !validateField('email', formData.email) &&
             !validateField('pictures', formData.pictures);
    } else if (step === 2) {
      return !validateField('profession', formData.profession) &&
             !validateField('education', formData.education) &&
             !validateField('religion', formData.religion) &&
             !validateField('relationshipStatus', formData.relationshipStatus) &&
             !validateField('hasChildren', formData.hasChildren);
    } else if (step === 3) {
      return !validateField('partnerAgeRange', formData.partnerAgeRange) &&
             !validateField('partnerReligionPreference', formData.partnerReligionPreference) &&
             !validateField('marriageTimeframe', formData.marriageTimeframe);
    }
    return false;
  };

  const fadeVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <Heart className="h-8 w-8 text-rose-500 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">Create Your Matrimony Profile</h1>
        </div>
        <div className="text-sm text-gray-500">Step {currentStep} of 3</div>
      </header>

      <div className="flex-grow flex justify-center py-8">
        <div className={`w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isSidebarOpen ? 'lg:pl-64' : ''}`}>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                      step === currentStep 
                        ? "bg-rose-500 text-white" 
                        : step < currentStep 
                          ? "bg-green-500 text-white" 
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step < currentStep ? <Check size={18} /> : step}
                  </div>
                  <p className="text-sm font-medium mt-2 text-gray-700">
                    {step === 1 ? "Basic Info" : step === 2 ? "Personal Details" : "Preferences"}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-rose-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div 
                  key="step1"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold flex items-center text-gray-800">
                    <User className="mr-3 text-rose-500" size={24} />
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                      <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Your age"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={errors.age ? 'true' : 'false'}
                        aria-describedby={errors.age ? 'age-error' : undefined}
                      />
                      {errors.age && <p id="age-error" className="text-red-500 text-sm mt-1">{errors.age}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={errors.gender ? 'true' : 'false'}
                        aria-describedby={errors.gender ? 'gender-error' : undefined}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && <p id="gender-error" className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, Country"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={errors.location ? 'true' : 'false'}
                        aria-describedby={errors.location ? 'location-error' : undefined}
                      />
                      {errors.location && <p id="location-error" className="text-red-500 text-sm mt-1">{errors.location}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your email address"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Your phone number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photos * (Minimum 5, Maximum 10)
                      <span className="text-xs text-gray-500 ml-2">
                        {formData.pictures.length}/10 uploaded
                      </span>
                    </label>
                    {errors.pictures && <p className="text-red-500 text-sm mb-2">{errors.pictures}</p>}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      multiple
                      accept="image/*"
                      className="hidden"
                      aria-describedby="pictures-error"
                    />
                    <div className="flex flex-wrap gap-3 mb-4">
                      {formData.pictures.map((picture, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={picture.url}
                            alt={`Profile ${index + 1}`}
                            className={`w-24 h-24 object-cover rounded-lg border-2 ${picture.isPrimary ? 'border-rose-500' : 'border-gray-200'}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label={`Remove photo ${index + 1}`}
                          >
                            <X size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setPrimaryImage(index)}
                            className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs px-2 py-1 rounded ${
                              picture.isPrimary 
                                ? 'bg-rose-500 text-white' 
                                : 'bg-white text-gray-700 opacity-0 group-hover:opacity-100'
                            } transition-opacity`}
                            aria-label={picture.isPrimary ? 'Primary photo' : 'Set as primary photo'}
                          >
                            {picture.isPrimary ? 'Primary' : 'Set Primary'}
                          </button>
                        </div>
                      ))}
                    </div>
                    <motion.button
                      type="button"
                      onClick={triggerFileInput}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={formData.pictures.length >= 10 || uploading}
                      className={`w-full p-3 rounded-lg flex items-center justify-center gap-2 ${
                        uploading 
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                          : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                      }`}
                      aria-label="Upload photos"
                    >
                      {uploading ? 'Uploading...' : (
                        <>
                          <Upload size={16} />
                          {formData.pictures.length === 0 ? 'Upload Photos' : 'Add More Photos'}
                        </>
                      )}
                    </motion.button>
                    <p className="text-xs text-gray-500 mt-2">
                      Upload clear, high-quality photos. At least one should clearly show your face.
                    </p>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div 
                  key="step2"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold flex items-center text-gray-800">
                    <FileText className="mr-3 text-rose-500" size={24} />
                    Personal Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profession *</label>
                      <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        placeholder="Your occupation"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${errors.profession ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={errors.profession ? 'true' : 'false'}
                        aria-describedby={errors.profession ? 'profession-error' : undefined}
                      />
                      {errors.profession && <p id="profession-error" className="text-red-500 text-sm mt-1">{errors.profession}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Education *</label>
                      <select
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${errors.education ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={errors.education ? 'true' : 'false'}
                        aria-describedby={errors.education ? 'education-error' : undefined}
                      >
                        <option value="">Select education level</option>
                        <option value="highSchool">High School</option>
                        <option value="bachelors">Bachelors Degree</option>
                        <option value="masters">Masters Degree</option>
                        <option value="phd">PhD or Doctorate</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.education && <p id="education-error" className="text-red-500 text-sm mt-1">{errors.education}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Religion *</label>
                      <input
                        type="text"
                        name="religion"
                        value={formData.religion}
                        onChange={handleInputChange}
                        placeholder="Your religious background"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${errors.religion ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={errors.religion ? 'true' : 'false'}
                        aria-describedby={errors.religion ? 'religion-error' : undefined}
                      />
                      {errors.religion && <p id="religion-error" className="text-red-500 text-sm mt-1">{errors.religion}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relationship Status *</label>
                      <select
                        name="relationshipStatus"
                        value={formData.relationshipStatus}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${errors.relationshipStatus ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={errors.relationshipStatus ? 'true' : 'false'}
                        aria-describedby={errors.relationshipStatus ? 'relationshipStatus-error' : undefined}
                      >
                        <option value="">Select status</option>
                        <option value="single">Single (Never Married)</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                        <option value="separated">Separated</option>
                      </select>
                      {errors.relationshipStatus && <p id="relationshipStatus-error" className="text-red-500 text-sm mt-1">{errors.relationshipStatus}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Previous Marriages</label>
                      <select
                        name="previousMarriages"
                        value={formData.previousMarriages}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        <option value="">Select option</option>
                        <option value="0">None</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3+">3 or more</option>
                      </select>
                    </div>
                    {(formData.relationshipStatus === "divorced" || formData.relationshipStatus === "separated") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Divorce/Separation Details</label>
                        <textarea
                          name="divorceDetails"
                          value={formData.divorceDetails}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                          placeholder="How long ago? Any specific circumstances?"
                          rows="3"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Do You Have Children? *</label>
                      <select
                        name="hasChildren"
                        value={formData.hasChildren}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${errors.hasChildren ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={errors.hasChildren ? 'true' : 'false'}
                        aria-describedby={errors.hasChildren ? 'hasChildren-error' : undefined}
                      >
                        <option value="">Select option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      {errors.hasChildren && <p id="hasChildren-error" className="text-red-500 text-sm mt-1">{errors.hasChildren}</p>}
                    </div>
                    {formData.hasChildren === "yes" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Children</label>
                          <select
                            name="numberOfChildren"
                            value={formData.numberOfChildren}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                          >
                            <option value="">Select number</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5+">5 or more</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Childrens Ages</label>
                          <input
                            type="text"
                            name="childrenAges"
                            value={formData.childrenAges}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                            placeholder="e.g., 5, 8, 12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Living Arrangement</label>
                          <select
                            name="livingArrangement"
                            value={formData.livingArrangement}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                          >
                            <option value="">Select arrangement</option>
                            <option value="fullTime">Live with me full-time</option>
                            <option value="partTime">Live with me part-time</option>
                            <option value="visitOnly">Visit occasionally</option>
                            <option value="adult">Adult children (independent)</option>
                            <option value="other">Other arrangement</option>
                          </select>
                        </div>
                      </>
                    )}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Family Background</label>
                      <textarea
                        name="familyBackground"
                        value={formData.familyBackground}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 min-h-[100px]"
                        placeholder="Brief description of your family"
                        rows="4"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hobbies & Interests</label>
                      <textarea
                        name="hobbies"
                        value={formData.hobbies}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 min-h-[100px]"
                        placeholder="What do you enjoy doing in your free time?"
                        rows="4"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div 
                  key="step3"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold flex items-center text-gray-800">
                    <Heart className="mr-3 text-rose-500" size={24} />
                    Marriage Preferences
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Age Range *</label>
                      <input
                        type="text"
                        name="partnerAgeRange"
                        value={formData.partnerAgeRange}
                        onChange={handleInputChange}
                        placeholder="e.g., 25-35"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${errors.partnerAgeRange ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={errors.partnerAgeRange ? 'true' : 'false'}
                        aria-describedby={errors.partnerAgeRange ? 'partnerAgeRange-error' : undefined}
                      />
                      {errors.partnerAgeRange && <p id="partnerAgeRange-error" className="text-red-500 text-sm mt-1">{errors.partnerAgeRange}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location Preference</label>
                      <input
                        type="text"
                        name="partnerLocationPreference"
                        value={formData.partnerLocationPreference}
                        onChange={handleInputChange}
                        placeholder="Preferred location for partner"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Religious Preference *</label>
                      <input
                        type="text"
                        name="partnerReligionPreference"
                        value={formData.partnerReligionPreference}
                        onChange={handleInputChange}
                        placeholder="Preferred religious background"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${errors.partnerReligionPreference ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={errors.partnerReligionPreference ? 'true' : 'false'}
                        aria-describedby={errors.partnerReligionPreference ? 'partnerReligionPreference-error' : undefined}
                      />
                      {errors.partnerReligionPreference && <p id="partnerReligionPreference-error" className="text-red-500 text-sm mt-1">{errors.partnerReligionPreference}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Education Preference</label>
                      <select
                        name="partnerEducationPreference"
                        value={formData.partnerEducationPreference}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        <option value="">Select preference</option>
                        <option value="highSchool">High School or higher</option>
                        <option value="bachelors">Bachelors Degree or higher</option>
                        <option value="masters">Masters Degree or higher</option>
                        <option value="phd">PhD or Doctorate</option>
                        <option value="noPreference">No Preference</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Accept Partner with Children?</label>
                      <select
                        name="acceptPartnerWithChildren"
                        value={formData.acceptPartnerWithChildren}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        <option value="">Select preference</option>
                        <option value="yes">Yes, I accept partners with children</option>
                        <option value="no">No, I prefer partners without children</option>
                        <option value="maybe">Depends on the situation</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Deal Breakers</label>
                      <textarea
                        name="dealBreakers"
                        value={formData.dealBreakers}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 min-h-[100px]"
                        placeholder="Any absolute requirements or deal breakers"
                        rows="4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Marriage Timeframe *</label>
                      <select
                        name="marriageTimeframe"
                        value={formData.marriageTimeframe}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${errors.marriageTimeframe ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={errors.marriageTimeframe ? 'true' : 'false'}
                        aria-describedby={errors.marriageTimeframe ? 'marriageTimeframe-error' : undefined}
                      >
                        <option value="">Select timeframe</option>
                        <option value="0-6months">Within 6 months</option>
                        <option value="6-12months">6-12 months</option>
                        <option value="1-2years">1-2 years</option>
                        <option value="2+years">More than 2 years</option>
                      </select>
                      {errors.marriageTimeframe && <p id="marriageTimeframe-error" className="text-red-500 text-sm mt-1">{errors.marriageTimeframe}</p>}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
              {currentStep > 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handlePrevStep}
                  className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
                  aria-label="Go to previous step"
                >
                  <ArrowLeft size={16} className="mr-2" /> Back
                </motion.button>
              )}
              {currentStep < 3 ? (
                <motion.button
                  whileHover={isStepComplete(currentStep) ? { scale: 1.05 } : {}}
                  whileTap={isStepComplete(currentStep) ? { scale: 0.95 } : {}}
                  type="button"
                  onClick={handleNextStep}
                  disabled={!isStepComplete(currentStep)}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg flex items-center justify-center ${
                    isStepComplete(currentStep) 
                      ? "bg-rose-500 text-white hover:bg-rose-600" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } focus:outline-none focus:ring-2 focus:ring-rose-300`}
                  aria-label="Go to next step"
                >
                  Next <ArrowRight size={16} className="ml-2" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={isStepComplete(currentStep) ? { scale: 1.05 } : {}}
                  whileTap={isStepComplete(currentStep) ? { scale: 0.95 } : {}}
                  type="submit"
                  disabled={!isStepComplete(3)}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg flex items-center justify-center ${
                    isStepComplete(currentStep) 
                      ? "bg-rose-500 text-white hover:bg-rose-600" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } focus:outline-none focus:ring-2 focus:ring-rose-300`}
                  aria-label="Submit profile"
                >
                  Submit Profile <Check size={16} className="ml-2" />
                </motion.button>
              )}
            </div>

            <div className="text-sm text-gray-500 mt-6 text-center p-4 bg-gray-50 rounded-lg">
              <p>
                Our matchmaking experts will review your profile within 24 hours.
                <br />Fields marked with * are required.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.string,
    gender: PropTypes.string,
    location: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    pictures: PropTypes.array,
    profession: PropTypes.string,
    education: PropTypes.string,
    religion: PropTypes.string,
    familyBackground: PropTypes.string,
    hobbies: PropTypes.string,
    relationshipStatus: PropTypes.string,
    previousMarriages: PropTypes.string,
    divorceDetails: PropTypes.string,
    hasChildren: PropTypes.string,
    numberOfChildren: PropTypes.string,
    childrenAges: PropTypes.string,
    livingArrangement: PropTypes.string,
    partnerAgeRange: PropTypes.string,
    partnerLocationPreference: PropTypes.string,
    partnerReligionPreference: PropTypes.string,
    partnerEducationPreference: PropTypes.string,
    dealBreakers: PropTypes.string,
    marriageTimeframe: PropTypes.string,
    acceptPartnerWithChildren: PropTypes.string
  }),
  isSidebarOpen: PropTypes.bool
};

ProfileForm.defaultProps = {
  initialData: {},
  isSidebarOpen: true
};

export default ProfileForm;