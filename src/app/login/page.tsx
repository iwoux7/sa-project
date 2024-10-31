'use client';
import { useState } from 'react';
import Link from 'next/link';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate Email
    if (!formData.email) {
      newErrors.email = 'กรุณากรอกอีเมล';
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'กรุณากรอกอีเมลให้ถูกต้อง';
    }

    // Validate Password
    if (!formData.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    } else if (formData.password.length < 6) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: undefined}));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login:', formData);
      // Proceed with login
    }
  };

  return (
    <div className="blue-bg">
      <div className="login-card">
        <h1 className="login-title">เข้าสู่ระบบ</h1>
        
        <form onSubmit={handleSubmit}>
          <div className='text-black'>
            <label>อีเมล<span style={{ color: '#FF0000' }}>*</span></label>
            <input
              type="email"
              placeholder="อีเมล"
              className={`login-input ${errors.email ? 'border-red-500' : ''}`}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className='mt-2 mb-2 text-black'>
            <label>รหัสผ่าน<span style={{ color: '#FF0000' }}>*</span></label>
            <input
              type="password"
              placeholder="รหัสผ่าน"
              className={`login-input ${errors.password ? 'border-red-500' : ''}`}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="button-container-login">
            <button type="submit" className="button">
              <a href='/home'>
              เข้าสู่ระบบ
              </a>
            </button>
          </div>

          <div className="text-center mt-4">
            <span>ไม่เคยมีบัญชีกับเรามาก่อน? </span> 
            <Link href="/register" className="no-account">
              <u>ลงทะเบียนที่นี่</u>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}