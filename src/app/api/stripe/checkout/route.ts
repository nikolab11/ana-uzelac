import { NextRequest, NextResponse } from 'next/server';
import { ApiClient } from '@/api/api-client';
import { CreateCheckoutSessionRequest, CreateCheckoutSessionResponse } from '@/api/stripe';

export async function POST(request: NextRequest) {
	try {
		const body: CreateCheckoutSessionRequest = await request.json();

		const response = await ApiClient.post<CreateCheckoutSessionResponse>(
			'/au_create_checkout_session',
			body
		);

		return NextResponse.json(response.data, { status: response.status });
	} catch (error) {
		console.error('Stripe checkout error:', error);
		return NextResponse.json(
			{ error: 'Failed to create checkout session' },
			{ status: 500 }
		);
	}
}
