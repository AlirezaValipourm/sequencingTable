import Jalali from "jalali-moment";
export const convertToPersian = (
  miladiDate,
  inputFormat,
  outputFormat,
  miladiTime = `${new Date().getUTCHours()}:${new Date().getUTCMinutes()}`
) => {
  // convert to persian date
  let date = miladiDate;
  let convertedDate = {
    date: Jalali(date, inputFormat).locale("fa").format(outputFormat),
    time: null,
    persianDate: null,
  };
  const offset = new Date().getTimezoneOffset();
  let time = miladiTime.split(":");
  miladiTime = parseInt(time[0] * 60) + parseInt(time[1]);
  let shamsiTime = miladiTime + -offset;
  let shamsiHour = Math.floor(shamsiTime / 60);
  let shamsiMinute = shamsiTime - shamsiHour * 60;
  if (shamsiHour > 24) {
    convertedDate.date = Jalali(date, inputFormat)
      .add(1, "day")
      .locale("fa")
      .format(outputFormat);
    shamsiHour -= 24;
  }
  convertedDate.time =
    shamsiMinute > 0 ? `${shamsiHour}:${shamsiMinute}` : `${shamsiHour}`;

  let d = convertedDate.date.split("-");
  let mon;
  switch (d[1]) {
    case "01":
      mon = "فروردین";
      break;
    case "1":
      mon = "فروردین";
      break;
    case "02":
      mon = "اردیبهشت";
      break;
    case "2":
      mon = "اردیبهشت";
      break;
    case "03":
      mon = "خرداد";
      break;
    case "3":
      mon = "خرداد";
      break;
    case "04":
      mon = "تیر";
      break;
    case "4":
      mon = "تیر";
      break;
    case "05":
      mon = "مرداد";
      break;
    case "5":
      mon = "مرداد";
      break;
    case "06":
      mon = "شهریور";
      break;
    case "6":
      mon = "شهریور";
      break;
    case "07":
      mon = "مهر";
      break;
    case "7":
      mon = "مهر";
      break;
    case "08":
      mon = "آبان";
      break;
    case "8":
      mon = "آبان";
      break;
    case "09":
      mon = "آذر";
      break;
    case "9":
      mon = "آذر";
      break;
    case "10":
      mon = "دی";
      break;
    case "11":
      mon = "بهمن";
      break;
    case "12":
      mon = "اسفند";
      break;
  }
  convertedDate.persianDate = `${d[2]} ${mon} ${d[0]}`;

  return convertedDate;
};

export const dateDifference = (date1, date2) => {
  let d1 = date1.split("-");
  let d2 = date2.split("-");
  let days =
    (parseInt(d2[0]) - parseInt(d1[0])) * 365 +
    (parseInt(d2[1]) - parseInt(d1[1])) * 30 +
    (parseInt(d2[2]) - parseInt(d1[2]));
  // console.log(date1, date2, days);
  return days;
};

export const timeStatus = (startt, endd) => {
  let now = Jalali().format("YYYY-MM-DD");
  now = convertToPersian(now).date;
  now = now.substr(0, now.indexOf("T"));
  // console.log(now);
  const start = startt.substr(0, startt.indexOf("T"));
  const end = endd.substr(0, endd.indexOf("T"));
  let situation = {
    fromStart: dateDifference(now, start),
    fromEnd: dateDifference(now, end),
    stat: null,
  };
  if (situation.fromStart > 0) {
    situation.stat = "شروع نشده";
  } else if (situation.fromStart < 0 && situation.fromEnd > 0) {
    situation.stat = "در حال برگزاری";
  } else if (situation.fromStart === 0) {
    situation.stat = "شروع از امروز";
  } else {
    situation.stat = "پایان یافته";
  }
  return situation;
};

export const normalizeDateTime = (dateTime) => {
  // console.log(dateTime);
  let dateAndTime = dateTime.split("T");
  let date = convertToPersian(dateAndTime[0], "YYYY-MM-DD", "YYYY-MM-DD");
  // console.log(date);
  return date;
};

export const normalizeDateTimePersian = (dateTime) => {
  let dateAndTime = dateTime.split("T");
  let date = dateAndTime[0].substr(0, 10);
  let dateArray = date.split("-");
  if (dateArray[2] < 10) {
    dateArray[2] = dateArray[2].toString().replace("0", "");
  }
  const weekday = Jalali(dateTime).locale("fa").weekday();
  let mon;
  switch (dateArray[1]) {
    case "01":
      mon = "فروردین";
      break;
    case "1":
      mon = "فروردین";
      break;
    case "02":
      mon = "اردیبهشت";
      break;
    case "2":
      mon = "اردیبهشت";
      break;
    case "03":
      mon = "خرداد";
      break;
    case "3":
      mon = "خرداد";
      break;
    case "04":
      mon = "تیر";
      break;
    case "4":
      mon = "تیر";
      break;
    case "05":
      mon = "مرداد";
      break;
    case "5":
      mon = "مرداد";
      break;
    case "06":
      mon = "شهریور";
      break;
    case "6":
      mon = "شهریور";
      break;
    case "07":
      mon = "مهر";
      break;
    case "7":
      mon = "مهر";
      break;
    case "08":
      mon = "آبان";
      break;
    case "8":
      mon = "آبان";
      break;
    case "09":
      mon = "آذر";
      break;
    case "9":
      mon = "آذر";
      break;
    case "10":
      mon = "دی";
      break;
    case "11":
      mon = "بهمن";
      break;
    case "12":
      mon = "اسفند";
      break;
  }
  let dayInWeekString;

  switch (weekday) {
    case 0:
      dayInWeekString = "شنبه";
      break;
    case 1:
      dayInWeekString = "یکشنبه";
      break;
    case 2:
      dayInWeekString = "دوشنبه";
      break;
    case 3:
      dayInWeekString = "سه شنبه";
      break;
    case 4:
      dayInWeekString = "چهار شنبه";
      break;
    case 5:
      dayInWeekString = "پنج شنبه";
      break;
    case 6:
      dayInWeekString = "جمعه";
      break;
  }
  const data = {
    dayInWeekNumber: weekday,
    dayInWeekString: dayInWeekString,
    dayInMonth: dateArray[2],
    year: dateArray[0],
    monthInNumber: dateArray[1],
    monthInString: mon,
  };
  return data;
};

export const todayOfShamsiWeek = () => {
  // Returns a number as day of week in jalali calendar.

  const today = Jalali().locale("fa").weekday();
  return today;
};

export const timeDivider = (start, end, period) => {
  // Start and end are in hour strings. Example : "8:30"

  let resultArray = [];

  const startTime = start.split(":");
  if (startTime[1] == undefined) startTime.push("00");

  const endTime = end.split(":");
  if (endTime[1] == undefined) endTime.push("00");
  let thisTime = startTime[0] + ":" + startTime[1];
  while (timeCompare(end, thisTime)) {
    resultArray.push(thisTime + " - " + timeAdder(thisTime, period).time);
    thisTime = timeAdder(thisTime, period).time;
  }
  return resultArray;
};

export const timeAdder = (givenTime, amount) => {
  // Time is an hour and amount is in minutes. Time example : "15:22" or "20" and amount example : "30"
  const time = givenTime.split(":");
  if (time[1] == undefined) time.push("0");
  time[0] = parseInt(time[0]);
  time[1] = parseInt(time[1]);
  const addedAmount = parseInt(amount);
  if (time[1] + addedAmount >= 60) {
    if (time[0] + 1 === 24) time[0] = 0;
    else time[0]++;
    time[1] = time[1] + addedAmount - 60;
  } else {
    time[1] = time[1] + addedAmount;
  }
  if (time[1] < 10) time[1] = "0" + time[1];
  const result = {
    hour: time[0],
    minute: time[1],
    time: `${time[0] + ":" + time[1]}`,
  };
  return result;
};

export const timeCompare = (givenTime1, givenTime2) => {
  // Returns true if time1 is later than time2. Input format "15:45" or "10"

  const time1 = givenTime1.split(":");
  if (time1[1] == undefined) time1.push("0");
  const hour1 = parseInt(time1[0]);
  const minute1 = parseInt(time1[1]);
  const time2 = givenTime2.split(":");
  if (time2[1] == undefined) time2.push("0");
  const hour2 = parseInt(time2[0]);
  const minute2 = parseInt(time2[1]);
  if (hour1 > hour2) return true;
  if (hour1 == hour2 && minute1 > minute2) return true;
  if (hour1 == hour2 && minute1 == minute2) return false;

  return false;
};

export const weekdayDate = (date) => {
  const tarikh = Jalali(date).locale("fa");
  console.log(tarikh);
};
