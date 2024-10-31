'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, User } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { Navbar } from '@/layouts/AdminNavbar';

interface CustomerDetail {
    customerId: string;
    customerName: string;
    customerPhone_Number: string;
    customerEmail: string;
    customerAddress: string;
    customerStatus: string;
    customerQuestion: string;
}

interface Order {
    ORDER_ID: string;
    CUSTOMER_ID: string;
    ORDER_DATE: string;
    ORDER_DETAIL: string | null;
    FINISHED_DATE: string | null;
    ORDER_PRICE: number;
    ORDER_PROCESS: string | null;
    QUOTATION_NO: string | null;
}

export default function CustomerDetailPage({}) {
    const params = useParams();
    const searchParams = useSearchParams();
    const [customerData, setCustomerData] = useState<CustomerDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        // ตั้งค่าข้อมูลลูกค้าโดยตรงจาก searchParams
        const customerData = {
            customerId: params.customerId as string,
            customerName: searchParams.get('customerName') || '',
            customerPhone_Number: searchParams.get('customerPhone_Number') || '',
            customerEmail: searchParams.get('customerEmail') || '',
            customerAddress: searchParams.get('customerAddress') || '',
            customerStatus: searchParams.get('customerStatus') || '',
            customerQuestion: searchParams.get('customerQuestion') || ''
        };
        
        setCustomerData(customerData);
        setIsLoading(false);
    }, [params.customerId, searchParams]);

  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    const fetchOrders = async () => {
        try {
            if (!params.customerId) return;
            
            const response = await fetch(`/api/customer/${params.customerId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const result = await response.json();
            console.log('API Response:', result);

            if (result.status === 'success') {
                setOrders(result.data);
            } else {
                throw new Error(result.message || 'Failed to fetch orders');
            }

        } catch (err) {
            console.error("Error fetching orders:", err);
            setError('ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้');
        } finally {
            setIsLoading(false);
        }
    };

    fetchOrders();
}, [params.customerId]); // เปลี่ยน dependency เป็น params.customerId

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">กำลังโหลดข้อมูล...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg text-red-600">{error}</div>
            </div>
        );
    }

    if (!customerData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">ไม่พบข้อมูลลูกค้า</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 pt-14 sm:pt-16 md:pt-20">
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-12">
                <Link href="/customer" className="inline-flex items-center text-[#004D9F] hover:underline">
                <ChevronLeft className="w-4 h-4 mr-1" />
                ย้อนกลับ
                </Link>
            <h1 style = {{color : '#004D9F'}}className="text-2xl text-center font-semibold py-3">
                {customerData.customerId} {customerData.customerName}
            </h1>

        {/* Customer Information Card */}
        <div style={{ width: '500px' }} className="mx-auto border-black rounded-2xl shadow-xl border mb-8">
            <div className="p-6">
                <div className="flex gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full border-2 border-gray-200 flex items-center justify-center bg-gray-50">
                            <User className="w-12 h-12 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4"> {/* เปลี่ยนเป็น flex column และเพิ่ม space-y-4 */}
                        <div>
                            <div className="flex items-baseline gap-5"> {/* ใช้ flex และ gap สำหรับระยะห่าง */}
                                <span className="text-lg text-black">ชื่อ-นามสกุล</span>
                                <span className="text-black">{customerData.customerName}</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-baseline gap-5">
                                <div className="text-lg text-black">เบอร์โทร</div>
                                <div className="text-black">{customerData.customerPhone_Number}</div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-baseline gap-5">
                                <div className="text-lg text-black">อีเมล</div>
                                <div className="text-black">{customerData.customerEmail}</div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-baseline gap-5">
                                <div className="text-lg text-black whitespace-nowrap">ที่อยู่</div>
                                <div className="text-black ">{customerData.customerAddress}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Order History Section */}
        <div className="rounded-lg shadow-sm ">
          <div className="p-6 border-b">
            <h2 style = {{color : '#004D9F'}}className="text-center text-2xl font-semibold">ประวัติการสั่งซื้อของลูกค้า</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full ">
              <thead>
                <tr className="bg-[#004D9F] text-white">
                  <th className="px-6 py-3 text-left text-sm font-medium">Order ID<br/>รหัสออเดอร์</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Order Date<br/>วันที่สั่งซื้อ</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Order Detail<br/>รายละเอียดออเดอร์</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Finished Date<br/>วันที่เสร็จสิ้น</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Order Price<br/>ราคาทั้งหมด</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Order Process<br/>สถานะออเดอร์</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Quotation no.<br/>เลขที่ใบเสนอราคา</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                    <tr>
                        <td colSpan={7} className="text-center py-4">ไม่มีประวัติการสั่งซื้อ</td>
                    </tr>
                ) : (
                    orders.map((order, index) => (
                        <tr key={order.ORDER_ID} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-6 py-4 text-m text-black">{order.ORDER_ID}</td>
                            <td className="px-6 py-4 text-m text-black">
                                {new Date(order.ORDER_DATE).toLocaleDateString('th-TH')}
                            </td>
                            <td className="px-6 py-4 text-m text-black">{order.ORDER_DETAIL || '-'}</td>
                            <td className="px-6 py-4 text-m text-black">
                                {order.FINISHED_DATE ? 
                                    new Date(order.FINISHED_DATE).toLocaleDateString('th-TH') : 
                                    '-'
                                }
                            </td>
                            <td className="px-6 py-4 text-m text-black">
                                {order.ORDER_PRICE?.toLocaleString('th-TH')}
                            </td>
                            <td className="px-6 py-4 text-m text-black">{order.ORDER_PROCESS || '-'}</td>
                            <td className="px-6 py-4 text-m text-black">{order.QUOTATION_NO || '-'}</td>
                        </tr>
                    ))
                )}
            </tbody>
            </table>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}