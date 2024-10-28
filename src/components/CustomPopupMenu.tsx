'use client';
import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomPopupMenuProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  title: string;
  className?: string;
}

export default function CustomPopupMenu({
  value,
  options,
  onChange,
  title,
  className = ''
}: CustomPopupMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // ปิด popup เมื่อคลิกข้างนอก
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // หา label จาก value ปัจจุบัน
  const selectedLabel = options.find(opt => opt.value === value)?.label || '';

  return (
    <div ref={menuRef} className="relative">
      {/* Input field */}
      <input
        type="text"
        value={selectedLabel}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
        className={`w-full px-3 py-2 border rounded bg-white cursor-pointer ${className}`}
      />

      {/* Popup Menu */}
      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
          {/* Title */}
          <div className="px-4 py-2 text-center border-b border-gray-200 font-medium">
            {title}
          </div>
          
          {/* Options */}
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  px-4 py-2 cursor-pointer text-sm
                  ${option.value === value ? 'bg-yellow-100' : 'hover:bg-yellow-100'}
                `}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}