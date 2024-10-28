'use client';
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomPopupMenu from './CustomPopupMenu';

// กำหนด interface สำหรับข้อมูล
interface OrderData {
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
}

// แก้ไข interface ของ props
interface EditOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: OrderData; // เปลี่ยนจาก orderId เป็น initialData
  onSave: (data: OrderData) => void;
}

const deviceTypes = [
  { value: 'มิเตอร์ไฟฟ้า TOU', label: 'มิเตอร์ไฟฟ้า TOU' },
  { value: 'โซลาเซลล์', label: 'โซลาเซลล์' },
  { value: 'แบตเตอรี่', label: 'แบตเตอรี่' }
];

const orderStatuses = [
  { value: 'รอยืนยันการชำระเงิน', label: 'รอยืนยันการชำระเงิน' },
  { value: 'ยืนยันการชำระเงิน', label: 'ยืนยันการชำระเงิน' },
  { value: 'กำลังประกอบชิ้นงาน', label: 'กำลังประกอบชิ้นงาน' },
  { value: 'ชิ้นงานประกอบเสร็จสิ้น', label: 'ชิ้นงานประกอบเสร็จสิ้น' },
  { value: 'ยืนยันการชำระเงินครบถ้วน', label: 'ยืนยันการชำระเงินครบถ้วน' },
  { value: 'ส่งมอบชิ้นงานเรียบร้อย', label: 'ส่งมอบชิ้นงานเรียบร้อย' },
];

const paymentStatuses = [
  { value: 'รอการชำระรอบแรก', label: 'รอการชำระรอบแรก' },
  { value: 'ชำระเงินรอบแรก', label: 'ชำระเงินรอบแรก' },
  { value: 'รอการชำระเงินรอบสุดท้าย', label: 'รอการชำระเงินรอบสุดท้าย' },
  { value: 'ชำระเงินครบถ้วน', label: 'ชำระเงินครบถ้วน' },
];


export default function EditOrderDialog({
  open,
  onOpenChange,
  initialData, // รับ initialData แทน orderId
  onSave
}: EditOrderDialogProps) {
  // ใช้ initialData เป็นค่าเริ่มต้น
  const [formData, setFormData] = React.useState<OrderData>(initialData);

  // ไม่จำเป็นต้องมี loading state แล้วเพราะได้ข้อมูลมาตั้งแต่ต้น
  useEffect(() => {
    // อัพเดท formData เมื่อ initialData เปลี่ยน
    setFormData(initialData);
  }, [initialData]);

  const handleFieldChange = (field: keyof OrderData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const inputStyles = "w-full px-3 py-2 border border-gray-300 rounded bg-white";
  const labelStyles = "w-40 text-right whitespace-nowrap";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-6 bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-blue-800 text-center">
            แก้ไขคำสั่งซื้อ
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
              options={deviceTypes}
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
              options={orderStatuses}
              onChange={(value) => handleFieldChange('orderProcess', value)}
              className={inputStyles}
            />
            <label className={`${labelStyles} ml-4`}>สถานะการชำระเงิน :</label>
            <CustomPopupMenu
              title="สถานะการชำระเงิน"
              value={formData.paymentStatus}
              options={paymentStatuses}
              onChange={(value) => handleFieldChange('paymentStatus', value)}
              className={inputStyles}
            />
          </div>

          {/* เลขที่ใบเสนอราคา */}
          <div className="flex items-center gap-3">
            <label className={labelStyles}>เลขที่ใบเสนอราคา :</label>
            <input
              type="text"
              value={formData.quotationNo}
              onChange={(e) => handleFieldChange('quotationNo', e.target.value)}
              className={inputStyles}
              style={{ width: '200px' }}
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                onSave(formData);
                onOpenChange(false);
              }}
              className="buttonemerald"
            >
              แก้ไขคำสั่งซื้อ
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}