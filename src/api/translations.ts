import { ApiClient } from '@/api/api-client';
import { Translations } from '@/types/api.types';

const ORDER_PAGE_TRANSLATIONS = {
	eng: {
		verifying_payment: "Verifying your payment...",
		payment_issue: "Payment Issue",
		no_session_id: "No payment session found. Please try again.",
		payment_pending: "Your payment is still being processed. Please wait a moment.",
		payment_not_confirmed: "We couldn't confirm your payment. Please contact support if you were charged.",
		error_checking_status: "An error occurred while checking your order status. Please try again.",
		back_to_shop: "Back to Shop",
		order_confirmed: "Order Confirmed",
		thank_you_for_your_order: "Thank you for your order!",
		confirmation_email_sent: "A confirmation email has been sent to your email address.",
		order_summary: "Order Summary",
		order_number: "Order Number",
		email: "Email",
		total: "Total",
		continue_shopping: "Continue Shopping",
		payment_cancelled: "Payment Cancelled",
		payment_cancelled_description: "Your payment was cancelled.",
		items_still_in_cart: "Your items are still in your cart. You can try again when you're ready.",
		try_again: "Try Again"
	},
	fr: {
		verifying_payment: "Vérification de votre paiement...",
		payment_issue: "Problème de paiement",
		no_session_id: "Aucune session de paiement trouvée. Veuillez réessayer.",
		payment_pending: "Votre paiement est en cours de traitement. Veuillez patienter.",
		payment_not_confirmed: "Nous n'avons pas pu confirmer votre paiement. Veuillez contacter le support si vous avez été débité.",
		error_checking_status: "Une erreur s'est produite lors de la vérification de votre commande. Veuillez réessayer.",
		back_to_shop: "Retour à la boutique",
		order_confirmed: "Commande confirmée",
		thank_you_for_your_order: "Merci pour votre commande !",
		confirmation_email_sent: "Un e-mail de confirmation a été envoyé à votre adresse e-mail.",
		order_summary: "Récapitulatif de la commande",
		order_number: "Numéro de commande",
		email: "E-mail",
		total: "Total",
		continue_shopping: "Continuer les achats",
		payment_cancelled: "Paiement annulé",
		payment_cancelled_description: "Votre paiement a été annulé.",
		items_still_in_cart: "Vos articles sont toujours dans votre panier. Vous pouvez réessayer quand vous êtes prêt.",
		try_again: "Réessayer"
	}
};

export async function getTranslations() {
	const apiTranslations = await ApiClient.get<Translations>('/au_translations_formatted');

	if (!apiTranslations) {
		return undefined;
	}

	// Merge local order_page translations with API translations
	return {
		eng: {
			...apiTranslations.eng,
			order_page: ORDER_PAGE_TRANSLATIONS.eng
		},
		fr: {
			...apiTranslations.fr,
			order_page: ORDER_PAGE_TRANSLATIONS.fr
		}
	} as Translations;
}