// app/api/elements/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Element {
  ELEMENT_ID: string;
  ELEMENT_NAME: string;
  ELEMENT_DETAIL: string | null;
  ELEMENT_UNIT_PRICE: number;
  ELEMENT_CATEGORY: string | null;
}

export async function GET(request: NextRequest) {
  try {
    const elements = await prisma.$queryRaw<Element[]>`
      SELECT 
        ELEMENT_ID,
        ELEMENT_NAME,
        ELEMENT_DETAIL,
        ELEMENT_UNIT_PRICE,
        ELEMENT_CATEGORY
      FROM ELEMENTS
      ORDER BY ELEMENT_NAME
    `;

    return NextResponse.json({
      status: 'success',
      data: elements
    });

  } catch (error) {
    console.error('Error fetching elements:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to fetch elements'
      },
      { status: 500 }
    );
  }
}