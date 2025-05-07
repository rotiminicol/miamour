import { useState } from "react";
import { Heart, Bell, Save, MapPin, Calendar, Filter, Sparkles } from "lucide-react";
import BackButton from '../components/BackButton';

const PreferencePage = () => {
  const [ageRange, setAgeRange] = useState([25, 45]);
  const [distance, setDistance] = useState(50);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showMe, setShowMe] = useState("Everyone");
  const [interests, setInterests] = useState([]);
  const [relationshipGoals, setRelationshipGoals] = useState("Marriage");
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const commonInterests = [
    "Travel", "Cooking", "Reading", "Spirituality", "Family", 
    "Fitness", "Outdoors", "Music", "Movies", "Art",
    "Career", "Education", "Volunteering"
  ];

  const handleInterestToggle = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      setShowSavedMessage(true);
      setTimeout(() => setShowSavedMessage(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 relative overflow-hidden">
      {/* Sleek back button placement */}
      <div className="absolute top-6 left-6 z-50">
        <BackButton className="bg-white/80 hover:bg-white text-pink-600 border border-pink-200 rounded-xl shadow-sm" />
      </div>

      {/* Subtle parallax background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-20 w-64 h-64 bg-pink-100 rounded-full opacity-20"
          style={{ transform: 'translateZ(-1px)' }}
        ></div>
        <div 
          className="absolute bottom-1/3 -right-20 w-80 h-80 bg-pink-200 rounded-full opacity-15"
          style={{ transform: 'translateZ(-2px)' }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                Find Your Perfect Match
              </h1>
              <Sparkles className="h-6 w-6 text-pink-500 ml-2" />
            </div>
            <p className="mt-2 text-pink-500/80">Customize your matching preferences</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Age Range */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  <Calendar className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Age Preference</h2>
              </div>
              
              <div className="px-2">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>18</span>
                  <span>60+</span>
                </div>
                <div className="relative mb-6">
                  <div className="absolute h-1.5 bg-pink-100 rounded-full w-full"></div>
                  <input
                    type="range"
                    min="18"
                    max="70"
                    value={ageRange[0]}
                    onChange={(e) => setAgeRange([parseInt(e.target.value), Math.max(parseInt(e.target.value) + 1, ageRange[1])])}
                    className="absolute w-full appearance-none bg-transparent pointer-events-auto h-6"
                  />
                  <input
                    type="range"
                    min="18"
                    max="70"
                    value={ageRange[1]}
                    onChange={(e) => setAgeRange([Math.min(ageRange[0], parseInt(e.target.value) - 1), parseInt(e.target.value)])}
                    className="absolute w-full appearance-none bg-transparent pointer-events-auto h-6"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-medium text-pink-700">
                    {ageRange[0]} - {ageRange[1]} years
                  </div>
                  <div className="text-xs bg-pink-100/40 px-3 py-1 rounded-full text-pink-700">
                    {ageRange[1] - ageRange[0]} year range
                  </div>
                </div>
              </div>
            </div>

            {/* Distance */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  <MapPin className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Distance (km)</h2>
              </div>
              <div className="px-2">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>1 km</span>
                  <span>100+ km</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${distance}%, #fbcfe8 ${distance}%, #fbcfe8 100%)`
                  }}
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="text-lg font-medium text-pink-700">
                    {distance} km
                  </div>
                  <div className="text-xs bg-pink-100/40 px-3 py-1 rounded-full text-pink-700">
                    {distance <= 20 ? "Nearby" : distance <= 50 ? "Local" : "Wide"}
                  </div>
                </div>
              </div>
            </div>

            {/* Relationship Goals */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  <Heart className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Relationship Goals</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["Marriage", "Long-term", "Traditional", "Modern"].map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setRelationshipGoals(goal)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                      relationshipGoals === goal 
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md" 
                        : "bg-white border border-pink-100 text-gray-600 hover:border-pink-300"
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            {/* Show Me */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  <Filter className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Show Me</h2>
              </div>
              <select
                value={showMe}
                onChange={(e) => setShowMe(e.target.value)}
                className="w-full px-4 py-3 border border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-700 bg-white"
              >
                <option value="Everyone">Everyone</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Non-binary">Non-binary</option>
              </select>
            </div>

            {/* Interests */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  <Heart className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Interests (Select up to 5)</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {commonInterests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    disabled={!interests.includes(interest) && interests.length >= 5}
                    onClick={() => handleInterestToggle(interest)}
                    className={`py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                      interests.includes(interest) 
                        ? "bg-pink-600 text-white shadow-md" 
                        : interests.length >= 5
                          ? "bg-gray-100 text-gray-400"
                          : "bg-white border border-pink-100 text-gray-600 hover:border-pink-300"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              <div className="mt-3 text-xs text-pink-600">
                {interests.length}/5 interests selected
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                    <Bell className="h-5 w-5 text-pink-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Match Notifications</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationsEnabled ? 'bg-pink-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                {notificationsEnabled
                  ? "You'll receive match notifications"
                  : "Notifications are disabled"}
              </p>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-4 px-6 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-md transition-all"
            >
              {isSaving ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Save className="w-5 h-5 mr-2" />
                  Save Preferences
                </span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Success Message */}
      {showSavedMessage && (
        <div className="fixed bottom-6 right-6 bg-white px-6 py-3 rounded-xl shadow-lg border border-green-100 flex items-center animate-fade-in">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          <span className="text-sm font-medium text-green-700">Preferences saved successfully!</span>
        </div>
      )}
    </div>
  );
};

export default PreferencePage;