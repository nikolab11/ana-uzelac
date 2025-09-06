'use client';
import { createContext, useContext } from 'react';
import { Product, ProductOption } from '@/types/api.types';

export type CartItems = Record<number, Record<string, { product: Product, count: number, option: ProductOption }>>

export type CartStep = 'cart' | 'checkout'

interface CartContextType {
	items: CartItems;
	addItem: (item: Product, option: ProductOption) => void;
	updateItem: (item: Product, option: ProductOption, count: number) => void;
	removeItem: (item: Product, option: ProductOption) => void;
	open: boolean;
	step?: CartStep;
	totalItems: number;
	totalPrice: number;
	onClear: () => void;
	onOpenChange: (val: boolean, step?: CartStep) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export function useCartContext() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCartContext must be used within CartContext');
	}
	return context;
}