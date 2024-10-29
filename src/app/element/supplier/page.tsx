'use client';
import React, { useState } from 'react';
import { Navbar } from '@/layouts/AdminNavbar';
import { ChevronLeft,Search } from 'lucide-react';
import { AddSupplierDialog } from "@/components/AddSupplierDialog"
import { ConfirmSupplierDialog } from '@/components/ConfirmSupplierDialog';
import { SuccessSupplierDialog } from '@/components/SuccessSupplierDialog';
import Link from 'next/link';

const SupplierList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState({
    supplierName: '',
    supplierPhoneNumber: '',
    supplierEmail: '',
    supplierAddress: ''
  });

  const supplier = [
    {
        supplierId: 'SPL001',
        supplierName: 'GODUNGFAIFAA',
        supplierPhoneNumber: '000-000-0000',
        supplierEmail: 'example@email',
        supplierAddress: 'ที่อยู่'
    },
    {
        supplierId: 'SPL002',
        supplierName: 'บุญถาวร',
        supplierPhoneNumber: '000-000-0000',
        supplierEmail: 'example@email',
        supplierAddress: 'ที่อยู่'
    },
    {
        supplierId: 'SPL003',
        supplierName: 'BnB Home',
        supplierPhoneNumber: '000-000-0000',
        supplierEmail: 'example@email',
        supplierAddress: 'ที่อยู่'
    },
    {
        supplierId: 'SPL004',
        supplierName: 'HomePro',
        supplierPhoneNumber: '000-000-0000',
        supplierEmail: 'example@email',
        supplierAddress: 'ที่อยู่'
    },
  ];

  const filteredSupplier = supplier.filter(supplier =>
    supplier.supplierId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.supplierEmail.toLowerCase().includes(searchQuery.toLowerCase())
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
      supplierName: "",
      supplierPhoneNumber: "",
      supplierEmail: "",
      supplierAddress: ""
    });
  };

  const handleConfirm = () => {
    // Handle the confirmation logic here
    setShowConfirmDialog(false);
    setShowSuccessDialog(true);
    // Reset form data
    setFormData({
      supplierName: '',
      supplierPhoneNumber: '',
      supplierEmail: '',
      supplierAddress: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 pt-14 sm:pt-16 md:pt-20">
        <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-12">
                <Link href="/element" className="inline-flex items-center text-[#004D9F] hover:underline">
                <ChevronLeft className="w-4 h-4 mr-1" />
                ย้อนกลับ
                </Link>
          <h1 style={{ color: '#004D9F' }} className="text-3xl font-semibold text-center mb-6">
            รายชื่อ Supplier
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


            <AddSupplierDialog 
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleShowConfirm}
              onReset={handleReset}
            />
          </div>

          {/* Table */}
          <div className="px-1 sm:px-2 md:px-6 ">
            <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6 overflow-hidden border border-gray-200 rounded-lg shadow-sm">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full border-collapse border-black">
                  <thead>
                    <tr className="bg-[#004D9F]">
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Supplier ID รหัส Supplier</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Supplier Name ชื่อ Supplier</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Supplier Phone Number เบอร์โทร Supplier</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Supplier Email อีเมล Supplier</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Supplier Address ที่อยู่ Supplier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSupplier.map((supplier) => (
                      <tr key={supplier.supplierId} className="border-b hover:bg-gray-50">
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">
                          <Link 
                            href={`/element/supplier/history_order/${supplier.supplierId}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                          {supplier.supplierId}
                          </Link>
                        </td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{supplier.supplierName}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{supplier.supplierPhoneNumber}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{supplier.supplierEmail}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{supplier.supplierAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ConfirmSupplierDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirm}
      />
      <SuccessSupplierDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </div>
  );
};

export default SupplierList;