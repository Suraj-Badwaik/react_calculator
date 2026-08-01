// =======================================
// Basic Arithmetic
// =======================================

export const calculate = (first, second, operator) => {
  first = Number(first);
  second = Number(second);

  let result = 0;

  switch (operator) {
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

// =======================================
// Display Helpers
// =======================================

export const toggleSign = (value) => {
  return String(Number(value) * -1);
};

export const percentage = (value) => {
  return String(Number(value) / 100);
};

export const increment = (value) => {
  return String(Number(value) + 1);
};

export const decrement = (value) => {
  return String(Number(value) - 1);
};

// =======================================
// Input Helpers
// =======================================

export const appendNumber = (
  currentValue,
  number,
  waitingForNextValue,
  justCalculated
) => {
  if (justCalculated || waitingForNextValue) {
    return String(number);
  }

  return currentValue === "0"
    ? String(number)
    : currentValue + String(number);
};

export const appendDecimal = (
  currentValue,
  waitingForNextValue,
  justCalculated
) => {
  if (justCalculated || waitingForNextValue) {
    return "0.";
  }

  if (currentValue.includes(".")) {
    return currentValue;
  }

  return currentValue + ".";
};

export const backspace = (
  currentValue,
  waitingForNextValue,
  justCalculated
) => {
  if (waitingForNextValue || justCalculated) {
    return currentValue;
  }

  if (currentValue.length <= 1) {
    return "0";
  }

  return currentValue.slice(0, -1);
};