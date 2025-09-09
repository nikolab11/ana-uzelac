import { LocaleType } from '@/types/routing';
import { ReactNode } from 'react';
import { EngIcon } from '@/components/icons/locale/EngIcon';
import { FrIcon } from '@/components/icons/locale/FrIcon';

export const LOCALE_IMAGES: Record<LocaleType, ReactNode> = {
	eng: <EngIcon />,
	fr: <FrIcon />
};