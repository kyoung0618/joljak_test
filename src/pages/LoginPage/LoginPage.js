// pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const SERVER = 'http://52.64.14.111:8000';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log('폼 내용 확인:', form);
    const url = isLogin ? `${SERVER}/users/login/` : `${SERVER}/users/register/`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log('응답 상태:', res.status);
       console.log('응답 본문:', data);
      if (res.ok) {
        const { token, user } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', form.username); // 백엔드 응답에 user 미포함 → form.username 사용
        navigate('/dashboard');
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('서버 요청 중 에러 발생');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isLogin ? '로그인' : '회원가입'}</h2>
        <input type="text" name="username" placeholder="아이디" onChange={handleChange} />
        {!isLogin && <input type="email" name="email" placeholder="이메일" onChange={handleChange} />}
        <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} />
        <button className="btn" onClick={handleSubmit}>
          {isLogin ? '로그인' : '회원가입'}
        </button>
        <div className="toggle">
          {isLogin ? '계정이 없으신가요? ' : '이미 계정이 있으신가요? '}
          <span className="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? '회원가입' : '로그인'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;