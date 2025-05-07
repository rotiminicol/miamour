import { useRef, useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import { useScroll, useTransform } from "framer-motion";
import { Camera, Save, X, CheckCircle2, AlertCircle, Edit2, User, Heart, Users, ChevronLeft } from 'lucide-react';

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
  const infoParallax = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const hobbiesParallax = useTransform(scrollYProgress, [0, 1], [0, 20]);

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
    <div className="min-h-screen bg-white relative">
      <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><path d='M30 0C13.431 0 0 13.431 0 30s13.431 30 30 30 30-13.431 30-30S46.569 0 30 0zm0 54C16.745 54 6 43.255 6 30S16.745 6 30 6s24 10.745 24 24-10.745 24-24 24zm0-48C14.327 6 6 14.327 6 30s8.327 24 24 24 24-8.327 24-24S45.673 6 30 6z' fill='%23EC4899' fill-opacity='0.3' fill-rule='evenodd'/></svg>")`,
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-pink-100 hover:bg-pink-50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-pink-600 group-hover:text-pink-700" />
          <span className="text-sm font-medium text-pink-600 group-hover:text-pink-700">Back</span>
        </button>
      </div>

      <div className="container mx-auto px-4 py-16" ref={containerRef}>
        {/* Toast Notifications */}
        {showSuccessToast && (
          <div className="fixed top-6 right-6 z-50">
            <div className="bg-white/90 backdrop-blur-sm border border-pink-100 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-pink-600" />
              <span className="text-gray-700">{successMessage}</span>
            </div>
          </div>
        )}
        {showErrorToast && (
          <div className="fixed top-6 right-6 z-50">
            <div className="bg-white/90 backdrop-blur-sm border border-pink-100 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-gray-700">{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Profile Section */}
        <div className="flex-grow flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
          <div 
            style={{ transform: `translateY(${profileParallax.get()}px)` }}
            className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-2xl border border-pink-100 shadow-xl p-8"
          >
            {/* Profile Picture */}
            <div className="flex flex-col items-center relative">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-pink-600 shadow-lg mx-auto mb-6">
                {tempImage || image ? (
                  <img
                    src={tempImage || image}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-pink-50 flex items-center justify-center">
                    <User className="w-16 h-16 text-pink-400" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-8 h-8 text-white" />
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelection}
              />
              {tempImage && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveImage}
                    disabled={isSaving}
                    className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 shadow-md flex items-center space-x-2"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Save Image</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setTempImage(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 shadow-md flex items-center space-x-2"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
              <h1 className="mt-6 text-3xl font-serif font-bold text-gray-900">
                {name}
              </h1>
              <p className="text-gray-600 mt-2 text-center max-w-md">{bio}</p>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 shadow-md flex items-center space-x-2"
              >
                <Edit2 className="w-5 h-5" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Display User Information */}
            <div 
              style={{ transform: `translateY(${infoParallax.get()}px)` }}
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-pink-100">
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-pink-600" />
                  Personal Information
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center"><span className="font-medium w-32">Age:</span> {age}</p>
                  <p className="flex items-center"><span className="font-medium w-32">Gender:</span> {gender}</p>
                  <p className="flex items-center"><span className="font-medium w-32">Nationality:</span> {nationality}</p>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-pink-100">
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-pink-600" />
                  Relationship Status
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center"><span className="font-medium w-32">Status:</span> {relationshipStatus}</p>
                  <p className="flex items-center"><span className="font-medium w-32">Marital History:</span> {maritalHistory}</p>
                  <p className="flex items-center"><span className="font-medium w-32">Children:</span> {numberOfChildren}</p>
                </div>
              </div>

              <div 
                style={{ transform: `translateY(${hobbiesParallax.get()}px)` }}
                className="md:col-span-2 bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-pink-100"
              >
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-pink-600" />
                  Interests & Hobbies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hobbies.map((hobby, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-50 rounded-full text-sm text-gray-700 border border-pink-100"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
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
              className="bg-white/90 backdrop-blur-sm rounded-2xl w-full max-w-2xl p-8 overflow-y-auto max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900">
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
                      className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                      className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                      className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                      className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                      className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                      className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                      className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                      required
                    />
                  </div>

                  {/* Hobbies */}
                  <div>
                    <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700 mb-2">
                      Hobbies
                    </label>
                    <input
                      id="hobbies"
                      name="hobbies"
                      type="text"
                      value={hobbies.join(", ")}
                      onChange={(e) => setHobbies(e.target.value.split(", "))}
                      className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-2 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    required
                  />
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 shadow-lg flex items-center justify-center space-x-2"
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