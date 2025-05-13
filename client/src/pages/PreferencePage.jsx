
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Smile, User, BookOpen, Coffee, Sparkles, ChevronLeft, Camera } from "lucide-react";

const BuildPerfectPartnerPage = () => {
  const [partnerGender, setPartnerGender] = useState("Female");
  const [partnerName, setPartnerName] = useState("");
  const [partnerAge, setPartnerAge] = useState(28);
  const [partnerHeight, setPartnerHeight] = useState(175); // in cm
  const [appearance, setAppearance] = useState([]);
  const [personality, setPersonality] = useState([]);
  const [values, setValues] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [avatarColor, setAvatarColor] = useState("#FFB6C1"); // Default light pink
  const [generationMessage, setGenerationMessage] = useState("");

  const navigate = useNavigate();

  const appearanceTraits = [
    "Athletic", "Tall", "Stylish", "Natural", "Elegant",
    "Classic", "Casual", "Sophisticated", "Cute", "Handsome",
    "Beautiful", "Strong features", "Soft features"
  ];

  const personalityTraits = [
    "Ambitious", "Caring", "Confident", "Funny", "Intelligent",
    "Kind", "Adventurous", "Patient", "Romantic", "Supportive",
    "Creative", "Organized", "Spiritual", "Practical", "Spontaneous"  
  ];

  const valuesList = [
    "Family", "Honesty", "Loyalty", "Faith", "Career",
    "Growth", "Balance", "Tradition", "Education", "Community"
  ];
  
  const hobbiesList = [
    "Cooking", "Travel", "Reading", "Fitness", "Music",
    "Art", "Sports", "Movies", "Gardening", "Dancing",
    "Photography", "Writing", "Meditation", "Hiking", "Gaming"
  ];

  const handleTraitToggle = (trait, category) => {
    let currentTraits;
    let setFunction;
    let maxTraits = 5;
    
    switch(category) {
      case "appearance":
        currentTraits = appearance;
        setFunction = setAppearance;
        break;
      case "personality":
        currentTraits = personality;
        setFunction = setPersonality;
        break;
      case "values":
        currentTraits = values;
        setFunction = setValues;
        break;
      case "hobbies":
        currentTraits = hobbies;
        setFunction = setHobbies;
        break;
      default:
        return;
    }
    
    if (currentTraits.includes(trait)) {
      setFunction(currentTraits.filter(t => t !== trait));
    } else if (currentTraits.length < maxTraits) {
      setFunction([...currentTraits, trait]);
    }
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationMessage("Finding your perfect match will take a while. Our algorithm is analyzing millions of profiles to find your ideal partner...");
    
    // Simulate generation process
    setTimeout(() => {
      setGenerationMessage("Almost there! Finalizing compatibility scores...");
      
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationMessage("");
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }, 1500);
    }, 2000);
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate(-1);
  };

  const heightDisplay = () => {
    const feet = Math.floor(partnerHeight / 30.48);
    const inches = Math.round((partnerHeight / 2.54) - (feet * 12));
    return `${partnerHeight} cm (${feet}'${inches}")`;
  };

  const getButtonClass = (isSelected, category) => {
    const baseClass = "py-2 px-4 rounded-xl text-sm font-medium transition-all ";
    
    if (isSelected) {
      return baseClass + "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md";
    }
    
    const collection = category === "appearance" ? appearance : 
                       category === "personality" ? personality :
                       category === "values" ? values : hobbies;
                       
    if (collection.length >= 5) {
      return baseClass + "bg-gray-100 text-gray-400";
    }
    
    return baseClass + "bg-white border border-pink-100 text-gray-600 hover:border-pink-300";
  };

  // Change avatar color based on gender
  const updateAvatarColor = (gender) => {
    setPartnerGender(gender);
    if (gender === "Female") {
      setAvatarColor("#FFB6C1"); // Light pink
    } else if (gender === "Male") {
      setAvatarColor("#ADD8E6"); // Light blue
    } else {
      setAvatarColor("#D8BFD8"); // Thistle (purple)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 relative overflow-hidden">
      {/* Back button */}
      <div className="absolute top-6 left-6 z-50">
        <button 
          onClick={handleBackClick}
          className="flex items-center bg-white/80 hover:bg-white text-pink-600 border border-pink-200 rounded-xl shadow-sm p-2 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="ml-1">Back</span>
        </button>
      </div>

      {/* Subtle background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-20 w-64 h-64 bg-pink-100 rounded-full opacity-20"
        ></div>
        <div 
          className="absolute bottom-1/3 -right-20 w-80 h-80 bg-pink-200 rounded-full opacity-15"
        ></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                Build Your Perfect Partner
              </h1>
              <Sparkles className="h-6 w-6 text-pink-500 ml-2" />
            </div>
            <p className="mt-2 text-pink-500/80">Create your ideal match just for fun!</p>
          </div>

          {/* Partner Preview */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-pink-100/50 mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: avatarColor }}
                >
                  <User className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                  <Camera className="h-4 w-4 text-pink-500" />
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {partnerName || "Your Perfect Partner"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {partnerAge} years • {heightDisplay()}
              </p>
              
              {(personality.length > 0 || appearance.length > 0) && (
                <div className="mt-3 flex flex-wrap justify-center gap-1">
                  {[...personality, ...appearance].slice(0, 3).map((trait) => (
                    <span key={trait} className="text-xs bg-pink-100/40 px-2 py-1 rounded-full text-pink-700">
                      {trait}
                    </span>
                  ))}
                  {(personality.length + appearance.length > 3) && (
                    <span className="text-xs bg-pink-100/40 px-2 py-1 rounded-full text-pink-700">
                      +{personality.length + appearance.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Gender Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  <User className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Partner Gender</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["Female", "Male", "Non-binary"].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => updateAvatarColor(gender)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                      partnerGender === gender 
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md" 
                        : "bg-white border border-pink-100 text-gray-600 hover:border-pink-300"
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  <Heart className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Basic Details</h2>
              </div>
              
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-sm text-gray-600 block mb-1 ml-1">Give them a name (optional)</label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="Partner name"
                    className="w-full px-4 py-3 border border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-700"
                  />
                </div>
              
                {/* Age */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <label className="ml-1">Age</label>
                    <span className="mr-1">{partnerAge} years</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="80"
                    value={partnerAge}
                    onChange={(e) => setPartnerAge(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(partnerAge-18)/(80-18)*100}%, #fbcfe8 ${(partnerAge-18)/(80-18)*100}%, #fbcfe8 100%)`
                    }}
                  />
                </div>
                
                {/* Height */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <label className="ml-1">Height</label>
                    <span className="mr-1">{heightDisplay()}</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="210"
                    value={partnerHeight}
                    onChange={(e) => setPartnerHeight(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(partnerHeight-150)/(210-150)*100}%, #fbcfe8 ${(partnerHeight-150)/(210-150)*100}%, #fbcfe8 100%)`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  <Smile className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Appearance (Select up to 5)</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {appearanceTraits.map((trait) => (
                  <button
                    key={trait}
                    type="button"
                    disabled={!appearance.includes(trait) && appearance.length >= 5}
                    onClick={() => handleTraitToggle(trait, "appearance")}
                    className={getButtonClass(appearance.includes(trait), "appearance")}
                  >
                    {trait}
                  </button>
                ))}
              </div>
              <div className="mt-3 text-xs text-pink-600">
                {appearance.length}/5 traits selected
              </div>
            </div>

            {/* Personality */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  <Heart className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Personality (Select up to 5)</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {personalityTraits.map((trait) => (
                  <button
                    key={trait}
                    type="button"
                    disabled={!personality.includes(trait) && personality.length >= 5}
                    onClick={() => handleTraitToggle(trait, "personality")}
                    className={getButtonClass(personality.includes(trait), "personality")}
                  >
                    {trait}
                  </button>
                ))}
              </div>
              <div className="mt-3 text-xs text-pink-600">
                {personality.length}/5 traits selected
              </div>
            </div>

            {/* Values */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  <BookOpen className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Core Values (Select up to 5)</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {valuesList.map((trait) => (
                  <button
                    key={trait}
                    type="button"
                    disabled={!values.includes(trait) && values.length >= 5}
                    onClick={() => handleTraitToggle(trait, "values")}
                    className={getButtonClass(values.includes(trait), "values")}
                  >
                    {trait}
                  </button>
                ))}
              </div>
              <div className="mt-3 text-xs text-pink-600">
                {values.length}/5 values selected
              </div>
            </div>

            {/* Hobbies */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  <Coffee className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Hobbies & Interests (Select up to 5)</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {hobbiesList.map((hobby) => (
                  <button
                    key={hobby}
                    type="button"
                    disabled={!hobbies.includes(hobby) && hobbies.length >= 5}
                    onClick={() => handleTraitToggle(hobby, "hobbies")}
                    className={getButtonClass(hobbies.includes(hobby), "hobbies")}
                  >
                    {hobby}
                  </button>
                ))}
              </div>
              <div className="mt-3 text-xs text-pink-600">
                {hobbies.length}/5 hobbies selected
              </div>
            </div>

            {/* Generation Message */}
            {generationMessage && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-pink-200 flex items-center animate-pulse">
                <div className="mr-3">
                  <svg className="animate-spin h-5 w-5 text-pink-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <p className="text-sm text-pink-600">{generationMessage}</p>
              </div>
            )}

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 px-6 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-md transition-all disabled:opacity-70"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Finding Your Match
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Find Your Match
                </span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-6 right-6 bg-white px-6 py-3 rounded-xl shadow-lg border border-green-100 flex items-center animate-fade-in">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          <span className="text-sm font-medium text-green-700">Account created! Finding match will take a while.</span>
        </div>
      )}
    </div>
  );
};

export default BuildPerfectPartnerPage;
