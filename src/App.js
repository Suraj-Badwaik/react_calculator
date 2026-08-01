import React from "react";
import layoutStyles from "./styles/calculator.module.css";
import buttonStyles from "./styles/buttons.module.css";

import Display from "./components/Display";
import NumberButton from "./components/NumberButton";
import OperatorButton from "./components/OperatorButton";

import useCalculator from "./hooks/useCalculator";

import { NUMBER_BUTTONS, OPERATOR_BUTTONS } from "./utils/constants";

import { FaEquals, FaBackspace } from "react-icons/fa";
import useKeyboard from "./hooks/useKeyboard";

const App = () => {
  const {
    display,
    history,
    operator,

    appendNumber,
    appendDecimal,

    handleOperator,
    handleEqual,

    clearCalculator,
    backspace,

    toggleSign,
    percentage,

    increment,
    decrement,
  } = useCalculator();

  // =====================================
  // Keyboard Support
  // =====================================

  useKeyboard({
    appendNumber,
    appendDecimal,
    handleOperator,
    handleEqual,
    backspace,
    clearCalculator,
  });

  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.calculator}>
        <h2 className={layoutStyles.heading}>React Calculator</h2>

        <Display history={history} display={display} />

        <div className={layoutStyles.body}>
          {/* Left Section */}
          <div className={layoutStyles.leftSection}>
            {/* Utility Buttons */}
            <div className={layoutStyles.utilityRow}>
              <button
                className={buttonStyles.utilityBtn}
                onClick={clearCalculator}
              >
                C
              </button>

              <button className={buttonStyles.utilityBtn} onClick={backspace}>
                <FaBackspace />
              </button>

              <button className={buttonStyles.utilityBtn} onClick={toggleSign}>
                ±
              </button>

              <button className={buttonStyles.utilityBtn} onClick={percentage}>
                %
              </button>
            </div>

            {/* Number Grid */}
            <div className={layoutStyles.numberGrid}>
              {NUMBER_BUTTONS.map((num) => (
                <NumberButton key={num} value={num} onClick={appendNumber} />
              ))}

              <NumberButton value={0} onClick={appendNumber} />

              <button
                className={buttonStyles.numberBtn}
                onClick={appendDecimal}
              >
                .
              </button>

              <button className={buttonStyles.equalBtn} onClick={handleEqual}>
                <FaEquals />
              </button>
            </div>

            {/* Increment / Decrement */}
            <div className={layoutStyles.incrementRow}>
              <button className={buttonStyles.incrementBtn} onClick={increment}>
                +1
              </button>

              <button className={buttonStyles.incrementBtn} onClick={decrement}>
                -1
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className={layoutStyles.operatorColumn}>
            {OPERATOR_BUTTONS.map((item) => (
              <OperatorButton
                key={item.value}
                value={item.value}
                activeOperator={operator}
                onClick={handleOperator}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
