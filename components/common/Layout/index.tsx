import React from "react";
import styles from "./Layout.module.css";

const Layout = ({ children }: any) => {
  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        <img src="/Logo.svg" className={styles.logo} alt="Log" />
        {children}
      </div>
    </div>
  );
};

export default Layout;
