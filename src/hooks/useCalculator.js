import { useCallback, useState } from "react";
import {
  appendNumber as appendNumberUtil,
  appendDecimal as appendDecimalUtil,
  backspace as backspaceUtil,
  calculate,
  decrement as decrementUtil,
  increment as incrementUtil,
  percentage as percentageUtil,
  toggleSign as toggleSignUtil,
} from "../utils/calculator";

const useCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState("");
  const [waitingForNextValue, setWaitingForNextValue] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);
  const [history, setHistory] = useState("");

  // -------------------------
  // Numbers
  // -------------------------

  const appendNumber = useCallback(
    (num) => {
      setDisplay((prev) =>
        appendNumberUtil(prev, num, waitingForNextValue, justCalculated),
      );

      if (waitingForNextValue) setWaitingForNextValue(false);

      if (justCalculated) setJustCalculated(false);
    },
    [waitingForNextValue, justCalculated],
  );

  // -------------------------

  const appendDecimal = useCallback(() => {
    setDisplay((prev) =>
      appendDecimalUtil(prev, waitingForNextValue, justCalculated),
    );

    if (waitingForNextValue) setWaitingForNextValue(false);

    if (justCalculated) setJustCalculated(false);
  }, [waitingForNextValue, justCalculated]);

  // -------------------------

  const clearCalculator = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator("");
    setHistory("");
    setWaitingForNextValue(false);
    setJustCalculated(false);
  }, []);

  // -------------------------

  const backspace = useCallback(() => {
    setDisplay((prev) =>
      backspaceUtil(prev, waitingForNextValue, justCalculated),
    );
  }, [waitingForNextValue, justCalculated]);

  // -------------------------

  const toggleSign = () => setDisplay(toggleSignUtil(display));

  const percentage = () => setDisplay(percentageUtil(display));

  const increment = () => setDisplay(incrementUtil(display));

  const decrement = () => setDisplay(decrementUtil(display));

  // -------------------------
  // Operator
  // -------------------------

  const handleOperator = useCallback(
    (nextOperator) => {
      const inputValue = Number(display);

      if (waitingForNextValue) {
        setOperator(nextOperator);
        setHistory(`${previousValue} ${nextOperator}`);
        return;
      }

      if (previousValue === null) {
        setPreviousValue(inputValue);
      } else {
        const result = calculate(previousValue, inputValue, operator);

        setDisplay(String(result));
        setPreviousValue(result);
      }

      setOperator(nextOperator);
      setWaitingForNextValue(true);
      setJustCalculated(false);

      setHistory(`${previousValue ?? inputValue} ${nextOperator}`);
    },
    [display, previousValue, operator, waitingForNextValue],
  );

  // -------------------------
  // Equal
  // -------------------------

  const handleEqual = useCallback(() => {
    if (previousValue === null || operator === "" || waitingForNextValue) {
      return;
    }

    const result = calculate(previousValue, display, operator);

    setHistory(`${previousValue} ${operator} ${display} =`);

    setDisplay(String(result));

    setPreviousValue(null);
    setOperator("");
    setWaitingForNextValue(false);
    setJustCalculated(true);
  }, [display, previousValue, operator, waitingForNextValue]);

  return {
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
  };
};

export default useCalculator;
