import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./loader";
import ProfilePage from "./pages/ProfilePage"; // Add this import
import MarriageCounselingPage from "./pages/MarriageCounseling"; // Add this import
import BillingProcessPage from "./pages/BillingProcess "; // Add this import
import DatingAppPage from "./pages/DatingApp"; // Add this import
import HelpSupportPage from "../src/pages/HelpSupport "; // Add this import


function App() {
  const { checkAuth, authUser, checkingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <Loader />;
  }

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <Routes>
        {/* Default route */}
        <Route path="/" element={authUser ? <HomePage /> : <LandingPage />} />

        {/* Auth route */}
        <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/" />} />

        {/* Protected routes (only accessible when authenticated) */}
        {authUser && (
          <>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/marriage-counseling" element={<MarriageCounselingPage />} />
            <Route path="/billing-process" element={<BillingProcessPage />} />
            <Route path="/dating-app" element={<DatingAppPage />} />
            <Route path="/help-support" element={<HelpSupportPage />} />
          </>
        )}

        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;