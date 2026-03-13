import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Sermons from "./pages/Sermons";
import Events from "./pages/Events";
import Members from "./pages/Members";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DonateModal from "./components/DonationModal";

function App() {
  const [showDonate, setShowDonate] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden flex flex-col">

      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full 
          bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]"/>
        </div>
      </div>

      <div className="relative z-50 flex flex-col min-h-screen">

        {/* Pass donate handler */}
        <Navbar onDonate={() => setShowDonate(true)} />

        <main className="grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/events" element={<Events />} />
            <Route path="/members" element={<Members />} />
          </Routes>
        </main>

      
      </div>

      {/* Donate Modal */}
      {showDonate && (
        <DonateModal onClose={() => setShowDonate(false)} />
      )}

      <Toaster />
    </div>
  );
}

export default App;