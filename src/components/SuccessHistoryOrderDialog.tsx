import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle2 } from 'lucide-react';

interface SuccessHistoryOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SuccessHistoryOrderDialog: React.FC<SuccessHistoryOrderDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[360px] bg-white">
        <AlertDialogHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
          </div>
          <AlertDialogTitle className="text-center text-black text-xl">
            เพิ่มประวัติการสั่งซื้อเรียบร้อย
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center">
          <AlertDialogAction 
            className="buttonemerald"
            onClick={() => onOpenChange(false)}
          >
            ตกลง
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};