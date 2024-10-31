import { NextResponse , NextRequest} from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const orders = await prisma.cUSTOMERS.findMany({
            orderBy: {
                CUSTOMER_ID: 'desc'
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