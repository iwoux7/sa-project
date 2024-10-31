// app/api/quotations/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface QuotationResult {
    QUOTATION_NO: string;
    CO_NAME: string;
    CO_ADDRESS: string | null;
    CO_PHONE_NUMBER: string;
    CO_EMAIL: string | null;
    ORDER_ID: string | null;
    DEVICE_TYPE: string | null;
    CREATE_DATE: string;
    WAGE: number | null;
    TOTAL_PRICE: number | null;
    PAYMENT_TYPE: string | null;
    REMARK: string | null;
}

interface ApiResponse {
    status: 'success' | 'error';
    data?: any;
    message?: string;
    error?: string;
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        if (!data) {
            return NextResponse.json({
                status: 'error',
                message: 'No data provided'
            } as ApiResponse, { status: 400 });
        }

        // สร้าง Quotation ใหม่
        const query = `
            INSERT INTO QUOTATIONS (
                CO_NAME,
                CO_ADDRESS,
                CO_PHONE_NUMBER,
                CO_EMAIL,
                ORDER_ID,
                DEVICE_TYPE,
                WAGE,
                TOTAL_PRICE,
                PAYMENT_TYPE,
                REMARK
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await prisma.$executeRawUnsafe(
            query,
            data.CO_NAME,
            data.CO_ADDRESS,
            data.CO_PHONE_NUMBER,
            data.CO_EMAIL,
            data.ORDER_ID,
            data.DEVICE_TYPE,
            data.WAGE || 0,
            data.TOTAL_PRICE,
            data.PAYMENT_TYPE,
            data.REMARK || null
        );

        // ดึงข้อมูล quotation ที่เพิ่งสร้าง
        const newQuotation = await prisma.$queryRaw<QuotationResult[]>`
            SELECT 
                QUOTATION_NO,
                CO_NAME,
                CO_ADDRESS,
                CO_PHONE_NUMBER,
                CO_EMAIL,
                ORDER_ID,
                DEVICE_TYPE,
                DATE_FORMAT(CREATE_DATE, '%Y-%m-%d %H:%i:%s') as CREATE_DATE,
                WAGE,
                TOTAL_PRICE,
                PAYMENT_TYPE,
                REMARK
            FROM QUOTATIONS 
            WHERE ORDER_ID = ${data.ORDER_ID}
            ORDER BY CREATE_DATE DESC
            LIMIT 1
        `;

        if (!newQuotation || newQuotation.length === 0) {
            return NextResponse.json({
                status: 'error',
                message: 'Quotation created but could not retrieve it'
            } as ApiResponse, { status: 404 });
        }

        // อัพเดท QUOTATION_NO ในตาราง CUSTOMER_ORDERS
        await prisma.$executeRawUnsafe(
            `UPDATE CUSTOMER_ORDERS 
             SET QUOTATION_NO = ? 
             WHERE ORDER_ID = ?`,
            newQuotation[0].QUOTATION_NO,
            data.ORDER_ID
        );

        return NextResponse.json({
            status: 'success',
            data: newQuotation[0]
        } as ApiResponse);

    } catch (error) {
        console.error('Error creating quotation:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Error creating quotation',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        } as ApiResponse, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const orderId = searchParams.get('orderId');
        
        let query = `
            SELECT 
                q.*,
                DATE_FORMAT(q.CREATE_DATE, '%Y-%m-%d %H:%i:%s') as CREATE_DATE
            FROM QUOTATIONS q
        `;

        const params: any[] = [];
        if (orderId) {
            query += ` WHERE q.ORDER_ID = ?`;
            params.push(orderId);
        }

        query += ` ORDER BY q.CREATE_DATE DESC`;

        const quotations = await prisma.$queryRawUnsafe<QuotationResult[]>(query, ...params);

        return NextResponse.json({
            status: 'success',
            data: quotations
        } as ApiResponse);

    } catch (error) {
        console.error('Error fetching quotations:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Error fetching quotations',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        } as ApiResponse, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();
        const { QUOTATION_NO, ...updateData } = data;

        if (!QUOTATION_NO) {
            return NextResponse.json({
                status: 'error',
                message: 'Quotation number is required'
            } as ApiResponse, { status: 400 });
        }

        // Update quotation using raw query
        const updateFields = Object.entries(updateData)
            .filter(([_, value]) => value !== undefined)
            .map(([key, _]) => `${key} = ?`)
            .join(', ');

        const updateValues = Object.entries(updateData)
            .filter(([_, value]) => value !== undefined)
            .map(([_, value]) => value);

        if (updateFields) {
            await prisma.$executeRawUnsafe(
                `UPDATE QUOTATIONS SET ${updateFields} WHERE QUOTATION_NO = ?`,
                ...updateValues,
                QUOTATION_NO
            );
        }

        // Get updated quotation
        const updatedQuotation = await prisma.$queryRaw<QuotationResult[]>`
            SELECT 
                *,
                DATE_FORMAT(CREATE_DATE, '%Y-%m-%d %H:%i:%s') as CREATE_DATE
            FROM QUOTATIONS 
            WHERE QUOTATION_NO = ${QUOTATION_NO}
        `;

        if (!updatedQuotation || updatedQuotation.length === 0) {
            return NextResponse.json({
                status: 'error',
                message: 'Quotation not found'
            } as ApiResponse, { status: 404 });
        }

        return NextResponse.json({
            status: 'success',
            data: updatedQuotation[0]
        } as ApiResponse);

    } catch (error) {
        console.error('Error updating quotation:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Error updating quotation',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        } as ApiResponse, { status: 500 });
    }
}