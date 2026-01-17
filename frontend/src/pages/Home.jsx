import { useState, useEffect } from "react";

import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import AboutChurch from "../components/AboutChurch.jsx";
import DonationTypes from "../components/DonationTypes.jsx";
import CatholicCalendar from "../components/CatholicCalender.jsx";
import Footer from "../components/Footer.jsx";
import DonateModal from "../components/DonationModal.jsx";
import FloatingDonate from "../components/FloatingDonate.jsx";
import WeeklyActivities from "../components/WeeklyActivities.jsx";
import ChurchGallery from "../components/ChurchGallery.jsx";
import MassCountdown from "../components/MassCountdown";
import CharityActivities from "../components/CharityActivities";

export default function Home() {
  const [showDonate, setShowDonate] = useState(false);
   const [selectedCause, setSelectedCause] = useState(null);

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showDonate ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showDonate]);

  const openDonate = () => setShowDonate(true);
  const closeDonate = () => setShowDonate(false);

  const handleDonate = (cause = null) => {
    setSelectedCause(cause);
    setShowDonate(true);
  };

  return (
    <>
      <Navbar onDonate={openDonate} />
      <Hero onDonate={openDonate} />
      <MassCountdown />
      <FloatingDonate onDonate={openDonate} />
      <WeeklyActivities />
      <CharityActivities onDonate={handleDonate} />   
      <AboutChurch />
      <ChurchGallery />
      <DonationTypes />
      <CatholicCalendar />

      <Footer onDonate={openDonate} />

      {showDonate && <DonateModal onClose={closeDonate} />}
    </>
  );
}
