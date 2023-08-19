import { useCountdown } from "@app/hooks";
import React from "react";

const CountdownComponent = () => {
  const targetDate = new Date("Aug 30, 2023 10:30:00");
  const countdown = useCountdown(targetDate);
  return (
    <div className="count_down">
      <span>{countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours}</span>
      <b>:</b>
      <span className="min">{countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes}</span>
      <b>:</b>
      <span>{countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}</span>
    </div>
  );
};

export default React.memo(CountdownComponent);
