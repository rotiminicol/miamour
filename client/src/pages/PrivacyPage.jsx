
import { useState } from "react";
import {  Shield, Eye, EyeOff, Sparkles, Download, Trash2 } from "lucide-react";
import BackButton from '../components/BackButton';

const PrivacyPage = () => {
  const [profileVisibility, setProfileVisibility] = useState("Public");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Simulate downloading user data as JSON
  const handleDownloadData = () => {
    const data = {
      profile: {
        name: "Jane Doe",
        email: "jane@example.com",
        visibility: profileVisibility,
      },
      // Add more fields as needed
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my_miamour_data.json";
    a.click();
    URL.revokeObjectURL(url);
    setShowSuccess("Your data has been downloaded.");
    setTimeout(() => setShowSuccess(false), 2500);
  };

  // Simulate account deletion
  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    setDeleteSuccess(true);
    setTimeout(() => setDeleteSuccess(false), 3500);
  };

  // Save privacy settings
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess("Settings saved successfully!");
    setTimeout(() => setShowSuccess(false), 2500);
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
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">  
                Privacy & Security
              </h1>
              <Sparkles className="h-6 w-6 text-pink-500 ml-2" />
            </div>
            <p className="mt-2 text-pink-500/80">Manage your privacy, data, and account security</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Visibility */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-pink-100/50 flex flex-col gap-4">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  {profileVisibility === "Public" ? (
                    <Eye className="h-5 w-5 text-pink-600" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-pink-600" />
                  )}
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Profile Visibility</h2>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 font-medium">Private</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileVisibility === "Public"}
                    onChange={() =>
                      setProfileVisibility(profileVisibility === "Public" ? "Private" : "Public")
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-pink-100 peer-focus:outline-none rounded-full peer peer-checked:bg-pink-500 transition-all"></div>
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                      profileVisibility === "Public" ? "translate-x-5" : ""
                    }`}
                  ></div>
                </label>
                <span className="text-gray-600 font-medium">Public</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {profileVisibility === "Public"
                  ? "Your profile is visible to everyone."
                  : "Only approved followers can see your content."}
              </p>
            </div>

            {/* Data Management */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-pink-100/50 flex flex-col gap-4">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-pink-100/30 rounded-lg mr-3">
                  <Download className="h-5 w-5 text-pink-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Your Data</h2>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleDownloadData}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow hover:from-pink-600 hover:to-rose-600 transition"
                >
                  <Download className="w-5 h-5" />
                  Download My Data
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-rose-200 text-rose-600 font-semibold shadow hover:bg-rose-50 transition"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete My Account
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Download a copy of your data or permanently delete your account.
              </p>
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

      {/* Success/Feedback Message */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-white px-6 py-3 rounded-xl shadow-lg border border-green-100 flex items-center animate-fade-in z-50">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          <span className="text-sm font-medium text-green-700">{showSuccess}</span>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-rose-600"
              onClick={() => setShowDeleteModal(false)}
              aria-label="Close"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center mb-4">
              <Trash2 className="w-6 h-6 text-rose-500 mr-2" />
              <h3 className="text-lg font-semibold text-rose-600">Delete Account</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to permanently delete your account? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold hover:from-rose-600 hover:to-pink-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Message */}
      {deleteSuccess && (
        <div className="fixed bottom-6 right-6 bg-white px-6 py-3 rounded-xl shadow-lg border border-rose-200 flex items-center animate-fade-in z-50">
          <div className="w-2 h-2 bg-rose-500 rounded-full mr-3"></div>
          <span className="text-sm font-medium text-rose-700">Your account has been deleted.</span>
        </div>
      )}
    </div>
  );
};

export default PrivacyPage;
