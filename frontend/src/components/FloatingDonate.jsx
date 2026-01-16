export default function FloatingDonate({ onDonate }) {
  return (
    <button
      onClick={onDonate}
      className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-xl z-50"
    >
      🙏 Give Now
    </button>
  );
}
