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
        <main className="max-w-7xl mx-auto px-1 py-6">
            <div className="bg-white rounded-lg shadow p-6">
            <h1 style={{ color: '#004D9F' }} className="text-2xl font-semibold text-center mb-6">
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
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border-black">
                <thead>
                    <tr className="bg-[#004D9F] ">
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Customer ID รหัสลูกค้า</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Customer Name ชื่อ - นามสกุลลูกค้า</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Phone Number เบอร์โทร</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Email</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Address</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Customer Status</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Question</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer) => (
                    <tr key={customer.customerId} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">
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
                        <td className="px-4 py-3 font-medium text-gray-600">{customer.customerName}</td>
                        <td className="px-4 py-3 text-gray-600">{customer.customerPhone_Number}</td>
                        <td className="px-4 py-3 text-gray-600">{customer.customerEmail}</td>
                        <td className="px-4 py-3 text-gray-600">{customer.customerEmail}</td>
                        <td className="px-4 py-3"> {customer.customerStatus && (
                            <span className="bg-yellow-300 px-2 py-1 rounded text-black whitespace-nowrap">
                            {customer.customerStatus}
                        </span>
                        )}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{customer.customerQuestion}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </main>
    </div>
);
}