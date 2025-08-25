'use client';
import { createContext, useContext } from 'react';
import { Product } from '@/types/api.types';

export type CartItems = Record<number, Record<string, { product: Product, count: number }>>

interface CartContextType {
	items: CartItems;
	addItem: (item: Product, size: string) => void;
	updateItem: (item: Product, size: string, count: number) => void;
	removeItem: (item: Product, size: string) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export function useCartContext() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCartContext must be used within CartContext');
	}
	return context;
}