import Image from 'next/image';

interface Props {
	images: string[];
}

export function ProductSideImages(props: Props) {
	const mainImages = props.images.slice(0, 2);
	const rest = props.images.slice(2);
	return (
		<div className={'flex flex-col gap-4 w-full'}>
			<div className={'flex gap-4'}>
				{
					mainImages.map((image, index) => {
						return (
							<div className={'relative grow'} key={index}>
								<Image style={{
									width: '100%',
									height: 'auto'
								}} src={image} alt={'Image'} width={500} height={700} />
							</div>
						);
					})
				}

			</div>
			{
				rest.map((image, index) => {
					return (
						<div className={'relative'} key={index}>
							<Image style={{
								width: '100%',
								height: 'auto'
							}} src={image} alt={'Image'} width={500} height={700} />
						</div>
					);
				})
			}
		</div>
	);
}