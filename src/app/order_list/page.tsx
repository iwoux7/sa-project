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
            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 pt-14 sm:pt-16 md:pt-20">
                <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-12">
                    <h1 style={{ color: '#004D9F' }} className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-4 sm:mb-6">
                        รายชื่อคำสั่งซื้อ
                    </h1>
                
                    {/* Search Bar */}
                    <div className="flex justify-center mb-4 sm:mb-6 items-center gap-2">
                        <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px]">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="ค้นหาคำสั่ง"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500"
                            />
                        </div>
                        <button 
                            onClick={() => setIsAddDialogOpen(true)}
                            className="p-1.5 sm:p-2 border-[1.5px] border-black bg-emerald-500 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-full"
                        >
                            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                    </div>
    
                    {/* Table */}
                    <div className="px-1 sm:px-2 md:px-6 ">
                        <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6 overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                            <div className="inline-block min-w-full align-middle">
                                <table className="min-w-full border-collapse border-black">
                                    <thead>
                                        <tr className="bg-[#004D9F]">
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Order ID</th>
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Order Date</th>
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Customer ID</th>
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Order Detail</th>
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Expected Date</th>
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Finished Date</th>
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Order Price</th>
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Order Process</th>
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Payment Status</th>
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-white text-xs sm:text-sm font-medium border-b border-blue-500">Quotation no.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredOrders.map((order) => (
                                            <tr key={order.orderId} className="border-b hover:bg-gray-50">
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">
                                                    <Link 
                                                        href={`/order_detail/${order.orderId}`}
                                                        className="text-blue-600 hover:text-blue-800 hover:underline"
                                                    >
                                                        {order.orderId}
                                                    </Link>
                                                </td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{order.orderDate}</td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{order.customerId}</td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{order.orderDetail}</td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{order.expectedDate}</td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{order.finishedDate}</td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{order.orderPrice}</td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3">
                                                    <span className={`px-2 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm ${getStatusColor(order.orderProcess)}`}>
                                                        {order.orderProcess}
                                                    </span>
                                                </td>
                                                <td className={`px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm  ${getPaymentStatusColor(order.paymentStatus)}`}>
                                                    {order.paymentStatus}
                                                </td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{order.quotationNo}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
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