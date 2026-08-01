import React from "react";
import styles from "../styles/display.module.css";

const Display = ({ history, display }) => {
  return (
    <>
      <div className={styles.history}>
        {history || "\u00A0"}
      </div>

      <div className={styles.display}>
        {display}
      </div>
    </>
  );
};

export default Display;