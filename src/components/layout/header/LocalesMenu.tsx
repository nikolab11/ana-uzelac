'use client';
import { LocaleType } from '@/types/routing';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { routing } from '@/i18n/routing';
import { MenuItem, Select } from '@mui/material';

interface Props {
	locale: LocaleType;
}

export function LocalesMenu(props: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();
	const [, startTransition] = useTransition();
	return (
		<div>
			<Select
				className={'text-sm text-[var(--text-color)] font-normal'}
				sx={{ border: 'none' }}
				size={'small'}
				variant={'standard'}
				slotProps={{
					root: {
						sx: {
							border: 'none'
						}
					},
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
							<MenuItem className={'text-sm'} key={val} value={val}>{val.toLocaleUpperCase()}</MenuItem>
						);
					})
				}
			</Select>
		</div>
	);
}