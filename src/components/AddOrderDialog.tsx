'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfirmAddOrderDialog } from './ConfirmAddOrderDialog';
import { SuccessAddOrderDialog } from './SuccessAddOrderDialog';
import CustomPopupMenu from './CustomPopupMenu';

interface OrderData {
  orderId: string;
  deviceType: string;
  orderDate: string;
  customerId: string;
  orderDetail: string;
  expectedDate: string;
  finishedDate: string;
  orderPrice: string;
  orderProcess: string;
  paymentStatus: string;
  quotationNo: string;
}

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (newOrder: any) => void;
}

const deviceTypeOptions = [
  { value: 'มิเตอร์ไฟฟ้า TOU', label: 'มิเตอร์ไฟฟ้า TOU' },
  { value: 'โซลาเซลล์', label: 'โซลาเซลล์' },
  { value: 'แบตเตอรี่', label: 'แบตเตอรี่' }
];

const orderProcessOptions = [
    { value: 'รอยืนยันการชำระเงิน', label: 'รอยืนยันการชำระเงิน' },
    { value: 'ยืนยันการชำระเงิน', label: 'ยืนยันการชำระเงิน' },
    { value: 'กำลังประกอบชิ้นงาน', label: 'กำลังประกอบชิ้นงาน' },
    { value: 'ชิ้นงานประกอบเสร็จสิ้น', label: 'ชิ้นงานประกอบเสร็จสิ้น' },
    { value: 'ยืนยันการชำระเงินครบถ้วน', label: 'ยืนยันการชำระเงินครบถ้วน' },
    { value: 'ส่งมอบชิ้นงานเรียบร้อย', label: 'ส่งมอบชิ้นงานเรียบร้อย' },
];

const paymentStatusOptions = [
  { value: 'รอการชำระเงิน', label: 'รอการชำระเงิน' },
  { value: 'ชำระเงินแล้ว', label: 'ชำระเงินแล้ว' }
];

export default function AddOrderDialog({ open, onOpenChange, onAdd }: AddOrderDialogProps) {
  const [formData, setFormData] = useState<Omit<OrderData, 'orderId'>>({
    deviceType: '',
    orderDate: '',
    customerId: '',
    orderDetail: '',
    expectedDate: '',
    finishedDate: '',
    orderPrice: '',
    orderProcess: 'รอดำเนินการทั้งหมด',
    paymentStatus: 'รอการชำระเงิน',
    quotationNo: ''
  });

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const inputStyles = "w-full px-3 py-2 border border-gray-300 rounded bg-white";
  const labelStyles = "w-40 text-right whitespace-nowrap";

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

const handleSubmitClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    const newOrder: OrderData = {
      ...formData,
      orderId: `SD${Math.floor(Math.random() * 1000)}`,
    };
    
    onAdd(newOrder);
    setShowConfirmDialog(false);
    setShowSuccessDialog(true);
  };

  const handleSuccess = () => {
    setShowSuccessDialog(false);
    onOpenChange(false);
    // รีเซ็ตฟอร์ม
    setFormData({
      deviceType: '',
      orderDate: '',
      customerId: '',
      orderDetail: '',
      expectedDate: '',
      finishedDate: '',
      orderPrice: '',
      orderProcess: 'รอดำเนินการทั้งหมด',
      paymentStatus: 'รอการชำระเงิน',
      quotationNo: ''
    });
  };


  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl p-6 bg-white text-black">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium text-blue-800 text-center">
              เพิ่มคำสั่งซื้อ
            </DialogTitle>
          </DialogHeader>
  
          {/* Form Content */}
          <div className="space-y-4 mt-6">
            {/* ประเภทชิ้นงาน */}
            <div className="flex items-center gap-3">
              <label className={labelStyles}>ประเภทชิ้นงาน :</label>
              <CustomPopupMenu
                title="ประเภทชิ้นงาน"
                value={formData.deviceType}
                options={deviceTypeOptions}
                onChange={(value) => handleFieldChange('deviceType', value)}
                className={inputStyles}
              />
            </div>
  
            {/* วันที่ลูกค้าสั่ง และ รหัสลูกค้า */}
            <div className="flex items-center gap-3">
              <label className={labelStyles}>วันที่ลูกค้าสั่ง :</label>
              <input
                type="date"
                value={formData.orderDate}
                onChange={(e) => handleFieldChange('orderDate', e.target.value)}
                className={inputStyles}
                style={{ width: '200px' }}
              />
              <label className={labelStyles}>รหัสลูกค้า :</label>
              <input
                type="text"
                value={formData.customerId}
                onChange={(e) => handleFieldChange('customerId', e.target.value)}
                className={inputStyles}
                style={{ width: '200px' }}
              />
            </div>
  
            {/* รายละเอียดออเดอร์ */}
            <div className="flex items-center gap-3">
              <label className={labelStyles}>รายละเอียดออเดอร์ :</label>
              <input
                type="text"
                value={formData.orderDetail}
                onChange={(e) => handleFieldChange('orderDetail', e.target.value)}
                className={inputStyles}
              />
            </div>
  
            {/* วันที่คาดว่างานจะเสร็จ และ วันที่ชิ้นงานเสร็จสิ้น */}
            <div className="flex items-center gap-3">
              <label className={labelStyles}>วันที่คาดว่างานจะเสร็จ :</label>
              <input
                type="date"
                value={formData.expectedDate}
                onChange={(e) => handleFieldChange('expectedDate', e.target.value)}
                className={inputStyles}
                style={{ width: '200px' }}
              />
              <label className={`${labelStyles} ml-4`}>วันที่ชิ้นงานเสร็จสิ้น :</label>
              <input
                type="date"
                value={formData.finishedDate}
                onChange={(e) => handleFieldChange('finishedDate', e.target.value)}
                className={inputStyles}
                style={{ width: '200px' }}
              />
            </div>
  
            {/* ราคาชิ้นงาน */}
            <div className="flex items-center gap-3">
              <label className={labelStyles}>ราคาชิ้นงาน :</label>
              <input
                type="text"
                value={formData.orderPrice}
                onChange={(e) => handleFieldChange('orderPrice', e.target.value)}
                className={inputStyles}
                style={{ width: '200px' }}
              />
            </div>
  
            {/* สถานะออเดอร์ และ สถานะการชำระเงิน */}
            <div className="flex items-center gap-3">
              <label className={labelStyles}>สถานะออเดอร์ :</label>
              <CustomPopupMenu
                title="สถานะออเดอร์"
                value={formData.orderProcess}
                options={orderProcessOptions}
                onChange={(value) => handleFieldChange('orderProcess', value)}
                className={inputStyles}
              />
              <label className={`${labelStyles} ml-4`}>สถานะการชำระเงิน :</label>
              <CustomPopupMenu
                title="สถานะการชำระเงิน"
                value={formData.paymentStatus}
                options={paymentStatusOptions}
                onChange={(value) => handleFieldChange('paymentStatus', value)}
                className={inputStyles}
              />
            </div>
  
            {/* ปุ่มบันทึก */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmitClick}
                className="buttonemerald"
              >
                เพิ่มคำสั่งซื้อ
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  
      <ConfirmAddOrderDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirm}
      />
  
      <SuccessAddOrderDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        onSuccess={handleSuccess}
      />
    </>
  );
}