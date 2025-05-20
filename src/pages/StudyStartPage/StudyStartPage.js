// pages/StudyStartPage.js
//공부 장소설정 
// src/pages/StartStartPage/StudyStartPage.js
// src/pages/StudyStartPage/StudyStartPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudyStartPage() {
  const [place, setPlace] = useState('');
  const navigate = useNavigate();

  const handleStartStudy = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://52.64.14.111:8000/focus/study-sessions/start/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ place })
      });

      const data = await response.json();
      console.log('서버 응답:', data);

      if (!response.ok) {
        console.warn('응답 실패:', data);
        alert(data?.error || '서버 응답 오류');
        return;
      }

      navigate('/study'); // ✅ 성공 시 공부 중 페이지로 이동
    } catch (err) {
      console.error('공부 시작 실패:', err);
      alert('서버 요청 중 에러 발생');
    }
  };

  return (
    <div>
      <h2>공부 장소 선택</h2>
      {['카페', '도서관', '학교'].map((p) => (
        <button key={p} onClick={() => setPlace(p)} style={{ margin: '10px' }}>
          {p}
        </button>
      ))}

      <div style={{ marginTop: 20 }}>
        <button onClick={handleStartStudy} disabled={!place}>
          📚 공부 시작
        </button>
      </div>
    </div>
  );
}

export default StudyStartPage;
