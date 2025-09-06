import { NextRequest } from 'next/server';
import { CheckoutDetails } from '@/types/cart';
import { CartItems } from '@/context/cart/cart.context';
import { postOrder } from '@/api/products';
import { getLocale } from 'next-intl/server';

interface OrderBody extends CheckoutDetails {
	items: CartItems;
}

export async function POST(request: NextRequest) {
	const body: OrderBody = await request.json();
	console.log(body);
	const locale = await getLocale();
	console.log(locale);
	const orderedItems = Object
		.values(body.items)
		.flatMap(val => Object.values(val))
		.map(val => {
			return {
				productId: val.product.product_id,
				size: val.option.size,
				quantity: val.count
			};
		});
	await postOrder({
		address: body.address,
		city: body.city,
		country: body.country,
		country_code: body.countryCode,
		email: body.email,
		first_name: body.firstName,
		last_name: body.lastName,
		phone_number: body.phoneNumber,
		state: body.state,
		zip_code: body.zipCode,
		ordered_items: orderedItems
	});
	return Response.json({});
}