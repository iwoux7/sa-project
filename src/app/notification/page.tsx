// src/app/notification/page.tsx
'use client'
import { Navbar } from '@/layouts/Navbar';
import NotificationFrame from '@/components/NotificationFrame';

export default function NotificationPage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="notification-container">
        <h1 className="notification-header">แจ้งเตือน</h1>
        <NotificationFrame 
          timeAgo="2 เดือนที่แล้ว"
          code="MT001"
          message="ส่งมอบชิ้นงานเรียบร้อย"
          date="31/8"
        />
      </div>
    </div>
  );
}