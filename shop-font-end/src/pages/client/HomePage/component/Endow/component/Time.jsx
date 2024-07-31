// src/Timer.js
import React, { useState, useEffect } from "react";

const Timer = ({
  initialDays = 0,
  initialHours = 0,
  initialMinutes = 0,
  initialSeconds = 0,
}) => {
  const [days, setDays] = useState(initialDays);
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            if (days > 0) {
              setDays(days - 1);
              setHours(23);
              setMinutes(59);
              setSeconds(59);
            }
          }
        }
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [days, hours, minutes, seconds]);

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2   rounded-lg text-[12px] sm:text-[16px] text-black font-700">
      <div className="bg-white text-black px-2 py-1 rounded-lg">
        {days < 10 ? `0${days}` : days}
      </div>
      <div>:</div>
      <div className="bg-white text-black px-2 py-1 rounded-lg">
        {hours < 10 ? `0${hours}` : hours}
      </div>
      <div>:</div>
      <div className="bg-white text-black px-2 py-1 rounded-lg">
        {minutes < 10 ? `0${minutes}` : minutes}
      </div>
      <div>:</div>
      <div className="bg-white text-black px-2 py-1 rounded-lg">
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};

export default Timer;
