import React from "react";

import styles from "./Layout.module.css";

interface ILayout {
  children: JSX.Element
}

const Layout = ({ children }: ILayout) => {
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
