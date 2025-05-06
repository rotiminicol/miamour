import { useRef, useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Save, X, CheckCircle2, AlertCircle, Edit2, User, Heart,  Users } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import BackButton from '../components/BackButton';

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
				// Create a canvas to resize the image
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

				// Convert to base64 with reduced quality
				const base64String = canvas.toDataURL(file.type, 0.7);
				console.log("Compressed image size:", Math.round(base64String.length / 1024), "KB");
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
			console.log("Sending image to backend:", tempImage.substring(0, 100) + "...");
			const updatedUser = await updateProfile({
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
			console.log("Profile update response:", updatedUser);
			setSuccessMessage("Profile picture updated successfully!");
			setShowSuccessToast(true);
			setImage(tempImage);
			setTempImage(null);
		} catch (error) {
			console.error("Error updating profile picture:", error);
			let errorMessage = "Failed to update profile picture. Please try again.";
			
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.error("Response data:", error.response.data);
				console.error("Response status:", error.response.status);
				errorMessage = error.response.data?.message || errorMessage;
			} else if (error.request) {
				// The request was made but no response was received
				console.error("No response received:", error.request);
				errorMessage = "No response from server. Please check your internet connection.";
			} else {
				// Something happened in setting up the request that triggered an Error
				console.error("Error setting up request:", error.message);
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
		<div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
			<Sidebar />
			<div className="flex-grow flex flex-col">
				<Header />
				<main className="flex-grow overflow-y-auto px-6 py-8 lg:px-8 lg:py-10">
					<BackButton />
					{/* Toast Notifications */}
					<AnimatePresence>
						{showSuccessToast && (
							<motion.div
								initial={{ opacity: 0, y: -100 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -100 }}
								className="fixed top-4 right-4 z-50"
							>
								<div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
									<CheckCircle2 className="w-5 h-5" />
									<span>{successMessage}</span>
								</div>
							</motion.div>
						)}
						{showErrorToast && (
							<motion.div
								initial={{ opacity: 0, y: -100 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -100 }}
								className="fixed top-4 right-4 z-50"
							>
								<div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
									<AlertCircle className="w-5 h-5" />
									<span>{errorMessage}</span>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Profile Section */}
					<div className='flex-grow flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className='w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8'
						>
							{/* Profile Picture */}
							<div className='flex flex-col items-center relative'>
								<motion.div 
									whileHover={{ scale: 1.02 }}
									className='relative w-40 h-40 rounded-full overflow-hidden border-4 border-pink-500 shadow-lg mx-auto mb-6'
								>
									{tempImage || image ? (
										<img
											src={tempImage || image}
											alt='Profile Preview'
											className='w-full h-full object-cover'
										/>
									) : (
										<div className='w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center'>
											<User className="w-16 h-16 text-pink-400" />
										</div>
									)}
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										type='button'
										onClick={() => fileInputRef.current.click()}
										className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity'
									>
										<Camera className='w-8 h-8 text-white' />
									</motion.button>
								</motion.div>
								<input
									ref={fileInputRef}
									type='file'
									accept='image/*'
									className='hidden'
									onChange={handleImageSelection}
								/>
								{tempImage && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className="flex space-x-2"
									>
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={handleSaveImage}
											disabled={isSaving}
											className='px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 shadow-md flex items-center space-x-2'
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
										</motion.button>
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => setTempImage(null)}
											className='px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 shadow-md flex items-center space-x-2'
										>
											<X className="w-5 h-5" />
											<span>Cancel</span>
										</motion.button>
									</motion.div>
								)}
								<motion.h1 
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className='mt-6 text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'
								>
									{name}
								</motion.h1>
								<p className='text-gray-600 mt-2 text-center max-w-md'>{bio}</p>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setIsEditModalOpen(true)}
									className='mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 shadow-md flex items-center space-x-2'
								>
									<Edit2 className="w-5 h-5" />
									<span>Edit Profile</span>
								</motion.button>
							</div>

							{/* Display User Information */}
							<div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-6'>
								<motion.div 
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									className='bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl shadow-md'
								>
									<h3 className='text-xl font-semibold text-gray-900 mb-4 flex items-center'>
										<User className="w-5 h-5 mr-2 text-pink-500" />
										Personal Information
									</h3>
									<div className='space-y-3 text-gray-700'>
										<p className="flex items-center"><span className="font-medium w-32">Age:</span> {age}</p>
										<p className="flex items-center"><span className="font-medium w-32">Gender:</span> {gender}</p>
										<p className="flex items-center"><span className="font-medium w-32">Nationality:</span> {nationality}</p>
									</div>
								</motion.div>

								<motion.div 
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									className='bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl shadow-md'
								>
									<h3 className='text-xl font-semibold text-gray-900 mb-4 flex items-center'>
										<Heart className="w-5 h-5 mr-2 text-pink-500" />
										Relationship Status
									</h3>
									<div className='space-y-3 text-gray-700'>
										<p className="flex items-center"><span className="font-medium w-32">Status:</span> {relationshipStatus}</p>
										<p className="flex items-center"><span className="font-medium w-32">Marital History:</span> {maritalHistory}</p>
										<p className="flex items-center"><span className="font-medium w-32">Children:</span> {numberOfChildren}</p>
									</div>
								</motion.div>

								<motion.div 
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									className='md:col-span-2 bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl shadow-md'
								>
									<h3 className='text-xl font-semibold text-gray-900 mb-4 flex items-center'>
										<Users className="w-5 h-5 mr-2 text-pink-500" />
										Interests & Hobbies
									</h3>
									<div className='flex flex-wrap gap-2'>
										{hobbies.map((hobby, index) => (
											<motion.span
												key={index}
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ delay: index * 0.1 }}
												className='px-3 py-1 bg-white rounded-full text-sm text-gray-700 shadow-sm'
											>
												{hobby}
											</motion.span>
										))}
									</div>
								</motion.div>
							</div>
						</motion.div>
					</div>

					{/* Edit Profile Modal */}
					<AnimatePresence>
						{isEditModalOpen && (
							<motion.div 
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'
							>
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ type: "spring", damping: 25 }}
									className='bg-white rounded-2xl w-full max-w-2xl p-8 overflow-y-auto max-h-[90vh]'
								>
									<div className="flex justify-between items-center mb-6">
										<h2 className='text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'>
											Edit Profile
										</h2>
										<motion.button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											onClick={handleCancel}
											className='text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100'
										>
											<X className="w-6 h-6" />
										</motion.button>
									</div>

									<form onSubmit={handleSubmit} className='space-y-6'>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											{/* Name */}
											<div>
												<label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
													Name <span className='text-red-500'>*</span>
												</label>
												<input
													id='name'
													name='name'
													type='text'
													value={name}
													onChange={(e) => setName(e.target.value)}
													className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
													required
												/>
											</div>

											{/* Age */}
											<div>
												<label htmlFor='age' className='block text-sm font-medium text-gray-700 mb-2'>
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
													className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
													required
												/>
											</div>

											{/* Gender */}
											<div>
												<label className='block text-sm font-medium text-gray-700 mb-2'>
													Gender <span className='text-red-500'>*</span>
												</label>
												<select
													value={gender}
													onChange={(e) => setGender(e.target.value)}
													className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
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
												<label className='block text-sm font-medium text-gray-700 mb-2'>
													Relationship Status <span className='text-red-500'>*</span>
												</label>
												<select
													value={relationshipStatus}
													onChange={(e) => setRelationshipStatus(e.target.value)}
													className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
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
												<label className='block text-sm font-medium text-gray-700 mb-2'>
													Have you been married before? <span className='text-red-500'>*</span>
												</label>
												<select
													value={maritalHistory}
													onChange={(e) => setMaritalHistory(e.target.value)}
													className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
													required
												>
													<option value=''>Select</option>
													<option value='yes'>Yes</option>
													<option value='no'>No</option>
												</select>
											</div>

											{/* Number of Children */}
											<div>
												<label htmlFor='numberOfChildren' className='block text-sm font-medium text-gray-700 mb-2'>
													Number of Children
												</label>
												<input
													id='numberOfChildren'
													name='numberOfChildren'
													type='number'
													min='0'
													value={numberOfChildren}
													onChange={(e) => setNumberOfChildren(e.target.value)}
													className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
												/>
											</div>

											{/* Nationality */}
											<div>
												<label htmlFor='nationality' className='block text-sm font-medium text-gray-700 mb-2'>
													Nationality <span className='text-red-500'>*</span>
												</label>
												<input
													id='nationality'
													name='nationality'
													type='text'
													value={nationality}
													onChange={(e) => setNationality(e.target.value)}
													className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
													required
												/>
											</div>

											{/* Hobbies */}
											<div>
												<label htmlFor='hobbies' className='block text-sm font-medium text-gray-700 mb-2'>
													Hobbies
												</label>
												<input
													id='hobbies'
													name='hobbies'
													type='text'
													value={hobbies.join(", ")}
													onChange={(e) => setHobbies(e.target.value.split(", "))}
													className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
													placeholder='e.g., Reading, Traveling, Cooking'
												/>
											</div>
										</div>

										{/* Bio */}
										<div>
											<label htmlFor='bio' className='block text-sm font-medium text-gray-700 mb-2'>
												Bio <span className='text-red-500'>*</span>
											</label>
											<textarea
												id='bio'
												name='bio'
												rows={3}
												value={bio}
												onChange={(e) => setBio(e.target.value)}
												className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
												required
											/>
										</div>

										{/* Save Button */}
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											type='submit'
											disabled={isSaving}
											className='w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 shadow-lg flex items-center justify-center space-x-2'
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
										</motion.button>
									</form>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</main>
			</div>
		</div>
	);
};

export default ProfilePage;
