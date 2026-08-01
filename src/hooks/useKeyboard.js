import { useEffect } from "react";

const useKeyboard = ({
  appendNumber,
  appendDecimal,
  handleOperator,
  handleEqual,
  backspace,
  clearCalculator,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Numbers
      if (/^[0-9]$/.test(e.key)) {
        appendNumber(e.key);
        return;
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

        case "=":
        case "Enter":
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

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [
    appendNumber,
    appendDecimal,
    handleOperator,
    handleEqual,
    backspace,
    clearCalculator,
  ]);
};

export default useKeyboard;