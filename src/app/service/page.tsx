"use client";
import React, { useState } from 'react';
import { Navbar } from '@/layouts/Navbar';
import { ProductSection } from '@/components/ProductSection';

interface FormData {
  ElectricityBill: string;
  userate: string;
}

interface ValidationErrors {
  ElectricityBill?: string;
  userate?: string;
}

interface CalculationResults {
  type: string;
  originalBill: number;
  touTodCost: number;
  solarCost: number;
  solarBatteryCost: number;
  assemblyCosts: {
    switchboard: { min: number; max: number };
    solar: { min: number; max: number };
    battery: { min: number; max: number };
    solarSize: number;
    batterySize: number;
  };
  totalKwh: number;
  percentage: number;
}

export default function ServicePage() {
  const [formData, setFormData] = useState<FormData>({
    ElectricityBill: '',
    userate: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [results, setResults] = useState<CalculationResults | null>(null);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Validate Electricity Bill
    if (!formData.ElectricityBill) {
      newErrors.ElectricityBill = 'กรุณาระบุค่าไฟฟ้า';
    } else {
      const bill = Number(formData.ElectricityBill);
      if (isNaN(bill) || bill <= 0) {
        newErrors.ElectricityBill = 'ค่าไฟฟ้าต้องเป็นตัวเลขที่มากกว่า 0';
      }
    }

    // Validate Usage Rate
    if (!formData.userate) {
      newErrors.userate = 'กรุณาระบุเปอร์เซ็นต์การใช้งาน';
    } else {
      const rate = Number(formData.userate);
      if (isNaN(rate) || rate < 0 || rate > 100) {
        newErrors.userate = 'เปอร์เซ็นต์ต้องอยู่ระหว่าง 0-100';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateSavings = (bill: number, percentage: number) => {
    // Calculate total kWh based on TOD rate (5 baht/unit)
    const totalKwh = bill / 5;
    const peakKwh = totalKwh * (percentage / 100);
    const offPeakKwh = totalKwh * (1 - percentage / 100);
    
    // Calculate TOU+TOD costs with smart switching
    const weekdayRatio = 5/7;
    const weekendRatio = 2/7;
    
    const touCost = (
      (peakKwh * weekdayRatio * 6) +
      (offPeakKwh * weekdayRatio * 3) +
      (totalKwh * weekendRatio * 3)
    );
    
    const todCost = totalKwh * 5;
    const switchingCost = Math.min(touCost, todCost);
    
    // Solar calculations
    const solarCoverage = 0.7;
    const solarSavings = peakKwh * solarCoverage * 5;
    const solarCost = bill - solarSavings;
    
    // Battery calculations
    const batteryEfficiency = 0.85;
    const batterySavings = offPeakKwh * batteryEfficiency * 5;
    const solarBatteryCost = solarCost - batterySavings;

    const assemblyCosts = calculateAssemblyCosts(totalKwh, percentage);
    
    return {
      type: percentage < 50 ? 'TOU+TOD with Smart Switching' : 'Solar + Battery System',
      originalBill: bill,
      touTodCost: Math.round(switchingCost),
      solarCost: Math.round(solarCost),
      solarBatteryCost: Math.round(solarBatteryCost),
      assemblyCosts,
      totalKwh: Math.round(totalKwh),
      percentage
    };
  };

  const calculateAssemblyCosts = (totalKwh: number, percentage: number) => {
    const switchboardCost = {
      min: 35000,
      max: 50000
    };

    const solarSize = Math.ceil((totalKwh * (percentage / 100) * 0.7) / 150);
    const solarCost = {
      min: solarSize * 45000,
      max: solarSize * 55000
    };

    const batterySize = Math.ceil((totalKwh * (1 - percentage / 100) * 0.85) / 150);
    const batteryCost = {
      min: batterySize * 35000,
      max: batterySize * 45000
    };

    return {
      switchboard: switchboardCost,
      solar: solarCost,
      battery: batteryCost,
      solarSize,
      batterySize
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const bill = Number(formData.ElectricityBill);
      const percentage = Number(formData.userate);
      const results = calculateSavings(bill, percentage);
      setResults(results);
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <section id="service" className='service-card'>
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            คำนวณเพื่อหาผลิตภัณฑ์ที่เหมาะสมสำหรับคุณ
          </h2>
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  ค่าไฟฟ้าต่อเดือน (บาท)
                </label>
                <input
                  type="number"
                  className={`login-input ${errors.ElectricityBill ? 'border-red-500' : ''}`}
                  placeholder="ค่าไฟฟ้าต่อเดือน"
                  value={formData.ElectricityBill}
                  onChange={(e) => {
                    setFormData({...formData, ElectricityBill: e.target.value});
                    if (errors.ElectricityBill) {
                      setErrors({...errors, ElectricityBill: undefined});
                    }
                  }}
                />
                {errors.ElectricityBill && (
                  <p className="text-red-500 text-sm mt-1">{errors.ElectricityBill}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  เปอร์เซ็นต์การใช้ไฟฟ้าในช่วง 9:00 - 22:00 น.
                </label>
                <input
                  type="number"
                  className={`login-input ${errors.userate ? 'border-red-500' : ''}`}
                  placeholder="เปอร์เซ็นต์การใช้ไฟฟ้าในช่วง 9:00 - 22:00 น."
                  value={formData.userate}
                  onChange={(e) => {
                    setFormData({...formData, userate: e.target.value});
                    if (errors.userate) {
                      setErrors({...errors, userate: undefined});
                    }
                  }}
                />
                {errors.userate && (
                  <p className="text-red-500 text-sm mt-1">{errors.userate}</p>
                )}
              </div>

              <div className='button-container-green'>
                <button
                  type="submit"
                  className="green-button">
                  คำนวณ
                </button>
              </div>
            </form>

            {results && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="mb-4 p-3 bg-blue-50 rounded">
                  <h3 className="font-medium mb-2">คำแนะนำโซลูชัน:</h3>
                  <p className="text-blue-800 font-medium">
                    {results.percentage < 50 ? 
                      'แนะนำใช้มิเตอร์ TOU+TOD พร้อมระบบสวิตช์อัตโนมัติ' : 
                      'แนะนำติดตั้งระบบโซลาร์เซลล์และแบตเตอรี่'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">ค่าไฟปัจจุบัน</p>
                    <p className="text-lg font-medium">{results.originalBill.toLocaleString()} ฿/เดือน</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ปริมาณการใช้ไฟฟ้า</p>
                    <p className="text-lg font-medium">{results.totalKwh.toLocaleString()} หน่วย/เดือน</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-t pt-3">
                    <h4 className="font-medium mb-2">ทางเลือกที่ 1: ระบบ TOU+TOD</h4>
                    <p className="text-sm text-gray-600">ค่าไฟฟ้าประมาณ: {results.touTodCost.toLocaleString()} ฿/เดือน</p>
                    <p className="text-sm text-gray-600">ประหยัด: {(results.originalBill - results.touTodCost).toLocaleString()} ฿/เดือน</p>
                    <p className="text-sm text-gray-600">ค่าติดตั้งประมาณ: {results.assemblyCosts.switchboard.min.toLocaleString()} - {results.assemblyCosts.switchboard.max.toLocaleString()} ฿</p>
                  </div>

                  <div className="border-t pt-3">
                    <h4 className="font-medium mb-2">ทางเลือกที่ 2: ระบบโซลาร์เซลล์</h4>
                    <p className="text-sm text-gray-600">ขนาดระบบที่แนะนำ: {results.assemblyCosts.solarSize} kW</p>
                    <p className="text-sm text-gray-600">ค่าไฟฟ้าประมาณ: {results.solarCost.toLocaleString()} ฿/เดือน</p>
                    <p className="text-sm text-gray-600">ประหยัด: {(results.originalBill - results.solarCost).toLocaleString()} ฿/เดือน</p>
                    <p className="text-sm text-gray-600">ค่าติดตั้งประมาณ: {results.assemblyCosts.solar.min.toLocaleString()} - {results.assemblyCosts.solar.max.toLocaleString()} ฿</p>
                  </div>

                  <div className="border-t pt-3">
                    <h4 className="font-medium mb-2">ทางเลือกที่ 3: ระบบโซลาร์เซลล์ + แบตเตอรี่</h4>
                    <p className="text-m text-gray-600">ขนาดแบตเตอรี่ที่แนะนำ: {results.assemblyCosts.batterySize} kW</p>
                    <p className="text-sm text-gray-600">ค่าไฟฟ้าประมาณ: {results.solarBatteryCost.toLocaleString()} ฿/เดือน</p>
                    <p className="text-sm text-gray-600">ประหยัด: {(results.originalBill - results.solarBatteryCost).toLocaleString()} ฿/เดือน</p>
                    <p className="text-sm text-gray-600">ค่าติดตั้งเพิ่มเติม: {results.assemblyCosts.battery.min.toLocaleString()} - {results.assemblyCosts.battery.max.toLocaleString()} ฿</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">ระยะเวลาคุ้มทุนโดยประมาณ</h4>
                    {results.percentage < 50 ? (
                      <p className="text-sm">
                        ระบบ TOU+TOD: {Math.round(results.assemblyCosts.switchboard.max / (results.originalBill - results.touTodCost))} เดือน
                      </p>
                    ) : (
                      <>
                        <p className="text-sm">ระบบโซลาร์เซลล์: {Math.round(results.assemblyCosts.solar.max / (results.originalBill - results.solarCost))} เดือน</p>
                        <p className="text-sm">ระบบโซลาร์เซลล์ + แบตเตอรี่: {Math.round((results.assemblyCosts.solar.max + results.assemblyCosts.battery.max) / (results.originalBill - results.solarBatteryCost))} เดือน</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <ProductSection />
    </div>
  );
}