// app/api/orders/[customerId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Order {
    ORDER_ID: string;
    CUSTOMER_ID: string;
    ORDER_DATE: string;
    ORDER_DETAIL: string | null;
    FINISHED_DATE: string | null;
    ORDER_PRICE: number;
    ORDER_PROCESS: string | null;
    QUOTATION_NO: string | null;
}

export async function GET(
    request: NextRequest,
    { params }: { params: { customerId: string } }
) {
    try {
        // ใช้ parameterized query เพื่อความปลอดภัย
        const query = `
            SELECT 
                ORDER_ID,
                CUSTOMER_ID,
                DATE_FORMAT(ORDER_DATE, '%Y-%m-%d') as ORDER_DATE,
                ORDER_DETAIL,
                DATE_FORMAT(FINISHED_DATE, '%Y-%m-%d') as FINISHED_DATE,
                ORDER_PRICE,
                ORDER_PROCESS,
                QUOTATION_NO
            FROM CUSTOMER_ORDERS
            WHERE CUSTOMER_ID = ?
            ORDER BY ORDER_DATE DESC
        `;

        const orders = await prisma.$queryRawUnsafe<Order[]>(
            query,
            params.customerId
        );

        // log เพื่อตรวจสอบข้อมูล
        console.log('Customer ID:', params.customerId);
        console.log('Found orders:', orders);

        return NextResponse.json({
            status: 'success',
            data: orders
        });

    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            { 
                status: 'error',
                message: "เกิดข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อ",
                error: error instanceof Error ? error.message : 'Unknown error' 
            }, 
            { status: 500 }
        );
    }
}