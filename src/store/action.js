import {
  ADD_TO_COUNTER,
  COUNTER_DECREMENT,
  COUNTER_INCREMENT,
  DIVIDE_COUNTER,
  MULTIPLY_TO_COUNTER,
  SUBSTRACT_FROM_COUNTER,
} from "./action.types";

export const add = () => ({ type: COUNTER_INCREMENT });
export const substract = () => ({ type: COUNTER_DECREMENT });
export const addToCounter = () => ({ type: ADD_TO_COUNTER });
export const subFromCounter = () => ({ type: SUBSTRACT_FROM_COUNTER });
export const MultiToCounter = () => ({ type: MULTIPLY_TO_COUNTER });
export const divideCounter = () => ({ type: DIVIDE_COUNTER });
