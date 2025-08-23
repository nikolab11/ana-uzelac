import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Props {
	img: string;
}

export function FooterImage(props: Props) {
	const t = useTranslations();
	return (
		<div className='relative h-[60vh]'>
			<Image src={props.img} alt={''} fill objectFit={'cover'} />
			<div
				className={'absolute top-0 flex justify-center flex-col gap-3 items-center  w-full h-full pl-[25%] pr-[25%]'}>
				<h3 className={'text-white font-bold text-6xl text-center font-["Playfair Display"]'}>
					{t('wearing_the_moment')}
				</h3>
				<div>
					{t('wearing_the_moment_description').split('\n\n').map(item => {
						return (
							<div key={item} className={'pb-3'}>
								<p
									className={'text-white font-medium text-base break-keep text-center'}>{item}</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}