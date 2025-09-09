import { fetchSingleCollection } from '@/api/products';
import { notFound } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Collection } from '@/types/api.types';
import { LocaleType } from '@/types/routing';
import { HeadText } from '@/components/common/HeadText';
import { CollectionSectionView } from '@/app/[locale]/collections/[collectionId]/CollectionSectionView';
import { FooterImage } from '@/components/layout/FooterImage';
import { PageProps } from '@/types/pages.types';
import { HoveringButton } from '@/components/common/HoveringButton';
import Link from 'next/link';

interface Params {
	collectionId: string;
}

export default async function CollectionPage(props: { params: Promise<Params> }) {
	const { collectionId } = await props.params;
	const nCollection = Number(collectionId);
	if (!nCollection) {
		return notFound();
	}
	const collection = (await fetchSingleCollection(nCollection))?.collection;
	if (!collection) {
		return notFound();
	}
	return (
		<AppLayout>
			<InnerPage collection={collection} />
		</AppLayout>
	);
}

const SCROLL_ELEMENT_ID = 'main-collection-section';

function InnerPage({ collection, images }: { collection: Collection } & PageProps) {
	const locale = useLocale() as LocaleType;

	return (
		<div>
			<div className='min-h-screen relative'>
				<Image style={{
					objectFit: 'cover'
				}} src={collection.images[0]} alt={'Image'} fill />
				<HeadText title={collection.title[locale]} position={'center'} buttonLabel={'#Explore collection'}
						  scrollElementId={SCROLL_ELEMENT_ID}>
					<p className={'text-[var(--background)] text-xl font-light'}>
						{collection.subtitle[locale]}
					</p>
				</HeadText>
			</div>
			<div id={SCROLL_ELEMENT_ID} className={'bg-[#F6F1EB]'}>
				<div className={'py-9 px-[var(--container-padding)]'}>
					<p className={'text-base font-normal'} dangerouslySetInnerHTML={{
						__html: collection.description[locale]
					}} />
				</div>
				{
					collection.sections.map((section, index) => {
						return (
							<div key={section.title[locale]}
								 className={`px-[var(--container-padding)] py-9 ${index % 2 === 0 ? 'bg-[#FCF7F1]' : ''}`}>
								<CollectionSectionView section={section} inverted={index % 2 === 1} />
							</div>
						);
					})
				}
			</div>
			<div
				className={`pb-[80px] flex flex-col justify-center items-center gap-4 ${collection.sections.length % 2 === 0 ? 'bg-[#FCF7F1]' : ''}`}>
				<p className={'text-base font-normal'}>
					#Neki opis
				</p>
				<Link href={`/shop?collection_ids=${collection.collection_id}`}>
					<HoveringButton mode={'dark'} label={'#Shop collection'} />
				</Link>
			</div>
			<FooterImage img={images?.home_page.wearing_the_moment || ''} />
		</div>
	);
}