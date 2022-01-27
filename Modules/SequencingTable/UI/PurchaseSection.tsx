import React from "react";
import styles from "../styles/PurchaseSection.module.css";
import { PurchaseSectionProps } from "../interface/interface";
import Button from "./Button";
const PurchaseSection = (props: PurchaseSectionProps) => {
  return (
    <div className={styles.mainBox}>
      <div className={styles.sessionPrice}>
        جلسه ای {props.sessionPrice} تومان
      </div>
      <div className={styles.bottomBox}>
        <div>
          <span>مبلغ قابل پرداخت : </span>
          <span className={styles.boldText}> {props.totalPrice} تومان</span>
        </div>

        <Button text="مرحله بعد" onClick={() => props.onButtonClick()} />
      </div>
    </div>
  );
};

export default PurchaseSection;
