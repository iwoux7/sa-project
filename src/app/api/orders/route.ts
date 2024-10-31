// app/api/orders/route.ts
import { NextResponse , NextRequest} from 'next/server';
import prisma from '@/lib/prisma';

interface OrderResult {
    ORDER_ID: string;
    ORDER_DATE: string;
    CUSTOMER_ID: string;
    ORDER_DETAIL: string | null;
    EXPECTED_FINISH_DATE: string | null;
    FINISHED_DATE: string | null;
    ORDER_PRICE: string | number;
    ORDER_PROCESS: string | null;
    PAYMENT_STATUS: string | null;
    DEVICE_TYPE: string;
}

interface ApiResponse {
    status: 'success' | 'error';
    data?: any;
    message?: string;
    error?: string;
}

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
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        console.log('Received data:', data);

        // ตรวจสอบข้อมูลที่จำเป็น
        const requiredFields = ['orderDate', 'customerId', 'orderPrice', 'deviceType'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return NextResponse.json({
                    status: 'error',
                    message: `${field} is required`
                }, { status: 400 });
            }
        }

        // แปลงข้อมูลให้ตรงกับ database schema
        const orderData = {
            ORDER_DATE: data.orderDate,
            CUSTOMER_ID: data.customerId,
            ORDER_DETAIL: data.orderDetail || '',
            EXPECTED_FINISH_DATE: data.expectedDate,
            FINISHED_DATE: data.finishedDate,
            ORDER_PRICE: parseFloat(data.orderPrice),
            ORDER_PROCESS: data.orderProcess || 'รอการตัดสินใจ',
            PAYMENT_STATUS: data.paymentStatus || 'รอชำระค่าชิ้นงานรอบแรก',
            DEVICE_TYPE: data.deviceType
        };

        // สร้าง Order
        const query = `
            INSERT INTO CUSTOMER_ORDERS (
                ORDER_DATE,
                CUSTOMER_ID,
                ORDER_DETAIL,
                EXPECTED_FINISH_DATE,
                FINISHED_DATE,
                ORDER_PRICE,
                ORDER_PROCESS,
                PAYMENT_STATUS,
                DEVICE_TYPE
            ) VALUES (
                STR_TO_DATE(?, '%Y-%m-%d'),
                ?,
                ?,
                NULLIF(STR_TO_DATE(?, '%Y-%m-%d'), '0000-00-00'),
                NULLIF(STR_TO_DATE(?, '%Y-%m-%d'), '0000-00-00'),
                ?,
                ?,
                ?,
                ?
            )
        `;

        const params = [
            orderData.ORDER_DATE,
            orderData.CUSTOMER_ID,
            orderData.ORDER_DETAIL,
            orderData.EXPECTED_FINISH_DATE,
            orderData.FINISHED_DATE,
            orderData.ORDER_PRICE,
            orderData.ORDER_PROCESS,
            orderData.PAYMENT_STATUS,
            orderData.DEVICE_TYPE
        ];

        console.log('Query params:', params);

        await prisma.$executeRawUnsafe(query, ...params);

        // ดึงข้อมูล order ที่เพิ่งสร้าง
        const selectQuery = `
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
                DEVICE_TYPE
            FROM CUSTOMER_ORDERS 
            WHERE CUSTOMER_ID = ?
            AND ORDER_DATE >= CURDATE()
            ORDER BY ORDER_ID DESC 
            LIMIT 1
        `;

        const newOrder = await prisma.$queryRawUnsafe(selectQuery, orderData.CUSTOMER_ID);

        if (!newOrder || !Array.isArray(newOrder) || newOrder.length === 0) {
            return NextResponse.json({
                status: 'error',
                message: 'Order created but could not retrieve it'
            }, { status: 404 });
        }

        return NextResponse.json({
            status: 'success',
            data: newOrder[0]
        });

    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Failed to create order',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}