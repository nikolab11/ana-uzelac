import { CheckoutDetails } from '@/types/cart';
import { ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button, TextField } from '@mui/material';

interface Props {
	formState: CheckoutDetails,
	onChange: (e: ChangeEvent<HTMLInputElement>) => void,
	onProceed: () => void;
}

export function PersonDetails(props: Props) {
	const t = useTranslations('shop_page');
	return (
		<div className={'h-full w-[60%]'} id={'person-step'}>
			<h4 className={'font-medium text-2xl pb-[48px]'}>{t('who_is_ordering')}</h4>
			<form onSubmit={(e) => {
				e.preventDefault();
				props.onProceed();
			}}>
				<TextField type={'email'} required fullWidth className={'mb-4'} variant={'standard'} label={t('email')}
						   onChange={props.onChange}
						   name={'email'}
						   value={props.formState.email} />
				<div className={'flex justify-between gap-3 pt-9'}>
					<TextField required fullWidth variant={'standard'} name={'firstName'} onChange={props.onChange}
							   value={props.formState.firstName} label={t('first_name')} />
					<TextField required fullWidth variant={'standard'} name={'lastName'} onChange={props.onChange}
							   value={props.formState.lastName} label={t('last_name')} />
				</div>
				<div className={'pt-9'}>
					<Button className={'uppercase'} type={'submit'} color={'primary'}
							sx={{
								borderRadius: 0,
								padding: '12px 24px'
							}}
							variant={'contained'}>{t('proceed_to_shipping')}</Button>
				</div>
			</form>
		</div>
	);
}