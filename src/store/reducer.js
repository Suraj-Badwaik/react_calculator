import {
  ADD_TO_COUNTER,
  COUNTER_DECREMENT,
  COUNTER_INCREMENT,
  DIVIDE_COUNTER,
  MULTIPLY_TO_COUNTER,
  SUBSTRACT_FROM_COUNTER,
} from "./action.types";


export const reducer = (state, action) => {
  
  let uservalue = Number(JSON.parse(localStorage.getItem('input')));
  console.log('uservalue:', uservalue)
  
  switch (action.type) {
    case COUNTER_INCREMENT: {
      state.count++;
      return { ...state };
    }
    case COUNTER_DECREMENT: {
      state.count--;
      return { ...state };
    }
    case ADD_TO_COUNTER: {
        state.count += uservalue;
        return {...state}
    }
    case SUBSTRACT_FROM_COUNTER:{
        state.count -= uservalue;
        return {...state
        }
    }
    case MULTIPLY_TO_COUNTER:{
        state.count = state.count * uservalue;
        return {...state}
    }
    case DIVIDE_COUNTER:{
        state.count = state.count / uservalue;
        return {...state}
    }
    default: {
      return state;
    }
  }
};
