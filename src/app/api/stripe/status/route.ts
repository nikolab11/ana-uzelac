import { NextRequest, NextResponse } from 'next/server';
import { ApiClient } from '@/api/api-client';
import { OrderStatusResponse } from '@/api/stripe';

export async function GET(request: NextRequest) {
	try {
		const sessionId = request.nextUrl.searchParams.get('session_id');

		if (!sessionId) {
			return NextResponse.json(
				{ error: 'session_id is required' },
				{ status: 400 }
			);
		}

		const response = await ApiClient.get<OrderStatusResponse>(
			'/au_get_order_status',
			{ params: { session_id: sessionId } }
		);

		if (!response) {
			return NextResponse.json(
				{ error: 'Order not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json(response);
	} catch (error) {
		console.error('Order status error:', error);
		return NextResponse.json(
			{ error: 'Failed to get order status' },
			{ status: 500 }
		);
	}
}
