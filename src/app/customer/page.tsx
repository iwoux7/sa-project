'use client';
import React, { useState, useEffect} from 'react';
import { Navbar } from '@/layouts/AdminNavbar';
import Link from 'next/link';
import { Search, Plus } from 'lucide-react';


interface Customer{
    CUSTOMER_ID: string,
    CUSTOMER_NAME: string,
    CUSTOMER_EMAIL: string,
    CUSTOMER_PHONE_NUMBER: string,
    CUSTOMER_ADDRESS: string,
    CUSTOMER_STATUS: string,
    CUSTOMER_QUESTION: string
}

export default function CustomerList  () {
    const [searchQuery, setSearchQuery] = useState('');
    const [customers, setCustomers] = useState<Customer[]>([]);
  
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await fetch('/api/customer');
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchCustomer();
    }, []);

    const filteredCustomers = customers.filter(customer =>
        customer.CUSTOMER_NAME.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.CUSTOMER_ID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.CUSTOMER_EMAIL.toLowerCase().includes(searchQuery.toLowerCase())
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
                                    <tr key={customer.CUSTOMER_ID} className="border-b hover:bg-gray-50">
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">
                                        <Link 
                                        href={{
                                            pathname: `/customer/${customer.CUSTOMER_ID}`,
                                            query: {
                                            customerId: customer.CUSTOMER_ID,                                                customerName: customer.CUSTOMER_NAME,
                                            customerPhone_Number: customer.CUSTOMER_PHONE_NUMBER,
                                            customerEmail: customer.CUSTOMER_EMAIL,
                                            customerAddress: customer.CUSTOMER_ADDRESS,
                                            customerStatus: customer.CUSTOMER_STATUS,
                                            customerQuestion: customer.CUSTOMER_QUESTION
                                            }
                                        }}
                                        className="text-[#004D9F] hover:text-[#004D9F] hover:underline"
                                        >
                                        {customer.CUSTOMER_ID}
                                        </Link>
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{customer.CUSTOMER_NAME}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{customer.CUSTOMER_PHONE_NUMBER}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{customer.CUSTOMER_EMAIL}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{customer.CUSTOMER_ADDRESS}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 "> {customer.CUSTOMER_STATUS && (
                                            <span className="px-2 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm bg-yellow-100 text-yellow-800 whitespace-nowrap">
                                            {customer.CUSTOMER_STATUS}
                                        </span>
                                        )}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{customer.CUSTOMER_QUESTION}</td>
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