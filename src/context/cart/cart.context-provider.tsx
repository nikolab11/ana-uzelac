'use client';
import { ReactNode, useCallback, useState } from 'react';
import { CartContext, CartItems } from '@/context/cart/cart.context';
import { Product } from '@/types/api.types';

interface Props {
	children: ReactNode;
}

export function CartContextProvider(props: Props) {
	const [items, setItems] = useState<CartItems>({});

	const addItem = useCallback((product: Product, size: string) => {
		setItems(prev => {
			const newState = { ...prev };
			if (!newState[product.product_id]) {
				newState[product.product_id] = {};
			}
			const currentCount = newState[product.product_id][size]?.count || 0;
			newState[product.product_id] = {
				...newState[product.product_id],
				[size]: { product, count: currentCount + 1 }
			};
			return newState;
		});
	}, []);

	const updateItem = useCallback((product: Product, size: string, count: number) => {
		setItems(prev => {
			const newState = { ...prev };
			if (!newState[product.product_id]) {
				newState[product.product_id] = {};
			}
			newState[product.product_id] = {
				...newState[product.product_id],
				[size]: { product, count }
			};
			return newState;
		});
	}, []);
	const removeItem = useCallback((product: Product, size: string) => {
		setItems(prev => {
			if (!prev[product.product_id]?.[size]) {
				return prev;
			}
			const newState = { ...prev };
			newState[product.product_id] = Object.fromEntries(Object.entries(newState[product.product_id])
				.filter(([key]) => key !== size));
			return newState;
		});
	}, []);
	return (
		<CartContext.Provider value={{
			items,
			addItem,
			updateItem,
			removeItem
		}}>
			{props.children}
		</CartContext.Provider>
	);
}