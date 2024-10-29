// components/AddElementDialog.tsx
import React, { useState } from 'react'; 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface AddElementDialogProps {
  formData: {
    supplierId: string;
    elementName: string;
    elementDetail: string;
    unitPrice: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onReset: () => void;  // เพิ่ม prop นี้
}

export const AddElementDialog: React.FC<AddElementDialogProps> = ({
  formData,
  onInputChange,
  onSubmit,
  onReset,
}) => {
  const [errors, setErrors] = useState({
    elementId: false,
    elementName: false
  });

  // เพิ่มฟังก์ชันสำหรับจัดการเมื่อ Dialog เปิด/ปิด
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // เมื่อปิด Dialog
      onReset(); // รีเซ็ตฟอร์ม
      setErrors({ // รีเซ็ต errors
        elementId: false,
        elementName: false
      });
    }
  };
  // เพิ่มฟังก์ชันใหม่สำหรับจัดการ input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // เรียก onInputChange ที่ส่งมาจาก props
    onInputChange(e);

    // ถ้ามีการพิมพ์ในช่องที่มี error ให้ clear error นั้น
    if (name === 'supplierId' && value && errors.elementId) {
      setErrors(prev => ({ ...prev, elementId: false }));
    }
    if (name === 'elementName' && value && errors.elementName) {
      setErrors(prev => ({ ...prev, elementName: false }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      elementId: !formData.supplierId,
      elementName: !formData.elementName
    };
    
    setErrors(newErrors);

    if (!newErrors.elementId && !newErrors.elementName) {
      onSubmit();
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" size="icon" className="border-[1.5px] border-black bg-emerald-500 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-full">
          <Plus className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center text-[#004D9F]">
            เพิ่มชิ้นส่วนอุปกรณ์
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">
              รหัส Supplier
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="supplierId"
              value={formData.supplierId}
              onChange={handleInputChange}
              placeholder="รหัส Supplier"
              className={`w-full px-4 py-2 rounded-lg border text-black placeholder-gray-500 ${
                errors.elementId ? 'border-red-500' : 'border-black'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
            />
            {errors.elementId && (
              <p className="text-red-500 text-sm mt-1">กรุณากรอกรหัส Supplier</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">
              ชื่อชิ้นส่วน
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="elementName"
              value={formData.elementName}
              onChange={handleInputChange}
              placeholder="ชื่อชิ้นส่วน"
              className={`w-full px-4 py-2 rounded-lg border text-black placeholder-gray-500 ${
                errors.elementName ? 'border-red-500' : 'border-black'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
            />
            {errors.elementName && (
              <p className="text-red-500 text-sm mt-1">กรุณาใส่ชื่อชิ้นส่วน</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">รายละเอียดชิ้นส่วน:</label>
            <input
              type="text"
              name="elementDetail"
              value={formData.elementDetail}
              onChange={onInputChange}
              placeholder="รายละเอียดชิ้นส่วน"
              className="w-full px-4 py-2 rounded-lg border text-black placeholder-gray-500 border-black focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">ราคาต่อหน่วย:</label>
            <input
              type="text"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={onInputChange}
              placeholder="ราคาต่อหน่วย"
              className="w-full px-4 py-2 rounded-lg border text-black placeholder-gray-500 border-black focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleSubmit} 
            className="buttonemerald"
          >
            เพิ่มชิ้นส่วน
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};