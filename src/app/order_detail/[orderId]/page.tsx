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
  deviceType: string;  // เพิ่ม field นี้
  elementId: string; 
}

interface ElementInQuotation {
  ELEMENT_ID: string;
  QUANTITY: number;
  ELEMENT_UNIT_PRICE: number;
  TOTAL_PRICE: number;
  ELEMENT_NAME: string;  // เปลี่ยนจาก nested object เป็น field ตรง
  ELEMENT_DETAIL: string | null;
}

interface QuotationDetail {
  QUOTATION_NO: string;
  DEVICE_TYPE: string;
  CREATE_DATE: string;
  ELEMENTS_IN_QUOTATION: ElementInQuotation[];
  WAGE: number;
  PAYMENT_TYPE: string;
  REMARK: string;
}

const getTotalPrice = (quotationData: QuotationDetail | null) => {
  if (!quotationData?.ELEMENTS_IN_QUOTATION) return 0;
  
  // แปลงเป็นตัวเลขก่อนคำนวณ
  const elementsTotal = quotationData.ELEMENTS_IN_QUOTATION.reduce(
    (sum, item) => sum + Number(item.TOTAL_PRICE), 
    0
  );
  
  // แปลง WAGE เป็นตัวเลข
  const wage = Number(quotationData.WAGE) || 0;
  
  return elementsTotal + wage;
}
export default function OrderDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState<OrderDetail | null>(null);
  const [quotationData, setQuotationData] = useState<QuotationDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleSaveEdit = (updatedData: any) => {
    // อัพเดทข้อมูลในระบบ
    setOrderData(updatedData);
    console.log('Updated data:', updatedData);
  };

  useEffect(() => {
    // ดึงข้อมูลจาก URL parameters
    const order: OrderDetail = {
      orderId: params.orderId as string,
      orderDate: searchParams.get('orderDate') || 'N/A',
      customerId: searchParams.get('customerId') || 'N/A',
      orderDetail: searchParams.get('orderDetail') || 'N/A',
      expectedDate: searchParams.get('expectedDate') || 'N/A',
      finishedDate: searchParams.get('finishedDate') || 'N/A',
      orderPrice: searchParams.get('orderPrice') || '0',
      orderProcess: searchParams.get('orderProcess') || 'รอดำเนินการ',
      paymentStatus: searchParams.get('paymentStatus') || 'รอการชำระเงิน',
      quotationNo: searchParams.get('quotationNo') || 'N/A',
      deviceType: searchParams.get('deviceType') || '-',
      elementId: searchParams.get('elementId') || 'N/A',
    };
    setOrderData(order);
    setIsLoading(false);
  }, [params, searchParams]);

  useEffect(() => {
    const fetchQuotationData = async () => {
      if (!orderData?.quotationNo || orderData.quotationNo === 'N/A') return;
      
      try {
        const response = await fetch(`/api/quotations/${orderData.quotationNo}`);
        if (!response.ok) throw new Error('Failed to fetch quotation');
        const result = await response.json();
        console.log('API Response:', result); // เพิ่มบรรทัดนี้
        setQuotationData(result.data);  // ต้องใช้ result.data เพราะเรา wrap ด้วย status
      } catch (error) {
        console.error('Error fetching quotation:', error);
      }
    };
  
    fetchQuotationData();
  }, [orderData?.quotationNo]);

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

                {/* Elements Table */}
                <div className="mb-4">
                  <div className="bg-blue-800 text-white p-2 rounded-t-lg">
                    <div className="grid grid-cols-4 text-sm text-center">
                      <div>Element ID</div>
                      <div>Element Name</div>
                      <div>Amount</div>
                      <div>Price</div>
                    </div>
                  </div>
                  <div className="border-x border-b border-black p-2 rounded-b-lg">
                    {!quotationData ? (
                      <div className="text-center text-gray-500 py-2">กำลังโหลดข้อมูล...</div>
                    ) : !Array.isArray(quotationData.ELEMENTS_IN_QUOTATION) ? (
                      <div className="text-center text-gray-500 py-2">ไม่พบข้อมูลชิ้นส่วน</div>
                    ) : quotationData.ELEMENTS_IN_QUOTATION.length === 0 ? (
                      <div className="text-center text-gray-500 py-2">ยังไม่มีชิ้นส่วน</div>
                    ) : (
                      quotationData.ELEMENTS_IN_QUOTATION.map((item: ElementInQuotation) => (
                        <div key={item.ELEMENT_ID} className="grid grid-cols-4 text-sm text-center text-black">
                          <div>{item.ELEMENT_ID}</div>
                          <div>{item.ELEMENT_NAME}</div>
                          <div>{item.QUANTITY}</div>
                          <div>{item.TOTAL_PRICE.toLocaleString('th-TH')}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Payment Info Table */}
                <div className="mb-4">
                  <div className="bg-blue-800 text-white p-2 rounded-t-lg">
                    <div className="grid grid-cols-4 text-sm text-center">
                      <div>Wage</div>
                      <div>Total Price</div>
                      <div>Payment Type</div>
                      <div>Remark</div>
                    </div>
                  </div>
                  <div className="border-x border-b border-black p-2 rounded-b-lg">
                    <div className="grid grid-cols-4 text-sm text-center text-black">
                      <div>{quotationData?.WAGE?.toLocaleString('th-TH')}</div>
                      <div>{getTotalPrice(quotationData).toLocaleString('th-TH')}</div>
                      <div>{quotationData?.PAYMENT_TYPE}</div>
                      <div>{quotationData?.REMARK || '-'}</div>
                    </div>
                  </div>
                </div>
              

                  {/* Stacked Action Buttons */}
                  <div className="flex flex-col items-center space-y-2">
                    <Link  
                    href={{
                        pathname:  `/order_detail/${params.orderId}/add-part`,
                        query: {
                            quotationNo : quotationData?.QUOTATION_NO
                        }
                    }}
                      className="buttonemerald"
                    >
                      เพิ่มชิ้นส่วน
                    </Link>
                    <button className="buttonyellow">
                      <a href='/Quotation'>
                      ใบเสนอราคา
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </main>
    </div>
  );
}