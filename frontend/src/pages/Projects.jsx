import { motion } from "framer-motion";

export default function Projects({ onDonate }) {
  const projects = [
    { id: 1, name: "School Renovation", description: "Renovating the local school.", image: "/images/school.jpg" },
    { id: 2, name: "Church Roof Repair", description: "Repairing the church roof.", image: "/images/roof.jpg" },
    { id: 3, name: "Community Outreach", description: "Feeding the needy every weekend.", image: "/images/outreach.jpg" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Church Projects</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-xl">{project.name}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <button
                onClick={onDonate}
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Donate to Project
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
