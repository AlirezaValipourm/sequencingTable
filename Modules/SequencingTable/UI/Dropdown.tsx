import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "../styles/Dropdown.module.css";
import { Day, DropdownProps } from "../interface/interface";
import calendar from "../assets/calendar.svg";
const Dropdown = (props: DropdownProps): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState<any>(false);
  const dropdownToggle = () => {
    setOpen(!open);
  };

  const onOptionClick = (day: any) => {
    setToday(day);
    props.onSelectedDay(day);
  };

  useEffect(() => {
    const todayString = props.optionArray.find(
      (day: Day) => day.day === props.activeDay
    );

    setToday(todayString);
  }, [props.activeDay]);

  return (
    <div className={styles.dropdownHolder}>
      <div
        className={`${styles.dropdown} ${styles.dropdownHidden}`}
        onClick={dropdownToggle}
      >
        <div className={styles.dropdownButton}>
          <span className={styles.dropdownImage}>
            <Image src={calendar} width={"100%"} height={"100%"} />
          </span>
          <span>{today.dayInString}</span>
          <span className={styles.arrow}>&#9660;</span>
        </div>
      </div>
      <div className={styles.dropdown} onClick={dropdownToggle}>
        <div className={styles.dropdownButton}>
          <span className={styles.dropdownImage}>
            <Image src={calendar} width={"100%"} height={"100%"} />
          </span>
          <span>{today.dayInString}</span>
          <span className={styles.arrow}>&#9660;</span>
        </div>

        {open && (
          <div className={styles.options}>
            <hr />
            {props.optionArray.map((day: Day, index: number) => (
              <div
                className={styles.dropdownOptions}
                onClick={() => onOptionClick(day)}
                key={index}
              >
                {day.dayInString}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
