import { useState } from "react";

type ToggleTuple = readonly [value: boolean, toggleValue: () => void];

const useToggle = (initialValue: boolean): ToggleTuple => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => setValue(!value);
  // here, we freeze the array to a tuple
  return [value, toggleValue] as const;
};

export default useToggle;
