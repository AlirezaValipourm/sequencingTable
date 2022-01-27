import React from "react";
import { PageTitleProps } from "../../interface/interface";
import styles from "../../styles/PageTitle.module.css";

const PageTitle = (props: PageTitleProps) => {
  return (
    <div>
      <h3 className={styles.title1}>{props.title1}</h3>
      <h4 className={styles.title2}>{props.title2}</h4>
    </div>
  );
};

export default PageTitle;
