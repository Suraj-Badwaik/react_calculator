import {
  ADD_TO_COUNTER,
  COUNTER_DECREMENT,
  COUNTER_INCREMENT,
  DIVIDE_COUNTER,
  MULTIPLY_TO_COUNTER,
  SUBSTRACT_FROM_COUNTER,
} from "./action.types";

export const reducer = (state, action) => {
    
//   console.log(state,action);
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
        // state.count += state.value;
        return {...state}
    }
    case SUBSTRACT_FROM_COUNTER:{
        return {...state
        }
    }
    case MULTIPLY_TO_COUNTER:{
        return {...state}
    }
    case DIVIDE_COUNTER:{
        return {...state}
    }
    default: {
      return state;
    }
  }
};
