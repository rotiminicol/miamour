import {  useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import { motion } from "framer-motion";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { updateProfile } = useUserStore();

  // Reset messages after 5 seconds
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name || !bio || !age || !gender || !relationshipStatus || !nationality) {
      setErrorMessage("Please fill all required fields.");
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
      });
      setSuccessMessage("Profile updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <Header />

      {/* Profile Section */}
      <div className='flex-grow flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-4xl bg-white rounded-lg shadow-lg p-6'
        >
          {/* Profile Header */}
          <div className='flex flex-col items-center'>
            <h1 className='mt-4 text-2xl font-bold text-gray-900'>{name}</h1>
            <p className='text-sm text-gray-600'>{bio}</p>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className='mt-4 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors'
            >
              Edit Profile
            </button>
          </div>

          {/* Display User Information */}
          <div className='mt-8 w-full space-y-4'>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <h3 className='text-lg font-semibold text-gray-900'>Profile Information</h3>
              <div className='mt-2 space-y-2 text-sm text-gray-700'>
                <p><strong>Age:</strong> {age}</p>
                <p><strong>Gender:</strong> {gender}</p>
                <p><strong>Relationship Status:</strong> {relationshipStatus}</p>
                <p><strong>Marital History:</strong> {maritalHistory}</p>
                <p><strong>Number of Children:</strong> {numberOfChildren}</p>
                <p><strong>Nationality:</strong> {nationality}</p>
                <p><strong>Hobbies:</strong> {hobbies.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Edit Profile Modal */}
          {isEditModalOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='bg-white rounded-lg w-full max-w-2xl p-6 overflow-y-auto max-h-screen'
              >
                <h2 className='text-xl font-bold mb-4'>Edit Profile</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  {/* Name */}
                  <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                      Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id='name'
                      name='name'
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500'
                      required
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label htmlFor='bio' className='block text-sm font-medium text-gray-700'>
                      Bio <span className='text-red-500'>*</span>
                    </label>
                    <textarea
                      id='bio'
                      name='bio'
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500'
                      required
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label htmlFor='age' className='block text-sm font-medium text-gray-700'>
                      Age <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id='age'
                      name='age'
                      type='number'
                      min='18'
                      max='100'
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500'
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Gender <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500'
                      required
                    >
                      <option value=''>Select</option>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                      <option value='non-binary'>Non-binary</option>
                      <option value='other'>Other</option>
                    </select>
                  </div>

                  {/* Relationship Status */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Relationship Status <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={relationshipStatus}
                      onChange={(e) => setRelationshipStatus(e.target.value)}
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500'
                      required
                    >
                      <option value=''>Select</option>
                      <option value='single'>Single</option>
                      <option value='married'>Married</option>
                      <option value='divorced'>Divorced</option>
                      <option value='widowed'>Widowed</option>
                    </select>
                  </div>

                  {/* Marital History */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Have you been married before? <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={maritalHistory}
                      onChange={(e) => setMaritalHistory(e.target.value)}
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500'
                      required
                    >
                      <option value=''>Select</option>
                      <option value='yes'>Yes</option>
                      <option value='no'>No</option>
                    </select>
                  </div>

                  {/* Number of Children */}
                  <div>
                    <label htmlFor='numberOfChildren' className='block text-sm font-medium text-gray-700'>
                      Number of Children
                    </label>
                    <input
                      id='numberOfChildren'
                      name='numberOfChildren'
                      type='number'
                      min='0'
                      value={numberOfChildren}
                      onChange={(e) => setNumberOfChildren(e.target.value)}
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500'
                    />
                  </div>

                  {/* Nationality */}
                  <div>
                    <label htmlFor='nationality' className='block text-sm font-medium text-gray-700'>
                      Nationality <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id='nationality'
                      name='nationality'
                      type='text'
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500'
                      required
                    />
                  </div>

                  {/* Hobbies */}
                  <div>
                    <label htmlFor='hobbies' className='block text-sm font-medium text-gray-700'>
                      Hobbies
                    </label>
                    <input
                      id='hobbies'
                      name='hobbies'
                      type='text'
                      value={hobbies.join(", ")}
                      onChange={(e) => setHobbies(e.target.value.split(", "))}
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500'
                      placeholder='e.g., Reading, Traveling, Cooking'
                    />
                  </div>

                  {/* Save Button */}
                  <button
                    type='submit'
                    className='w-full px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors'
                  >
                    Save Changes
                  </button>
                </form>
                <button
                  onClick={handleCancel}
                  className='mt-4 w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors'
                >
                  Cancel
                </button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;