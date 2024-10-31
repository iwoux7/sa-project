'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Modal } from '@/components/Modal';

interface FormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  comfirmPassword: string;
  address: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  comfirmPassword?: string;
  address?: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    password: '',
    comfirmPassword: '',
    address: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isValidThaiPhone = (phone: string): boolean => {
    const mobilePattern = /^0[689]\d{8}$/;
    const landlinePattern = /^0[2-7]\d{7}$/;
    return mobilePattern.test(phone) || landlinePattern.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = 'กรุณากรอกชื่อ-นามสกุล';
    }

    // Validate Phone
    if (!formData.phone) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์';
    } else if (!isValidThaiPhone(formData.phone)) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง';
    }

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

    // Validate Confirm Password
    if (!formData.comfirmPassword) {
      newErrors.comfirmPassword = 'กรุณายืนยันรหัสผ่าน';
    } else if (formData.password !== formData.comfirmPassword) {
      newErrors.comfirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }

    // Validate Address
    if (!formData.address.trim()) {
      newErrors.address = 'กรุณากรอกที่อยู่';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (value: string) => {
    // Only allow numbers and limit to 10 digits
    const phoneNumber = value.replace(/\D/g, '').slice(0, 10);
    handleChange('phone', phoneNumber);
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
      console.log('Register:', formData);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="blue-bg">
      <div className="register-card">
        <div className='register-content'>
          <h1 className="login-title">ลงทะเบียน</h1>
          
          <form onSubmit={handleSubmit}>
            <div className='mb-2 text-black'>
              <label>ชื่อ-นามสกุล<span style={{ color: '#FF0000' }}>*</span></label>
              <input
                type='text'
                placeholder='ชื่อ-นามสกุล'
                className={`login-input ${errors.name ? 'border-red-500' : ''}`}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className='mb-2 text-black'>
              <label>เบอร์โทร<span style={{ color: '#FF0000' }}>*</span></label>
              <input
                type='tel'
                placeholder='เบอร์โทร'
                className={`login-input ${errors.phone ? 'border-red-500' : ''}`}
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                maxLength={10}
                pattern="[0-9]*"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div className='mb-2 text-black'>
              <label>อีเมล<span style={{ color: '#FF0000' }}>*</span></label>
              <input
                type='email'
                placeholder='อีเมล'
                className={`login-input ${errors.email ? 'border-red-500' : ''}`}
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className='mb-2 text-black'>
              <label>รหัสผ่าน<span style={{ color: '#FF0000' }}>*</span></label>
              <input
                type='password'
                placeholder='รหัสผ่าน'
                className={`login-input ${errors.password ? 'border-red-500' : ''}`}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className='mb-2 text-black'>
              <label>ยืนยันรหัสผ่าน<span style={{ color: '#FF0000' }}>*</span></label>
              <input
                type='password'
                placeholder='ยืนยันรหัสผ่าน'
                className={`login-input ${errors.comfirmPassword ? 'border-red-500' : ''}`}
                value={formData.comfirmPassword}
                onChange={(e) => handleChange('comfirmPassword', e.target.value)}
              />
              {errors.comfirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.comfirmPassword}</p>
              )}
            </div>

            <div className='mb-2 text-black'>
              <label>ที่อยู่<span style={{ color: '#FF0000' }}>*</span></label>
              <textarea
                placeholder='ที่อยู่'
                className={`address-input ${errors.address ? 'border-red-500' : ''}`}
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="button-container-register">
              <button type="submit" className="button">
                ลงทะเบียน
              </button>
            </div>

            <div className="text-center mt-4 text-black">
              <span>มีบัญชีอยู่แล้ว </span> 
              <Link href="/login" className="no-account">
                <u>เข้าสู่ระบบที่นี่</u>
              </Link>
            </div>
          </form>
        </div>

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
        >
          <h2 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '1rem',
            color: '#004D9F'
          }}>
            <b>ยินดีต้อนรับสู่เว็บไซต์ของ Tech Lifestyle</b>
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            <b>ขอบคุณที่ลงทะเบียนเข้าเป็นสมาชิกของเรา</b>
          </p>
          <p>
            <b>หวังว่าบริการของเราจะสามารถช่วยเหลือคุณได้ในอนาคต</b>
          </p>
        </Modal>
      </div>
    </div>
  );
}