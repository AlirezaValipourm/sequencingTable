import React from "react";
import { ButtonProps } from "../interface/interface";
import styles from "../styles/Button.module.css";
const Button = (props: ButtonProps) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.innerText}>{props.text} &#8592; </span>
    </button>
  );
};

export default Button;
