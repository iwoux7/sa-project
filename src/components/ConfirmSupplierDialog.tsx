// components/ConfirmDialog.tsx
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmSupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const ConfirmSupplierDialog: React.FC<ConfirmSupplierDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange} >
      <AlertDialogContent className='bg-white'>
        <AlertDialogHeader className='text-black'>
          <AlertDialogTitle>ยืนยันการเพิ่ม Supplier หรือไม่</AlertDialogTitle>
          <AlertDialogDescription>
            การดำเนินการนี้ไม่สามารถย้อนกลับได้
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='buttonwhite'>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm} 
            className="buttonemerald"
          >
            ยืนยัน
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};