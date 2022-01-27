import React from "react";
import styles from "../styles/Loading.module.css";
import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";

const Loading = () => {
  const override = css`
    display: block;
    margin: 10% auto;
    border-color: red;
  `;

  return (
    <div className={styles.loading}>
      <PuffLoader size={150} css={override} />
    </div>
  );
};

export default Loading;
