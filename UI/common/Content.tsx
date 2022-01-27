import React from "react";
import styles from "../../styles/Content.module.css";
import { ContentProps } from "../../interface/interface";
const Content = (props: ContentProps) => {
  return (
    <main className={styles.contentBox}>
      <div className={styles.mainContent}>{props.children}</div>
    </main>
  );
};

export default Content;
