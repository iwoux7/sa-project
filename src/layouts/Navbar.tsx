'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import bell from '@/assets/bell.png';
import hamburger from '@/assets/hamburger.png';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white'
    }`}>
      <div className='navbar-shadow'>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/home" className="flex items-center">
              <Image 
                src={logo}
                alt="Logo"
                width={150}
                height={150}
                className="object-contain h-12"
              />
            </Link>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-12">
            <Link href="/home" className="nav-link">หน้าหลัก</Link>
            <Link href="/about" className="nav-link">เกี่ยวกับเรา</Link>
            <Link href="/service" className="nav-link">บริการของเรา</Link>
            <Link href="/contact" className="nav-link">ติดต่อเรา</Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <a href='/notification' className="bell-icon">
              <Image
                src={bell}
                alt='bell'
                width={25}
                height={25}
              />
            </a>
            
            <a href='/profile' className="hamburger-icon">
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
      </div>
    </nav>
  );
}