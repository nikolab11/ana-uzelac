'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { XIcon } from '@/components/icons/XIcon';
import { Section } from '@/components/common/Section';

interface Props {
	open: boolean;
	onClose: () => void;
}

export function FilterModal(props: Props) {
	const [mounted, setMounted] = useState(false);
	const t = useTranslations('filter_and_sort');
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return createPortal(<>
		<div className={'backdrop'} style={{
			display: props.open ? 'block' : 'none'
		}} />
		<div id={'filter-modal'} className={'pt-9 bg-[#FCF7F1] px-5'} style={{
			transform: props.open ? 'translateX(0)' : 'translateX(100%)'
		}}>
			<div className={'flex justify-between items-center pb-9'}>
				<h4 className={'uppercase text-base font-medium'}>{t('filter_by')}</h4>
				<div onClick={props.onClose} className={'cursor-pointer'}>
					<XIcon />
				</div>
			</div>
			<div>
				<Section title={t('filter_price')}>
					Price
					sa
					fsfa
					
				</Section>
			</div>
		</div>
	</>, document.body);
}