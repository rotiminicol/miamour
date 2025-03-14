import { useState, useEffect } from "react";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Services from "./components/Services/Services.jsx";
import Banner from "./components/Banner/Banner.jsx";
import Testimonials from "./components/Testimonials/Testimonials.jsx";
import Footer from "./components/Footer/Footer.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "./components/Loader.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Arrival from "./components/Arrival/Arrival.jsx";
import Consuel from "./components/Consuel.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();

    // Simulate a loading delay
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the time as needed
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-x-hidden">
      {loading && <Loader />}
      <Navbar />
      <div className="section-border-shadow">
        <Hero />
      </div>
      <div className="section-border-shadow">
        <Arrival />
      </div>
      <div className="section-border-shadow">
        <Banner />
      </div>
      <div className="section-border-shadow">
        <Services />
      </div>
      <div className="section-border-shadow">
        <Consuel />
      </div>
      <div className="section-border-shadow">
        <Testimonials />
      </div>
      <div className="section-border-shadow">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default App;