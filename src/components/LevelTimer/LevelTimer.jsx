import { useState, useEffect } from 'react';
import './LevelTimer.scss';

export default function LevelTimer({ initialTime, onFinish, isCounting, setIsCounting, cancelTimer }) {
  const [timeLeft, setTimeLeft] = useState(initialTime * 60);

  useEffect(() => {
    setTimeLeft(initialTime * 60);
  }, [initialTime]);

  useEffect(() => {
    let timer;
    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      onFinish();
    }
    return () => clearInterval(timer);
  }, [isCounting, timeLeft, onFinish]);

  const startTimer = () => setIsCounting(true);
  const stopTimer = () => setIsCounting(false);

 

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <div className="timer__clock">{formatTime(timeLeft)}</div>
      <div className="timer__buttons">
        {!isCounting && <button className="timer__start" onClick={startTimer}>Start Adventure</button>}
        {isCounting && <button className="timer__stop" onClick={stopTimer}>Stop Adventure</button>}
        <button className="timer__cancel" onClick={cancelTimer}>Return to Tavern</button>
      </div>
    </div>
  );
}
