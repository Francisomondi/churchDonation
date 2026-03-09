export default function Navbar({ onDonate, onRegister }) {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b border-emerald-200">
      
      {/* Church Name */}
      <h1 className="text-2xl font-bold text-emerald-700">
        St. Mary’s Catholic Church
      </h1>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onRegister}
          className="border border-emerald-600 text-emerald-700 px-5 py-2 rounded hover:bg-emerald-50 transition"
        >
          Member Register
        </button>

        <button
          onClick={onDonate}
          className="bg-emerald-600 text-white px-5 py-2 rounded hover:bg-emerald-700 transition"
        >
          Donate
        </button>
      </div>

    </nav>
  );
}