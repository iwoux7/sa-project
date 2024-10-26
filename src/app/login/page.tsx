'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', formData);
  };

  return (
    <div className="blue-bg">
      <div className="login-card">
        <h1 className="login-title">เข้าสู่ระบบ</h1>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label>อีเมล</label><label style={{ color: '#FF0000' }}>*</label>
            <input
              type="enail"
              placeholder="อีเมล"
              className="login-input"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label>รหัสผ่าน</label><label style={{ color: '#FF0000' }}>*</label>
            <input
              type="password"
              placeholder="รหัสผ่าน"
              className="login-input"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="button-container-login">
            <button type="submit" className="login-button">
              เข้าสู่ระบบ
            </button>
          </div>

          <div className="text-center mt-4">
            <a>ไม่เคยมีบัญชีกับเรามาก่อน? </a> 
            <a href="#" className="no-account">
             <u>ลงทะเบียนที่นี่</u>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}