const donations = [
  { title: "Tithe", desc: "Faithful stewardship to God’s work." },
  { title: "Offering", desc: "Support weekly parish needs." },
  { title: "Project", desc: "Fund church development projects." },
  { title: "General", desc: "Flexible giving for parish activities." },
];

export default function DonationTypes() {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <h3 className="text-3xl text-center font-semibold mb-10">
        Ways to Give
      </h3>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {donations.map((d) => (
          <div
            key={d.title}
            className="bg-white p-6 rounded shadow text-center"
          >
            <h4 className="text-xl font-bold mb-2">{d.title}</h4>
            <p>{d.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
