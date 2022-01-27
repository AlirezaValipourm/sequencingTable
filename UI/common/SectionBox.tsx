import React from "react";
import { SectionBoxProps } from "../../interface/interface";
import styles from "../../styles/SectionBox.module.css";

const SectionBox = (props: SectionBoxProps) => {
  const className1 = props.active === 1 ? styles.active : styles.deactive;
  const className2 = props.active === 2 ? styles.active : styles.deactive;
  return (
    <div className={styles.sectionBox}>
      <div className={className1}>
        <p>{props.stepOneTitle}</p>
        <div className={styles.bar}></div>
      </div>
      <div className={className2}>
        <p>{props.stepTwoTitle}</p>
        <div className={styles.bar}></div>
      </div>
    </div>
  );
};

export default SectionBox;
