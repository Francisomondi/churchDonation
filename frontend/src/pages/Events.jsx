export default function Events() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold text-emerald-700 mb-8">
        Upcoming Church Events
      </h1>

      <div className="space-y-6">

        <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">
              Sunday Worship Service
            </h2>

            <p className="text-gray-600">
              Every Sunday at 9:00 AM
            </p>
          </div>

          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
            Weekly
          </span>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">
              Youth Fellowship
            </h2>

            <p className="text-gray-600">
              Saturday 4:00 PM
            </p>
          </div>

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            Event
          </span>
        </div>

      </div>

    </div>
  );
}