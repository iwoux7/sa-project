'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import bell from '@/assets/bell.png';
import hamburger from '@/assets/hamburger.png';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar-shadow">
      <div className="navbar-container flex items-center">
        {/* Logo */}
        <div className="flex-shrink-0 mr-20"> {/* เพิ่ม margin-right */}
          <Link href="/home" className="flex items-center">
            <Image 
              src={logo}
              alt="Logo"
              width={150}
              height={150}
              className="logo-image"
            />
          </Link>
        </div>

        {/* Navigation Links - ย้ายมาชิดซ้ายและจัดกลุ่มใหม่ */}
        <div className="flex items-center space-x-10"> {/* ใช้ space-x-6 สำหรับระยะห่างระหว่างเมนู */}
          <Link href="/order_list" className="nav-link">คำสั่งซื้อ</Link>
          <Link href="/customer" className="nav-link">ลูกค้า</Link>
          <Link href="/element" className="nav-link">ชิ้นส่วนอุปกรณ์</Link>
        </div>

        {/* Right Side Icons - ย้ายไปทางขวาสุด */}
        <div className="flex items-center ml-[600px]"> {/* ใช้ ml-auto เพื่อดัน icons ไปทางขวา */}
          <div className='bell-icon'>
            <a href='/notification'>
              <button className='p-2'>
                <Image
                  src={bell}
                  alt='bell'
                  width={25}
                  height={25}
                />
              </button>
            </a>
          </div>

          <div className='hamburger-icon'>
            <a href='/profile' className="p-2" >
              <Image
                src={hamburger}
                alt='hamburger'
                width={25}
                height={25}
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function AdminLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
}