export default function Footer({ onDonate }) {
  return (
    <footer className="bg-gray-100 py-10 text-center space-y-4">
      <p className="text-gray-600">
        Support the mission and ministry of our church
      </p>

      <button
        onClick={onDonate}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded"
      >
        🙏 Donate via M-Pesa
      </button>

      <p className="text-sm text-gray-400">
        Secure payments powered by M-Pesa
      </p>
    </footer>
  );
}
