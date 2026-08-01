import React from "react";
import styles from "../styles/buttons.module.css";

const NumberButton = ({
  value,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`${styles.numberBtn} ${className}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default NumberButton;