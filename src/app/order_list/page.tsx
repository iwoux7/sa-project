    'use client';
    import React, { useState } from 'react';
    import { Navbar } from '@/layouts/AdminNavbar';
    import Link from 'next/link';
    import { Search, Plus } from 'lucide-react';
    import AddOrderDialog from '@/components/AddOrderDialog';


    // Mock Data
    const mockOrders = [
    {
        orderId: 'SD391',
        orderDate: '15/10/2024',
        customerId: 'CTM309',
        orderDetail: 'มิเตอร์ไฟฟ้า 3 เฟส',
        expectedDate: '20/10/2024',
        finishedDate: 'N/A',
        orderPrice: '45,000',
        orderProcess: 'รอดำเนินการทั้งหมด',
        paymentStatus: 'รอการชำระเงิน',
        quotationNo: 'QTT002'
    },
    {
        orderId: 'M7002',
        orderDate: '13/10/2024',
        customerId: 'CTM013',
        orderDetail: 'มิเตอร์น้ำดิจิตอล',
        expectedDate: '18/10/2024',
        finishedDate: 'N/A',
        orderPrice: '32,000',
        orderProcess: 'รอดำเนินการทั้งหมด',
        paymentStatus: 'รอการชำระเงิน',
        quotationNo: 'QTT003'
    },
    {
        orderId: 'SD392',
        orderDate: '12/10/2024',
        customerId: 'CTM310',
        orderDetail: 'มิเตอร์ไฟฟ้าดิจิตอล',
        expectedDate: '17/10/2024',
        finishedDate: '16/10/2024',
        orderPrice: '28,500',
        orderProcess: 'เสร็จสิ้น',
        paymentStatus: 'ชำระเงินแล้ว',
        quotationNo: 'QTT004'
    },
    {
        orderId: 'M7003',
        orderDate: '11/10/2024',
        customerId: 'CTM014',
        orderDetail: 'มิเตอร์น้ำ TOU',
        expectedDate: '16/10/2024',
        finishedDate: 'N/A',
        orderPrice: '35,000',
        orderProcess: 'กำลังดำเนินการ',
        paymentStatus: 'ชำระเงินแล้ว',
        quotationNo: 'QTT005'
    },
    {
        orderId: 'SD393',
        orderDate: '10/10/2024',
        customerId: 'CTM311',
        orderDetail: 'มิเตอร์ไฟฟ้า Single Phase',
        expectedDate: '15/10/2024',
        finishedDate: '14/10/2024',
        orderPrice: '22,000',
        orderProcess: 'เสร็จสิ้น',
        paymentStatus: 'ชำระเงินแล้ว',
        quotationNo: 'QTT006'
    }
    ];


    export default function OrderTrackingPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [orders, setOrders] = useState(mockOrders); // ใช้ state แทน mockOrders ตรงๆ
    

    // ฟังก์ชันสำหรับค้นหาข้อมูล
    const filteredOrders = mockOrders.filter(order => 
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderDetail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.quotationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderPrice.includes(searchQuery) || // เพิ่มการค้นหาจากราคา
        order.orderProcess.toLowerCase().includes(searchQuery.toLowerCase()) // เพิ่มการค้นหาจากสถานะ
    );

    const handleAddOrder = (newOrder: any) => {
        setOrders(prevOrders => [newOrder, ...prevOrders]);
    };

    // สถานะต่างๆ สำหรับ badge
    const getStatusColor = (status: string) => {
        switch (status) {
        case 'เสร็จสิ้น':
            return 'bg-green-100 text-green-800 whitespace-nowrap';
        case 'กำลังดำเนินการ':
            return 'bg-blue-100 text-blue-800 whitespace-nowrap';
        case 'รอดำเนินการทั้งหมด':
            return 'bg-yellow-100 text-yellow-800 whitespace-nowrap';
        default:
            return 'bg-gray-100 text-gray-800 whitespace-nowrap';
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
        case 'ชำระเงินแล้ว':
            return 'text-green-600 whitespace-nowrap';  
        case 'รอการชำระเงิน':
            return 'text-red-600 whitespace-nowrap';
        default:
            return 'text-gray-600 whitespace-nowrap';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow p-6">
            <h1 style={{ color: '#1e40af' }} className="text-2xl font-semibold text-center mb-6">
                รายชื่อคำสั่งซื้อ
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
                <button 
                onClick={() => setIsAddDialogOpen(true)}
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 flex items-center justify-center h-9 w-9"
                >
                <Plus className="h-5 w-5" />
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border-black">
                <thead>
                    <tr className="bg-blue-600 ">
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Order ID</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Order Date</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Customer ID</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Order Detail</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Expected Date</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Finished Date</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Order Price</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Order Process</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Payment Status</th>
                    <th className="px-4 py-3 text-left text-white font-medium border-b border-blue-500">Quotation no.</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                    <tr key={order.orderId} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">
                        <Link 
                            href={`/order_detail/${order.orderId}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                            {order.orderId}
                        </Link>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{order.orderDate}</td>
                        <td className="px-4 py-3 font-medium text-blue-600">{order.customerId}</td>
                        <td className="px-4 py-3 text-gray-600">{order.orderDetail}</td>
                        <td className="px-4 py-3 text-gray-600">{order.expectedDate}</td>
                        <td className="px-4 py-3 text-gray-600">{order.finishedDate}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{order.orderPrice}</td>
                        <td className="px-4 py-3">
                        <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderProcess)}`}>
                            {order.orderProcess}
                        </span>
                        </td>
                        <td className={`px-4 py-3 font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{order.quotationNo}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            {/* Add Order Dialog */}
            <AddOrderDialog
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onAdd={handleAddOrder}
            />
            </div>
        </main>
    </div>
);
}