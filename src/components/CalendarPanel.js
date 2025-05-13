import React from 'react';

function CalendarPanel({ calendarData }) {
  return (
    <div className="calendar-panel">
      <h3>📅 집중 요약 캘린더</h3>
      <ul>
        {calendarData.map((entry, index) => (
          <li key={index}>
            {entry.date}: {entry.score}점, {entry.studyTime}분, {entry.place}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarPanel;
