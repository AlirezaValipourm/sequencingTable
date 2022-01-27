import React, { ReactElement } from "react";
import Image from "next/image";
import styles from "../../styles/Footer.module.css";
import { FooterProps } from "../../interface/interface";
const logo = require("../../assets/images/logo.png");
const Footer = (props: FooterProps): ReactElement => {
  return (
    <footer className={styles.footerBox}>
      <div className={styles.mainFooter}>
        <div className={styles.infoBox}>
          <Image
            src={logo}
            width={100}
            height={50}
            alt="Logo Image"
            className={styles.logo}
          />
          <p>این وبسایت زیرمجموعه گروه نرم افزاری تاد می باشد.</p>
        </div>
        <hr />
        <div className={styles.infoBox}>
          <b className={styles.contactUs}>راه های ارتباطی با ما</b>
          <div className={styles.telegramId}>
            <p>کانال تلگرام</p>
            <span>IRMEAN@</span>
          </div>
          <div className={styles.email}>
            <p>ایمیل</p>
            <span>m.valizadeh@live.com</span>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        حقوق مادی و معنوی این وبسایت متعلق به مهدی ولی زاده است.
      </div>
    </footer>
  );
};

export default Footer;
