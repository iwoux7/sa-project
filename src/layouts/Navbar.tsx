// src/components/layouts/Navbar.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import bell from '@/assets/bell.png';
import hamburger from '@/assets/hamburger.png';
import { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar-shadow">
    <div className="navbar-container flex justify-between items-center">
      <div className="logo-container">
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
        {/* Navigation Links - Hidden on mobile */}
        <div className="element-container">
          <Link href="/home" className="nav-link">หน้าหลัก</Link>
        </div>
        <div className="element-container">
          <Link href="/about" className="nav-link">เกี่ยวกับเรา</Link>
        </div>
        <div className="element-container">
          <Link href="/services" className="nav-link">บริการของเรา</Link>
        </div>
        <div className="element-container">
          <Link href="/contact" className="nav-link">ติดต่อเรา</Link>
        </div>

        {/* Right Side Icons */}
        <div className='bell-icon'>
          <a href='/notification'>
            {/* Notification Bell */}
            <button>
              <Image
                src={bell}
                alt='bell'
                width={25}
                height={25}
              />
            </button>
            </a>
        </div>

          {/* Hamburger Menu */}
          <a href='/profile' className='hamburger-icon'>
            <Image
              src={hamburger}
              alt='hamburger'
              width={25}
              height={25}
            /> 
          </a>
        </div>
    </nav>
  );
}