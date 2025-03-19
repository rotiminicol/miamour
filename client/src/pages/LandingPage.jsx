import React, { Suspense } from "react";
import Hero from "./Hero";
import Footer from "../components/Footer";

// Lazy load heavy components
const LazyBanner = React.lazy(() => import("../components/About"));
const LazyArrival = React.lazy(() => import("../components/Arrival"));
const LazyConsouel = React.lazy(() => import("../components/Consouel"));
const LazyService = React.lazy(() => import("../components/Service"));
const LazyContact = React.lazy(() => import("../components/ContactUs"));
const LazyTestimonial = React.lazy(() => import("../components/Testimonial"));

const LandingPage = () => {
  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <Hero />

      {/* Lazy-loaded Sections */}
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <LazyBanner />
        <LazyArrival />
        <LazyConsouel />
        <LazyService />
        <LazyContact />
        <LazyTestimonial />
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;