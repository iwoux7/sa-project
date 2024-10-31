// app/api/orders/[orderId]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


const validOrderProcesses = [
    'รอการตัดสินใจ',
    'กำลังประกอบชิ้นงาน',
    'ชิ้นงานประกอบเสร็จสิ้น',
    'ส่งมอบชิ้นงานเรียบร้อย',
    'ยกเลิกคำสั่งซื้อ'
];

const validPaymentStatuses = [
    'รอชำระค่าชิ้นงานรอบแรก',
    'รอยืนยันการชำระเงิน',
    'ยืนยันการชำระเงินรอบแรก',
    'ยืนยันการชำระเงินครบถ้วน'
];

export async function GET() {
    try {
        const orders = await prisma.cUSTOMER_ORDERS.findMany({
            orderBy: {
                ORDER_DATE: 'desc'
            }
        });
        return NextResponse.json(orders);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { orderId: string } }
) {
    try {
        const data = await request.json();
        console.log('Update data received:', data);
        console.log('Parameters for query:', [
            data.orderDate,
            data.customerId,
            data.orderDetail || '',
            data.expectedDate || null,
            data.finishedDate || null,
            parseFloat(data.orderPrice),
            data.orderProcess,
            data.paymentStatus,
            data.quotationNo || null,
            data.deviceType,        // ตรวจสอบค่านี้
            params.orderId
        ]);

        // Validate order process
        if (!validOrderProcesses.includes(data.orderProcess)) {
            return NextResponse.json(
                { 
                    error: 'Invalid ORDER_PROCESS value',
                    validValues: validOrderProcesses 
                },
                { status: 400 }
            );
        }

        // Validate payment status
        if (!validPaymentStatuses.includes(data.paymentStatus)) {
            return NextResponse.json(
                { 
                    error: 'Invalid PAYMENT_STATUS value',
                    validValues: validPaymentStatuses 
                },
                { status: 400 }
            );
        }

        const query = `
            UPDATE CUSTOMER_ORDERS 
            SET 
                ORDER_DATE = STR_TO_DATE(?, '%Y-%m-%d'),
                CUSTOMER_ID = ?,
                ORDER_DETAIL = ?,
                EXPECTED_FINISH_DATE = NULLIF(STR_TO_DATE(?, '%Y-%m-%d'), '0000-00-00'),
                FINISHED_DATE = NULLIF(STR_TO_DATE(?, '%Y-%m-%d'), '0000-00-00'),
                ORDER_PRICE = ?,
                ORDER_PROCESS = ?,
                PAYMENT_STATUS = ?,
                QUOTATION_NO = ?,
                DEVICE_TYPE = ?
            WHERE ORDER_ID = ?
        `;

        await prisma.$executeRawUnsafe(
            query,
            data.orderDate,
            data.customerId,
            data.orderDetail || '',
            data.expectedDate || null,
            data.finishedDate || null,
            parseFloat(data.orderPrice),
            data.orderProcess,
            data.paymentStatus,
            data.quotationNo || null,
            data.deviceType, 
            params.orderId
        );

        // Fetch updated order
        const updatedOrder = await prisma.$queryRaw`
            SELECT 
                ORDER_ID,
                DATE_FORMAT(ORDER_DATE, '%Y-%m-%d') as ORDER_DATE,
                CUSTOMER_ID,
                ORDER_DETAIL,
                DATE_FORMAT(EXPECTED_FINISH_DATE, '%Y-%m-%d') as EXPECTED_FINISH_DATE,
                DATE_FORMAT(FINISHED_DATE, '%Y-%m-%d') as FINISHED_DATE,
                ORDER_PRICE,
                ORDER_PROCESS,
                PAYMENT_STATUS,
                QUOTATION_NO,
                DEVICE_TYPE
            FROM CUSTOMER_ORDERS 
            WHERE ORDER_ID = ${params.orderId}
        `;

        if (!updatedOrder || !Array.isArray(updatedOrder) || updatedOrder.length === 0) {
            return NextResponse.json(
                { error: 'Order not found after update' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            status: 'success',
            data: updatedOrder[0]
        });

    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json(
            { 
                error: 'Failed to update order',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}