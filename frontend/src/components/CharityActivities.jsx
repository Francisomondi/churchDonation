import CharityCard from "./CharityCard";
import { charityActivities } from "../data/charityActivities";

export default function CharityActivities({ onDonate }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">
        Charity Activities You Can Support
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {charityActivities.map((activity) => (
          <CharityCard
            key={activity.id}
            activity={activity}
            onDonate={onDonate}
          />
        ))}
      </div>
    </section>
  );
}
