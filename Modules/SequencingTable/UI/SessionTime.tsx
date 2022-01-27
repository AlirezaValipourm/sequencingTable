import React, { useState, useEffect } from "react";
import {
  SessionTimeProps,
  SessionData,
  ResultData,
} from "../interface/interface";
import styles from "../styles/SessionTime.module.css";
const SessionTime = (props: SessionTimeProps) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [className, setClassName] = useState<string>();
  useEffect(() => {
    let className = `${styles.sessionTime}`;
    if (selected) className = `${styles.sessionTime} ${styles.active}`;
    if (props.available)
      className = `${styles.sessionTime} ${styles.available}`;
    if (props.booked) className = `${styles.sessionTime}`;
    setClassName(className);
    const sessionObj: ResultData = {
      day: props.activeDay.day,
      selected: selected,
      time: props.time,
      timeArray: [],
    };
    const resultObjIndex = props.selectedSessoions.find(
      (dataObj: ResultData) =>
        dataObj.day === sessionObj.day && dataObj.time === sessionObj.time
    );
    if (resultObjIndex) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [props, selected]);

  const onSelect = (time: string) => {
    if (props.available === true && props.booked === false) {
      setSelected(!selected);
      const sessionData: SessionData = {
        selected: !selected,
        time: time,
      };
      props.onSelectHandler(sessionData);
    }
  };

  return (
    <span className={className} onClick={() => onSelect(props.time)}>
      <span className={styles.inputBox}>
        <input type="checkbox" checked={selected} onChange={() => {}} />
      </span>
      <span className={styles.timeBox}>
        {props.time.split(" ").map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
      </span>
    </span>
  );
};

export default SessionTime;
