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

interface AddHistoryOrderDialogProps {
    formData: {
      historyorderDate: string,
      elementId: string,
      amount: number,
      price: number,
    };
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    onReset: () => void;  // เพิ่ม prop นี้
  }
  
  export const AddHistoryOrderDialog: React.FC<AddHistoryOrderDialogProps> = ({
    formData,
    onInputChange,
    onSubmit,
    onReset,
  }) => {
    const [errors, setErrors] = useState({
      historyorderDate: false,
      elementId: false,
      amount: false,
      price: false
    });
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      
      onInputChange(e);
  
      if (name === 'historyorderDate' && value && errors.historyorderDate) {
        setErrors(prev => ({ ...prev, historyorderDate: false }));
      }
      if (name === 'elementId' && value && errors.elementId) {
        setErrors(prev => ({ ...prev, elementId: false }));
      }
      if (name === 'amount' && value && errors.amount) {
        setErrors(prev => ({ ...prev, amount: false }));
      }
      if (name === 'price' && value && errors.price) {
        setErrors(prev => ({ ...prev, price: false }));
      }
    };
  
    const handleSubmit = () => {
      const newErrors = {
        historyorderDate: !formData.historyorderDate,
        elementId: !formData.elementId,
        amount: !formData.amount,
        price: !formData.price
      };
      
      setErrors(newErrors);
  
      if (!Object.values(newErrors).some(error => error)) {
        onSubmit();
      }
    };
  
    const handleOpenChange = (open: boolean) => {
      if (!open) {
        onReset();
        setErrors({
          historyorderDate: false,
          elementId: false,
          amount: false,
          price: false
        });
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
              เพิ่มประวัติการสั่งซื้อ
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">
                วันที่สั่งซื้อชิ้นส่วน
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="historyorderDate"
                value={formData.historyorderDate}
                onChange={handleInputChange}
                placeholder="DD/MM/YYYY"
                className={`w-full px-4 py-2 rounded-lg border text-black placeholder-gray-500 ${
                  errors.historyorderDate ? 'border-red-500' : 'border-black'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
              />
              {errors.historyorderDate && (
                <p className="text-red-500 text-sm mt-1">กรุณากรอกวันที่สั่งซื้อ</p>
              )}
            </div>
  
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">
                รหัสชิ้นส่วน
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="elementId"
                value={formData.elementId}
                onChange={handleInputChange}
                placeholder="รหัสชิ้นส่วน"
                className={`w-full px-4 py-2 rounded-lg border text-black placeholder-gray-500 ${
                  errors.elementId ? 'border-red-500' : 'border-black'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
              />
              {errors.elementId && (
                <p className="text-red-500 text-sm mt-1">กรุณากรอกรหัสชิ้นส่วน</p>
              )}
            </div>
  
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">
                จำนวน
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="จำนวน"
                className={`w-full px-4 py-2 rounded-lg border text-black placeholder-gray-500 ${
                  errors.amount ? 'border-red-500' : 'border-black'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">กรุณากรอกจำนวน</p>
              )}
            </div>
  
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">
                ราคาต่อหน่วย
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="ราคาต่อชิ้นส่วน"
                className={`w-full px-4 py-2 rounded-lg border text-black placeholder-gray-500 ${
                  errors.price ? 'border-red-500' : 'border-black'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">กรุณากรอกราคา</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleSubmit}
              className="buttonemerald"
            >
              เพิ่มประวัติการสั่งซื้อ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };