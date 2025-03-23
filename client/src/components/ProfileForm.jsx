import { useState } from "react";
import { User, FileText, Heart, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from 'prop-types';

const ProfileForm = ({ onSubmit, initialData = {} }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    name: initialData.name || "",
    age: initialData.age || "",
    gender: initialData.gender || "",
    location: initialData.location || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    
    // Step 2: Personal Details
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
    
    // Step 3: Marriage Preferences
    partnerAgeRange: initialData.partnerAgeRange || "",
    partnerLocationPreference: initialData.partnerLocationPreference || "",
    partnerReligionPreference: initialData.partnerReligionPreference || "",
    partnerEducationPreference: initialData.partnerEducationPreference || "",
    dealBreakers: initialData.dealBreakers || "",
    marriageTimeframe: initialData.marriageTimeframe || "",
    acceptPartnerWithChildren: initialData.acceptPartnerWithChildren || ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (isStepComplete(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isStepComplete(3)) {
      onSubmit(formData);
    }
  };

  const isStepComplete = (step) => {
    if (step === 1) {
      return formData.name && formData.age && formData.gender && formData.location && formData.email;
    } else if (step === 2) {
      return formData.profession && formData.education && formData.religion && formData.relationshipStatus && formData.hasChildren;
    } else if (step === 3) {
      return formData.partnerAgeRange && formData.partnerReligionPreference && formData.marriageTimeframe;
    }
    return false;
  };

  const fadeVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <>
      {/* Progress Steps */}
      <div className="flex items-center justify-between mt-8 mb-4 px-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === currentStep 
                  ? "bg-pink-500 text-white" 
                  : step < currentStep 
                    ? "bg-green-500 text-white" 
                    : "bg-gray-200 text-gray-600"
              }`}
            >
              {step < currentStep ? <Check size={20} /> : step}
            </div>
            <p className="text-sm mt-2 text-gray-600">
              {step === 1 ? "Basic Info" : step === 2 ? "Personal Details" : "Preferences"}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 h-1 mt-2 mb-8 relative">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div 
              key="step1"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold flex items-center text-gray-800 mb-4">
                <User className="mr-2 text-pink-500" />
                Basic Information
              </h2>
              
              {/* Step 1 content */}
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Age"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  placeholder="Gender"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
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
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold flex items-center text-gray-800 mb-4">
                <FileText className="mr-2 text-pink-500" />
                Personal Details
              </h2>
              
              {/* Step 2 content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-gray-700 mb-1">Profession *</label>
											<input
												type="text"
												name="profession"
												value={formData.profession}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
												placeholder="Your occupation"
												required
											/>
										</div>
										
										<div>
											<label className="block text-gray-700 mb-1">Education *</label>
											<select
												name="education"
												value={formData.education}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
												required
											>
												<option value="">Select education level</option>
												<option value="highSchool">High School</option>
												<option value="bachelors">Bachelors Degree</option>
												<option value="masters">Masters Degree</option>
												<option value="phd">PhD or Doctorate</option>
												<option value="other">Other</option>
											</select>
										</div>
										
										<div>
											<label className="block text-gray-700 mb-1">Religion *</label>
											<input
												type="text"
												name="religion"
												value={formData.religion}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
												placeholder="Your religious background"
												required
											/>
										</div>
										
										<div>
											<label className="block text-gray-700 mb-1">Relationship Status *</label>
											<select
												name="relationshipStatus"
												value={formData.relationshipStatus}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
												required
											>
												<option value="">Select status</option>
												<option value="single">Single (Never Married)</option>
												<option value="divorced">Divorced</option>
												<option value="widowed">Widowed</option>
												<option value="separated">Separated</option>
											</select>
										</div>
										
										<div>
											<label className="block text-gray-700 mb-1">Previous Marriages *</label>
											<select
												name="previousMarriages"
												value={formData.previousMarriages}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
												required
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
												<label className="block text-gray-700 mb-1">Divorce/Separation Details</label>
												<textarea
													name="divorceDetails"
													value={formData.divorceDetails}
													onChange={handleInputChange}
													className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
													placeholder="How long ago? Any specific circumstances?"
													rows="2"
												/>
											</div>
										)}
										
										<div>
											<label className="block text-gray-700 mb-1">Do You Have Children? *</label>
											<select
												name="hasChildren"
												value={formData.hasChildren}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
												required
											>
												<option value="">Select option</option>
												<option value="yes">Yes</option>
												<option value="no">No</option>
											</select>
										</div>
										
										{formData.hasChildren === "yes" && (
											<>
												<div>
													<label className="block text-gray-700 mb-1">Number of Children</label>
													<select
														name="numberOfChildren"
														value={formData.numberOfChildren}
														onChange={handleInputChange}
														className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
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
													<label className="block text-gray-700 mb-1">Childrens Ages</label>
													<input
														type="text"
														name="childrenAges"
														value={formData.childrenAges}
														onChange={handleInputChange}
														className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
														placeholder="e.g., 5, 8, 12"
													/>
												</div>
												
												<div>
													<label className="block text-gray-700 mb-1">Living Arrangement</label>
													<select
														name="livingArrangement"
														value={formData.livingArrangement}
														onChange={handleInputChange}
														className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
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
										
										<div>
											<label className="block text-gray-700 mb-1">Family Background</label>
											<textarea
												name="familyBackground"
												value={formData.familyBackground}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
												placeholder="Brief description of your family"
												rows="3"
											/>
										</div>
										
										<div className="md:col-span-2">
											<label className="block text-gray-700 mb-1">Hobbies & Interests</label>
											<textarea
												name="hobbies"
												value={formData.hobbies}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
												placeholder="What do you enjoy doing in your free time?"
												rows="3"
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
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold flex items-center text-gray-800 mb-4">
                <Heart className="mr-2 text-pink-500" />
                Marriage Preferences
              </h2>
              
              {/* Step 3 content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-gray-700 mb-1">Preferred Age Range *</label>
											<input
												type="text"
												name="partnerAgeRange"
												value={formData.partnerAgeRange}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
												placeholder="e.g., 25-35"
												required
											/>
										</div>
										
										<div>
											<label className="block text-gray-700 mb-1">Location Preference</label>
											<input
												type="text"
												name="partnerLocationPreference"
												value={formData.partnerLocationPreference}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
												placeholder="Preferred location for partner"
											/>
										</div>
										
										<div>
											<label className="block text-gray-700 mb-1">Religious Preference *</label>
											<input
												type="text"
												name="partnerReligionPreference"
												value={formData.partnerReligionPreference}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
												placeholder="Preferred religious background"
												required
											/>
										</div>
										
										<div>
											<label className="block text-gray-700 mb-1">Education Preference</label>
											<select
												name="partnerEducationPreference"
												value={formData.partnerEducationPreference}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
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
											<label className="block text-gray-700 mb-1">Accept Partner with Children?</label>
											<select
												name="acceptPartnerWithChildren"
												value={formData.acceptPartnerWithChildren}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
											>
												<option value="">Select preference</option>
												<option value="yes">Yes, I accept partners with children</option>
												<option value="no">No, I prefer partners without children</option>
												<option value="maybe">Depends on the situation</option>
											</select>
										</div>
										
										<div>
											<label className="block text-gray-700 mb-1">Deal Breakers</label>
											<textarea
												name="dealBreakers"
												value={formData.dealBreakers}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
												placeholder="Any absolute requirements or deal breakers"
												rows="3"
											/>
										</div>
										
										<div>
											<label className="block text-gray-700 mb-1">Marriage Timeframe *</label>
											<select
												name="marriageTimeframe"
												value={formData.marriageTimeframe}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
												required
											>
												<option value="">Select timeframe</option>
												<option value="0-6months">Within 6 months</option>
												<option value="6-12months">6-12 months</option>
												<option value="1-2years">1-2 years</option>
												<option value="2+years">More than 2 years</option>
											</select>
										</div>
									</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handlePrevStep}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg flex items-center transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <ArrowLeft size={18} className="mr-2" /> Back
            </motion.button>
          ) : (
            <div></div>
          )}
          
          {currentStep < 3 ? (
            <motion.button
              whileHover={isStepComplete(currentStep) ? { scale: 1.05 } : {}}
              whileTap={isStepComplete(currentStep) ? { scale: 0.95 } : {}}
              type="button"
              onClick={handleNextStep}
              className={`px-6 py-3 rounded-lg flex items-center transition focus:outline-none focus:ring-2 focus:ring-pink-300
                ${isStepComplete(currentStep) 
                  ? "bg-pink-500 text-white hover:bg-pink-600" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              disabled={!isStepComplete(currentStep)}
            >
              Next <ArrowRight size={18} className="ml-2" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={isStepComplete(currentStep) ? { scale: 1.05 } : {}}
              whileTap={isStepComplete(currentStep) ? { scale: 0.95 } : {}}
              type="submit"
              className={`px-6 py-3 rounded-lg flex items-center transition focus:outline-none focus:ring-2 focus:ring-pink-300
                ${isStepComplete(currentStep) 
                  ? "bg-pink-500 text-white hover:bg-pink-600" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              disabled={!isStepComplete(3)}
            >
              Submit Profile <Check size={18} className="ml-2" />
            </motion.button>
          )}
        </div>
        
        {/* Help Text */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Our matchmaking experts will review your profile and suggest compatible matches.
          <br />Fields marked with * are required.
        </p>
      </form>
    </>
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
  })
};

ProfileForm.defaultProps = {
  initialData: {}
};

export default ProfileForm;