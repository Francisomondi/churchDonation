
import { motion } from "framer-motion";

export default function Hero({ onDonate }) {
  return (
    <section
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: "url('/images/catholic-bg4.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            A Place of Faith, <br />
            Hope & Community
          </h1>

          <p className="text-lg text-gray-200 max-w-xl mx-auto md:mx-0">
            Our church is more than a building — it is a family united in
            worship, service, and love. Together we grow in faith,
            support one another, and extend God’s compassion to the world.
          </p>

          <p className="italic text-emerald-200">
            “Each of you should give what you have decided in your heart to give.”
            <br />
            — 2 Corinthians 9:7
          </p>

          <div className="flex justify-center md:justify-start">
            <button
              onClick={onDonate}
              className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-full font-semibold shadow-lg transition"
            >
              Support Our Mission
            </button>
          </div>

          <p className="text-sm text-gray-300">
            Your generosity helps support ministries, outreach, and those in need.
          </p>
        </motion.div>

        {/* RIGHT SIDE – CHURCH INFO CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 space-y-5"
        >
          <h3 className="text-2xl font-semibold text-center">
            Our Mission
          </h3>

          <p className="text-gray-200 text-center">
            We exist to worship God, grow in discipleship,
            serve our community, and spread the love of Christ.
          </p>

          <div className="space-y-3 text-sm">
            <div className="bg-white/10 rounded-lg py-3 px-4">
              ✝️ Worship & Spiritual Growth
            </div>

            <div className="bg-white/10 rounded-lg py-3 px-4">
              🤝 Community & Fellowship
            </div>

            <div className="bg-white/10 rounded-lg py-3 px-4">
              💙 Outreach & Charity
            </div>

            <div className="bg-white/10 rounded-lg py-3 px-4">
              🌍 Supporting Those in Need
            </div>
          </div>

          <button
            onClick={onDonate}
            className="w-full bg-white text-emerald-700 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Give With Faith
          </button>
        </motion.div>

      </div>
    </section>
  );
}