import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./app.module.css";
import {
  add,
  addToCounter,
  divideCounter,
  MultiToCounter,
  subFromCounter,
  substract,
} from "./store/action";

function App() {
  // let value = useSelector((state) => state.value);
  const [a, setValue] = useState("");
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  // value = +a;
  // console.log('value:', value)

  return (
    <div className={style.App}>
      <h2>React Calculator</h2>
      <h1>{count}</h1>
      <div className={style.firstDiv}>
        <button disabled={count<1} onClick={() => dispatch(substract())}>DECREMENT</button>
        <button onClick={() => dispatch(add())}>INCREMENT</button>
      </div>
      <div className={style.secDiv}>
        <div className={style.secDiv_input}>
          <input type="text" placeholder="Input here" onChange={(e) => setValue(e.target.value)} />
        </div>
        <div className={style.secDiv_btns}>
          <button onClick={() => dispatch(addToCounter)}>Add</button>
          <button onClick={() => dispatch(subFromCounter)}>Multiply</button>
          <button onClick={() => dispatch(MultiToCounter)}>Substract</button>
          <button onClick={() => dispatch(divideCounter)}>Divide</button>
        </div>
      </div>
    </div>
  );
}

export default App;
