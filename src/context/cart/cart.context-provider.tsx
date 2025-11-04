'use client';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { CartContext, CartItems, CartStep } from '@/context/cart/cart.context';
import { Product, ProductOption } from '@/types/api.types';
import { CartMain } from '@/components/cart/CartMain';

interface Props {
	children: ReactNode;
}

const CART_STORAGE_KEY = 'cart-items';

function loadCartFromStorage(): CartItems {
	if (typeof window === 'undefined') {
		return {};
	}
	try {
		const stored = localStorage.getItem(CART_STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (error) {
		console.error('Failed to load cart from localStorage:', error);
	}
	return {};
}

function saveCartToStorage(items: CartItems): void {
	if (typeof window === 'undefined') {
		return;
	}
	try {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
	} catch (error) {
		console.error('Failed to save cart to localStorage:', error);
	}
}

export function CartContextProvider(props: Props) {
	const [items, setItems] = useState<CartItems>(() => loadCartFromStorage());
	const [open, setOpen] = useState(false);
	const [step, setStep] = useState<CartStep | undefined>(undefined);

	useEffect(() => {
		saveCartToStorage(items);
	}, [items]);
	const addItem = useCallback((product: Product, option: ProductOption) => {
		setItems(prev => {
			const newState = { ...prev };
			if (!newState[product.product_id]) {
				newState[product.product_id] = {};
			}
			const currentCount = newState[product.product_id][option.size]?.count || 0;
			newState[product.product_id] = {
				...newState[product.product_id],
				[option.size]: { product, count: currentCount + 1, option }
			};
			return newState;
		});
	}, []);

	const updateItem = useCallback((product: Product, option: ProductOption, count: number) => {
		setItems(prev => {
			const newState = { ...prev };
			if (!newState[product.product_id]) {
				newState[product.product_id] = {};
			}
			newState[product.product_id] = {
				...newState[product.product_id],
				[option.size]: { product, count, option }
			};
			return newState;
		});
	}, []);
	const removeItem = useCallback((product: Product, option: ProductOption) => {
		setItems(prev => {
			if (!prev[product.product_id]?.[option.size]) {
				return prev;
			}
			const newState = { ...prev };
			newState[product.product_id] = Object.fromEntries(Object.entries(newState[product.product_id])
				.filter(([key]) => key !== option.size));
			return newState;
		});
	}, []);
	const flatted = Object.values(items).flatMap(val => Object.values(val));
	const subtotal = flatted.reduce((acc, value) => {
		return acc + value.count * value.option.price;
	}, 0);
	const onClear = useCallback(() => {
		setItems({});
		if (typeof window !== 'undefined') {
			try {
				localStorage.removeItem(CART_STORAGE_KEY);
			} catch (error) {
				console.error('Failed to clear cart from localStorage:', error);
			}
		}
	}, []);
	return (
		<CartContext.Provider value={{
			items,
			addItem,
			totalPrice: subtotal,
			totalItems: flatted.length,
			updateItem,
			removeItem,
			onClear,
			open,
			step,
			onOpenChange: (val: boolean, st: CartStep = 'cart') => {
				setOpen(val);
				setStep(val ? st : undefined);
			}
		}}>
			{props.children}
			<CartMain />
		</CartContext.Provider>
	);
}