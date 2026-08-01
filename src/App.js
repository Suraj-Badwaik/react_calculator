import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import {
  FaPlus,
  FaMinus,
  FaTimes,
  FaDivide,
  FaEquals,
  FaBackspace,
} from "react-icons/fa";

const App = () => {
  const [display, setDisplay] = useState("0");
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState("");
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);
  const [history, setHistory] = useState("");

  // =========================
  // Number Click
  // =========================

  const appendNumber = (num) => {
    if (waitingForSecondValue) {
      setDisplay(String(num));
      setWaitingForSecondValue(false);
      return;
    }

    setDisplay((prev) => (prev === "0" ? String(num) : prev + String(num)));
  };

  // =========================
  // Decimal
  // =========================

  const appendDecimal = () => {
    if (waitingForSecondValue) {
      setDisplay("0.");
      setWaitingForSecondValue(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // =========================
  // Clear
  // =========================

  const clearCalculator = () => {
    setDisplay("0");
    setFirstValue(null);
    setOperator("");
    setHistory("");
    setWaitingForSecondValue(false);
  };

  // =========================
  // Backspace
  // =========================

  const backspace = () => {
    if (waitingForSecondValue) return;

    if (display.length <= 1) {
      setDisplay("0");
      return;
    }

    setDisplay(display.slice(0, -1));
  };

  // =========================
  // Toggle Sign
  // =========================

  const toggleSign = () => {
    setDisplay(String(Number(display) * -1));
  };

  // =========================
  // Percentage
  // =========================

  const percentage = () => {
    setDisplay(String(Number(display) / 100));
  };

  // =========================
  // Increment
  // =========================

  const increment = () => {
    setDisplay(String(Number(display) + 1));
  };

  // =========================
  // Decrement
  // =========================

  const decrement = () => {
    setDisplay(String(Number(display) - 1));
  };

  // =========================
  // Actual Calculation
  // =========================

  const calculate = (first, second, op) => {
    first = Number(first);
    second = Number(second);

    let result = 0;

    switch (op) {
      case "+":
        result = first + second;
        break;

      case "-":
        result = first - second;
        break;

      case "*":
        result = first * second;
        break;

      case "/":
        if (second === 0) return "Error";
        result = first / second;
        break;

      default:
        result = second;
    }

    return Number(result.toFixed(8));
  };

  // =========================
  // Operator Click
  // =========================

  const handleOperator = (nextOperator) => {
    const inputValue = Number(display);

    // If operator is pressed twice, just change the operator
    if (waitingForSecondValue) {
      setOperator(nextOperator);
      setHistory(`${firstValue} ${nextOperator}`);
      return;
    }

    if (firstValue === null) {
      setFirstValue(inputValue);
    } else {
      const result = calculate(firstValue, inputValue, operator);

      setDisplay(String(result));
      setFirstValue(result);
    }

    setOperator(nextOperator);
    setWaitingForSecondValue(true);
    setHistory(`${firstValue ?? inputValue} ${nextOperator}`);
  };

  // =========================
  // Equal
  // =========================

  const handleEqual = () => {
    if (firstValue === null || operator === "" || waitingForSecondValue) {
      return;
    }

    const result = calculate(firstValue, display, operator);

    setHistory(`${firstValue} ${operator} ${display} =`);

    setDisplay(String(result));

    setFirstValue(result);
    setOperator("");
    setWaitingForSecondValue(true);
  };

  // =========================
  // Keyboard Support
  // =========================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        appendNumber(e.key);
      }

      switch (e.key) {
        case ".":
          appendDecimal();
          break;

        case "+":
          handleOperator("+");
          break;

        case "-":
          handleOperator("-");
          break;

        case "*":
          handleOperator("*");
          break;

        case "/":
          e.preventDefault();
          handleOperator("/");
          break;

        case "Enter":
        case "=":
          e.preventDefault();
          handleEqual();
          break;

        case "Backspace":
          backspace();
          break;

        case "Escape":
          clearCalculator();
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, firstValue, operator, waitingForSecondValue]);

  // =========================
  // Number Buttons
  // =========================

  const numberButtons = [7, 8, 9, 4, 5, 6, 1, 2, 3];

  const renderNumberButton = (num) => (
    <button
      key={num}
      className={styles.numberBtn}
      onClick={() => appendNumber(num)}
    >
      {num}
    </button>
  );

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
        <h2 className={styles.heading}>React Calculator</h2>

        <div className={styles.history}>{history || " "}</div>

        <div className={styles.display}>{display}</div>

        <div className={styles.body}>
          <div className={styles.leftSection}>
            <div className={styles.utilityRow}>
              <button className={styles.utilityBtn} onClick={clearCalculator}>
                C
              </button>

              <button className={styles.utilityBtn} onClick={backspace}>
                <FaBackspace />
              </button>

              <button className={styles.utilityBtn} onClick={toggleSign}>
                ±
              </button>

              <button className={styles.utilityBtn} onClick={percentage}>
                %
              </button>
            </div>

            <div className={styles.numberGrid}>
              {numberButtons.map(renderNumberButton)}

              <button
                className={styles.numberBtn}
                onClick={() => appendNumber(0)}
              >
                0
              </button>

              <button className={styles.numberBtn} onClick={appendDecimal}>
                .
              </button>

              <button className={styles.equalBtn} onClick={handleEqual}>
                <FaEquals />
              </button>
            </div>

            <div className={styles.incrementRow}>
              <button className={styles.incrementBtn} onClick={increment}>
                +1
              </button>

              <button className={styles.incrementBtn} onClick={decrement}>
                -1
              </button>
            </div>
          </div>

          <div className={styles.operatorColumn}>
            <button
              className={`${styles.operatorBtn} ${
                operator === "/" ? styles.active : ""
              }`}
              onClick={() => handleOperator("/")}
            >
              <FaDivide />
            </button>

            <button
              className={`${styles.operatorBtn} ${
                operator === "*" ? styles.active : ""
              }`}
              onClick={() => handleOperator("*")}
            >
              <FaTimes />
            </button>

            <button
              className={`${styles.operatorBtn} ${
                operator === "-" ? styles.active : ""
              }`}
              onClick={() => handleOperator("-")}
            >
              <FaMinus />
            </button>

            <button
              className={`${styles.operatorBtn} ${
                operator === "+" ? styles.active : ""
              }`}
              onClick={() => handleOperator("+")}
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
