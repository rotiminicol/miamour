import { useState, useEffect } from "react";
import { ArrowRight, Shield, Eye, EyeOff, UserX, Sparkles } from "lucide-react";
import BackButton from '../components/BackButton';

const PrivacyPage = () => {
  const [profileVisibility, setProfileVisibility] = useState("Public");
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setBlockedUsers(["user123", "anonymous_user"]);
    }, 800);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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
                Privacy Settings
              </h1>
              <Sparkles className="h-6 w-6 text-pink-500 ml-2" />
            </div>
            <p className="mt-2 text-pink-500/80">Control your privacy and security</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Visibility */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  <Eye className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Profile Visibility</h2>
              </div>
              <div className="relative">
                <select
                  value={profileVisibility}
                  onChange={(e) => setProfileVisibility(e.target.value)}
                  className="w-full px-4 py-3 border border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-700 bg-white appearance-none"
                >
                  <option value="Public">Public - Anyone can view your profile</option>
                  <option value="Private">Private - Only followers can view your profile</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ArrowRight className="h-4 w-4 text-pink-500 rotate-90" />
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                {profileVisibility === "Public" ? 
                  "Your profile is visible to everyone." : 
                  "Only approved followers can see your content."}
              </p>
            </div>

            {/* Blocked Users */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  <UserX className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Blocked Users</h2>
              </div>
              <div className="bg-white/50 rounded-xl border border-pink-100 p-4">
                {blockedUsers.length > 0 ? (
                  <ul className="space-y-3">
                    {blockedUsers.map((user, index) => (
                      <li 
                        key={index} 
                        className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-pink-100"
                      >
                        <span className="font-medium text-gray-700">{user}</span>
                        <button
                          type="button"
                          onClick={() => setBlockedUsers(blockedUsers.filter((u) => u !== user))}
                          className="text-xs bg-pink-100 hover:bg-pink-200 text-pink-700 px-3 py-2 rounded-xl transition-colors"
                        >
                          Unblock
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <EyeOff className="h-12 w-12 text-pink-300 mb-3" />
                    <p className="text-gray-500">No blocked users at the moment.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-md transition-colors"
            >
              <span className="flex items-center justify-center">
                <Shield className="w-5 h-5 mr-2" />
                Save Privacy Settings
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-white px-6 py-3 rounded-xl shadow-lg border border-green-100 flex items-center animate-fade-in">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          <span className="text-sm font-medium text-green-700">Settings saved successfully!</span>
        </div>
      )}
    </div>
  );
};

export default PrivacyPage;