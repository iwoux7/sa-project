// pages/quotation/[id].tsx
'use client';
import { useState } from 'react';
import logo from '@/assets/logo.png';
import { Navbar } from '@/layouts/AdminNavbar';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function QuotationDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          {/* Back Button */}
          <Link href="/quotation" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            ย้อนกลับ
          </Link>

          <h1 className="text-2xl font-semibold text-center text-[#004D9F] mb-6">
            ใบเสนอราคาของออเดอร์ MT001
          </h1>

          {/* Quotation Content */}
          <div className="border rounded-lg p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col items-center mb-8">
              <Image
                src= {logo} // แก้ path ตามที่เก็บไฟล์จริง
                alt="Tech Lifestyle"
                width={200}
                height={200}
                className="mb-2"
              />
              <div className="text-center">
                <h2 className="font-bold text-lg">Tech Lifestyle</h2>
                <p className="text-sm">248 ถนนอุปราช22 ซอย 11/2 อีสานใหม่</p>
                <p className="text-sm">อำเภอเมือง อุบลราชธานี 11000</p>
                <p className="text-sm">โทร 098-345-2578 Email: tlstmeter@gmail.com</p>
              </div>
            </div>

            <h3 className="text-center font-bold text-xl mb-6">ใบเสนอราคา</h3>

            {/* Customer Info Grid */}
            <div className="grid grid-cols-2 gap-8 mb-6 text-sm">
              <div>
                <p><strong>ชื่อผู้ซื้อ:</strong> อาทิตย์ สุริยะทักษ์</p>
                <p><strong>อีเมล:</strong> solar_universe@gmail.com</p>
                <p><strong>โทร:</strong> 123-456-7890</p>
                <p><strong>ที่อยู่:</strong> หมู่ 1 หมู่บ้านพระอาทิตย์ อำเภอเมือง อุบลราชธานี 11000</p>
              </div>
              <div>
                <p><strong>เลขที่ใบเสนอราคา:</strong> QT0001</p>
                <p><strong>เลขที่ออเดอร์:</strong> MT001</p>
                <p><strong>รายละเอียด:</strong> มิเตอร์น้ำ TOU</p>
                <p><strong>วันที่ใบเสนอราคา:</strong> 9 ตุลาคม 2567</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-6">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ลำดับ</th>
                  <th className="text-left p-2">รหัสสินค้า</th>
                  <th className="text-left p-2">ชื่อสินค้า</th>
                  <th className="text-right p-2">จำนวนหน่วย</th>
                  <th className="text-right p-2">ราคา</th>
                  <th className="text-right p-2">รวม</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">1</td>
                  <td className="p-2">ELM011</td>
                  <td className="p-2">มิเตอร์ไฟฟ้า NXTS-Hand</td>
                  <td className="p-2 text-right">1</td>
                  <td className="p-2 text-right">xx,xxx</td>
                  <td className="p-2 text-right">xx,xxx</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-2 border-b">
                  <span>รวมเงิน</span>
                  <span>xx,xxx</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>ภาษี</span>
                  <span>x,xxx</span>
                </div>
                <div className="flex justify-between py-2 font-bold">
                  <span>รวมเงินทั้งสิ้น</span>
                  <span>xx,xxx</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-2">การชำระเงิน</h4>
                <div className="space-y-1 text-sm">
                  <p>◉ เงินสด</p>
                  <p>○ โอนเงินเข้าบัญชี</p>
                  <p className="ml-4">• ธนาคารกรุงไทย xxx-x-xxxxx-x</p>
                  <p className="ml-4">• ธนาคารกสิกรไทย xxx-x-xxxxx-x</p>
                  <p>○ เช็คธนาคาร</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="border-b border-black w-48 h-20 mb-2"></div>
                <p className="text-sm">ลายมือชื่อผู้เสนอ</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}