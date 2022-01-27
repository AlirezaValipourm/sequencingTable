import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  SequencingTableProps,
  Day,
  Session,
  ResultData,
  SessionData,
} from "./interface/interface";
import styles from "./styles/Home.module.css";
import SessionTime from "./UI/SessionTime";
import Button from "./UI/Button";
import Dropdown from "./UI/Dropdown";
import PurchaseSection from "./UI/PurchaseSection";
import Jalali from "jalali-moment";
import Loading from "./UI/Loading";
import {
  normalizeDateTimePersian,
  timeDivider,
  todayOfShamsiWeek,
  dayInWeekDate,
  arrayPeriodDivider,
} from "./logics/utils/DateHandling";
import { SessionStartEnd } from "./logics/constants/sequencingTableConfig";
import { getBooked, getTableConfig } from "./logics/services/services.api";
import Error from "./UI/Error";
const SequencingTable = (props: SequencingTableProps) => {
  const totalPrice = useRef<number>(0);
  const selectedSessoions = useRef<ResultData[]>([]);
  const [dropdownData, setDropdownData] = useState<Day[]>();
  const [activeDay, setActiveDay] = useState<Day>({ day: 0, dayInString: "" });
  const [price, setPrice] = useState<number>(0);
  const [session, setSession] = useState<Session[] | undefined>();
  const [returnData, setReturnData] = useState<string[][]>([[""]]);
  const [weekdays, setWeekdays] = useState<string>("");
  const [availability, setAvailability] = useState<string>("");
  const [period, setPeriod] = useState<number>(0);
  const [booked, setBooked] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getBooked(activeDay.day).then((booked: any) => {
      if (booked[0].reservedTime == undefined) {
        setError("مشکلی پیش آمده است. لطفا مجددا تلاش کنید.");
      } else {
        setBooked(booked[0].reservedTime);
      }
    });
  }, [activeDay]);

  useEffect(() => {
    getTableConfig().then((config: any) => {
      if (config[0] == undefined) {
        setError("مشکلی پیش آمده است.لطفا مجددا تلاش کنید.");
      } else {
        const cfg = config[0];
        setWeekdays(cfg.weekdays);
        setAvailability(cfg.availabilities);
        setPeriod(cfg.period);
        setPrice(cfg.cost);
        setIsLoaded(true);
      }
    });
    if (!isLoaded) return;
    const todayObj = Jalali().locale("fa");
    const todayData = normalizeDateTimePersian(todayObj.format());
    dropDownOptions(weekdays);
    const todayDate = {
      day: todayObj.weekday(),
      dayInString: `${todayData.dayInWeekString} , ${todayData.dayInMonth} ${todayData.monthInString}`,
    };
    setActiveDay(todayDate);
  }, [isLoaded]);

  useEffect(() => {
    sessionArrayConstructor();
  }, [activeDay, dropdownData, isLoaded]);

  const dropDownOptions = (weekdays: string) => {
    const weekdaysArray = weekdays
      .split(",")
      .map((weekday: string) => parseInt(weekday));
    let days: Day[] = [];
    const today: number = todayOfShamsiWeek();
    const todayDate = Jalali().locale("fa");
    if (weekdaysArray.indexOf(today) === -1) {
      const persianDayObject = normalizeDateTimePersian(todayDate.format());
      const dayObject: Day = {
        day: todayDate.weekday(),
        dayInString: `${persianDayObject.dayInWeekString} , ${persianDayObject.dayInMonth} ${persianDayObject.monthInString} `,
      };
      days.push(dayObject);
    }
    for (let i = 0; i < 7; i++) {
      const day = Jalali().locale("fa").add(i, "days");
      if (
        weekdaysArray.indexOf(day.weekday()) > -1 &&
        weekdaysArray[weekdaysArray.indexOf(day.weekday())] >= today
      ) {
        const idx = weekdaysArray.indexOf(day.weekday());
        const persianDayObject = normalizeDateTimePersian(day.format());
        const dayObject: Day = {
          day: weekdaysArray[idx],
          dayInString: `${persianDayObject.dayInWeekString} , ${persianDayObject.dayInMonth} ${persianDayObject.monthInString}`,
        };
        days.push(dayObject);
      }
    }
    setDropdownData(days);
  };

  const sessionArrayConstructor = () => {
    if (!dropdownData || booked === [] || !booked || error) return;
    const timeInText = timeDivider(
      SessionStartEnd.tableStartTime,
      SessionStartEnd.tableEndTime,
      period
    );
    const weekdaysArray: number[] = weekdays
      .split(",")
      .map((weekday: string) => parseInt(weekday));
    const activeDayIndex: number = weekdaysArray.indexOf(activeDay.day);
    if (activeDayIndex === -1) {
      setSession(undefined);
      return;
    }
    const availabilityArray = availability.split(",");
    const availabilityOfActiveDay = arrayPeriodDivider(
      availabilityArray,
      "-",
      period
    );
    const availabilityOfActiveDayArray = availabilityOfActiveDay.flat(1);
    const bookedOfActiveDay = arrayPeriodDivider(booked, "-", period);
    const bookedOfActiveDayArray = bookedOfActiveDay.flat(1);
    const sessionData = timeInText.map((time: string) => {
      let booked = false;
      let available = false;
      if (availabilityOfActiveDayArray.indexOf(time) > -1) available = true;
      if (bookedOfActiveDayArray.indexOf(time) > -1) booked = true;
      const sessionObj: Session = {
        available: available,
        booked: booked,
        text: time,
      };
      return sessionObj;
    });
    setSession(sessionData);
  };

  const selectedDayHandler = (day: Day) => setActiveDay(day);

  const nearestFreeTime = () => {
    const today = Jalali().locale("fa");
    let flag = true;
    const weekdaysArray = weekdays
      .split(",")
      .map((weekday: string) => parseInt(weekday));
    while (flag) {
      const activeDayIndex: number = weekdaysArray.indexOf(today.weekday());
      if (activeDayIndex === -1) {
        today.add(1, "day");
        continue;
      }
      const availabilityArray = availability.split(",");
      const availabilityOfNearestAvailableDay = arrayPeriodDivider(
        availabilityArray,
        "-",
        period
      );
      const bookedOfActiveDay = arrayPeriodDivider(booked, "-", period);
      const bookedOfActiveDayArray = bookedOfActiveDay.flat(1);
      const availablityOfNearestDay = availabilityOfNearestAvailableDay
        .flat(1)
        .find((time) => bookedOfActiveDayArray.indexOf(time) === -1);
      if (availablityOfNearestDay !== undefined) {
        flag = false;
        const todayInPersian = normalizeDateTimePersian(today.format());
        const dayObj = {
          day: today.weekday(),
          dayInString: `${todayInPersian.dayInWeekString} , ${todayInPersian.dayInMonth} ${todayInPersian.monthInString}`,
        };
        setActiveDay(dayObj);
      } else {
        today.add(1, "day");
      }
    }
  };

  const selectHandler = (session: SessionData) => {
    const times = session.time.split("-").map((time) => time.trim());
    const startDate = dayInWeekDate(activeDay.day, times[0]);
    const endDate = dayInWeekDate(activeDay.day, times[1]);
    const resultObj: ResultData = {
      day: activeDay?.day,
      selected: session.selected,
      timeArray: [startDate, endDate],
      time: session.time,
    };
    setReturnData([...returnData, resultObj.timeArray]);
    const resultObjIndex = selectedSessoions.current.find(
      (dataObj: ResultData) =>
        dataObj.day === resultObj.day && dataObj.time === resultObj.time
    );
    if (!resultObjIndex) {
      selectedSessoions.current.push(resultObj);
      totalPrice.current += price;
    } else {
      const objIndex = selectedSessoions.current.indexOf(resultObjIndex);
      selectedSessoions.current.splice(objIndex, 1);
      totalPrice.current -= price;
    }
  };

  const nextPageHandler = (session: ResultData[], totalPrice: number) => {
    const sessions = session.map((dataObj: ResultData) => dataObj.timeArray);
    props.onNextPage(sessions, totalPrice);
  };

  if (error) return <Error errorText={error} />;
  if (!dropdownData) return <Loading />;

  return (
    <main className={styles.mainContent}>
      <div className={styles.topSection}>
        <Dropdown
          optionArray={dropdownData}
          onSelectedDay={selectedDayHandler}
          activeDay={activeDay.day}
        />
        <Button text={props.firstScheduleCta} onClick={nearestFreeTime} />
      </div>
      <hr className={styles.hr} />
      <div>
        {session ? (
          <div className={styles.bottomSection}>
            {session.map((session, index) => (
              <SessionTime
                booked={session.booked}
                key={index}
                available={session.available}
                onSelectHandler={selectHandler}
                time={session.text}
                selectedSessoions={selectedSessoions.current}
                activeDay={activeDay}
              />
            ))}
          </div>
        ) : (
          <div className={styles.goToMeeting}>
            <div className={styles.errroText}>
              متاستفانه برای امروز جلسه ای وجود ندارد
            </div>
            <Button text={props.firstScheduleCta} onClick={nearestFreeTime} />
          </div>
        )}
        <hr className={styles.hr} />
        <PurchaseSection
          sessionPrice={price}
          totalPrice={totalPrice.current}
          onButtonClick={() =>
            nextPageHandler(selectedSessoions.current, totalPrice.current)
          }
        />
      </div>
    </main>
  );
};

export default SequencingTable;
