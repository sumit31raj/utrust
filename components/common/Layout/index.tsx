import React from "react";
import styles from "./Layout.module.css";

const Layout = ({ children }: any) => {
  return (
    <div className={styles.layout}>
      <img src="/Logo.svg" className={styles.logo} alt="Log" />
      {children}
    </div>
  );
};

export default Layout;
