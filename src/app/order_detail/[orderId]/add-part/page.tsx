'use client';
import React, { useState } from 'react';
import { Search, ChevronLeft } from 'lucide-react';
import { Navbar } from '@/layouts/Navbar';
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
  id: string;
  name: string;
  specs: string;
  price: string;
}

interface CartItem extends Part {
  quantity: number;
  total: number;
}

// Sample data structure for parts
const sampleParts: Part[] = [
  {
    id: 'ELM001',
    name: 'Tongwei solar Mono 405W Full-black',
    specs: 'โซลาเซลล์ 405W ไบเฟส 20.5 เซล ขนาด 1.134 x 17.22 x 30 มม.',
    price: 'x,xxx'
  },
  {
    id: 'ELM007',
    name: 'เทคโนโลยีหลัก TMDA-PYT1F',
    specs: 'Sample specs for ELM007',
    price: 'xx,xxx'
  },
  {
    id: 'ELM008',
    name: 'Smart meter 1 phase for TMDA',
    specs: 'Sample specs for ELM008',
    price: 'xx,xxx'
  }
];

export default function AddPartsPage() {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [suggestions, setSuggestions] = useState<Part[]>([]);
  const [wage, setWage] = useState<number>(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Handle search input
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    const filtered = sampleParts.filter(part => 
      part.id.toLowerCase().includes(value.toLowerCase()) ||
      part.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  // Select a part from suggestions
  const handleSelectPart = (part: Part) => {
    setSelectedPart(part);
    setSearchTerm('');
    setSuggestions([]);
  };

  // Add part to cart
  const handleAddPart = () => {
    if (selectedPart) {
      const newItem: CartItem = {
        ...selectedPart,
        quantity,
        total: parseFloat(selectedPart.price.replace(/[^0-9.-]+/g, '')) * quantity
      };
      
      setCartItems([...cartItems, newItem]);
      setSelectedPart(null);
      setQuantity(1);
      setIsConfirmOpen(false);
    }
  };

  // Remove part from cart
  const handleRemovePart = (index: number) => {
    const newItems = cartItems.filter((_, idx) => idx !== index);
    setCartItems(newItems);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const total = subtotal + wage; // คำนวณรวมกับค่าแรง


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 ">
        {/* Header with back button */}
        <div className="mb-6">
          <Link 
            href={`/order_detail/${params.orderId}`}
            className="text-blue-600 flex items-center mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            ย้อนกลับ
          </Link>
          <h1 style={{ color: '#1e40af' }}  className="text-xl font-semibold text-center">
            เพิ่มชิ้นส่วนในรหัส {params.orderId}
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow">
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
                      <td className="py-2 text-black">{item.id}</td>
                      <td className="py-2 text-black">{item.name}</td>
                      <td className="py-2 text-center text-black">{item.quantity}</td>
                      <td className="py-2 text-right text-black">{item.price}</td>
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
                
                {suggestions.length > 0 && (
                  <div className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
                    {suggestions.map((part) => (
                      <div
                        key={part.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelectPart(part)}
                      >
                        <div className="font-semibold">{part.id}</div>
                        <div className="text-sm text-gray-600">{part.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedPart && (
                <div className="mt-4 space-y-4 text-black">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">รหัสชิ้นส่วน:</label>
                    <div>{selectedPart.id}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ชื่อชิ้นส่วน:</label>
                    <div>{selectedPart.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">รายละเอียด:</label>
                    <div>{selectedPart.specs}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ราคาต่อหน่วย:</label>
                    <div>{selectedPart.price} บาท</div>
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
                    <AlertDialogContent className="bg-white text-black ">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          ยืนยันการเพิ่มชิ้นส่วน {selectedPart?.id} หรือไม่
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {selectedPart?.name}
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
                    onClick={() => {
                      // Handle save with wage
                      console.log('Saving order with items:', cartItems, 'wage:', wage);
                    }}
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          </div>
  );
}