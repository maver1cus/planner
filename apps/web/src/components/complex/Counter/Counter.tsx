import { useState } from "react";

import styles from './Counter.module.scss';
import classNames from "*.scss";
export const Counter = () => {
  const [count, setCount] = useState<number>(0)

  const increment = () => {
    setCount(count + 1);
  }
  const decrement = () => {
    setCount(count - 1);
  }

  return (
    <div className={styles.btn}>
      <h1>{count}</h1>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
};
