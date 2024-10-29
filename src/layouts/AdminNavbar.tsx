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
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-1"> {/* เพิ่ม padding ด้านข้าง */}
        <div className="flex h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/home">
              <Image 
                src={logo}
                alt="Logo"
                width={70}  
                height={70}
                className="w-auto h-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex ml-16 space-x-8"> {/* ปรับระยะห่างจาก logo และระหว่างเมนู */}
            <Link 
              href="/order_list" 
              className="nav-link"
            >
              คำสั่งซื้อ
            </Link>
            <Link 
              href="/customer" 
              className="nav-link"
            >
              ลูกค้า
            </Link>
            <Link 
              href="/element" 
              className="nav-link" 
            >
              ชิ้นส่วนอุปกรณ์
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center ml-auto space-x-4"> {/* ใช้ ml-auto เพื่อดันไปทางขวาสุด */}
            <Link href="/notification" className="p-2">
              <Image
                src={bell}
                alt="bell"
                width={22}  
                height={22}
              />
            </Link>
            <Link href="/profile" className="p-2">
              <Image
                src={hamburger}
                alt="hamburger"
                width={22} 
                height={22}
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}