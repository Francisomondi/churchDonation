import { useState } from "react";
import { Link } from "react-router-dom";
//import { FaBars } from "react-icons/fa";

export default function Navbar({ onDonate, onRegister }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md border-b border-emerald-200">
      <div className="flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/church-logo.png"
            alt="Church Logo"
            className="h-10 w-10 object-contain"
          />
          <h1 className="text-xl font-bold text-emerald-700">
            St. Mary’s Catholic Church
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-emerald-600">Home</Link>
          <Link to="/sermons" className="hover:text-emerald-600">Sermons</Link>
          <Link to="/events" className="hover:text-emerald-600">Events</Link>
          <Link to="/members" className="hover:text-emerald-600">Members</Link>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={onRegister}
            className="border border-emerald-600 text-emerald-700 px-4 py-2 rounded hover:bg-emerald-50"
          >
            Register
          </button>

          <button
            onClick={onDonate}
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            Donate
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-emerald-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
        {/* <FaBars size={22} />*/}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-emerald-200 px-6 py-4 space-y-4">

          <div className="flex flex-col gap-3 text-gray-700">
            <Link to="/" className="hover:text-emerald-600">Home</Link>
            <Link to="/sermons" className="hover:text-emerald-600">Sermons</Link>
            <Link to="/events" className="hover:text-emerald-600">Events</Link>
            <Link to="/members" className="hover:text-emerald-600">Members</Link>
          </div>

          <div className="flex flex-col gap-3 pt-3">
            <button
              onClick={onRegister}
              className="border border-emerald-600 text-emerald-700 px-4 py-2 rounded"
            >
              Register
            </button>

            <button
              onClick={onDonate}
              className="bg-emerald-600 text-white px-4 py-2 rounded"
            >
              Donate
            </button>
          </div>

        </div>
      )}
    </nav>
  );
}