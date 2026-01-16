export default function Navbar({ onDonate }) {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-emerald-700">
        St. Mary’s Catholic Church
      </h1>

      <button
        onClick={onDonate}
        className="bg-emerald-600 text-white px-5 py-2 rounded hover:bg-emerald-700"
      >
        Donate
      </button>
    </nav>
  );
}
