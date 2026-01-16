import DonationTypeButton from "./DonationTypeButton";

export default function DonationCard({ donation, onClick }) {
  return (
    <div className="bg-gray-700 p-4 rounded shadow hover:scale-105 transition cursor-pointer" onClick={onClick}>
      <h2 className="text-xl font-semibold text-emerald-400">{donation.name}</h2>
      <p className="text-gray-300 mt-1">{donation.description}</p>
      <div className="flex gap-2 mt-2">
        {donation.types.map((type) => (
          <DonationTypeButton key={type} type={type} />
        ))}
      </div>
    </div>
  );
}
