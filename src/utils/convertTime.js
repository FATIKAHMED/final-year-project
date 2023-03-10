export const getTimeStringFromSeconds = (timestamp) => {
  const minutes = Math.floor(timestamp / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(timestamp % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
};

export const toDateTime = (secs) => {
  let t = new Date("1970-01-01T00:30:00Z"); // Unix epoch start.
  t.setSeconds(secs);
  return t.toString();
};

//? Input:2021-11-19T12:50:21.511Z -> Output: 'Nov, 19 2021'
export const dateFormat = (date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  var today = new Date(date);
  var dd = today.getDate();
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  today = monthNames[today.getMonth()] + ", " + dd + " " + yyyy;
  // console.log(today);
  return today;
};

//? Input: millisecondsToStr(1250.278458 * 1000) -> Outputs: '20 minutes'
export const millisecondsToStr = (milliseconds) => {
  // TIP: to find current time in milliseconds, use:
  // var  current_time_milliseconds = new Date().getTime();

  function numberEnding(number) {
    return number > 1 ? "s" : "";
  }

  var temp = Math.floor(milliseconds / 1000);
  var years = Math.floor(temp / 31536000);
  if (years) {
    return years + " year" + numberEnding(years);
  }
  //TODO: Months! Maybe weeks?
  var days = Math.floor((temp %= 31536000) / 86400);
  if (days) {
    return days + " day" + numberEnding(days);
  }
  var hours = Math.floor((temp %= 86400) / 3600);
  if (hours) {
    return hours + " hour" + numberEnding(hours);
  }
  var minutes = Math.floor((temp %= 3600) / 60);
  if (minutes) {
    return minutes + " minute" + numberEnding(minutes);
  }
  var seconds = temp % 60;
  if (seconds) {
    return seconds + " second" + numberEnding(seconds);
  }
  return "less than a second"; //'just now' //or other string you like;
};

//? Input: convertTime(1250.278458) -> Outputs: '20m 50s'
export function convertSecsToDuration(seconds) {
  var seconds = parseInt(seconds, 10);
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - hours * 3600) / 60);
  var seconds = seconds - hours * 3600 - minutes * 60;
  if (!!hours) {
    if (!!minutes) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return `${hours}h ${seconds}s`;
    }
  }
  if (!!minutes) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

//for previous dates
//? Input: getDisplayDate("2021-11-11T06:41:44.461Z") -> Outputs: 'Thu 11 Nov 2021 '
export const getDisplayDate = (date) => {
  const t = new Date(date);
  let year = t.getFullYear();
  let month = t.getMonth() + 1;
  let day = t.getDate();
  const months = new Array(
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
    "Dec"
  );
  const days = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");

  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  const compDate = new Date(year, month - 1, day); // month - 1 because January == 0
  const diff = today.getTime() - compDate.getTime(); // get the difference between today(at 00:00:00) and the date

  if (compDate.getTime() == today.getTime()) {
    return "Today";
  } else if (diff <= 24 * 60 * 60 * 1000) {
    return "Yesterday";
  } else {
    //return compDate.toDateString(); // or format it what ever way you want
    year = compDate.getFullYear();
    month = compDate.getMonth();
    day = compDate.getDate();
    const d = compDate.getDay();

    var formattedDate = days[d] + " " + day + " " + months[month] + " " + year;
    return formattedDate;
  }
};

//? Input: getDisplayDate("2021-11-11T06:41:44.461Z") -> Outputs: '1636612904461'

export const getTimeInMilliSeconds = (dateTime) => {
  const d = new Date(dateTime);
  let ms = d.getTime();
  return ms;
}

//? Input: getDisplayDate("2021-11-11T06:41:44.461Z") -> Outputs: '17:21:24'
export const getDisplayTime = (dateTime) => {
  const d = new Date(dateTime);
  var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  return time;
}