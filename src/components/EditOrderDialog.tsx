'use client';
import React, { useEffect , useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfirmEditOrderDialog } from './ConfirmEditOrderDialog';
import { SuccessEditOrderDialog } from './SuccessEditOrderDialog';
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
  { value: 'รอการตัดสินใจ', label: 'รอการตัดสินใจ' },
  { value: 'กำลังประกอบชิ้นงาน', label: 'กำลังประกอบชิ้นงาน' },
  { value: 'ชิ้นงานประกอบเสร็จสิ้น', label: 'ชิ้นงานประกอบเสร็จสิ้น' },
  { value: 'ส่งมอบชิ้นงานเรียบร้อย', label: 'ส่งมอบชิ้นงานเรียบร้อย' },
  { value: 'ยกเลิกคำสั่งซื้อ', label: 'ยกเลิกคำสั่งซื้อ' }
];

const paymentStatuses= [
  { value: 'รอชำระค่าชิ้นงานรอบแรก', label: 'รอชำระค่าชิ้นงานรอบแรก' },
  { value: 'รอยืนยันการชำระเงิน', label: 'รอยืนยันการชำระเงิน' },
  { value: 'ยืนยันการชำระเงินรอบแรก', label: 'ยืนยันการชำระเงินรอบแรก' },
  { value: 'ยืนยันการชำระเงินครบถ้วน', label: 'ยืนยันการชำระเงินครบถ้วน' }
];


export default function EditOrderDialog({
  open,
  onOpenChange,
  initialData, // รับ initialData แทน orderId
  onSave
}: EditOrderDialogProps) {
  // ใช้ initialData เป็นค่าเริ่มต้น
  const [formData, setFormData] = React.useState<OrderData>(initialData);
  const deviceValues = deviceTypes.map(item => item.value);
  
  const formatDateForInput = (dateString: string | null) => {
    if (!dateString) return '';
    // ถ้าวันที่อยู่ในรูปแบบ dd/mm/yyyy ให้แปลงเป็น yyyy-mm-dd
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    // ถ้าเป็นวันที่ปกติให้ format ให้ถูกต้อง
    return new Date(dateString).toISOString().split('T')[0];
  };
  // ไม่จำเป็นต้องมี loading state แล้วเพราะได้ข้อมูลมาตั้งแต่ต้น
  useEffect(() => {
    const updateData = async () => {
      try {
        const response = await fetch(`/api/orders/${initialData.orderId}`);
        if (!response.ok) throw new Error('Failed to fetch order');
        const data = await response.json();
        console.log('Fetched data:', data);

        setFormData({
          orderId: data.ORDER_ID,
          orderDate: formatDateForInput(data.ORDER_DATE),
          customerId: data.CUSTOMER_ID,
          orderDetail: data.ORDER_DETAIL || '',
          expectedDate: formatDateForInput(data.EXPECTED_FINISH_DATE),
          finishedDate: formatDateForInput(data.FINISHED_DATE),
          orderPrice: data.ORDER_PRICE.toString(),
          orderProcess: data.ORDER_PROCESS,
          paymentStatus: data.PAYMENT_STATUS,
          quotationNo: data.QUOTATION_NO || '',
          deviceType: data.DEVICE_TYPE || deviceTypes[0].value // แก้จาก device_type เป็น DEVICE_TYPE
        });
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    const formatInitialDate = (dateString: string) => {
      if (!dateString || dateString === 'N/A') return '';
      // แปลงวันที่จาก dd/mm/yyyy เป็น yyyy-mm-dd
      if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
      return dateString;
    };

    setFormData({
      ...initialData,
      orderDate: formatInitialDate(initialData.orderDate),
      expectedDate: formatInitialDate(initialData.expectedDate),
      finishedDate: formatInitialDate(initialData.finishedDate),
    });

    console.log('Initial data:', initialData);
    if (initialData.orderId) {
      updateData();
    }
  }, [initialData])

  const handleFieldChange = (field: keyof OrderData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const inputStyles = "w-full px-3 py-2 border border-gray-300 rounded bg-white";
  const labelStyles = "w-40 text-right whitespace-nowrap";

  const handleSubmitClick = async () => {
    try {
      const formatDateForAPI = (dateString: string) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      const formDataToSubmit = {
        ...formData,
        orderDate: formatDateForAPI(formData.orderDate),
        expectedDate: formatDateForAPI(formData.expectedDate),
        finishedDate: formatDateForAPI(formData.finishedDate),
      };
      
      const response = await fetch(`/api/orders/${formData.orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update order');
      }
  
      const updatedOrder = await response.json();
      setShowConfirmDialog(true);
      onSave(updatedOrder);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (show error message to user)
    }
  };

  const handleConfirm = () => {
    setShowConfirmDialog(false);
    setShowSuccessDialog(true);
    onOpenChange(false)
  };

  return (
    <>
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
            value={formData.deviceType || deviceTypes[0].value} // เพิ่ม fallback value
            options={deviceTypes}
            onChange={(value) => handleFieldChange('deviceType', value)}
            className={inputStyles}
          />
          {/* เพิ่ม debug info */}
          {process.env.NODE_ENV === 'development' && (
            <span className="text-xs text-gray-500">
              (Current value: {formData.deviceType})
            </span>
          )}
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
              onClick={handleSubmitClick}
              className="buttonemerald"
            >
              แก้ไขคำสั่งซื้อ
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <ConfirmEditOrderDialog
      open={showConfirmDialog}
      onOpenChange={setShowConfirmDialog}
      onConfirm={handleConfirm}
    />
    <SuccessEditOrderDialog
      open={showSuccessDialog}
      onOpenChange={setShowSuccessDialog}
    />
    </>
  );
}