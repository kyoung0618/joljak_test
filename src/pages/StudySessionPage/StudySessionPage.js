// pages/StudySessionPage.js
import React, { useEffect, useState } from 'react';
import './StudySessionPage.css';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function StudySessionPage() {
  const [startTime] = useState(Date.now());
  const [studyTime, setStudyTime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [focusData, setFocusData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (isResting) {
        setRestTime((prev) => prev + 1);
      } else {
        setStudyTime((prev) => {
          const newTime = prev + 1;

          // 10분 단위 집중도 기록
          if (newTime % 600 === 0) {
            const focusScore = Math.floor(Math.random() * 50) + 50; // 50~100 랜덤
            setFocusData((prevData) => [
              ...prevData,
              {
                time: newTime,
                score: isResting ? 0 : Math.floor(Math.random() * 50) + 50,
                isRest: isResting,
              },
            ]);
          }

          return newTime;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isResting]);

  const toggleRest = () => {
    setIsResting((prev) => !prev);
  };

  const handleEnd = () => {
    navigate('/dashboard');
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const chartData = {
    labels: focusData.map((d) => formatTime(d.time)),
    datasets: [
      {
        label: '공부 집중도',
        data: focusData.map((d) => d.isRest ? null : d.score),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: '휴식 시간',
        data: focusData.map((d) => d.isRest ? 10 : null), // 휴식은 10점만 표시해서 시각화
        backgroundColor: 'rgba(160, 160, 160, 0.5)',
      },
    ],
  };

  return (
    <div className="study-session">
      <h1>{isResting ? '휴식 중입니다.' : '공부 중입니다.'}</h1>
      <p>공부 시작 시간: {new Date(startTime).toLocaleTimeString()}</p>
      <p>누적 공부 시간: {formatTime(studyTime)}</p>
      <p>누적 휴식 시간: {formatTime(restTime)}</p>
      <button className="rest-btn" onClick={toggleRest}>
        {isResting ? '휴식 끝' : '휴식 시작'}
      </button>
      <button className="end-btn" onClick={handleEnd}>
        공부 끝
      </button>

      {/* 그래프 */}
      <div style={{ marginTop: '40px' }}>
        <h2>📊 집중도 변화</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default StudySessionPage;
