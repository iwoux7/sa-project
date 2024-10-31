'use client';
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/layouts/AdminNavbar';
import Link from 'next/link';
import { Search, Plus } from 'lucide-react';
import AddOrderDialog from '@/components/AddOrderDialog';

// เพิ่ม interface สำหรับ Order
interface Order {
  ORDER_ID: string;
  ORDER_DATE: Date;
  CUSTOMER_ID: string;
  ORDER_DETAIL: string | null;
  EXPECTED_FINISH_DATE: Date | null;
  FINISHED_DATE: Date | null;
  ORDER_PRICE: number;
  ORDER_PROCESS: string | null;
  PAYMENT_STATUS: string | null;
  QUOTATION_NO: string | null;
  DEVICE_TYPE: string | null;
}



export default function OrderTrackingPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);

    // ดึงข้อมูล orders เมื่อโหลดหน้า
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    
    const filteredOrders = orders.filter(order => 
        order.ORDER_ID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.CUSTOMER_ID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.ORDER_DETAIL?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (order.QUOTATION_NO?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        String(order.ORDER_PRICE).includes(searchQuery) ||
        (order.ORDER_PROCESS?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    // Format date function
    const formatDate = (date: Date | null) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('th-TH');
    };

    // Format price function
    const formatPrice = (price: number) => {
        return price.toLocaleString('th-TH');
    };

    // แก้ไข handleAddOrder
    const handleAddOrder = async (orderData: any, quotationData: any) => {
        try {
          console.log('Sending order data:', orderData);
          const orderResponse = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
          });
          
          if (!orderResponse.ok) {
            throw new Error('Failed to create order');
          }
          
          const orderResult = await orderResponse.json();
          console.log('Order result:', orderResult);
      
          if (orderResult.status !== 'success') {
            throw new Error(orderResult.message || 'Failed to create order');
          }
      
          // เพิ่ม ORDER_ID เข้าไปใน quotationData
          const quotationWithOrderId = {
            ...quotationData,
            ORDER_ID: orderResult.data.ORDER_ID
          };
      
          console.log('Sending quotation data:', quotationWithOrderId);
          const quotationResponse = await fetch('/api/quotations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quotationWithOrderId)
          });
      
          if (!quotationResponse.ok) {
            console.error('Quotation response not ok:', quotationResponse);
            throw new Error('Failed to create quotation');
          }
      
          const quotationResult = await quotationResponse.json();
          console.log('Quotation result:', quotationResult);
      
          return {
            order: orderResult.data,
            quotation: quotationResult.data
          };
      
        } catch (error) {
          console.error('Error in handleAddOrder:', error);
          throw error;
        }
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
                                        <tr key={order.ORDER_ID} className="border-b hover:bg-gray-50">
                                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">
                                                <Link 
                                                href={{
                                                    pathname: `/order_detail/${order.ORDER_ID}`,
                                                    query: {
                                                        orderDate: formatDate(order.ORDER_DATE),
                                                        customerId: order.CUSTOMER_ID,
                                                        orderDetail: order.ORDER_DETAIL,
                                                        expectedDate: formatDate(order.EXPECTED_FINISH_DATE),
                                                        finishedDate: formatDate(order.FINISHED_DATE),
                                                        orderPrice: order.ORDER_PRICE,
                                                        orderProcess: order.ORDER_PROCESS,
                                                        paymentStatus: order.PAYMENT_STATUS,
                                                        quotationNo: order.QUOTATION_NO,
                                                        deviceType: order.DEVICE_TYPE
                                                    }
                                                }}
                                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                                >
                                                {order.ORDER_ID}
                                                </Link>
                                                </td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600"> {formatDate(order.ORDER_DATE)}</td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{order.CUSTOMER_ID}</td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{order.ORDER_DETAIL || '-'}</td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{formatDate(order.EXPECTED_FINISH_DATE)}</td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{formatDate(order.FINISHED_DATE)}</td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{formatPrice(order.ORDER_PRICE)}</td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3">
                                                    <span className={`px-2 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm ${getStatusColor(order.ORDER_PROCESS || '')}`}>
                                                        {order.ORDER_PROCESS}
                                                    </span>
                                                </td>
                                                <td className={`px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm  ${getPaymentStatusColor(order.PAYMENT_STATUS || '')}`}>
                                                    {order.PAYMENT_STATUS}
                                                </td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{order.QUOTATION_NO}</td>
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