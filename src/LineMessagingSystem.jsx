import React, { useState } from 'react';

const LineMessagingSystem = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('00:00');
  const [group, setGroup] = useState('小幫手');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
  if (!date || !time || !message) {
    alert('請填寫完整資料');
    return;
  }

  fetch('https://send-line-1.onrender.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date, time, group, message }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert('✅ 已送出訊息給 LINE！');
      } else {
        alert('❌ 發送失敗');
      }
    })
    .catch((err) => {
      console.error(err);
      alert('❌ 發送失敗：無法連線後端');
    });
};



  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 700, margin: '0 auto' }}>
      <h2>📢 Line訊息發送系統</h2>
      
      <label>選擇日期：</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} /><br /><br />

      <label>選擇時間：</label>
      <input type="time" value={time} onChange={e => setTime(e.target.value)} /><br /><br />

      <label>選擇群組：</label>
      <select value={group} onChange={e => setGroup(e.target.value)}>
        <option value="小幫手">小幫手</option>
        <option value="Anna群">Anna群</option>
        <option value="雅涵群">雅涵群</option>
      </select><br /><br />

      <label>輸入訊息：</label><br />
      <textarea rows="4" cols="50" value={message} onChange={e => setMessage(e.target.value)} /><br /><br />

      <button onClick={handleSubmit}>✅ 送出排程</button>
    </div>
  );
};

export default LineMessagingSystem;
