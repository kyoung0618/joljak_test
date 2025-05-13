import React from 'react';

function Sidebar({ user, recentFocus }) {
  return (
    <div className="sidebar">
      <h2>{user.name} 님</h2>
      <div className="focus-summary">
        <h3>최근 집중 정보</h3>
        <p>점수: {recentFocus.score}점</p>
        <p>공부 시간: {recentFocus.studyTime}분</p>
        <p>날짜: {recentFocus.date}</p>
        <p>장소: {recentFocus.place}</p>
      </div>
      <button className="start-button">공부 시작</button>
    </div>
  );
}

export default Sidebar;
