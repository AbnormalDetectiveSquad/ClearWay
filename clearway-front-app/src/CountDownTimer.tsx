import React, { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0); // 남은 시간 (초)

  useEffect(() => {
    const calculateNextFiveMinuteMark = () => {
      const now = new Date();
      const currentMinutes = now.getMinutes();
      const nextMark = Math.ceil((currentMinutes + 1) / 5) * 5; // 다음 5분 경계
      const nextFiveMinuteMark = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        nextMark,
        0
      );
      return (nextFiveMinuteMark.getTime() - now.getTime()) / 1000; // 초 단위로 반환
    };

    const startCountdown = () => {
      const secondsUntilNextMark = calculateNextFiveMinuteMark();
      setTimeLeft(Math.ceil(secondsUntilNextMark));
    };

    startCountdown();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          startCountdown(); // 카운트가 0이 되면 다시 시작
          return calculateNextFiveMinuteMark(); // 초기화 후 새 카운트
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Data Fetching :</h2>
      <div
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          margin: "20px 0",
          color: timeLeft > 0 ? "green" : "red",
        }}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default CountdownTimer;