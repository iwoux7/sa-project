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
  orderDate: string;
  customerId: string;
  orderDetail: string;
  expectedDate: string | null;
  finishedDate: string | null;
  orderPrice: string;
  orderProcess: string;
  paymentStatus: string;
  deviceType: string;
}

interface QuotationData {
  CO_NAME: string;
  CO_ADDRESS: string;
  CO_PHONE_NUMBER: string;
  CO_EMAIL: string;
  DEVICE_TYPE: string;
  TOTAL_PRICE: number;
  PAYMENT_TYPE: string;
  REMARK?: string;
}

interface AddOrderResponse {
  order: any;
  quotation: any;
}

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (orderData: OrderData, quotationData: QuotationData) => Promise<AddOrderResponse>;
}


const deviceTypeOptions = [
  { value: 'มิเตอร์ไฟฟ้า TOU', label: 'มิเตอร์ไฟฟ้า TOU' },
  { value: 'โซลาเซลล์', label: 'โซลาเซลล์' },
  { value: 'แบตเตอรี่', label: 'แบตเตอรี่' }
];

const orderProcessOptions = [
  { value: 'รอการตัดสินใจ', label: 'รอการตัดสินใจ' },
  { value: 'กำลังประกอบชิ้นงาน', label: 'กำลังประกอบชิ้นงาน' },
  { value: 'ชิ้นงานประกอบเสร็จสิ้น', label: 'ชิ้นงานประกอบเสร็จสิ้น' },
  { value: 'ส่งมอบชิ้นงานเรียบร้อย', label: 'ส่งมอบชิ้นงานเรียบร้อย' },
  { value: 'ยกเลิกคำสั่งซื้อ', label: 'ยกเลิกคำสั่งซื้อ' }
];

const paymentStatusOptions = [
  { value: 'รอชำระค่าชิ้นงานรอบแรก', label: 'รอชำระค่าชิ้นงานรอบแรก' },
  { value: 'รอยืนยันการชำระเงิน', label: 'รอยืนยันการชำระเงิน' },
  { value: 'ยืนยันการชำระเงินรอบแรก', label: 'ยืนยันการชำระเงินรอบแรก' },
  { value: 'ยืนยันการชำระเงินครบถ้วน', label: 'ยืนยันการชำระเงินครบถ้วน' }
];

export default function AddOrderDialog({ open, onOpenChange, onAdd }: AddOrderDialogProps) {
  const [formData, setFormData] = useState<OrderData>({
    orderDate: '',
    customerId: '',
    orderDetail: '',
    expectedDate: null,
    finishedDate: null,
    orderPrice: '',
    orderProcess: 'รอการตัดสินใจ',
    paymentStatus: 'รอชำระค่าชิ้นงานรอบแรก',
    deviceType: deviceTypeOptions[0].value
  });

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputStyles = "w-full px-3 py-2 border border-gray-300 rounded bg-white";
  const labelStyles = "w-40 text-right whitespace-nowrap";

  const validateForm = () => {
    if (!formData.orderDate) {
      setError('กรุณาระบุวันที่สั่งซื้อ');
      return false;
    }
    if (!formData.customerId) {
      setError('กรุณาระบุรหัสลูกค้า');
      return false;
    }
    if (!formData.orderPrice) {
      setError('กรุณาระบุราคาชิ้นงาน');
      return false;
    }
    if (!formData.deviceType) {
      setError('กรุณาระบุประเภทอุปกรณ์');
      return false;
    }
    setError(null);
    return true;
  };

  const handleFieldChange = (field: keyof OrderData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitClick = () => {
    if (validateForm()) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirm = async () => {
    try {
      // สร้างข้อมูลสำหรับ Order - ส่งข้อมูลตามที่ API ต้องการ
      const orderData = {
        orderDate: formData.orderDate,
        customerId: formData.customerId,
        orderDetail: formData.orderDetail,
        expectedDate: formData.expectedDate,
        finishedDate: formData.finishedDate,
        orderPrice: formData.orderPrice,
        orderProcess: formData.orderProcess,
        paymentStatus: formData.paymentStatus,
        deviceType: formData.deviceType
      };
  
      // สร้างข้อมูลสำหรับ Quotation
      const quotationData = {
        CO_NAME: 'Tech Lifestyle',
        CO_ADDRESS: '248 ซ.พิบูลสงคราม 22 แขวงบางซื่อ เขตบางซื่อ กรุงเทพฯ 11000',
        CO_PHONE_NUMBER: '0656217887',
        CO_EMAIL: 'msnntb@gmail.com',
        DEVICE_TYPE: formData.deviceType,
        TOTAL_PRICE: parseFloat(formData.orderPrice),
        PAYMENT_TYPE: 'โอนเงินทางธนาคาร'
      };
  
      await onAdd(orderData, quotationData);
      setShowConfirmDialog(false);
      setShowSuccessDialog(true);
  
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      setShowConfirmDialog(false);
    }
  };


  const handleSuccess = () => {
    setShowSuccessDialog(false);
    onOpenChange(false);
    setFormData({
      orderDate: '',
      customerId: '',
      orderDetail: '',
      expectedDate: null,
      finishedDate: null,
      orderPrice: '',
      orderProcess: 'รอการตัดสินใจ',
      paymentStatus: 'รอชำระค่าชิ้นงานรอบแรก',
      deviceType: deviceTypeOptions[0].value
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

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4 mt-6">
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

            <div className="flex items-center gap-3">
              <label className={labelStyles}>ประเภทอุปกรณ์ :</label>
              <CustomPopupMenu
                title="ประเภทอุปกรณ์"
                value={formData.deviceType}
                options={deviceTypeOptions}
                onChange={(value) => handleFieldChange('deviceType', value)}
                className={inputStyles}
              />
            </div>

            <div className="flex items-center gap-3">
              <label className={labelStyles}>รายละเอียดออเดอร์ :</label>
              <input
                type="text"
                value={formData.orderDetail}
                onChange={(e) => handleFieldChange('orderDetail', e.target.value)}
                className={inputStyles}
              />
            </div>

            <div className="flex items-center gap-3">
              <label className={labelStyles}>วันที่คาดว่างานจะเสร็จ :</label>
              <input
                type="date"
                value={formData.expectedDate || ''}
                onChange={(e) => handleFieldChange('expectedDate', e.target.value)}
                className={inputStyles}
                style={{ width: '200px' }}
              />
              <label className={`${labelStyles} ml-4`}>วันที่ชิ้นงานเสร็จสิ้น :</label>
              <input
                type="date"
                value={formData.finishedDate || ''}
                onChange={(e) => handleFieldChange('finishedDate', e.target.value)}
                className={inputStyles}
                style={{ width: '200px' }}
              />
            </div>

            <div className="flex items-center gap-3">
              <label className={labelStyles}>ราคาชิ้นงาน :</label>
              <input
                type="number"
                value={formData.orderPrice}
                onChange={(e) => handleFieldChange('orderPrice', e.target.value)}
                className={inputStyles}
                style={{ width: '200px' }}
              />
            </div>

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

            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmitClick}
                className="px-6 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
              >
                เพิ่มคำสั่งซื้อ
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showConfirmDialog && (
        <ConfirmAddOrderDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
          onConfirm={handleConfirm}
        />
      )}

      {showSuccessDialog && (
        <SuccessAddOrderDialog
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}