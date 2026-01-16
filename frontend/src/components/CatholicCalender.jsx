const seasons = {
  Advent: "Purple",
  Christmas: "White",
  Lent: "Purple",
  Easter: "White",
  Ordinary: "Green",
};

export default function CatholicCalender() {
  const today = new Date().toDateString();

  return (
    <section className="px-6 py-16 max-w-4xl mx-auto text-center">
      <h3 className="text-3xl font-semibold mb-4">
        Catholic Liturgical Calendar
      </h3>

      <p className="mb-2">
        <strong>Today:</strong> {today}
      </p>

      <p className="italic">
        Current Season: <span className="font-semibold">Ordinary Time</span>
      </p>

      <p className="mt-2">
        Liturgical Color:{" "}
        <span className="font-bold text-green-700">Green</span>
      </p>
    </section>
  );
}
