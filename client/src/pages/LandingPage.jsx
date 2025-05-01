  import Navbar from '../components/landing/Navbar';
  import Hero from '../components/landing/Hero';
  import Features from '../components/landing/Features';
  import HowItWorks from '../components/landing/HowItWorks';
  import Testimonials from '../components/landing/Testimonials';
  import Contact from '../components/landing/Contact';
  import Footer from '../components/landing/Footer';
  import ParticleBackground from '../components/3d/ParticleBackground';

  function LandingPage() {
    return (
      <div className="relative overflow-hidden">
        <ParticleBackground />
        <Navbar />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    );
  }

  export default LandingPage;