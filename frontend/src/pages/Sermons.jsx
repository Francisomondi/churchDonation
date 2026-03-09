export default function Sermons() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold text-emerald-700 mb-8">
        Latest Sermons
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <iframe
            className="w-full h-52"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Sermon"
            allowFullScreen
          />

          <div className="p-4">
            <h2 className="font-semibold text-lg">
              Faith and Hope
            </h2>

            <p className="text-sm text-gray-500">
              Pastor John
            </p>

            <p className="text-emerald-600 font-medium">
              Romans 5:1-5
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <iframe
            className="w-full h-52"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Sermon"
            allowFullScreen
          />

          <div className="p-4">
            <h2 className="font-semibold text-lg">
              Walking in Faith
            </h2>

            <p className="text-sm text-gray-500">
              Pastor David
            </p>

            <p className="text-emerald-600 font-medium">
              Hebrews 11:1
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}