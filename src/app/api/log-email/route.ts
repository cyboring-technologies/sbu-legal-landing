import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Explicit server-side logging
        console.log('----------------------------------------');
        console.log(`[HOLDING_PAGE_CAPTURE] New Interest: ${email}`);
        console.log(`[TIMESTAMP] ${new Date().toISOString()}`);
        console.log('----------------------------------------');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[HOLDING_PAGE_ERROR] Failed to process email:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
