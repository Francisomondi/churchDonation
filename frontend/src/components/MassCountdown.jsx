import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getNextMass } from "../utils/getNextMass";

export default function MassCountdown() {
  const [time, setTime] = useState({});
  const [nextMass, setNextMass] = useState(null);

  useEffect(() => {
    let target = getNextMass();
    setNextMass(target);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        target = getNextMass();
        setNextMass(target);
        return;
      }

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!nextMass) return null;

  const TimeBox = ({ value, label }) => (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-24 shadow-lg"
    >
      <p className="text-3xl font-bold text-emerald-200">{value}</p>
      <p className="text-xs uppercase text-emerald-100">{label}</p>
    </motion.div>
  );

  return (
    <section className="bg-linear-to-br from-emerald-900 to-emerald-700 text-white py-20">

      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* HEADER */}
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Next Holy Mass
        </h2>

        <p className="text-emerald-200 italic mb-10">
          “Let us go to the house of the Lord.” – Psalm 122:1
        </p>

        {/* COUNTDOWN */}
        <div className="flex justify-center flex-wrap gap-5 mb-12">
          <TimeBox value={time.days} label="Days" />
          <TimeBox value={time.hours} label="Hours" />
          <TimeBox value={time.minutes} label="Minutes" />
          <TimeBox value={time.seconds} label="Seconds" />
        </div>

        {/* NEXT MASS DATE */}
        <p className="text-sm text-emerald-100 mb-10">
          {nextMass.toLocaleDateString("en-KE", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}{" "}
          •{" "}
          {nextMass.toLocaleTimeString("en-KE", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">

          <button className="bg-white text-emerald-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100">
            📅 Add to Calendar
          </button>

          <button className="bg-emerald-500 px-6 py-3 rounded-full hover:bg-emerald-600">
            🔔 Remind Me
          </button>

          <button className="border border-white/40 px-6 py-3 rounded-full hover:bg-white/10">
            📍 Get Directions
          </button>

          <button className="border border-white/40 px-6 py-3 rounded-full hover:bg-white/10">
            🎥 Watch Live Mass
          </button>

        </div>

        {/* TODAY MASS SCHEDULE */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-3xl mx-auto">

          <h3 className="text-xl font-semibold mb-6">
            Today's Mass Schedule
          </h3>

          <div className="grid md:grid-cols-3 gap-4 text-sm">

            <div className="bg-white/10 rounded-lg py-3">
              6:30 AM <br />
              Morning Mass
            </div>

            <div className="bg-white/10 rounded-lg py-3">
              12:30 PM <br />
              Midday Mass
            </div>

            <div className="bg-white/10 rounded-lg py-3">
              6:00 PM <br />
              Evening Mass
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}