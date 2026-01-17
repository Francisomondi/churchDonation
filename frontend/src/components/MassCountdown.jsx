import { useEffect, useState } from "react";
import { getNextMass } from "../utils/getNextMass";

export default function MassCountdown() {
  const [timeLeft, setTimeLeft] = useState("");
  const [nextMass, setNextMass] = useState(null);

  useEffect(() => {
    const target = getNextMass();
    setNextMass(target);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("Mass is starting now 🙏");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!nextMass) return null;

  return (
    <section className="bg-emerald-900 text-white py-14">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Next Holy Mass Begins In
        </h2>

        <p className="text-4xl font-extrabold text-emerald-200 tracking-wide mb-3">
          {timeLeft}
        </p>

        <p className="text-sm text-emerald-100">
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
      </div>
    </section>
  );
}
