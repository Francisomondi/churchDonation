import { motion } from "framer-motion";

const images = [
  "/images/church-1.jpg",
  "/images/church-2.jpg",
  "/images/church-3.jpg",
  "/images/church-4.jpg",
  "/images/church-5.jpg",
  "/images/church-6.jpeg",
];

export default function ChurchGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-900 mb-12">
          Life in Our Church
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl shadow-md object-cover h-56 w-full cursor-pointer"
              alt="Church life"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
