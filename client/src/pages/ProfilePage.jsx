import { useRef, useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import { useScroll, useTransform } from "framer-motion";
import { Camera, Save, X, CheckCircle2, AlertCircle, Edit2, User,  Users, ChevronLeft } from 'lucide-react';

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const [name, setName] = useState(authUser.name || "");
  const [bio, setBio] = useState(authUser.bio || "");
  const [age, setAge] = useState(authUser.age || "");
  const [gender, setGender] = useState(authUser.gender || "");
  const [relationshipStatus, setRelationshipStatus] = useState(authUser.relationshipStatus || "");
  const [maritalHistory, setMaritalHistory] = useState(authUser.maritalHistory || "");
  const [numberOfChildren, setNumberOfChildren] = useState(authUser.numberOfChildren || 0);
  const [nationality, setNationality] = useState(authUser.nationality || "");
  const [hobbies, setHobbies] = useState(authUser.hobbies || []);
  const [image, setImage] = useState(authUser.image || null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  const { updateProfile } = useUserStore();

  // Parallax scrolling
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const profileParallax = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Reset messages after 5 seconds
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
        setShowSuccessToast(false);
        setShowErrorToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSaving(true);

    if (!name || !bio || !age || !gender || !relationshipStatus || !nationality) {
      setErrorMessage("Please fill all required fields.");
      setShowErrorToast(true);
      setIsSaving(false);
      return;
    }
    try {
      await updateProfile({
        name,
        bio,
        age,
        gender,
        relationshipStatus,
        maritalHistory,
        numberOfChildren,
        nationality,
        hobbies,
        image: tempImage || image,
      });

      setSuccessMessage("Profile updated successfully!");
      setShowSuccessToast(true);
      if (tempImage) {
        setImage(tempImage);
        setTempImage(null);
      }
      setIsEditModalOpen(false);
    } catch (error) {
      setErrorMessage("Failed to update profile. Please try again.");
      setShowErrorToast(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageSelection = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size should be less than 5MB.");
      setShowErrorToast(true);
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Please select a valid image file (JPEG, PNG, GIF, or WEBP).");
      setShowErrorToast(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const base64String = canvas.toDataURL(file.type, 0.7);
        setTempImage(base64String);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveImage = async () => {
    if (!tempImage) return;
    setIsSaving(true);

    try {
      await updateProfile({
        name,
        bio,
        age,
        gender,
        relationshipStatus,
        maritalHistory,
        numberOfChildren,
        nationality,
        hobbies,
        image: tempImage,
      });
      setSuccessMessage("Profile picture updated successfully!");
      setShowSuccessToast(true);
      setImage(tempImage);
      setTempImage(null);
    } catch (error) {
      let errorMessage = "Failed to update profile picture. Please try again.";
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your internet connection.";
      } else {
        errorMessage = error.message;
      }
      setErrorMessage(errorMessage);
      setShowErrorToast(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTempImage(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white relative">
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-pink-200 hover:bg-pink-50 transition-colors shadow-sm"
        >
          <ChevronLeft className="h-5 w-5 text-pink-600 group-hover:text-pink-700" />
          <span className="text-sm font-medium text-pink-600 group-hover:text-pink-700">Back</span>
        </button>
      </div>

      <div className="container mx-auto px-4 py-16" ref={containerRef}>
        {/* Toast Notifications */}
        {showSuccessToast && (
          <div className="fixed top-6 right-6 z-50 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm border border-green-200 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">{successMessage}</span>
            </div>
          </div>
        )}
        {showErrorToast && (
          <div className="fixed top-6 right-6 z-50 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm border border-red-200 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-gray-700">{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Profile Section */}
        <div className="flex-grow flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
          <div 
            style={{ transform: `translateY(${profileParallax.get()}px)` }}
            className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-3xl border border-pink-200 shadow-lg p-8"
          >
            {/* Profile Header with Photo */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Picture Section - More Prominent */}
              <div className="w-full md:w-auto flex flex-col items-center">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg mx-auto mb-4">
                    {tempImage || image ? (
                      <img
                        src={tempImage || image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                        <User className="w-16 h-16 text-pink-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-center gap-3">
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 shadow-md flex items-center space-x-2 transition-all"
                    >
                      <Camera className="w-5 h-5" />
                      <span>{tempImage ? "Change Photo" : "Upload Photo"}</span>
                    </button>
                    
                    {tempImage && (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveImage}
                          disabled={isSaving}
                          className="px-3 py-1.5 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-sm flex items-center space-x-1 text-sm"
                        >
                          {isSaving ? (
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => setTempImage(null)}
                          className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 shadow-sm flex items-center space-x-1 text-sm"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelection}
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {name}
                    </h1>
                    <p className="text-pink-600 font-medium">{age} years • {gender}</p>
                  </div>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-4 py-2 bg-white text-pink-600 rounded-lg hover:bg-pink-50 shadow-sm flex items-center space-x-2 border border-pink-200"
                  >
                    <Edit2 className="w-5 h-5" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">About Me</h3>
                  <p className="text-gray-600 mt-2">{bio}</p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Relationship</h4>
                    <p className="text-gray-700">{relationshipStatus}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Nationality</h4>
                    <p className="text-gray-700">{nationality}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Marital History</h4>
                    <p className="text-gray-700">{maritalHistory || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Children</h4>
                    <p className="text-gray-700">{numberOfChildren || "None"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hobbies Section */}
            <div className="mt-10 pt-6 border-t border-pink-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-pink-600" />
                Interests & Hobbies
              </h3>
              <div className="flex flex-wrap gap-2">
                {hobbies.length > 0 ? (
                  hobbies.map((hobby, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-100 rounded-full text-sm text-pink-800"
                    >
                      {hobby}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No hobbies added yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleCancel}
          >
            <div 
              className="bg-white rounded-2xl w-full max-w-2xl p-8 overflow-y-auto max-h-[90vh] shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit Profile
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="18"
                      max="100"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      required
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Relationship Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relationship Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={relationshipStatus}
                      onChange={(e) => setRelationshipStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      required
                    >
                      <option value="">Select</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>

                  {/* Marital History */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Have you been married before? <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={maritalHistory}
                      onChange={(e) => setMaritalHistory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      required
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  {/* Number of Children */}
                  <div>
                    <label htmlFor="numberOfChildren" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Children
                    </label>
                    <input
                      id="numberOfChildren"
                      name="numberOfChildren"
                      type="number"
                      min="0"
                      value={numberOfChildren}
                      onChange={(e) => setNumberOfChildren(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                    />
                  </div>

                  {/* Nationality */}
                  <div>
                    <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
                      Nationality <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="nationality"
                      name="nationality"
                      type="text"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Hobbies */}
                  <div>
                    <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700 mb-2">
                      Hobbies (comma separated)
                    </label>
                    <input
                      id="hobbies"
                      name="hobbies"
                      type="text"
                      value={hobbies.join(", ")}
                      onChange={(e) => setHobbies(e.target.value.split(", "))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      placeholder="e.g., Reading, Traveling, Cooking"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                    Bio <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                    required
                  />
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 shadow-md flex items-center justify-center space-x-2 transition-colors"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;