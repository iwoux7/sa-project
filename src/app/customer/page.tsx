'use client';
import React, { useState } from 'react';
import { Navbar } from '@/layouts/AdminNavbar';
import Link from 'next/link';
import { Search, Plus } from 'lucide-react';


export default function CustomerList  () {
    const [searchQuery, setSearchQuery] = useState('');
  
    const customers = [
        {
        customerId: 'CTM001',
        customerName: 'อาทิตย์ สุริยจักรวาล',
        customerPhone_Number: '023-456-7891',
        customerEmail: 'solar_universe@gmail.com',
        cusrtomerAddress: 'หมู่ 1 หมู่บ้านพระอาทิตย์ แขวงสุริยวงศ์ เขตบางรัก กทม. 10500',
        customerStatus: 'รอการตอบกลับ',
        customerQuestion: '-'
        },
    {
        customerId: 'CTM002',
        customerName: 'ชื่อ นามสกุล',
        customerPhone_Number: '000-000-0000',
        customerEmail: 'example@email',
        cusrtomerAddress: 'หมู่ 2 หมู่บ้านพระอาทิตย์ แขวงสุริยวงศ์ เขตบางรัก กทม. 10500',
        customerStatus: 'รอการตอบกลับ',
        customerQuestion: 'สวัสดีครับ ขอสอบถาม'
    }
    ];

    const filteredCustomers = customers.filter(customer =>
        customer.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 pt-14 sm:pt-16 md:pt-20">
            <div className="bg-white rounded-lg shadow p-6">
            <h1 style={{ color: '#004D9F' }} className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-4 sm:mb-6">
                รายชื่อลูกค้า
            </h1>
            
            {/* Search Bar */}
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
            </div>

            {/* Table */}
            <div className="px-1 sm:px-2 md:px-6 ">
                <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6 overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                    <div className="inline-block min-w-full align-middle">
                            <table className="min-w-full border-collapse border-black">
                                <thead>
                                    <tr className="bg-[#004D9F] ">
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Customer ID รหัสลูกค้า</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Customer Name ชื่อ - นามสกุลลูกค้า</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Phone Number เบอร์โทร</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Email</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Address</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Customer Status</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Question</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.map((customer) => (
                                    <tr key={customer.customerId} className="border-b hover:bg-gray-50">
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">
                                        <Link 
                                            href={{
                                                pathname: `/customer/${customer.customerId}`,
                                                query: {
                                                customerName: customer.customerName,
                                                customerPhone_Number: customer.customerPhone_Number,
                                                customerEmail: customer.customerEmail,
                                                customerAddress: customer.cusrtomerAddress,
                                                customerStatus: customer.customerStatus,
                                                customerQuestion: customer.customerQuestion
                                                }
                                            }}
                                            className="text-[#004D9F] hover:text-[#004D9F] hover:underline"
                                            >
                                            {customer.customerId}
                                            </Link>
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{customer.customerName}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{customer.customerPhone_Number}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{customer.customerEmail}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{customer.customerEmail}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 "> {customer.customerStatus && (
                                            <span className="px-2 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm bg-yellow-100 text-yellow-800 whitespace-nowrap">
                                            {customer.customerStatus}
                                        </span>
                                        )}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{customer.customerQuestion}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
}