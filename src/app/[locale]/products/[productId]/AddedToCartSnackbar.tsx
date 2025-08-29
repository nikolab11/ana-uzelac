import { Product } from '@/types/api.types';
import { Snackbar, SnackbarContent } from '@mui/material';

interface Props {
	product: Product;
	size: string;
	open: boolean;
	onClose: () => void;
}

export function AddedToCartSnackbar(props: Props) {

	return (
		<Snackbar
			open={props.open}
			message={<div className={'text-xl font-normal'}>#Added to Cart</div>}
			anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
			onClose={props.onClose}
		>
			<SnackbarContent>

			</SnackbarContent>
		</Snackbar>
	);
}