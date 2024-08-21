import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    minutes: 1,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { minutes: prevTime.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-16 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 mb-5 text-center border-2 border-[#0a8f43] w-96 h-56 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#0a8f43]">
            موعد بدء الانتخابات
          </h2>
          <div className="flex flex-col justify-center items-center bg-[#0a8f43] text-white rounded-lg p-4 w-64 h-24">
            <div className="text-4xl font-bold">
              {timeLeft.minutes.toString().padStart(2, "0")}:
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-sm mt-2 mr-1">ثانية: دقيقة </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
