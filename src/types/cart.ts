export interface CheckoutDetails {
	email: string,
	firstName: string,
	lastName: string,
	address: string,
	city: string,
	zipCode: string,
	country: string,
	state: string,
	countryCode: string,
	phoneNumber: string
}

export interface PlaceOrderBody {
	first_name: string,
	last_name: string,
	email: string,
	country: string,
	address: string,
	city: string,
	zip_code: string,
	state: string,
	country_code: string,
	phone_number: string
	ordered_items: { quantity: number, size: string, productId: number }[]
}