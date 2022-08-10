import React from "react";
import styles from "./Button.module.css";

interface IButton {
  text: String,
  loader?: Boolean,
  onClick: () => void;
}

const Button = ({ text, onClick, loader }: IButton) => {
  return (
    <div className={styles.button} onClick={onClick}>
      {loader && <img src="/loader.svg" />}
      <span>{text}</span>
    </div>
  );
};

export default Button;
