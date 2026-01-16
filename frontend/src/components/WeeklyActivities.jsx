import { motion } from "framer-motion";
import { useState } from "react";
import ActivityModal from "./ActivityModal";

const activities = [
  {
    title: "Sunday Holy Mass",
    time: "7:00 AM • 10:00 AM",
    image: "/images/mass.jpg",
    description:
      "Join us for the Holy Eucharist every Sunday as a community of faith, prayer, and thanksgiving.",
  },
  {
    title: "Daily Mass",
    time: "Monday – Friday • 6:30 AM",
    image: "/images/daily-mass.jpg",
    description:
      "Begin your day with the Holy Mass and receive spiritual nourishment for daily life.",
  },
  {
    title: "Confession",
    time: "Saturday • 4:00 – 5:30 PM",
    image: "/images/confession.jpg",
    description:
      "The Sacrament of Reconciliation is available for spiritual renewal and forgiveness.",
  },
  {
    title: "Youth Fellowship",
    time: "Saturday • 3:00 PM",
    image: "/images/youth.jpg",
    description:
      "A vibrant fellowship for young people focused on faith, leadership, and service.",
  },
  {
    title: "Choir Practice",
    time: "Thursday • 6:00 PM",
    image: "/images/choir.jpg",
    description:
      "Join our choir and help lead the congregation in worship through music.",
  },
  {
    title: "Eucharistic Adoration",
    time: "Friday • 9:00 AM – 5:00 PM",
    image: "/images/adoration.jpeg",
    description:
      "Spend quiet time in prayer and reflection before the Blessed Sacrament.",
  },
];

export default function WeeklyActivities() {
  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <>
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-900 mb-12">
            Weekly Church Activities
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {activities.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedActivity(item)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-emerald-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{item.time}</p>

                  <p className="mt-3 text-sm text-emerald-700 font-medium">
                    Click for details →
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedActivity && (
        <ActivityModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}
    </>
  );
}
