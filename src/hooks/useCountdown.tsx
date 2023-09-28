import { useCallback, useEffect, useState } from "react";

const useCountdown = (targetDate: Date) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const updateCountdown = useCallback(async () => {
    try {
      // const response = await fetch("http://worldtimeapi.org/api/ip");
      // const { unixtime } = await response.json();
      const unixtime = new Date().getTime();

      const now = unixtime * 1000;
      const distance = targetDate.getTime() - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    } catch (error) {
      console.error("Failed to fetch current time:", error);
    }
  }, [targetDate]);

  useEffect(() => {
    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [updateCountdown]);

  return countdown;
};

export default useCountdown;
