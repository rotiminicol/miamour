import { Navigate, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import GettingStarted from "./pages/GettingStarted";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./loader";
import ProfilePage from "./pages/ProfilePage";
import MarriageCounselingPage from "./pages/MarriageCounseling";
import BillingProcessPage from "./pages/BillingProcess ";
import DatingAppPage from "./pages/DatingApp";
import HelpSupportPage from "../src/pages/HelpSupport ";
import PreferencePage from "./pages/PreferencePage";
import NotificationPage from "./pages/NotificationPage";
import PrivacyPage from "./pages/PrivacyPage";
import SchedulePage from "./pages/SchedulePage";
import CeremonyPlanningPage from "./pages/CeremonyPlanningPage";
import Resources from "./pages/Resources";
import FAQs from "./pages/FAQs";
import ContactUs from "./pages/ContactUs";
import InvoicesPage from "./pages/InvoicesPage ";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import DiscountsPage from "./pages/DiscountsPage";
import ProfileSuccessComponent from "./components/ProfileSuccessComponent";
import PaymentConfirmationComponent from "./components/PaymentConfirmationComponent";
import PrivacySelectionComponent from "./components/PrivacySelectionComponent";
import RelationshipTherapy from "./pages/RelationshipTheraphy";
import PersonalizedMatchmaking from "./pages/PersonalizedMatchmaking";
import Homepage from "./pages/HomePage";


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
      <AnimatePresence mode="wait">
      <Routes>
        {/* Default route */}
        <Route path="/" element={authUser ? <Homepage /> : <LandingPage />} />

        <Route path="/getting-started" element={<GettingStarted />} />
        <Route path="/profile-submitted" element={<ProfileSuccessComponent />} />
        <Route path="/privacy-selection" element={<PrivacySelectionComponent />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmationComponent />} />

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
            <Route path="/preference" element={<PreferencePage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/ceremony-planning" element={<CeremonyPlanningPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/discounts" element={<DiscountsPage />} />
            <Route path="/relationship-therapy" element={<RelationshipTherapy />} />
            <Route path="/personalized-matchmaking" element={<PersonalizedMatchmaking />} />
            
          </>
        )}

        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </AnimatePresence>
      <Toaster />
    </div>
  );
}

export default App;











