import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import ProfileForm from "../components/ProfileForm";
import PrivacySelectionComponent from "../components/PrivacySelectionComponent";
import PaymentConfirmationComponent from "../components/PaymentConfirmationComponent";
import ProfileSuccessComponent from "../components/ProfileSuccessComponent";

const HomePage = () => {
  const [currentView, setCurrentView] = useState("form"); // form, privacy, payment, success
  const [formData, setFormData] = useState({
    // Form data from your original code
    // ...
  });
  const [privacyOption, setPrivacyOption] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    setFormData(data);
    setCurrentView("privacy");
  };

  const handlePrivacySelect = (option) => {
    setPrivacyOption(option);
    setCurrentView("payment");
  };

  const handlePaymentConfirm = () => {
    setCurrentView("success");
    setTimeout(() => navigate("/dashboard"), 3000); // Redirect after 3s
  };
  

  const handlePaymentCancel = () => {
    setCurrentView("privacy");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Header />
        <main className="flex-grow flex flex-col justify-center items-center p-4 relative overflow-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 my-8">
            {currentView === "form" && (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Find Your Perfect Match
                  </h1>
                  <p className="text-center text-gray-600">
                    Let our matchmaking experts help you find your soulmate
                  </p>
                </div>
                <ProfileForm onSubmit={handleFormSubmit} initialData={formData} />
              </>
            )}

            {currentView === "privacy" && (
              <PrivacySelectionComponent
                onSelect={handlePrivacySelect}
                selectedOption={privacyOption}
              />
            )}

            {currentView === "payment" && (
              <PaymentConfirmationComponent
                option={privacyOption}
                onConfirm={handlePaymentConfirm}
                onCancel={handlePaymentCancel}
              />
            )}

            {currentView === "success" && <ProfileSuccessComponent />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;