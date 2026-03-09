export default function Members() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold text-emerald-700 mb-8">
        Church Members
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6">

        <p className="text-gray-600 mb-6">
          Registered members of St. Mary’s Catholic Church.
        </p>

        <table className="w-full border-collapse">

          <thead>
            <tr className="bg-emerald-100 text-emerald-800 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Group</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-b">
              <td className="p-3">Mary Johnson</td>
              <td className="p-3">+254 712 345 678</td>
              <td className="p-3">Choir</td>
            </tr>

            <tr className="border-b">
              <td className="p-3">Peter Mwangi</td>
              <td className="p-3">+254 701 234 567</td>
              <td className="p-3">Youth</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}