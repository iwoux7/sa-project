'use client';
import React, { useState } from 'react';
import { Navbar } from '@/layouts/AdminNavbar';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddElementDialog } from '@/components/AddElementDialog';
import { SuccessElementDialog } from '@/components/SuccessElementDialog';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import Link from 'next/link';

const ElementList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState({
    supplierId: '',
    elementName: '',
    elementDetail: '',
    unitPrice: ''
  });

  const elements = [
    {
      elementId: 'ELM001',
      elementName: 'Tongwei solar Mono 405W Full-black Tier-1',
      elementDetail: 'โซลาเซลล์ 405W น้ำหนัก  20.5 กก ขนาด 1134 x 1722 x 30 มม.',
      unitPrice: 'x,xxx',
    },
    {
      elementId: 'ELM002',
      elementName: 'Tongwei solar Mono 550W Half Cell Tier-1',
      elementDetail: 'โซลาเซลล์ 550W น้ำหนัก  27.8 กก ขนาด 2278 x 1134 x 35 มม.',
      unitPrice: 'x,xxx',
    }
  ];

  const filteredElement = elements.filter(elements =>
    elements.elementId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    elements.elementName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShowConfirm = () => {
    setShowConfirmDialog(true);
  };

    const handleReset = () => {
    setFormData({
      supplierId: "",
      elementName: "",
      elementDetail: "",
      unitPrice: ""
    });
  };

  const handleConfirm = () => {
    // Handle the confirmation logic here
    setShowConfirmDialog(false);
    setShowSuccessDialog(true);
    // Reset form data
    setFormData({
      supplierId: '',
      elementName: '',
      elementDetail: '',
      unitPrice: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 pt-14 sm:pt-16 md:pt-20">
        <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-12">
          <h1 style={{ color: '#004D9F' }} className="text-3xl font-semibold text-center mb-6">
            รายชื่อชิ้นส่วน
          </h1>

          {/* Search and Buttons */}
          <div className="flex justify-center mb-6 items-center gap-2 ">
                <div className="relative" style={{ width: '500px' }}>
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="ค้นหาคำสั่ง"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500"
                />
            </div>


            <AddElementDialog 
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleShowConfirm}
              onReset={handleReset}
            />
            <Link href={`/element/supplier`}>
                <Button variant="default" className="buttonemerald">
                Suppliers
                </Button>
            </Link>
          </div>

          {/* Table */}
          <div className="px-1 sm:px-2 md:px-6 ">
            <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6 overflow-hidden border border-gray-200 rounded-lg shadow-sm">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full border-collapse border-black">
                  <thead>
                    <tr className="bg-[#004D9F]">
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Element ID รหัสชิ้นส่วน</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Element Name ชื่อชิ้นส่วน</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Element Detail รายละเอียดชิ้นส่วน</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Unit Price ราคาต่อหน่วย</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredElement.map((elements) => (
                      <tr key={elements.elementId} className="border-b hover:bg-gray-50">
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{elements.elementId}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{elements.elementName}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{elements.elementDetail}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{elements.unitPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>          
            </div>
          </div>
        </div>
      </main>

      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirm}
      />
      <SuccessElementDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </div>
  );
};

export default ElementList;