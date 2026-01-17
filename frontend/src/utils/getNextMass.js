export function getNextMass() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const masses = [];

  const createDate = (base, hour, minute) => {
    const d = new Date(base);
    d.setHours(hour, minute, 0, 0);
    return d;
  };

  // WEEKDAY MASS (Mon–Fri)
  if (day >= 1 && day <= 5) {
    masses.push(createDate(now, 6, 30));
  }

  // SUNDAY MASSES
  if (day === 0) {
    masses.push(createDate(now, 7, 0));
    masses.push(createDate(now, 10, 0));
  }

  // FILTER FUTURE MASSES TODAY
  const upcomingToday = masses.filter(m => m > now);
  if (upcomingToday.length > 0) {
    return upcomingToday.sort((a, b) => a - b)[0];
  }

  // OTHERWISE FIND NEXT DAY
  let nextDay = new Date(now);
  nextDay.setDate(now.getDate() + 1);

  while (true) {
    const d = nextDay.getDay();

    if (d >= 1 && d <= 5) {
      return createDate(nextDay, 6, 30);
    }

    if (d === 0) {
      return createDate(nextDay, 7, 0);
    }

    nextDay.setDate(nextDay.getDate() + 1);
  }
}
