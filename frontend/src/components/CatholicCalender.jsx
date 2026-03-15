import { useState } from "react";
import { motion } from "framer-motion";

const seasons = {
  Advent: { color: "Purple", tailwind: "bg-purple-600" },
  Christmas: { color: "White", tailwind: "bg-gray-200 text-black" },
  Lent: { color: "Purple", tailwind: "bg-purple-700" },
  Easter: { color: "White", tailwind: "bg-yellow-100 text-black" },
  Ordinary: { color: "Green", tailwind: "bg-green-600" },
};

export default function CatholicCalendar() {
  const today = new Date();

  const [season] = useState("Ordinary");
  const [showDetails, setShowDetails] = useState(false);

  const seasonData = seasons[season];

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto text-center">

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold mb-6"
      >
        Catholic Liturgical Calendar
      </motion.h3>

      {/* Today Date */}
      <p className="mb-4 text-gray-600">
        <strong>Today:</strong>{" "}
        {today.toLocaleDateString("en-KE", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      {/* Season Card */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white shadow-lg rounded-2xl p-8 mb-6"
      >
        <h4 className="text-xl font-semibold mb-3">
          Current Liturgical Season
        </h4>

        <div className="flex justify-center items-center gap-4 mb-4">
          <div
            className={`w-6 h-6 rounded-full ${seasonData.tailwind}`}
          ></div>

          <p className="text-lg font-bold">{season}</p>
        </div>

        <p className="text-gray-600">
          Liturgical Color:{" "}
          <span className="font-semibold">{seasonData.color}</span>
        </p>
      </motion.div>

      {/* Saint of the Day */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mb-6">
        <h4 className="font-semibold mb-2">Saint of the Day</h4>
        <p className="text-gray-700">
          St. Joseph — Patron of workers, families, and the universal church.
        </p>
      </div>

      {/* Scripture */}
      <div className="bg-gray-50 border rounded-xl p-6 mb-6">
        <h4 className="font-semibold mb-2">Today's Reflection</h4>

        <p className="italic text-gray-700">
          “Trust in the Lord with all your heart and lean not on your own understanding.”
        </p>

        <p className="text-sm text-gray-500 mt-2">
          — Proverbs 3:5
        </p>
      </div>

      {/* Toggle More Info */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
      >
        {showDetails ? "Hide Season Details" : "Learn About This Season"}
      </button>

      {/* Expandable Section */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 bg-white border rounded-xl p-6 text-gray-700"
        >
          <p>
            Ordinary Time focuses on the life and teachings of Jesus Christ.
            It is a period of spiritual growth where the faithful reflect
            on Christ's ministry and teachings.
          </p>
        </motion.div>
      )}

      {/* Seasons Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">
        {Object.entries(seasons).map(([name, data]) => (
          <div
            key={name}
            className="border rounded-lg p-3 text-sm flex flex-col items-center"
          >
            <div
              className={`w-4 h-4 rounded-full mb-2 ${data.tailwind}`}
            ></div>
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}