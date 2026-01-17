export default function CharityCard({ activity, onDonate }) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-700/30 transition">
      <img
        src={activity.image}
        alt={activity.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold text-emerald-400 mb-2">
          {activity.title}
        </h3>

        <p className="text-gray-300 text-sm mb-4">
          {activity.description}
        </p>

        <button
          onClick={() => onDonate(activity)}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-black py-2 rounded-lg font-semibold transition"
        >
          Donate to This Cause
        </button>
      </div>
    </div>
  );
}
