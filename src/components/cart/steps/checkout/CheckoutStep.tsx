'use client';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useLayoutEffect, useState } from 'react';
import { CheckoutDetails } from '@/types/cart';
import { PersonDetails } from '@/components/cart/steps/checkout/PersonDetails';
import { AddressDetails, SubmitState } from '@/components/cart/steps/checkout/AddressDetails';
import { ItemsDrawer } from '@/components/cart/steps/checkout/ItemsDrawer';
import { BackButton } from '@/components/common/BackButton';
import { useCartContext } from '@/context/cart/cart.context';
import axios from 'axios';

export type CheckoutStep = 'person' | 'address';

export function CheckoutStep() {
	const t = useTranslations('shop_page');
	const { onOpenChange, items, onClear } = useCartContext();
	const [submitState, setSubmitState] = useState<SubmitState>('pending');
	const [activeStep, setActiveStep] = useState<CheckoutStep>('person');
	const [formState, setFormState] = useState<CheckoutDetails>({
		email: '',
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		zipCode: '',
		country: '',
		state: '',
		countryCode: '',
		phoneNumber: ''
	});
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	useLayoutEffect(() => {
		const id = `${activeStep}-step`;
		const element = document.getElementById(id);
		if (!element) return;
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'nearest'
		});
	}, [activeStep]);
	const onSubmit = async () => {
		try {
			await axios.post('/order', { ...formState, items });
			onClear();
			setSubmitState('success');
		} catch (error) {
			console.error(error);
			setSubmitState('error');
		}
	};
	return (
		<div className={'h-full py-9  bg-[#FCF7F1] pl-9 relative'}>
			<BackButton label={'#Back to cart'} onClick={() => onOpenChange(true, 'cart')} />
			<div className={'px-9 w-[70vw] h-full flex gap-9 pt-[64px] pr-9'}>
				<h4 className={'uppercase text-base font-medium'}>
					{t('checkout')}
				</h4>
				<div className={'grow h-full overflow-hidden'}>
					<PersonDetails formState={formState} onProceed={() => setActiveStep('address')}
								   onChange={onChange} />
					<AddressDetails submitState={submitState} formState={formState} onProceed={onSubmit}
									onChange={onChange} />
				</div>
			</div>
			<ItemsDrawer />
		</div>
	);
}
