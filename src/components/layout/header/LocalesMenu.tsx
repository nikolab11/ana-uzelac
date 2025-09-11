'use client';
import { LocaleType } from '@/types/routing';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { routing } from '@/i18n/routing';
import { MenuItem, MenuProps, Select } from '@mui/material';
import { LOCALE_IMAGES } from '@/utils/locale-images';

interface Props {
	locale: LocaleType;
}

export const MenuElementProps: Partial<MenuProps> = {
	slotProps: {
		paper: {
			sx: {
				background: 'var(--background)'
			}
		}
	}
};

export function LocalesMenu(props: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();
	const [, startTransition] = useTransition();
	return (
		<div>
			<Select
				disableUnderline
				renderValue={val => val.toLocaleUpperCase()}
				MenuProps={MenuElementProps}
				className={'text-sm text-[var(--text-color)] font-normal'}
				sx={{
					border: 'none',
					paddingBottom: '0',
					'&>div': { paddingBottom: 0, background: 'var(--background)' },
					background: 'var(--background)'
				}}
				size={'small'}
				variant={'standard'}
				slotProps={{
					input: {
						sx: {
							fontWeight: '400',
							fontSize: '14px',
							color: 'var(--text-color)'
						}
					}

				}}

				value={props.locale} onChange={event => {
					const value = event.target.value as LocaleType;
					startTransition(() => {
						let newPath = pathname as string;
						if (newPath.startsWith(`/${props.locale}`)) {
							newPath = newPath.replace(`/${props.locale}`, '');
						}
						router.push(
							// @ts-expect-error -- TypeScript will validate that only known `params`
							// are used in combination with a given `pathname`. Since the two will
							// always match for the current route, we can skip runtime checks.
							{ pathname: newPath, params },
							{ locale: value }
						);
					});
				}}>
				{
					routing.locales.map(val => {
						return (
							<MenuItem className={'text-sm'} key={val} sx={{
								'&.Mui-selected': {
									backgroundColor: '#F6F1EB' // change this to your desired color
								},
								'&.Mui-selected:hover': {
									backgroundColor: '#F6F1EB' // optional hover color
								},
								'&.Mui-selected.Mui-focusVisible': {
									backgroundColor: '#F6F1EB' // optional hover color
								}
							}}
								value={val}>
								<div className='flex items-center gap-3'>
									{LOCALE_IMAGES[val]}
									<p>{val.toLocaleUpperCase()}</p>
								</div>
							</MenuItem>
						);
					})
				}
			</Select>
		</div>
	);
}