import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import AboutChurch from "../components/AboutChurch.jsx";
import DonationTypes from "../components/DonationTypes.jsx";
import CatholicCalendar from "../components/CatholicCalender.jsx";
import Footer from "../components/Footer.jsx";
import { useState } from "react";
import DonateModal from "../components/DonationModal.jsx";
import FloatingDonate from "../components/FloatingDonate.jsx";



export default function Home() {
  const [showDonate, setShowDonate] = useState(false);

  return (
    <>
    
      <Navbar onDonate={() => setShowDonate(true)} />
      <Hero onDonate={() => setShowDonate(true)}/>
       <FloatingDonate onDonate={() => setShowDonate(true)} />
      <AboutChurch />
      <DonationTypes />
      <CatholicCalendar />
      <Footer onDonate={() => setShowDonate(true)} />

      {showDonate && (
        <DonateModal onClose={() => setShowDonate(false)} />
      )}
    </>
  );
}