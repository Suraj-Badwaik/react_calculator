import {legacy_createStore} from "redux";
import { reducer } from "./reducer";

let intiailState = {
  count: 0,
  value: 10
};
export const store = legacy_createStore(reducer,intiailState);

