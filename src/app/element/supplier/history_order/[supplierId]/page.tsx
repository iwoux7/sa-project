'use client';
import React, { useState } from 'react';
import { Navbar } from '@/layouts/AdminNavbar';
import { ChevronLeft,Search } from 'lucide-react';
import { AddHistoryOrderDialog } from "@/components/AddHistoryOrderDialog"
import { ConfirmHistoryOrderDialog } from '@/components/ConfirmHistoryOrderDialog';
import { SuccessHistoryOrderDialog } from '@/components/SuccessHistoryOrderDialog';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const HistoryOrderList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const params = useParams();
  const [formData, setFormData] = useState({
    historyorderDate: "",
    elementId: "",
    amount: 0,
    price: 0,
  });

  const historyorder = [
    {
        historyorderDate: '7/7/2024',
        supplierId: params.supplierId as string,
        elementId: 'ELE001',
        amount: 4,
        price: 500,
        totalPrice: 'xx,xxx'
    },
    {
        historyorderDate: '7/7/2024',
        supplierId: params.supplierId as string,
        elementId: 'ELE001',
        amount: 3,
        price: 1000,
        totalPrice: 'xx,xxx'
    },
    {
        historyorderDate: '7/7/2024',
        supplierId: params.supplierId as string,
        elementId: 'ELE001',
        amount: 2,
        price: 2000,
        totalPrice: 'xx,xxx'
    },
    {
        historyorderDate: '7/7/2024',
        supplierId: params.supplierId as string,
        elementId: 'ELE001',
        amount: 2,
        price: 300,
        totalPrice: 'xx,xxx'
    },
  ];

  const filteredHistoryOrder = historyorder.filter(historyorder =>
    historyorder.historyorderDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    historyorder.supplierId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    historyorder.elementId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFormData({
        historyorderDate: "",
        elementId: "",
        amount: 0,
        price: 0,
    });
  };

  const handleShowConfirm = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    // Handle the confirmation logic here
    setShowConfirmDialog(false);
    setShowSuccessDialog(true);
    // Reset form data
    setFormData({
        historyorderDate: "",
        elementId: "",
        amount: 0,
        price: 0,
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
            ประวัติการสั่งซื้อชิ้นส่วนกับ {params.supplierId}
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


            <AddHistoryOrderDialog 
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
                                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Order Date วันที่สั่งซื้อชิ้นส่วน</th>
                                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Supplier ID รหัส Supplier</th>
                                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Element ID รหัสชิ้นส่วน</th>
                                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Amount จำนวน</th>
                                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Price ราคา</th>
                                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Total Price ราคารวม</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHistoryOrder.map((historyorder , index) => (
                                <tr key={`${historyorder.historyorderDate}-${historyorder.elementId}-${historyorder.supplierId}-${index}`}  
                                className="border-b hover:bg-gray-50">
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{historyorder.historyorderDate}</td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{historyorder.supplierId}</td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{historyorder.elementId}</td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{historyorder.amount}</td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{historyorder.price}</td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{(historyorder.price * historyorder.amount).toLocaleString()}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </main>

      <ConfirmHistoryOrderDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirm}
      />
      <SuccessHistoryOrderDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </div>
  );
};

export default HistoryOrderList;