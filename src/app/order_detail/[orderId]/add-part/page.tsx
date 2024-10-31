'use client';
import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft } from 'lucide-react';
import { Navbar } from '@/layouts/AdminNavbar';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

// กำหนด interface สำหรับ TypeScript
interface Part {
  ELEMENT_ID: string;
  ELEMENT_NAME: string;
  ELEMENT_DETAIL: string | null;
  ELEMENT_UNIT_PRICE: number;
  ELEMENT_CATEGORY: string | null;
}

interface CartItem extends Part {
  quantity: number;
  total: number;
}

interface ElementToUpdate {
  ELEMENT_ID: string;
  QUANTITY: number;
  ELEMENT_UNIT_PRICE: number;
  TOTAL_PRICE: number;
}

interface QuotationUpdate {
  QUOTATION_NO: string;
  elements: ElementToUpdate[];
  WAGE: number;
  TOTAL_PRICE: number;
}


export default function AddPartsPage() {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [suggestions, setSuggestions] = useState<Part[]>([]);
  const [wage, setWage] = useState<number>(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [allParts, setAllParts] = useState<Part[]>([]); // เพิ่ม state สำหรับเก็บข้อมูลทั้งหมด
  const [isConfirmSaveOpen, setIsConfirmSaveOpen] = useState(false);
  const quotaionNo = params.quotationid;

  // ดึงข้อมูล Elements เมื่อโหลดหน้า
  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetch('/api/elements');
        if (!response.ok) {
          throw new Error('Failed to fetch elements');
        }
        const result = await response.json();
        if (result.status === 'success') {
          setAllParts(result.data);
        }
      } catch (error) {
        console.error('Error fetching elements:', error);
      }
    };

    fetchElements();
  }, []);

  // แก้ไขฟังก์ชัน handleSearch
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    console.log('All parts:', allParts); // เพิ่ม log ตรวจสอบข้อมูล
    const filtered = allParts.filter(part => 
      part.ELEMENT_ID.toLowerCase().includes(value.toLowerCase()) ||
      part.ELEMENT_NAME.toLowerCase().includes(value.toLowerCase())
    );
    console.log('Filtered suggestions:', filtered); // เพิ่ม log ตรวจสอบผลการ filter
    setSuggestions(filtered);
};

  // แก้ไขฟังก์ชัน handleAddPart
  const handleAddPart = () => {
    if (selectedPart) {
      const newItem: CartItem = {
        ...selectedPart,
        quantity,
        total: selectedPart.ELEMENT_UNIT_PRICE * quantity
      };
      
      setCartItems([...cartItems, newItem]);
      setSelectedPart(null);
      setQuantity(1);
      setIsConfirmOpen(false);
    }
  };

  // Select a part from suggestions
  const handleSelectPart = (part: Part) => {
    setSelectedPart(part);
    setSearchTerm('');
    setSuggestions([]);
  };

  // Remove part from cart
  const handleRemovePart = (index: number) => {
    const newItems = cartItems.filter((_, idx) => idx !== index);
    setCartItems(newItems);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const total = subtotal + wage; // คำนวณรวมกับค่าแรง


  const handleSave = async () => {
    try {
      const elements = cartItems.map(item => ({
        ELEMENT_ID: item.ELEMENT_ID,
        QUANTITY: item.quantity,
        ELEMENT_UNIT_PRICE: item.ELEMENT_UNIT_PRICE, // ไม่ต้อง parse เพราะเป็น number อยู่แล้ว
        TOTAL_PRICE: item.total
      }));
  
  
      // ดึง quotationNo จาก URL parameters
      const response = await fetch(`/api/quotations/${params.quotationNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          QUOTATION_NO: quotaionNo,
          elements: elements,
          WAGE: wage,
          TOTAL_PRICE: total
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update quotation');
      }
  
      const result = await response.json();
      if (result.status === 'success') {
        // Redirect back to order detail page
        window.location.href = `/order_detail/${params.orderId}`;
      } else {
        throw new Error(result.message || 'Failed to update quotation');
      }
  
    } catch (error) {
      console.error('Error saving quotation:', error);
      // แสดง error message ให้ user
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 pt-14 sm:pt-16 md:pt-20">
      <div className="bg-white rounded-lg shadow p-6">
        {/* Header with back button */}
        <div className="mb-6">
          <Link href={`/order_detail/${params.orderId}`}
            className="text-blue-600 flex items-center"
          >
            <ChevronLeft className="w-4 h-4 " />
            ย้อนกลับ
          </Link>
          <h1 style={{ color: '#1e40af' }}  className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-4 sm:mb-6">
            เพิ่มชิ้นส่วนในรหัส {params.orderId}
          </h1>
        </div>
          <div className="flex gap-8 p-6 ">
            {/* Left side - Cart */}
            <div className="w-1/2 border border-black rounded-lg p-4 ">
              <h2 style={{ color: '#1e40af' }} className="text-lg font-semibold mb-4 text-center">รายการชิ้นส่วน</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b text-black">
                    <th className="py-2 text-left"></th>
                    <th className="py-2 text-left">รหัส</th>
                    <th className="py-2 text-left">ชื่อชิ้นส่วน</th>
                    <th className="py-2 text-center">จำนวน</th>
                    <th className="py-2 text-right">ราคา</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-b">
                    <td className="py-2 w-8">
                      <button 
                        onClick={() => handleRemovePart(index)}
                        className="text-red-500 font-bold"
                      >
                        -
                      </button>
                    </td>
                    <td className="py-2 text-black">{item.ELEMENT_ID}</td>
                    <td className="py-2 text-black">{item.ELEMENT_NAME}</td>
                    <td className="py-2 text-center text-black">{item.quantity}</td>
                    <td className="py-2 text-right text-black">
                      {item.ELEMENT_UNIT_PRICE.toLocaleString()}
                    </td>
                  </tr>
                  ))}
                  {/* ถ้าไม่มีรายการ แสดงแถวว่าง */}
                    {cartItems.length === 0 && (
                      <tr className="border-y border-gray-200">
                        <td colSpan={5} className="py-2 text-center text-gray-500">
                          ไม่มีรายการชิ้นส่วน
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              <div className="mt-4 space-y-2 text-black">
                <div className="flex justify-between">
                  <span>รวมเงิน</span>
                  <span>{subtotal.toLocaleString()} บาท</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>ค่าแรง</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={wage}
                      onChange={(e) => setWage(Number(e.target.value) || 0)}
                      className="w-32 text-right border rounded px-2 py-1"
                      min="0"
                      step="100"
                    />
                    <span>บาท</span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>จำนวนเงินรวมทั้งสิ้น</span>
                  <span>{total.toLocaleString()} บาท</span>
                </div>
              </div>
            </div>

            {/* Right side - Search and Add */}
            <div className="w-1/2 border rounded-lg p-4">
              <div className="relative text-black">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="ค้นหาชิ้นส่วน"
                  className="w-full p-2 border rounded-lg pl-10"
                />
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                
                {/* แก้ไขส่วน suggestions */}
                {suggestions.length > 0 && (
                  <div className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
                    {suggestions.map((part) => (
                      <div
                        key={part.ELEMENT_ID}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelectPart(part)}
                      >
                        <div className="font-semibold">{part.ELEMENT_ID}</div>
                        <div className="text-sm text-gray-600">{part.ELEMENT_NAME}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedPart && (
                <div className="mt-4 space-y-4 text-black">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">รหัสชิ้นส่วน:</label>
                    <div>{selectedPart.ELEMENT_ID}</div>  
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ชื่อชิ้นส่วน:</label>
                    <div>{selectedPart.ELEMENT_NAME}</div> 
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">รายละเอียด:</label>
                    <div>{selectedPart.ELEMENT_DETAIL || '-'}</div> 
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ราคาต่อหน่วย:</label>
                    <div>{selectedPart.ELEMENT_UNIT_PRICE.toLocaleString()} บาท</div> 
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">จำนวน:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  
                  <button
                    onClick={() => setIsConfirmOpen(true)}
                    className="buttonemerald"
                  >
                    เพิ่มชิ้นส่วน
                  </button>
                </div>
              )}
              {/* Confirmation Modal */}
              <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent className="bg-white text-black">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ยืนยันการเพิ่มชิ้นส่วน {selectedPart?.ELEMENT_ID} หรือไม่
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {selectedPart?.ELEMENT_NAME}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                      <AlertDialogFooter>
                        <div className="flex justify-center gap-4 w-full">
                          <AlertDialogCancel className="buttonwhite">
                            ยกเลิก
                          </AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={handleAddPart}
                            className="w-24 buttonemerald">
                            ยืนยัน
                          </AlertDialogAction>
                        </div>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                </div>
              </div>
              {/* Bottom Action Buttons */}
                <div className="border-t p-4 flex justify-end gap-4">
                  <button
                    className="buttonemerald"
                    onClick={handleSave}
                    disabled={cartItems.length === 0} 
                  >
                    ยืนยัน
                  </button>
                  <AlertDialog open={isConfirmSaveOpen} onOpenChange={setIsConfirmSaveOpen}>
                    <AlertDialogContent className="bg-white text-black">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          ยืนยันการบันทึกข้อมูล
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          คุณต้องการบันทึกรายการชิ้นส่วนทั้งหมดใช่หรือไม่
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <div className="flex justify-center gap-4 w-full">
                          <AlertDialogCancel className="buttonwhite">
                            ยกเลิก
                          </AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={handleSave}
                            className="w-24 buttonemerald"
                          >
                            ยืนยัน
                          </AlertDialogAction>
                        </div>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
  );
}