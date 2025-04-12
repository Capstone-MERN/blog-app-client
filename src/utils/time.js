export const getRelativeTime = (timestamp) => {
  const createdDate = new Date(timestamp);
  const currentDate = new Date();
  const difference = (currentDate - createdDate) / 1000;
  // 24 * 60 * 60 = 86400
  const days = parseInt(difference / 86400);
  if (days > 0) return `${days} ${days > 1 ? "days" : "day"} ago`;
  const hrs = parseInt(difference / 3600);
  if (hrs > 0) return `${hrs} ${hrs > 1 ? "hrs" : "hr"} ago`;
  const minutes = parseInt(difference / 60);
  if (minutes > 0) return `${minutes} ${minutes > 1 ? "mins" : "min"} ago`;
  const seconds = parseInt(difference / 60);
  return `${seconds} ${seconds > 1 ? "seconds" : "second"} ago`;
};
