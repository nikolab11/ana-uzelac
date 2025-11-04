'use client';

import { ReactNode } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { LocaleType } from '@/types/routing';

interface Props {
	children: ReactNode;
	href: Parameters<typeof Link>[0]['href'];
	onClick?: () => void;
}

export function HeaderLink(props: Props) {
	const locale = useLocale() as LocaleType;
	const pathname = usePathname().replace(`/${locale}`, '');
	console.log(pathname);
	return (
		<Link 
			className={`text-sm app-link ${pathname === props.href ? 'app-link-select' : ''}`}
			href={props.href}
			onClick={props.onClick}
		>
			{props.children}
		</Link>
	);
}