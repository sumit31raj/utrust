import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, onClick }: any) => {
  return (
    <div className={styles.button} onClick={onClick}>
      {text}
    </div>
  );
};

export default Button;
