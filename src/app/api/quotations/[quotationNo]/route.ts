// app/api/quotations/[quotationNo]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface QuotationWithElements {
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
  ELEMENTS_IN_QUOTATION: Array<{
    ELEMENT_ID: string;
    QUANTITY: number;
    ELEMENT_UNIT_PRICE: number;
    TOTAL_PRICE: number;
    ELEMENT_NAME: string;
    ELEMENT_DETAIL: string | null;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { quotationNo: string } }
) {
  try {
    const quotationNo = params.quotationNo;

    // 1. ดึงข้อมูล quotation หลัก
    const quotationQuery = `
      SELECT 
        q.*,
        DATE_FORMAT(q.CREATE_DATE, '%Y-%m-%d') as CREATE_DATE
      FROM QUOTATIONS q
      WHERE q.QUOTATION_NO = ?
    `;

    const quotation = await prisma.$queryRawUnsafe(quotationQuery, quotationNo);

    if (!quotation || !Array.isArray(quotation) || quotation.length === 0) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Quotation not found' 
        }, 
        { status: 404 }
      );
    }

    // 2. ดึงข้อมูล elements ในใบเสนอราคา
    const elementsQuery = `
      SELECT 
        eq.ELEMENT_ID,
        eq.QUANTITY,
        eq.ELEMENT_UNIT_PRICE,
        eq.TOTAL_PRICE,
        e.ELEMENT_NAME,
        e.ELEMENT_DETAIL
      FROM ELEMENTS_IN_QUOTATION eq
      JOIN ELEMENTS e ON eq.ELEMENT_ID = e.ELEMENT_ID
      WHERE eq.QUOTATION_NO = ?
    `;

    const elements = await prisma.$queryRawUnsafe(elementsQuery, quotationNo);

    // 3. รวมข้อมูลเข้าด้วยกัน
    const responseData: QuotationWithElements = {
      ...quotation[0],
      ELEMENTS_IN_QUOTATION: elements || []
    };

    return NextResponse.json({
      status: 'success',
      data: responseData
    });

  } catch (error) {
    console.error('Error fetching quotation:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to fetch quotation',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { quotationNo: string } }
) {
  try {
    const quotationNo = params.quotationNo;
    const data = await request.json();

    // 1. อัพเดทข้อมูล quotation
    const updateQuery = `
      UPDATE QUOTATIONS 
      SET 
        CO_NAME = ?,
        CO_ADDRESS = ?,
        CO_PHONE_NUMBER = ?,
        CO_EMAIL = ?,
        DEVICE_TYPE = ?,
        WAGE = ?,
        TOTAL_PRICE = ?,
        PAYMENT_TYPE = ?,
        REMARK = ?
      WHERE QUOTATION_NO = ?
    `;

    await prisma.$executeRawUnsafe(
      updateQuery,
      data.CO_NAME,
      data.CO_ADDRESS,
      data.CO_PHONE_NUMBER,
      data.CO_EMAIL,
      data.DEVICE_TYPE,
      data.WAGE,
      data.TOTAL_PRICE,
      data.PAYMENT_TYPE,
      data.REMARK,
      quotationNo
    );

    // 2. ดึงข้อมูลที่อัพเดทแล้ว
    const updatedQuotation = await prisma.$queryRaw<QuotationWithElements[]>`
      SELECT 
        q.*,
        DATE_FORMAT(q.CREATE_DATE, '%Y-%m-%d') as CREATE_DATE
      FROM QUOTATIONS q
      WHERE q.QUOTATION_NO = ${quotationNo}
    `;

    if (!updatedQuotation || updatedQuotation.length === 0) {
      throw new Error('Failed to fetch updated quotation');
    }

    return NextResponse.json({
      status: 'success',
      data: updatedQuotation[0]
    });

  } catch (error) {
    console.error('Error updating quotation:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to update quotation',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { quotationNo: string } }
) {
  try {
    const quotationNo = params.quotationNo;

    // 1. ลบ elements ในใบเสนอราคาก่อน
    await prisma.$executeRaw`
      DELETE FROM ELEMENTS_IN_QUOTATION 
      WHERE QUOTATION_NO = ${quotationNo}
    `;

    // 2. ลบใบเสนอราคา
    await prisma.$executeRaw`
      DELETE FROM QUOTATIONS 
      WHERE QUOTATION_NO = ${quotationNo}
    `;

    return NextResponse.json({
      status: 'success',
      message: 'Quotation deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting quotation:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to delete quotation',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}