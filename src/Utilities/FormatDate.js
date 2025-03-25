
export default function formatDate(timestamp) {
  const date = new Date(timestamp); // Convert the timestamp to a Date object
  const year = date.getFullYear(); // Get the year
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (add 1 because months are zero-indexed)
  const day = String(date.getDate()).padStart(2, "0"); // Get the day
  return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
}



