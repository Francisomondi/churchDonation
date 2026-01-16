import { motion } from "framer-motion";

export default function Hero({ onDonate }) {
  return (
    <section
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: "url('/images/catholic-bg4.jpg')", // put your image in public/images
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* overlay to make text readable */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center md:text-left space-y-6 z-10"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Giving with Faith.<br />
            <span className="text-emerald-200">Changing Lives.</span>
          </h1>

          <p className="text-emerald-100 max-w-xl mx-auto md:mx-0">
            Support the mission and ministries of our church. Give securely
            and conveniently via M-Pesa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={onDonate}
              className="bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              🙏 Give Unto the Lord
            </button>

            <button
              onClick={onDonate}
              className="border border-white/40 px-8 py-3 rounded-full hover:bg-white/10 transition"
            >
              Support a Project
            </button>
          </div>

          <p className="text-sm text-emerald-200">
            Secure • Instant • Trusted
          </p>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center space-y-4 z-10"
        >
          <h3 className="text-xl font-bold">Ways to Give</h3>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white/10 rounded py-3">🙏 Tithe</div>
            <div className="bg-white/10 rounded py-3">🎁 Offering</div>
            <div className="bg-white/10 rounded py-3">🏗 Project</div>
            <div className="bg-white/10 rounded py-3">💚 General</div>
          </div>

          <button
            onClick={onDonate}
            className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 rounded-full font-semibold"
          >
            Give Now
          </button>
        </motion.div>

      </div>
    </section>
  );
}
