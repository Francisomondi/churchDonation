export default function DonationTypeButton({ type }) {
  const colors = {
    Tithe: "bg-blue-500",
    Offerings: "bg-emerald-500",
    Project: "bg-yellow-500",
    General: "bg-gray-500"
  };

  return (
    <span className={`${colors[type]} px-2 py-1 rounded text-sm`}>{type}</span>
  );
}
