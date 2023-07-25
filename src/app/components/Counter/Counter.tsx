import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { decrement, increment, incrementByAmount, selectCount } from "@app/store/slices/counterSlice";
import { Button, Input } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Counter.module.scss";

export function Counter() {
  console.log("Counter render");
  const count = useSelector(selectCount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <>
      <div className={styles.row}>
        <Button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
          icon={<MinusOutlined />}
          type="primary"
        />
        <span className={styles.value}>{count}</span>

        <Button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          icon={<PlusOutlined />}
          type="primary"
        />
      </div>
      <div className={styles.row}>
        <Input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <Button className={styles.button} onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>
          Add Amount
        </Button>
      </div>
    </>
  );
}
