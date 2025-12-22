import { CartItems } from '@/context/cart/cart.context';
import { CheckoutDetails } from '@/types/cart';

export interface StripeCheckoutItem {
	product_id: number;
	name: string;
	price: number;
	quantity: number;
	size?: string;
}

export interface CreateCheckoutSessionRequest {
	items: StripeCheckoutItem[];
	customer_email: string;
	customer_name?: string;
	customer_phone?: string;
	shipping_address?: {
		line1: string;
		line2?: string;
		city: string;
		postal_code: string;
		country: string;
		state?: string;
	};
	success_url?: string;
	cancel_url?: string;
}

export interface CreateCheckoutSessionResponse {
	checkout_url: string;
	session_id: string;
	order_id: number;
}

export interface OrderStatusResponse {
	order_id: number;
	status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
	customer_email: string;
	customer_name: string;
	total_amount: string;
	currency: string;
	items: StripeCheckoutItem[];
	created_at: string;
	paid_at?: string;
}

export function cartItemsToStripeItems(items: CartItems, locale: 'eng' | 'fr'): StripeCheckoutItem[] {
	const stripeItems: StripeCheckoutItem[] = [];

	for (const productId of Object.keys(items)) {
		const productSizes = items[Number(productId)];
		for (const size of Object.keys(productSizes)) {
			const item = productSizes[size];
			stripeItems.push({
				product_id: item.product.product_id,
				name: locale === 'fr' ? item.product.name_fr : item.product.name_eng,
				price: item.option.price,
				quantity: item.count,
				size: item.option.size
			});
		}
	}

	return stripeItems;
}

export function buildCheckoutRequest(
	items: CartItems,
	details: CheckoutDetails,
	locale: 'eng' | 'fr'
): CreateCheckoutSessionRequest {
	const origin = typeof window !== 'undefined' ? window.location.origin : '';

	return {
		items: cartItemsToStripeItems(items, locale),
		customer_email: details.email,
		customer_name: `${details.firstName} ${details.lastName}`,
		customer_phone: details.countryCode + details.phoneNumber,
		shipping_address: {
			line1: details.address,
			city: details.city,
			postal_code: details.zipCode,
			country: details.country,
			state: details.state || undefined
		},
		success_url: `${origin}/${locale}/order-success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${origin}/${locale}/order-cancelled`
	};
}

export async function createCheckoutSession(request: CreateCheckoutSessionRequest): Promise<{
	status: number;
	data: CreateCheckoutSessionResponse;
}> {
	const response = await fetch('/api/stripe/checkout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(request),
	});

	const data = await response.json();
	return {
		status: response.status,
		data,
	};
}

export async function getOrderStatus(sessionId: string): Promise<OrderStatusResponse | null> {
	const response = await fetch(`/api/stripe/status?session_id=${encodeURIComponent(sessionId)}`);

	if (!response.ok) {
		return null;
	}

	return await response.json();
}
