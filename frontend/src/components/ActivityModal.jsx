import { motion } from "framer-motion";

export default function ActivityModal({ activity, onClose }) {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
      >
        {/* Image */}
        <img
          src={activity.image}
          alt={activity.title}
          className="h-56 w-full object-cover"
        />

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-emerald-900">
            {activity.title}
          </h3>

          <p className="text-gray-600 mt-2">{activity.time}</p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            {activity.description}
          </p>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
