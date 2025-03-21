   import  { useState } from 'react';
   import { motion } from 'framer-motion';
   import { HeartIcon, UserIcon, UsersIcon, ClipboardCheckIcon } from 'lucide-react';
   import { useAuthStore } from "../store/useAuthStore";
   import { useNavigate } from "react-router-dom";

   const GettingStarted = () => {
   const [step, setStep] = useState(1);
   const [formData, setFormData] = useState({
      // Personal details
      fullName: '',
      birthdate: '',
      location: '',
      occupation: '',
      aboutMe: '',
      
      // Relationship history
      relationshipStatus: '',
      previousMarriages: '0',
      longestRelationship: '',
      dealBreakers: '',
      
      // Matching questions
      idealPartnerTraits: '',
      marriageTimeframe: '',
      wantChildren: '',
      religiousPreference: '',
      hobbies: ''
   });
   const { completeGettingStarted } = useAuthStore();
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      await completeGettingStarted(formData); // Pass form data to complete signup
      navigate("/"); // Redirect to homepage
    };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
         ...prevState,
         [name]: value
      }));
   };

   const nextStep = () => {
      setStep(step + 1);
   };

   const prevStep = () => {
      setStep(step - 1);
   };



   // Animation variants
   const pageVariants = {
      initial: { opacity: 0, x: 100 },
      in: { opacity: 1, x: 0 },
      out: { opacity: 0, x: -100 }
   };

   const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.5
   };

   return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
         {/* Header */}
         <div className="text-center mb-8">
         <h1 className="text-3xl font-bold text-pink-600">Getting Started with MiAmour</h1>
         <p className="text-gray-600 mt-2">Lets set up your perfect match profile</p>
         </div>

         {/* Progress Bar */}
         <div className="w-full max-w-3xl mb-8">
         <div className="flex justify-between mb-2">
            <div className="flex flex-col items-center">
               <div className={`rounded-full h-10 w-10 flex items-center justify-center border-2 ${step >= 1 ? 'bg-pink-600 border-pink-600 text-white' : 'border-gray-300 text-gray-300'}`}>
               <UserIcon size={16} />
               </div>
               <span className={`text-xs mt-1 ${step >= 1 ? 'text-pink-600' : 'text-gray-300'}`}>Personal</span>
            </div>
            <div className="flex flex-col items-center">
               <div className={`rounded-full h-10 w-10 flex items-center justify-center border-2 ${step >= 2 ? 'bg-pink-600 border-pink-600 text-white' : 'border-gray-300 text-gray-300'}`}>
               <UsersIcon size={16} />
               </div>
               <span className={`text-xs mt-1 ${step >= 2 ? 'text-pink-600' : 'text-gray-300'}`}>Relationships</span>
            </div>
            <div className="flex flex-col items-center">
               <div className={`rounded-full h-10 w-10 flex items-center justify-center border-2 ${step >= 3 ? 'bg-pink-600 border-pink-600 text-white' : 'border-gray-300 text-gray-300'}`}>
               <HeartIcon size={16} />
               </div>
               <span className={`text-xs mt-1 ${step >= 3 ? 'text-pink-600' : 'text-gray-300'}`}>Matching</span>
            </div>
         </div>
         <div className="h-2 bg-gray-200 rounded-full">
            <div 
               className="h-full bg-pink-600 rounded-full transition-all duration-500"
               style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
         </div>
         </div>

         {/* Form Container */}
         <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
         <form onSubmit={handleSubmit}>
            {step === 1 && (
               <motion.div
               initial="initial"
               animate="in"
               exit="out"
               variants={pageVariants}
               transition={pageTransition}
               >
               <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Details</h2>
               
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="fullName">
                     Full Name
                  </label>
                  <input
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                     type="text"
                     id="fullName"
                     name="fullName"
                     value={formData.fullName}
                     onChange={handleChange}
                     required
                  />
               </div>
               
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="birthdate">
                     Birth Date
                  </label>
                  <input
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                     type="date"
                     id="birthdate"
                     name="birthdate"
                     value={formData.birthdate}
                     onChange={handleChange}
                     required
                  />
               </div>
               
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="location">
                     Location
                  </label>
                  <input
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                     type="text"
                     id="location"
                     name="location"
                     value={formData.location}
                     onChange={handleChange}
                     required
                  />
               </div>
               
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="occupation">
                     Occupation
                  </label>
                  <input
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                     type="text"
                     id="occupation"
                     name="occupation"
                     value={formData.occupation}
                     onChange={handleChange}
                  />
               </div>
               
               <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="aboutMe">
                     About Me
                  </label>
                  <textarea
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                     id="aboutMe"
                     name="aboutMe"
                     rows="3"
                     value={formData.aboutMe}
                     onChange={handleChange}
                  ></textarea>
               </div>
               </motion.div>
            )}

            {step === 2 && (
               <motion.div
               initial="initial"
               animate="in"
               exit="out"
               variants={pageVariants}
               transition={pageTransition}
               >
               <h2 className="text-2xl font-semibold text-gray-800 mb-6">Relationship History</h2>
               
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="relationshipStatus">
                     Current Relationship Status
                  </label>
                  <select
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                     id="relationshipStatus"
                     name="relationshipStatus"
                     value={formData.relationshipStatus}
                     onChange={handleChange}
                     required
                  >
                     <option value="">Select an option</option>
                     <option value="single">Single</option>
                     <option value="divorced">Divorced</option>
                     <option value="widowed">Widowed</option>
                     <option value="separated">Separated</option>
                  </select>
               </div>
               
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="previousMarriages">
                     Previous Marriages
                  </label>
                  <select
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                     id="previousMarriages"
                     name="previousMarriages"
                     value={formData.previousMarriages}
                     onChange={handleChange}
                  >
                     <option value="0">0</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3+">3+</option>
                  </select>
               </div>
               
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="longestRelationship">
                     Longest Relationship Duration
                  </label>
                  <select
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                     id="longestRelationship"
                     name="longestRelationship"
                     value={formData.longestRelationship}
                     onChange={handleChange}
                  >
                     <option value="">Select an option</option>
                     <option value="less than 1 year">Less than 1 year</option>
                     <option value="1-3 years">1-3 years</option>
                     <option value="3-5 years">3-5 years</option>
                     <option value="5-10 years">5-10 years</option>
                     <option value="10+ years">10+ years</option>
                  </select>
               </div>
               
               <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="dealBreakers">
                     Relationship Deal Breakers
                  </label>
                  <textarea
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                     id="dealBreakers"
                     name="dealBreakers"
                     rows="3"
                     value={formData.dealBreakers}
                     onChange={handleChange}
                     placeholder="What are your absolute deal breakers in a relationship?"
                  ></textarea>
               </div>
               </motion.div>
            )}

            {step === 3 && (
               <motion.div
               initial="initial"
               animate="in"
               exit="out"
               variants={pageVariants}
               transition={pageTransition}
               >
               <h2 className="text-2xl font-semibold text-gray-800 mb-6">Matching Questions</h2>
               
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="idealPartnerTraits">
                     Ideal Partner Traits
                  </label>
                  <textarea
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                     id="idealPartnerTraits"
                     name="idealPartnerTraits"
                     rows="3"
                     value={formData.idealPartnerTraits}
                     onChange={handleChange}
                     placeholder="Describe the most important traits you're looking for in a partner"
                  ></textarea>
               </div>
               
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="marriageTimeframe">
                     Marriage Timeframe
                  </label>
                  <select
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                     id="marriageTimeframe"
                     name="marriageTimeframe"
                     value={formData.marriageTimeframe}
                     onChange={handleChange}
                  >
                     <option value="">Select an option</option>
                     <option value="ASAP">As soon as possible</option>
                     <option value="within 1 year">Within 1 year</option>
                     <option value="1-2 years">1-2 years</option>
                     <option value="3-5 years">3-5 years</option>
                     <option value="no rush">No particular timeframe</option>
                  </select>
               </div>
               
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="wantChildren">
                     Do You Want Children?
                  </label>
                  <select
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                     id="wantChildren"
                     name="wantChildren"
                     value={formData.wantChildren}
                     onChange={handleChange}
                  >
                     <option value="">Select an option</option>
                     <option value="definitely">Definitely want children</option>
                     <option value="open to it">Open to having children</option>
                     <option value="have and want more">Have children and want more</option>
                     <option value="have and don't want more">Have children and dont want more</option>
                     <option value="don't want">Dont want children</option>
                  </select>
               </div>
               
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="religiousPreference">
                     Religious Preference
                  </label>
                  <select
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                     id="religiousPreference"
                     name="religiousPreference"
                     value={formData.religiousPreference}
                     onChange={handleChange}
                  >
                     <option value="">Select an option</option>
                     <option value="very important">Very important (same beliefs required)</option>
                     <option value="somewhat important">Somewhat important</option>
                     <option value="not important">Not important</option>
                     <option value="prefer not to say">Prefer not to say</option>
                  </select>
               </div>
               
               <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="hobbies">
                     Hobbies & Interests
                  </label>
                  <textarea
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                     id="hobbies"
                     name="hobbies"
                     rows="3"
                     value={formData.hobbies}
                     onChange={handleChange}
                     placeholder="What do you enjoy doing in your free time?"
                  ></textarea>
               </div>
               </motion.div>
            )}

            {/* Floating heart animation */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
               {[...Array(5)].map((_, i) => (
               <motion.div
                  key={i}
                  className="absolute text-pink-200"
                  initial={{ 
                     x: Math.random() * 100 + "%", 
                     y: "100%", 
                     opacity: 0.3 + Math.random() * 0.7,
                     scale: 0.5 + Math.random()
                  }}
                  animate={{ 
                     y: "-100%",
                     rotate: Math.random() * 360
                  }}
                  transition={{ 
                     duration: 15 + Math.random() * 10,
                     repeat: Infinity,
                     delay: i * 2
                  }}
               >
                  <HeartIcon size={20 + Math.random() * 20} />
               </motion.div>
               ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
               {step > 1 && (
               <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
               >
                  Back
               </button>
               )}
               {step < 3 ? (
               <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
               >
                  Next
               </button>
               ) : (
               <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="ml-auto px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors flex items-center"
               >
                  <span>Complete Profile</span>
                  <ClipboardCheckIcon className="ml-2" size={16} />
               </motion.button>
               )}
            </div>
         </form>
         </div>

         {/* Success message - would normally be conditionally rendered */}
         {false && (
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
         >
            <div className="bg-white rounded-lg p-8 max-w-md text-center">
               <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
               <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
               >
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
               </motion.div>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Profile Complete!</h3>
               <p className="text-gray-600 mb-6">Your profile has been set up successfully. Were excited to help you find your perfect match!</p>
               <button
               className="w-full px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
               type="submit"
               >
               Continue to Dashboard
               </button>
            </div>
         </motion.div>
         )}
      </div>
   );
   };

   export default GettingStarted;