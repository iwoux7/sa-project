'use client'
import { useState } from 'react';
import { Navbar } from '@/layouts/Navbar';
import edit from '@/assets/edit.png';
import profile from '@/assets/userIcon.png';
import logout from '@/assets/power.png';
import Image from 'next/image';

export default function ProfilePage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: 'อาทิตย์ สุริยอักรวาล',
    phone: '123-456-7890',
    email: 'solar_universe@gmail.com',
    address: 'หมู่ 1 หมู่บ้านพระอาทิตย์ แขวงสุริยวงศ์ เขตบางรัก กทม. 10500'
  });

  const orders = [
    {
      id: '1_มิเตอร์ไฟฟ้าTOU_คุณอาทิตย์',
      product: 'มิเตอร์ไฟฟ้าแบบ TOU',
      orderDate: '8 สิงหาคม 2024',
      deliveryDate: '22 สิงหาคม 2024',
      status: 'ส่งมอบเรียบร้อย',
      payment: 'ชำระเงินครบถ้วน'
    },
  ];

  const handleSubmit = (newData) => {
    setFormData(newData);
    setShowEditModal(false);
    setShowConfirmModal(true);
  };
  
  const handleConfirm = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">โปรไฟล์</h1>
          <button className="logout-button">
            ออกจากระบบ 
            <Image
              src={logout}
              alt='logout'
              width={20}
              height={20}
            />
          </button>
        </div>
        
        <div className="profile-card">
          <div className="edit-section">
            <button className="edit-button" onClick={() => setShowEditModal(true)}>
              แก้ไขข้อมูลส่วนตัว 
              <Image 
                src={edit}
                alt='edit'
                width={25}
                height={25}
              />
            </button>
          </div>
          
          <div className="profile-avatar">
            <div className='avatar-circle'>
              <Image
                src={profile}
                alt='profile'
                width={100}
                height={100}
              />
            </div>
          </div>
          
          <div className="profile-details">
            <div className="detail-row">
              <span className="detail-label">ชื่อ-นามสกุล</span>
              <span className="detail-value">{formData.name}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">เบอร์โทร</span>
              <span className="detail-value">{formData.phone}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">อีเมล</span>
              <span className="detail-value">{formData.email}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">ที่อยู่</span>
              <span className="detail-value">{formData.address}</span>
            </div>
          </div>
        </div>

        <div className="order-history mt-8">
          <h2 className="order-his-title">ประวัติคำสั่งซื้อ</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {orders.map((order) => (
              <div key={order.id} className="border-b last:border-b-0 p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="order-his-detail-title">{order.id}</h3>
                  <button className="quotation-button">
                    ใบเสนอราคา
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-l">
                  <div>
                    <p><span className="text-lg"><b>ประเภทของผลิตภัณฑ์:</b></span> {order.product}</p>
                    <p><span className="text-lg"><b>วันที่สั่งซื้อ:</b></span> {order.orderDate}</p>
                    <p><span className="text-lg"><b>วันที่งานเสร็จสิ้น:</b></span> {order.deliveryDate}</p>
                  </div>
                  <div>
                    <p><span className="text-lg"><b>สถานะของงาน:</b></span> {order.status}</p>
                    <p><span className="font-medium"><b>สถานะการชำระเงิน:</b></span> {order.payment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal (Component 579) */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4 text-center">แก้ไขข้อมูลส่วนตัว</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formData);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">ชื่อ - นามสกุล :</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1">เบอร์โทร :</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1">อีเมล :</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1">ที่อยู่ :</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white rounded py-2 mt-6 hover:bg-emerald-600"
              >
                แก้ไขข้อมูลส่วนตัว
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Modal (Component 580) */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">ยืนยันการแก้ไขข้อมูลส่วนตัวหรือไม่</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-6 py-2 border rounded hover:bg-gray-100"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleConfirm}
                className="px-6 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal (Component 581) */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">แก้ไขข้อมูลส่วนตัวเรียบร้อย</h2>
            <div className="text-center">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-6 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
              >
                ตกลง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}