import { CollectionSection } from '@/types/api.types';
import { useLocale } from 'next-intl';
import { LocaleType } from '@/types/routing';
import { SectionImages } from '@/app/[locale]/collections/[collectionId]/SectionImages';
import Image from 'next/image';

interface Props {
	section: CollectionSection;
	inverted: boolean;
}

export function CollectionSectionView(props: Props) {
	const locale = useLocale() as LocaleType;
	return (
		<div>
			<div
				className={`flex ${props.inverted ? 'flex-row-reverse' : 'flew-row'} gap-[72px] items-center justify-between pb-[80px]`}>
				<h3 className={'grow text-nowrap font-bold text-6xl'}>
					{props.section.title[locale]}
				</h3>
				<p className={'text-base font-normal'}>
					{props.section.description[locale]}
				</p>
			</div>
			<div
				className={`flex ${props.inverted ? 'flex-row-reverse' : 'flew-row'} gap-[72px] items-center justify-between`}>
				<div className={'w-[40%]'}>
					<h4 className={'pb-4 font-bold text-4xl'}>{props.section.contentTitle[locale]}</h4>
					<p className={'text-base font-normal'}>
						{props.section.content[locale]}
					</p>
				</div>
				<div className={'grow'}>
					<SectionImages section={props.section} />
				</div>
			</div>
			<div className={'flex gap-5 pt-9 overflow-x-auto'} style={{
				msOverflowStyle: 'none',
				scrollbarWidth: 'none'
			}}>
				{
					props.section.sideImages.map((image, index) => {
						return (
							<Image key={index} alt={'saffs'} src={image} width={250} height={300} />
						);
					})
				}
			</div>
		</div>
	);
}