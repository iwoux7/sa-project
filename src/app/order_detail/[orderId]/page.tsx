'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Navbar } from '@/layouts/AdminNavbar';
import { useParams, useSearchParams } from 'next/navigation';
import EditOrderDialog from '@/components/EditOrderDialog';

interface OrderDetail {
  orderId: string;
  orderDate: string;
  customerId: string;
  orderDetail: string;
  expectedDate: string;
  finishedDate: string;
  orderPrice: string;
  orderProcess: string;
  paymentStatus: string;
  quotationNo: string;
  deviceType: string;
  elementId: string;
  amount: number;
  wage: string;
  totalPrice: string;
  paymentType: string;
  remark: string;
}
const OrderDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {/* Header Skeleton */}
        <div className="flex items-center mb-4">
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex-1 h-8 bg-gray-200 rounded mx-4 animate-pulse"></div>
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Panel Skeleton */}
          <div className="border rounded-lg p-4">
            <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="space-y-3">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex-1 h-4 bg-gray-200 rounded ml-4 animate-pulse"></div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Right Panel Skeleton */}
          <div className="border rounded-lg p-4">
            <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
            {/* Tables Skeleton */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mb-4">
                <div className="h-12 bg-gray-200 rounded-t animate-pulse"></div>
                <div className="h-12 bg-gray-100 rounded-b animate-pulse"></div>
              </div>
            ))}
            {/* Buttons Skeleton */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default function OrderDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const orderId = params.orderId as string;
  const orderDate = searchParams.get('orderDate');
  const customerId = searchParams.get('customerId');
  const orderDetail = searchParams.get('orderDetail');
  const quotationNo = searchParams.get('quotationNo');

  const handleSaveEdit = (updatedData: any) => {
    // อัพเดทข้อมูลในระบบ
    setOrderData(updatedData);
    console.log('Updated data:', updatedData);
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setIsLoading(true);
        // ในสถานการณ์จริง คุณจะต้องเรียก API ของคุณที่นี่
        // const response = await fetch(`/api/orders/${params.orderId}`);
        // const data = await response.json();
        
        // สำหรับตัวอย่าง เราจะจำลองการดึงข้อมูล
        const mockData: OrderDetail = {
          orderId: orderId,
          orderDate: orderDate || 'N/A',
          customerId: customerId || 'N/A',
          orderDetail: orderDetail || 'N/A',
          expectedDate: searchParams.get('expectedDate') || 'N/A',
          finishedDate: searchParams.get('finishedDate') || 'N/A',
          orderPrice: searchParams.get('orderPrice') || '0',
          orderProcess: searchParams.get('orderProcess') || 'รอดำเนินการ',
          paymentStatus: searchParams.get('paymentStatus') || 'รอการชำระเงิน',
          quotationNo: quotationNo || 'N/A',
          deviceType: searchParams.get('deviceType') || 'มิเตอร์ไฟฟ้า TOU',
          elementId: searchParams.get('elementId') || 'N/A',
          amount: parseInt(searchParams.get('amount') || '1'),
          wage: searchParams.get('wage') || 'x,xxx',
          totalPrice: searchParams.get('totalPrice') || '0',
          paymentType: searchParams.get('paymentType') || 'โอนเงินทางธนาคาร',
          remark: searchParams.get('remark') || '-'
        };

        // จำลองการดีเลย์ของ network
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setOrderData(mockData);
        setError(null);
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.orderId) {
      fetchOrderData();
    }
  }, [params.orderId]);

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

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">ไม่พบข้อมูลออเดอร์</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
        <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 pt-14 sm:pt-16 md:pt-20">
          {/* Header */}
          <div className="bg-white rounded-lg shadow p-6">
              <Link href="/order_list" className="text-blue-600 mr-4">
                <div className="flex items-center">
                  <ChevronLeft className="w-4 h-4" />
                  ย้อนกลับ
                </div>
              </Link>
              <h1 style={{ color: '#004D9F' }} className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-4 sm:mb-6">รายละเอียดชิ้นงาน {orderData.orderId}</h1>
            

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Order Details Section */}
              <div className="border border-black rounded-lg bg-white text-black p-4">
                <div className="mb-4">
                  <h2 style={{ color: '#1e40af' }} className="text-lg text-center text-blue mb-3"><b>รายละเอียดคำสั่งซื้อ</b></h2>
                  <div className="space-y-2 text-sm ">
                    <div className="flex justify-between">
                      <div className="w-40 text-gray-600">รหัสออเดอร์</div>
                      <div>{orderData.orderId}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-40 text-gray-600">วันที่ลูกค้าสั่ง</div>
                      <div>{orderData.orderDate}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-40 text-gray-600">รหัสลูกค้า</div>
                      <div>{orderData.customerId}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-40 text-gray-600">รายละเอียดออเดอร์</div>
                      <div>{orderData.orderDetail}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-40 text-gray-600">วันที่คาดว่างานจะเสร็จ</div>
                      <div>{orderData.expectedDate}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-40 text-gray-600">วันที่งานเสร็จสิ้น</div>
                      <div>{orderData.finishedDate}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-40 text-gray-600">ราคาชิ้นงาน</div>
                      <div>{orderData.orderPrice}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-40 text-gray-600">สถานะออเดอร์</div>
                      <div>{orderData.orderProcess}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-40 text-gray-600">สถานะการชำระงาน</div>
                      <div>{orderData.paymentStatus}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-40 text-gray-600">เลขที่ใบเสนอราคา</div>
                      <div>{orderData.quotationNo}</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                <button 
                  onClick={() => setIsEditDialogOpen(true)}
                  className="buttonemerald"
                >
                  แก้ไขรายละเอียดสินค้า
                </button>

                <EditOrderDialog
                  open={isEditDialogOpen}
                  onOpenChange={setIsEditDialogOpen}
                  initialData = {orderData} // ส่ง orderData เป็น initialData
                  onSave={handleSaveEdit}
                />
                </div>
              </div>

              {/* Quotation Details Section */}
              <div className="border border-black rounded-lg bg-white p-4">
                <h2 className="text-lg text-black mb-4">รายละเอียดใบเสนอราคา</h2>
                
                {/* Material Info Table */}
                <div className="mb-4">
                  <div className="bg-blue-800 text-white p-2 rounded-t-lg">
                    <div className="grid grid-cols-5 gap-4 text-sm text-center">
                      <div>Quotation No. เลขที่ใบเสนอราคา</div>
                      <div>Order ID รหัสออเดอร์</div>
                      <div>Device Type ประเภทชิ้นงาน</div>
                      <div className="col-span-2">Date วันที่ออกใบเสนอราคา</div>
                    </div>
                  </div>
                  <div className="border-x border-b border-black text-black p-2 rounded-b-lg">
                    <div className="grid grid-cols-5 gap-4 text-sm text-center">
                      <div>{orderData.quotationNo}</div>
                      <div>{orderData.orderId}</div>
                      <div>{orderData.deviceType}</div>
                      <div className="col-span-2">11/08/2024</div>
                    </div>
                  </div>
                </div>

                {/* Price Details Table */}
                <div className="mb-4">
                  <div className="bg-blue-800 text-white p-2 rounded-t-lg">
                    <div className="grid grid-cols-3 text-sm text-center">
                      <div>Element ID รหัสชิ้นส่วน</div>
                      <div>Amount จำนวน</div>
                      <div>Price ราคา</div>
                    </div>
                  </div>
                  <div className="border-x border-b border-black p-2 rounded-b-lg">
                    <div className="grid grid-cols-3 text-sm text-center text-black">
                      <div>{orderData.elementId}</div>
                      <div>{orderData.amount}</div>
                      <div>{orderData.orderPrice}</div>
                    </div>
                  </div>
                </div>

                {/* Payment Info Table */}
                <div className="mb-4">
                  <div className="bg-blue-800 text-white p-2 rounded-t-lg">
                    <div className="grid grid-cols-4 text-sm text-center">
                      <div className="p-2 border-r">Wage ค่าแรง</div>
                      <div className="p-2 border-r text-center">Total Price ราคารวม</div>
                      <div className="p-2 border-r">Payment Type ประเภทการชำระเงิน</div>
                      <div className="p-2">Remark หมายเหตุ</div>
                    </div>
                  </div>
                  <div className="border-x border-b border-black p-2 rounded-b-lg">
                    <div className="grid grid-cols-4 text-sm text-center text-black">
                      <div>x,xxx</div>
                      <div>{orderData.totalPrice}</div>
                      <div>โอนเงินทางธนาคาร</div>
                      <div>-</div>
                    </div>
                  </div>
                </div>

                {/* Stacked Action Buttons */}
                <div className="flex flex-col items-center space-y-2">
                  <Link
                    href={`/order_detail/${params.orderId}/add-part`}
                    className="buttonemerald"
                  >
                    เพิ่มชิ้นส่วน
                  </Link>
                  <button className="buttonyellow">
                    ใบเสนอราคา
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
}