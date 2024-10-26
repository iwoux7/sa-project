'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    comfirmPassword: '',
    address: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', formData);
  };

  return (
    <div className="blue-bg">
      <div className="register-card">
        <div className='register-content'>
            <h1 className="login-title">ลงทะเบียน</h1>
            
            <form onSubmit={handleSubmit}>
            <div>
                <label>ชื่อ-นามสกุล</label><label style={{ color: '#FF0000' }}>*</label>
                <input
                type='text'
                placeholder='ชื่อ-นามสกุล'
                className='login-input'
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
            </div>

            <div>
                <label>เบอร์โทร</label><label style={{ color: '#FF0000' }}>*</label>
                <input
                type='tel'
                placeholder='เบอร์โทร'
                className='login-input'
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
            </div>

            <div>
                <label>อีเมล</label><label style={{ color: '#FF0000' }}>*</label>
                <input
                    type='email'
                    placeholder='อีเมล'
                    className='login-input'
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </div>

            <div>
                <label>รหัสผ่าน</label><label style={{ color: '#FF0000' }}>*</label>
                <input
                    type='password'
                    placeholder='รหัสผ่าน'
                    className='login-input'
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
            </div>

            <div>
                <label>ยืนยันรหัสผ่าน</label><label style={{ color: '#FF0000' }}>*</label>
                <input
                    type='password'
                    placeholder='ยืนยันรหัสผ่าน'
                    className='login-input'
                    value={formData.comfirmPassword}
                    onChange={(e) => setFormData({...formData, comfirmPassword: e.target.value})}
                />
            </div>

            <div className='address-forn-input'>
                <label>ที่อยู่</label><label style={{ color: '#FF0000' }}>*</label>
                <textarea
                    // type='text'
                    placeholder='ที่อยู่'
                    className='address-input'
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
            </div>


            <div className="button-container-register">
                <button type="submit" className="login-button">
                ลงทะเบียน
                </button>
                
            </div>

            <div className="text-center mt-4">
                <a>มีบัญชีอยู่แล้ว </a> 
                <a href="#" className="no-account">
                <u>เข้าสู่ระบบที่นี่</u>
                </a>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
}