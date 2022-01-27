import Jalali from "jalali-moment";
export const convertToPersian = (
  miladiDate: string,
  inputFormat: string,
  outputFormat: string,
  miladiTime = `${new Date().getUTCHours()}:${new Date().getUTCMinutes()}`
) => {
  // convert to persian date
  let date = miladiDate;
  let convertedDate: any = {
    date: Jalali(date, inputFormat).locale("fa").format(outputFormat),
    time: null,
    persianDate: null,
  };
  const offset = new Date().getTimezoneOffset();
  let time = miladiTime.split(":");
  const miladiTimeClock: any = parseInt(time[0]) * 60 + parseInt(time[1]);
  let shamsiTime: any = miladiTimeClock + -offset;
  let shamsiHour: any = Math.floor(shamsiTime / 60);
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

export const normalizeDateTime = (dateTime: string) => {
  let dateAndTime = dateTime.split("T");
  let date = convertToPersian(dateAndTime[0], "YYYY-MM-DD", "YYYY-MM-DD");
  return date;
};

export const normalizeDateTimePersian = (dateTime: string) => {
  let dateAndTime = dateTime.split("T");
  let date = dateAndTime[0].substr(0, 10);
  let dateArray = date.split("-");
  if (parseInt(dateArray[2]) < 10) {
    dateArray[2] = dateArray[2].toString().replace("0", "");
  }

  const weekday = Jalali(dateTime).weekday();
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

export const timeDivider = (start: string, end: string, period: number) => {
  // Start and end are in hour strings. Example : "8:30"
  let resultArray = [];
  const startTime = start.split(":");
  if (startTime[1] == undefined) startTime.push("00");

  const endTime = end.split(":");
  if (endTime[1] == undefined) endTime.push("00");
  let thisTime = startTime[0] + ":" + startTime[1];
  while (timeCompare(end, thisTime, period)) {
    resultArray.push(
      thisTime + " - " + timeAdder(thisTime, period.toString()).time
    );
    thisTime = timeAdder(thisTime, period.toString()).time;
  }
  return resultArray;
};

export const timeAdder = (givenTime: string, amount: string) => {
  // Time is an hour and amount is in minutes. Time example : "15:22" or "20" and amount example : "30"
  const time = givenTime.split(":");
  if (time[1] == undefined) time.push("0");
  let hour: any = parseInt(time[0]);
  let minute: any = parseInt(time[1]);
  const addedAmount = parseInt(amount);
  if (minute + addedAmount >= 60) {
    if (hour + 1 === 24) hour = 0;
    else hour++;
    minute = minute + addedAmount - 60;
  } else {
    minute = minute + addedAmount;
  }
  if (minute < 10) minute = "0" + minute;
  const result = {
    hour: hour,
    minute: minute,
    time: `${hour + ":" + minute}`,
  };
  return result;
};

export const timeCompare = (
  givenTime1: string,
  givenTime2: string,
  amount: number = -1
) => {
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

  if (amount != -1) {
    const t1InMinute = hour1 * 60 + minute1;
    const t2InMinute = hour2 * 60 + minute2;
    if (t1InMinute - t2InMinute == amount) return true;
    else {
      return false;
    }
  }
  return false;
};

export const dayInWeekDate = (dayNumberInWeek: number, time: string = "-1") => {
  const jalaliFa = Jalali().locale("fa");
  const todayInWeek = jalaliFa.weekday();
  const dateDifference = dayNumberInWeek - todayInWeek;
  let wantedDate = jalaliFa.add(dateDifference, "days");
  if (time) {
    const timeDate = time.split(":");
    if (timeDate[1] == "-1") timeDate.push("00");
    wantedDate.hour(parseInt(timeDate[0]));
    wantedDate.minute(parseInt(timeDate[1]));
    wantedDate.second(0);
  }
  return wantedDate.format();
};

export const arrayPeriodDivider = (
  mainString: string[],
  divideStr: string,
  period: number
) => {
  const mainArray = mainString.map((time) => {
    const timeArray = time.split(divideStr);
    const timeInString = timeDivider(
      timeArray[0].trim(),
      timeArray[1].trim(),
      period
    );
    return timeInString;
  });
  return mainArray;
};
