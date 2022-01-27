import Link from "next/link";
import React from "react";
import { HeaderProps } from "../../interface/interface";
import styles from "../../styles/Header.module.css";
const Header = (props: HeaderProps): any => {
  return (
    <div className={styles.container}>
      <ul className={styles.headerMenu}>
        <li>
          <Link href="#">
            <a>MV360</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a> ورود / ثبت نام</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>دوره ها</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>تعرفه ها</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>وبلاگ</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
