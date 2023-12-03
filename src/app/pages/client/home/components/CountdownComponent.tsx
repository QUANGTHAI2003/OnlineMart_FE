import { useCountDown } from "ahooks";
import React from "react";

const CountdownComponent = () => {
  let frameTime = new Date().getHours();
  if (frameTime % 2 === 1 && frameTime < 24) frameTime += 1;
  const [, formattedRes] = useCountDown({
    targetDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${
      frameTime - 1
    }:59:59`,
  });
  const { hours, minutes, seconds } = formattedRes;
  return (
    <div className="count_down">
      <span className="bg-[#0a68ff] rounded px-1 select-none text-white">{hours < 10 ? `0${hours}` : hours}</span>
      <b className="px-0.5">:</b>
      <span className="bg-[#0a68ff] rounded px-1 select-none text-white">{minutes < 10 ? `0${minutes}` : minutes}</span>
      <b className="px-0.5">:</b>
      <span className="bg-[#0a68ff] rounded px-1 select-none text-white">{seconds < 10 ? `0${seconds}` : seconds}</span>
    </div>
  );
};

export default React.memo(CountdownComponent);
