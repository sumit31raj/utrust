import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, onClick, loader }: any) => {
  return (
    <div className={styles.button} onClick={onClick}>
      {loader && <img src="/loader.svg" />}
      <span>{text}</span>
    </div>
  );
};

export default Button;
