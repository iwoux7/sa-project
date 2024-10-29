// components/AddSupplierDialog.tsx
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

interface AddSupplierDialogProps {
  formData: {
    supplierName: string,
    supplierPhoneNumber: string,
    supplierEmail: string,
    supplierAddress: string
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onReset: () => void;  // เพิ่ม prop นี้
}

export const AddSupplierDialog: React.FC<AddSupplierDialogProps> = ({
  formData,
  onInputChange,
  onSubmit,
  onReset,
}) => {
  const [errors, setErrors] = useState({
    supplierName: false,
    supplierPhoneNumber: false,
    supplierEmail: false
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // เมื่อปิด Dialog
      onReset(); // รีเซ็ตฟอร์ม
      setErrors({ // รีเซ็ต errors
        supplierName: false,
        supplierPhoneNumber: false,
        supplierEmail: false
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    onInputChange(e);
  
    // แก้ไขการ clear error
    if (name === 'supplierName' && value && errors.supplierName) {
      setErrors(prev => ({ ...prev, supplierName: false }));
    }
    if (name === 'supplierPhoneNumber' && value && errors.supplierPhoneNumber) {
      setErrors(prev => ({ ...prev, supplierPhoneNumber: false }));
    }
    if (name === 'supplierEmail' && value && errors.supplierEmail) {
      setErrors(prev => ({ ...prev, supplierEmail: false }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      supplierName: !formData.supplierName,
      supplierPhoneNumber: !formData.supplierPhoneNumber,
      supplierEmail: !formData.supplierEmail
    };
    
    setErrors(newErrors);

    if (!newErrors.supplierName && !newErrors.supplierPhoneNumber && !newErrors.supplierEmail) {
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
            เพิ่มข้อมูล Supplier
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
            <label className="text-sm font-medium text-black">
              ชื่อ Supplier<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleInputChange}
              placeholder="ชื่อ Supplier"
              className={`w-full px-4 py-2 rounded-lg border text-black placeholder-gray-500 ${
                errors.supplierName ? 'border-red-500' : 'border-black'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
            />
            {errors.supplierName && (
              <p className="text-red-500 text-sm mt-1">กรุณากรอกชื่อ Supplier</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black">
              เบอร์โทร<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="supplierPhoneNumber"
              value={formData.supplierPhoneNumber}
              onChange={handleInputChange}
              placeholder="เบอร์โทร"
              className={`w-full px-4 py-2 rounded-lg border text-black placeholder-gray-500 ${
                errors.supplierPhoneNumber ? 'border-red-500' : 'border-black'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
            />
            {errors.supplierPhoneNumber && (
              <p className="text-red-500 text-sm mt-1">กรุณากรอกเบอร์โทร</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black">
              อีเมล<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="supplierEmail"
              value={formData.supplierEmail}
              onChange={handleInputChange}
              placeholder="อีเมล"
              className={`w-full px-4 py-2 rounded-lg border text-black placeholder-gray-500 ${
                errors.supplierEmail ? 'border-red-500' : 'border-black'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
            />
            {errors.supplierEmail && (
              <p className="text-red-500 text-sm mt-1">กรุณากรอกอีเมล</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">ที่อยู่:</label>
            <input
              type="text"
              name="supplierAddress"
              value={formData.supplierAddress}
              onChange={onInputChange}
              placeholder="ที่อยู่"
              className="w-full px-4 py-2 rounded-lg border text-black placeholder-gray-500 border-black focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        <DialogFooter>
        <Button 
          onClick={handleSubmit}  // เปลี่ยนจาก onSubmit เป็น handleSubmit
          className="buttonemerald"
        >
          เพิ่ม Supplier
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};