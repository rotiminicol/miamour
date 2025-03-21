import { useRef, useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";

const ProfilePage = () => {
	const { authUser } = useAuthStore();
	const [name, setName] = useState(authUser.name || "");
	const [bio, setBio] = useState(authUser.bio || "");
	const [age, setAge] = useState(authUser.age || "");
	const [gender, setGender] = useState(authUser.gender || "");
	const [genderPreference, setGenderPreference] = useState(authUser.genderPreference || []);
	const [image, setImage] = useState(authUser.image || null);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [previewImage, setPreviewImage] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [previousImages, setPreviousImages] = useState(authUser.previousImages || []);

	// New fields for marriage match-up profile
	const [nationality, setNationality] = useState(authUser.nationality || "");
	const [relationshipStatus, setRelationshipStatus] = useState(authUser.relationshipStatus || "");
	const [maritalHistory, setMaritalHistory] = useState(authUser.maritalHistory || "");
	const [numberOfChildren, setNumberOfChildren] = useState(authUser.numberOfChildren || 0);
	const [educationLevel, setEducationLevel] = useState(authUser.educationLevel || "");
	const [occupation, setOccupation] = useState(authUser.occupation || "");
	const [height, setHeight] = useState(authUser.height || "");
	const [religion, setReligion] = useState(authUser.religion || "");
	const [hobbies, setHobbies] = useState(authUser.hobbies || []);
	const [languages, setLanguages] = useState(authUser.languages || []);

	const fileInputRef = useRef(null);

	const { loading, updateProfile } = useUserStore();

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

		// Reset messages
		setErrorMessage("");
		setSuccessMessage("");

		// Ensure all required fields are filled
		if (!name || !age || !gender || !bio || !nationality || !relationshipStatus || !educationLevel || !occupation || !religion) {
			setErrorMessage("Please fill all required fields.");
			return;
		}

		// Update profile with the new data
		try {
			await updateProfile({
				name,
				bio,
				age,
				gender,
				genderPreference,
				image,
				previousImages,
				nationality,
				relationshipStatus,
				maritalHistory,
				numberOfChildren,
				educationLevel,
				occupation,
				height,
				religion,
				hobbies,
				languages,
			});
			setSuccessMessage("Profile updated successfully!");
		} catch (error) {
			setErrorMessage("Failed to update profile. Please try again.");
		}
	};

	const handleImageSelection = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		// Check file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			setErrorMessage("Image size should be less than 5MB.");
			return;
		}

		// Check file type
		const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
		if (!validTypes.includes(file.type)) {
			setErrorMessage("Please select a valid image file (JPEG, PNG, GIF, or WEBP).");
			return;
		}

		// Store the selected file for later upload
		setSelectedFile(file);

		// Create preview
		const reader = new FileReader();
		reader.onload = (e) => {
			setPreviewImage(e.target.result);
		};
		reader.readAsDataURL(file);
	};

	const handleImageUpload = async () => {
		if (!selectedFile) {
			setErrorMessage("No file selected for upload.");
			return;
		}
	
		setUploading(true);
		setUploadProgress(0);
	
		// Create a simulated progress interval
		const progressInterval = setInterval(() => {
			setUploadProgress((prev) => {
				if (prev >= 90) clearInterval(progressInterval);
				return Math.min(prev + 10, 90);
			});
		}, 300);
	
		// Upload image to Cloudinary
		const formData = new FormData();
		formData.append("file", selectedFile);
		formData.append("upload_preset", "unsigned_preset"); // Replace with your unsigned upload preset name
		formData.append("cloud_name", "djvhlf3pe"); // Replace with your cloud name
	
		try {
			console.log("Uploading image to Cloudinary...");
			const response = await fetch("https://api.cloudinary.com/v1_1/djvhlf3pe/image/upload", {
				method: "POST",
				body: formData,
			});
	
			console.log("Response status:", response.status);
			if (!response.ok) {
				const errorData = await response.json();
				console.error("Error response from Cloudinary:", errorData);
				throw new Error("Failed to upload image.");
			}
	
			const data = await response.json();
			console.log("Upload successful! Response data:", data);
	
			// Add current image to previous images if it exists
			if (image && !previousImages.includes(image)) {
				setPreviousImages([...previousImages, image]);
			}
	
			// Set the new image and close the popup
			setImage(data.secure_url); // Save the Cloudinary URL
			setSuccessMessage("Image uploaded successfully!");
	
			// Clear preview and selected file
			setPreviewImage(null);
			setSelectedFile(null);
		} catch (error) {
			console.error("Error uploading image:", error);
			setErrorMessage("Failed to upload image. Please try again.");
		} finally {
			clearInterval(progressInterval);
			setUploadProgress(100);
			setTimeout(() => {
				setUploading(false);
				setUploadProgress(0);
			}, 500);
		}
	};

	const cancelImageUpload = () => {
		setPreviewImage(null);
		setSelectedFile(null);
	};

	const selectPreviousImage = (imgUrl) => {
		setImage(imgUrl);
		// Remove from previous images and add current image to previous if exists
		const updatedPrevious = previousImages.filter(img => img !== imgUrl);
		if (image && !updatedPrevious.includes(image)) {
			updatedPrevious.push(image);
		}
		setPreviousImages(updatedPrevious);
	};

	const removeImage = () => {
		if (image) {
			// Add to previous images 
			if (!previousImages.includes(image)) {
				setPreviousImages([...previousImages, image]);
			}
		}
		setImage(null);
	};

	const removePreviousImage = (imgUrl) => {
		setPreviousImages(previousImages.filter(img => img !== imgUrl));
	};

	return (
		<div className='min-h-screen bg-gray-50 flex flex-col'>
			<Header />

			<div className='flex-grow flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8'>
				{/* Informational Section */}
				<div className='sm:mx-auto sm:w-full sm:max-w-2xl bg-pink-50 p-4 rounded-lg border border-pink-100 mb-6'>
					<h3 className='text-lg font-semibold text-pink-700'>How to Fill Out This Form</h3>
					<ul className='mt-2 text-sm text-gray-600 list-disc list-inside'>
						<li>Name: Enter your full name.</li>
						<li>Age: Must be between 18 and 100.</li>
						<li>Gender: Select your gender.</li>
						<li>Gender Preference: Select the gender(s) you are interested in.</li>
						<li>Bio: Write a short description about yourself (minimum 50 characters).</li>
						<li>Profile Picture: Upload a clear and recent photo of yourself (max 5MB).</li>
						<li>Nationality: Select your nationality.</li>
						<li>Relationship Status: Select your current relationship status.</li>
						<li>Marital History: Indicate if you have been married before.</li>
						<li>Number of Children: Enter the number of children you have.</li>
						<li>Education Level: Select your highest level of education.</li>
						<li>Occupation: Enter your current occupation.</li>
						<li>Height: Enter your height in centimeters.</li>
						<li>Religion: Select your religion.</li>
						<li>Hobbies: Add your hobbies and interests.</li>
						<li>Languages: Add the languages you speak.</li>
					</ul>
				</div>

				{/* Error or Success Messages */}
				{errorMessage && (
					<div className='sm:mx-auto sm:w-full sm:max-w-2xl bg-red-50 p-4 rounded-lg border border-red-100 mb-4'>
						<p className='text-sm text-red-700'>{errorMessage}</p>
					</div>
				)}

				{successMessage && (
					<div className='sm:mx-auto sm:w-full sm:max-w-2xl bg-green-50 p-4 rounded-lg border border-green-100 mb-4'>
						<p className='text-sm text-green-700'>{successMessage}</p>
					</div>
				)}

				<div className='sm:mx-auto sm:w-full sm:max-w-2xl'>
					<div className='bg-white py-6 px-4 shadow sm:rounded-lg sm:px-6 border border-gray-200'>
						<form onSubmit={handleSubmit} className='space-y-4'>
							{/* PROFILE PICTURE SECTION */}
							<div className='flex flex-col items-center'>
								<h3 className='text-lg font-medium text-gray-900 mb-4'>Profile Picture</h3>
								
								{/* Current Profile Picture */}
								<div className='relative w-24 h-24 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-pink-500 shadow-lg'>
									{image ? (
										<>
											<img src={image} alt='Profile' className='w-full h-full object-cover' />
											<button
												type='button'
												onClick={removeImage}
												className='absolute top-0 right-0 bg-red-500 p-1 rounded-full text-white text-xs'
												title='Remove image'
											>
												✕
											</button>
										</>
									) : (
										<div className='w-full h-full bg-gray-200 flex items-center justify-center'>
											<span className='text-gray-500 text-sm sm:text-base'>No Image</span>
										</div>
									)}
								</div>

								{/* Upload Button */}
								<button
									type='button'
									onClick={() => fileInputRef.current.click()}
									className='mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
									disabled={uploading}
								>
									{uploading ? "Uploading..." : "Upload New Photo"}
								</button>
								<input
									ref={fileInputRef}
									type='file'
									accept='image/*'
									className='hidden'
									onChange={handleImageSelection}
									disabled={uploading}
								/>

								{/* Upload Progress Bar (only shown when uploading) */}
								{uploading && (
									<div className='w-full max-w-xs mt-4 bg-gray-200 rounded-full h-2.5'>
										<div 
											className='bg-pink-600 h-2.5 rounded-full' 
											style={{ width: `${uploadProgress}%` }}
										></div>
									</div>
								)}

								{/* Preview Image Modal */}
								{previewImage && (
									<div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4'>
										<div className='bg-white rounded-lg p-6 w-full max-w-md'>
											<h4 className='text-lg font-medium mb-4'>Preview Image</h4>
											<div className='w-full h-64 relative border border-gray-300 rounded-lg overflow-hidden mb-4'>
												<img src={previewImage} alt='Preview' className='w-full h-full object-contain' />
											</div>
											<div className='flex justify-between'>
												<button
													type='button'
													onClick={cancelImageUpload}
													className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'
												>
													Cancel
												</button>
												<button
													type='button'
													onClick={handleImageUpload}
													className='px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700'
													disabled={uploading}
												>
													{uploading ? "Uploading..." : "Confirm Upload"}
												</button>
											</div>
										</div>
									</div>
								)}

								{/* Previous Images Gallery */}
								{previousImages.length > 0 && (
									<div className='mt-6 w-full'>
										<h4 className='text-sm font-medium text-gray-700 mb-2'>Previous Images</h4>
										<div className='flex flex-wrap gap-2 justify-center'>
											{previousImages.map((imgUrl, index) => (
												<div key={index} className='relative w-16 h-16 rounded-md overflow-hidden border border-gray-300'>
													<img 
														src={imgUrl} 
														alt={`Previous ${index}`} 
														className='w-full h-full object-cover cursor-pointer'
														onClick={() => selectPreviousImage(imgUrl)}
													/>
													<button
														type='button'
														onClick={() => removePreviousImage(imgUrl)}
														className='absolute top-0 right-0 bg-red-500 p-0.5 rounded-full text-white text-xs'
														title='Remove from history'
													>
														✕
													</button>
												</div>
											))}
										</div>
									</div>
								)}
							</div>

							{/* NAME */}
							<div>
								<label htmlFor='name' className='block text-sm font-medium text-gray-700'>
									Name <span className='text-red-500'>*</span>
								</label>
								<div className='mt-1'>
									<input
										id='name'
										name='name'
										type='text'
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm sm:text-base'
									/>
								</div>
							</div>

							{/* AGE */}
							<div>
								<label htmlFor='age' className='block text-sm font-medium text-gray-700'>
									Age <span className='text-red-500'>*</span>
								</label>
								<div className='mt-1'>
									<input
										id='age'
										name='age'
										type='number'
										min='18'
										max='100'
										required
										value={age}
										onChange={(e) => setAge(e.target.value)}
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm sm:text-base'
									/>
								</div>
							</div>

							{/* GENDER */}
							<div>
								<span className='block text-sm font-medium text-gray-700 mb-2'>
									Gender <span className='text-red-500'>*</span>
								</span>
								<div className='flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0'>
									{["Male", "Female", "Non-binary", "Prefer not to say"].map((option) => (
										<label key={option} className='inline-flex items-center'>
											<input
												type='radio'
												className='form-radio text-pink-600'
												name='gender'
												value={option.toLowerCase()}
												checked={gender === option.toLowerCase()}
												onChange={() => setGender(option.toLowerCase())}
											/>
											<span className='ml-2 text-sm sm:text-base'>{option}</span>
										</label>
									))}
								</div>
							</div>

							{/* GENDER PREFERENCE */}
							<div>
								<span className='block text-sm font-medium text-gray-700 mb-2'>Gender Preference</span>
								<div className='flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0'>
									{["Male", "Female", "Non-binary", "All"].map((option) => (
										<label key={option} className='inline-flex items-center'>
											<input
												type='checkbox'
												className='form-checkbox text-pink-600'
												checked={genderPreference.includes(option.toLowerCase())}
												onChange={() => {
													const updatedPreference = genderPreference.includes(option.toLowerCase())
														? genderPreference.filter((pref) => pref !== option.toLowerCase())
														: [...genderPreference, option.toLowerCase()];
													setGenderPreference(updatedPreference);
												}}
											/>
											<span className='ml-2 text-sm sm:text-base'>{option}</span>
										</label>
									))}
								</div>
							</div>

							{/* NATIONALITY */}
							<div>
								<label htmlFor='nationality' className='block text-sm font-medium text-gray-700'>
									Nationality <span className='text-red-500'>*</span>
								</label>
								<div className='mt-1'>
									<input
										id='nationality'
										name='nationality'
										type='text'
										required
										value={nationality}
										onChange={(e) => setNationality(e.target.value)}
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm sm:text-base'
									/>
								</div>
							</div>

							{/* RELATIONSHIP STATUS */}
							<div>
								<span className='block text-sm font-medium text-gray-700 mb-2'>
									Relationship Status <span className='text-red-500'>*</span>
								</span>
								<div className='flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0'>
									{["Single", "Divorced", "Widowed", "Separated"].map((option) => (
										<label key={option} className='inline-flex items-center'>
											<input
												type='radio'
												className='form-radio text-pink-600'
												name='relationshipStatus'
												value={option.toLowerCase()}
												checked={relationshipStatus === option.toLowerCase()}
												onChange={() => setRelationshipStatus(option.toLowerCase())}
											/>
											<span className='ml-2 text-sm sm:text-base'>{option}</span>
										</label>
									))}
								</div>
							</div>

							{/* MARITAL HISTORY */}
							<div>
								<span className='block text-sm font-medium text-gray-700 mb-2'>
									Have you been married before? <span className='text-red-500'>*</span>
								</span>
								<div className='flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0'>
									{["Yes", "No"].map((option) => (
										<label key={option} className='inline-flex items-center'>
											<input
												type='radio'
												className='form-radio text-pink-600'
												name='maritalHistory'
												value={option.toLowerCase()}
												checked={maritalHistory === option.toLowerCase()}
												onChange={() => setMaritalHistory(option.toLowerCase())}
											/>
											<span className='ml-2 text-sm sm:text-base'>{option}</span>
										</label>
									))}
								</div>
							</div>

							{/* NUMBER OF CHILDREN */}
							<div>
								<label htmlFor='numberOfChildren' className='block text-sm font-medium text-gray-700'>
									Number of Children
								</label>
								<div className='mt-1'>
									<input
										id='numberOfChildren'
										name='numberOfChildren'
										type='number'
										min='0'
										value={numberOfChildren}
										onChange={(e) => setNumberOfChildren(e.target.value)}
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm sm:text-base'
									/>
								</div>
							</div>

							{/* EDUCATION LEVEL */}
							<div>
								<label htmlFor='educationLevel' className='block text-sm font-medium text-gray-700'>
									Education Level <span className='text-red-500'>*</span>
								</label>
								<div className='mt-1'>
									<select
										id='educationLevel'
										name='educationLevel'
										required
										value={educationLevel}
										onChange={(e) => setEducationLevel(e.target.value)}
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm sm:text-base'
									>
										<option value=''>Select</option>
										<option value='highSchool'>High School</option>
										<option value='bachelors'>Bachelors Degree</option>
										<option value='masters'>Masters Degree</option>
										<option value='phd'>PhD</option>
										<option value='other'>Other</option>
									</select>
								</div>
							</div>

							{/* OCCUPATION */}
							<div>
								<label htmlFor='occupation' className='block text-sm font-medium text-gray-700'>
									Occupation <span className='text-red-500'>*</span>
								</label>
								<div className='mt-1'>
									<input
										id='occupation'
										name='occupation'
										type='text'
										required
										value={occupation}
										onChange={(e) => setOccupation(e.target.value)}
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm sm:text-base'
									/>
								</div>
							</div>

							{/* HEIGHT */}
							<div>
								<label htmlFor='height' className='block text-sm font-medium text-gray-700'>
									Height (in cm)
								</label>
								<div className='mt-1'>
									<input
										id='height'
										name='height'
										type='number'
										min='100'
										max='250'
										value={height}
										onChange={(e) => setHeight(e.target.value)}
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm sm:text-base'
									/>
								</div>
							</div>

							{/* RELIGION */}
							<div>
								<label htmlFor='religion' className='block text-sm font-medium text-gray-700'>
									Religion <span className='text-red-500'>*</span>
								</label>
								<div className='mt-1'>
									<select
										id='religion'
										name='religion'
										required
										value={religion}
										onChange={(e) => setReligion(e.target.value)}
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm sm:text-base'
									>
										<option value=''>Select</option>
										<option value='christianity'>Christianity</option>
										<option value='islam'>Islam</option>
										<option value='hinduism'>Hinduism</option>
										<option value='buddhism'>Buddhism</option>
										<option value='other'>Other</option>
									</select>
								</div>
							</div>

							{/* HOBBIES */}
							<div>
								<label htmlFor='hobbies' className='block text-sm font-medium text-gray-700'>
									Hobbies
								</label>
								<div className='mt-1'>
									<input
										id='hobbies'
										name='hobbies'
										type='text'
										value={hobbies.join(", ")}
										onChange={(e) => setHobbies(e.target.value.split(", "))}
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm sm:text-base'
										placeholder='e.g., Reading, Traveling, Cooking'
									/>
								</div>
							</div>

							{/* LANGUAGES */}
							<div>
								<label htmlFor='languages' className='block text-sm font-medium text-gray-700'>
									Languages
								</label>
								<div className='mt-1'>
									<input
										id='languages'
										name='languages'
										type='text'
										value={languages.join(", ")}
										onChange={(e) => setLanguages(e.target.value.split(", "))}
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm sm:text-base'
										placeholder='e.g., English, French, Spanish'
									/>
								</div>
							</div>

							{/* BIO */}
							<div>
								<label htmlFor='bio' className='block text-sm font-medium text-gray-700'>
									Bio <span className='text-red-500'>*</span>
								</label>
								<div className='mt-1'>
									<textarea
										id='bio'
										name='bio'
										rows={4}
										required
										minLength={50}
										value={bio}
										onChange={(e) => setBio(e.target.value)}
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm sm:text-base'
										placeholder='Tell us about yourself (minimum 50 characters)...'
									/>
									<div className='mt-1 text-xs text-gray-500'>
										{bio.length < 50 
											? `${50 - bio.length} more characters needed` 
											: `${bio.length} characters (minimum 50)`}
									</div>
								</div>
							</div>

							{/* SAVE BUTTON */}
							<button
								type='submit'
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
								disabled={loading || uploading}
							>
								{loading ? "Saving..." : "Save Profile"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;