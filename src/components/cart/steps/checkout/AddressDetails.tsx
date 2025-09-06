import { CheckoutDetails } from '@/types/cart';
import { ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { COUNTRY_CODES } from '@/utils/country-codes';

interface Props {
	formState: CheckoutDetails,
	onChange: (e: ChangeEvent<HTMLInputElement>) => void,
	onProceed: () => void;
}

export function AddressDetails(props: Props) {
	const t = useTranslations('shop_page');
	return (
		<div className={'h-full w-[70%]'} id={'address-step'}>
			<h4 className={'font-medium text-2xl pb-[48px]'}>{t('proceed_to_payment')}</h4>
			<form onSubmit={(e) => {
				e.preventDefault();
				props.onProceed();
			}}>
				<TextField required fullWidth variant={'standard'} name={'address'}
						   onChange={props.onChange}
						   value={props.formState.address} label={t('address')} />
				<div className={'flex justify-between gap-3 pt-9'}>
					<div className={'grow-[7]'}>
						<TextField required fullWidth variant={'standard'} name={'city'}
								   onChange={props.onChange}
								   value={props.formState.city} label={t('city')} />
					</div>
					<div className={'grow'}>
						<TextField required fullWidth variant={'standard'} name={'zipCode'}
								   onChange={props.onChange}
								   value={props.formState.zipCode} label={t('zip_code')} />
					</div>
				</div>
				<div className={'pt-9'}>
					<TextField required fullWidth variant={'standard'} name={'country'}
							   onChange={props.onChange}
							   value={props.formState.country} label={t('country')} />
				</div>
				<div className={'pt-9'}>
					<TextField fullWidth variant={'standard'} name={'state'}
							   onChange={props.onChange}
							   value={props.formState.state} label={t('state_province')} />
				</div>
				<div className={'flex justify-between gap-3 pt-9 items-end'}>
					<div className={'grow'}>
						<FormControl fullWidth required>
							<InputLabel id={'country-code-label'}>{t('country_code')}</InputLabel>
							<Select onChange={props.onChange as never} labelId={'country-code-label'}
									variant={'standard'}
									name={'countryCode'}
									value={props.formState.countryCode}>
								{
									COUNTRY_CODES.map(code => {
										return (
											<MenuItem key={code.code} value={code.code}>{code.dial_code}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</div>
					<div className={'grow-[2]'}>
						<TextField required fullWidth variant={'standard'} name={'phoneNumber'}
								   onChange={props.onChange}
								   value={props.formState.phoneNumber} label={t('phone_number')} />
					</div>
				</div>
				<div className={'pt-9'}>
					<Button className={'uppercase'} type={'submit'} color={'primary'}
							sx={{
								borderRadius: 0,
								padding: '12px 24px'
							}}
							variant={'contained'}>{t('proceed_to_payment')}</Button>
				</div>
			</form>
		</div>
	);
}