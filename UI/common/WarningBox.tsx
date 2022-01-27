import Image from "next/image";
import React from "react";
import styles from "../../styles/WarningBox.module.css";
import { WarningBoxProps } from "../../interface/interface";
import clock from "../../assets/images/clock.png";
const WarningBox = (props: WarningBoxProps) => {
  return (
    <div className={styles.warningBox}>
      <div className={styles.iconHolder}>
        <Image className={styles.icon} src={clock} />
      </div>
      <h4 className={styles.text}>{props.text}</h4>
    </div>
  );
};

export default WarningBox;
