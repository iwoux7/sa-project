'use client'
import { Navbar } from '@/layouts/Navbar';
import { useState } from 'react';
import ContactCard from '@/components/ContactCard';
import { ContactModal } from '@/components/ContactModal';

// Define custom types for phone and email
type ThaiPhoneNumber = `0${number}`;
type EmailAddress = `${string}@${string}.${string}`;

interface FormData {
  name: string;
  phone: ThaiPhoneNumber | string;
  email: EmailAddress | string;
  address: string;
  quetion: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  quetion?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    quetion: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  // Your existing validation functions
  const isValidThaiPhone = (phone: string): boolean => {
    const mobilePattern = /^0[689]\d{8}$/;
    const landlinePattern = /^0[2-7]\d{7}$/;
    return mobilePattern.test(phone) || landlinePattern.test(phone);
  };

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'กรุณากรอกชื่อ-นามสกุล';
    }

    if (!formData.phone) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์';
    } else if (!isValidThaiPhone(formData.phone)) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง เช่น 0812345678';
    }

    if (!formData.email) {
      newErrors.email = 'กรุณากรอกอีเมล';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'กรุณากรอกอีเมลให้ถูกต้อง เช่น example@email.com';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'กรุณากรอกที่อยู่';
    }

    if (!formData.quetion.trim()) {
      newErrors.quetion = 'กรุณากรอกคำถามหรือข้อความ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '').slice(0, 10);
    handleChange('phone', phoneNumber);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: undefined}));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsFirstModalOpen(true); // Show first modal after successful validation
    }
  };

  const handleFirstConfirm = () => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(true);
    // Reset form after confirmation
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      quetion: ''
    });
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <section id="contact" className='service-card'>
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            ติดต่อเรา
          </h2>
          <div className="contact-container">
            <ContactCard />
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="block text-sm font-medium mb-1">
                    ชื่อ-นามสกุล<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`login-input ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="ชื่อ-นามสกุล"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-1">
                    เบอร์โทรศัพท์<span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    className={`login-input ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="เบอร์โทรศัพท์ เช่น 0812345678"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    maxLength={10}
                    pattern="[0-9]*"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-1">
                    อีเมล<span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    className={`login-input ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="อีเมล เช่น example@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-1">
                    ที่อยู่<span className="required">*</span>
                  </label>
                  <textarea
                    className={`address-input ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="ที่อยู่"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-1">
                    ติดต่อ/สอบถาม<span className="required">*</span>
                  </label>
                  <textarea
                    className={`address-input ${errors.quetion ? 'border-red-500' : ''}`}
                    placeholder="ติดต่อ/สอบถาม"
                    value={formData.quetion}
                    onChange={(e) => handleChange('quetion', e.target.value)}
                  />
                  {errors.quetion && (
                    <p className="text-red-500 text-sm mt-1">{errors.quetion}</p>
                  )}
                </div>

                <div className="button-container-green">
                  <button type="submit" className="green-button">
                    ติดต่อเรา
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <>
          {/* First Confirmation Modal */}
          <ContactModal 
            isOpen={isFirstModalOpen}
            onClose={() => setIsFirstModalOpen(false)}
            title="ยืนยันการส่งข้อความของคุณหรือไม่"
            onConfirm={handleFirstConfirm}
          />

          {/* Success Modal */}
          <ContactModal 
            isOpen={isSecondModalOpen}
            onClose={() => setIsSecondModalOpen(false)}
            title="ขอบคุณที่สนใจในผลิตภัณฑ์และบริการของเรา"
            
            showButtons={false}
          >
            <p style={{ marginBottom: '5px', fontSize: '1.2rem', fontWeight: 'bold'}}>
              เราได้รับข้อความของคุณแล้ว และจะรีบตอบกลับไปยังอีเมล 
            </p>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold'}}>
            solar_universe@gmail.com ของคุณให้เร็วที่สุด
            </p>
          </ContactModal>
        </>
    </div>
  );
}