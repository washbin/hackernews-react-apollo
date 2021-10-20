const timeDifference = (current, previous) => {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerMonth * 12;

  const elapsed = current - previous;

  if (Number.isNaN(elapsed)) return "Creation time unknown";
  if (elapsed < milliSecondsPerMinute / 3) return "just now";
  if (elapsed < milliSecondsPerMinute) return "less than 1 min ago";
  if (elapsed < milliSecondsPerHour)
    return `${Math.round(elapsed / milliSecondsPerMinute)} min ago`;
  if (elapsed < milliSecondsPerDay)
    return `${Math.round(elapsed / milliSecondsPerHour)} hrs ago`;
  if (elapsed < milliSecondsPerMonth)
    return `${Math.round(elapsed / milliSecondsPerDay)} days ago`;
  if (elapsed < milliSecondsPerYear)
    return `${Math.round(elapsed / milliSecondsPerMonth)} mo ago`;
  return `${Math.round(elapsed / milliSecondsPerYear)} years ago`;
};

export const timeDifferenceForDate = (date) => {
  const now = new Date().getTime();
  const updated = new Date(date).getTime();
  return timeDifference(now, updated);
};
