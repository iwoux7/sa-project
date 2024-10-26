'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Modal } from '@/components/Modal';  // Relative path

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    comfirmPassword: '',
    address: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);  // Open modal when form is submitted
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
                    placeholder='ที่อยู่'
                    className='address-input'
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
            </div>

                <div className="button-container-register">
                    <button type="submit" className="button">
                    ลงทะเบียน
                    </button>
                </div>

                <div className="text-center mt-4">
                    <a>มีบัญชีอยู่แล้ว </a> 
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
    

{/* -------------------------------------------------------------------------------- */}
            {/* <div className="button-container-register">
                <button type="submit" className="login-button">
                ลงทะเบียน
                </button>
                <div style={{ marginTop: '1rem' }}>
                    <Link href="/login" className="back-to-login">
                    กลับไปหน้าเข้าสู่ระบบ
                    </Link>
                </div>
            </div>
            

            <div className="text-center mt-4">
                <a>มีบัญชีอยู่แล้ว </a> 
                <a href="#" className="no-account">
                <u>เข้าสู่ระบบที่นี่</u>
                </a>
            </div>
        </form>

        <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '1rem',
          color: '#2563EB'
        }}>
          ยินดีต้อนรับสู่เว็บไซต์ของ Tech Lifestyle
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          ขอบคุณที่ลงทะเบียนเข้าเป็นสมาชิกของเรา
        </p>
        <p>
          หวังว่าบริการของเราจะสามารถช่วยเหลือคุณได้ในอนาคต
        </p>
      </Modal> */
      }
        </div>
    </div>
  );
}