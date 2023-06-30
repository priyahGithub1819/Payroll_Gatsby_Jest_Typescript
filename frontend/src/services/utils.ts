export function indianDate(d:any) {
  let k = new Date(d)
  return k.getDate() + "-" + (k.getMonth() + 1) + "-" + k.getFullYear()
}

// Months for dates
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

// date format
export const dateFormat = (format:any, dateString:any) => {
  let date;
  const d = new Date(dateString);
  if (format === "india") {

    date = new Date(dateString).getDate() +
      "-" +
      months[
      new Date(dateString).getMonth()
      ] +
      "-" +
      new Date(dateString).getFullYear();
  } else if (format === "dateInput") {
    date = d.toISOString().split("T")[0];
  }
  return date;
};

