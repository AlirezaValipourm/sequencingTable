import React from "react";
import styles from "../styles/Error.module.css";
import { ErrorProps } from "../interface/interface";

const Error = (props: ErrorProps) => {
  return <div className={styles.errorHolder}>{`${props.errorText}`}</div>;
};

export default Error;
