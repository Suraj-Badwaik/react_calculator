import React from "react";
import styles from "../styles/buttons.module.css";
import {
  FaPlus,
  FaMinus,
  FaTimes,
  FaDivide,
} from "react-icons/fa";

const iconMap = {
  "+": <FaPlus />,
  "-": <FaMinus />,
  "*": <FaTimes />,
  "/": <FaDivide />,
};

const OperatorButton = ({
  value,
  activeOperator,
  onClick,
}) => {
  return (
    <button
      className={`${styles.operatorBtn} ${
        activeOperator === value ? styles.active : ""
      }`}
      onClick={() => onClick(value)}
    >
      {iconMap[value]}
    </button>
  );
};

export default OperatorButton;