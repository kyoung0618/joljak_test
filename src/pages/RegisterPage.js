// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SERVER = 'http://13.236.148.165:8000'; 

function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await fetch(`${SERVER}/users/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate('/');
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('서버 요청 중 에러 발생');
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input type="text" name="username" placeholder="아이디" onChange={handleChange} />
      <input type="email" name="email" placeholder="이메일" onChange={handleChange} />
      <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} />
      <button onClick={handleRegister}>회원가입</button>
      <p>
        이미 계정이 있으신가요? <a href="/">로그인</a>
      </p>
    </div>
  );
}

export default RegisterPage;
