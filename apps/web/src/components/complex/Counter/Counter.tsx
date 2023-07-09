import { type FC, useState } from 'react'

import styles from './Counter.module.scss'

export const Counter: FC = () => {
  const [count, setCount] = useState<number>(0)

  const increment = (): void => {
    setCount(count + 1)
  }
  const decrement = (): void => {
    setCount(count - 1)
  }

  return (
    <div className={styles.btn}>
      <h1>{count}</h1>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  )
}
