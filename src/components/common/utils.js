// Returns string containing date value converted from Unix Timestamp
export const getDate = (unixTimestamp, showTimeWithDate = false) => {
  // Months array
  const months_arr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Convert timestamp to Date
  const date = new Date(unixTimestamp);

  // Year
  const year = date.getFullYear();
  // Month
  const month = months_arr[date.getMonth()];
  // Day
  const day = date.getDate();

  // Hours
  const hours = date.getHours();
  // Minutes
  const minutes = "0" + date.getMinutes();
  // Seconds
  const seconds = "0" + date.getSeconds();
  const minutesPart = minutes.substr(-2),
    secondsPart = seconds.substr(-2);

  // Display date time in DD-MM-YYYY h:m:s format
  let convertedDate = day + "-" + month + "-" + year;
  if (showTimeWithDate) {
    // Display date time in DD-MM-YYYY HH:MM:SS 23 Hr format
    convertedDate += " (" + hours + ":" + minutesPart + ":" + secondsPart + ")";
  }
  return convertedDate;
};
