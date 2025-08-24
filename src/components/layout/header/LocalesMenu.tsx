'use client';
import { LocaleType } from '@/types/routing';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { routing } from '@/i18n/routing';

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
			<select value={props.locale} className={'text-sm'} onChange={event => {
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
							<option className={'text-sm'} key={val} value={val}>{val.toLocaleUpperCase()}</option>
						);
					})
				}
			</select>
		</div>
	);
}