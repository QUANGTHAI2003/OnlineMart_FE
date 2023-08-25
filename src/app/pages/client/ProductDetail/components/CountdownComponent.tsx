import { useCountdown } from "@app/hooks";

const CountdownComponent = () => {
  const targetDate = new Date("Aug 30, 2023 10:30:00");
  const countdown = useCountdown(targetDate);
  return (
    <div className="time">
      <span className="colon">{countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours}</span>
      <span className="colon">{countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes}</span>
      <span>{countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}</span>
    </div>
  );
};

export default CountdownComponent;
