'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	typography: {
		fontFamily: 'var(--font-roboto)'
	},
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: '#444444'
				},
				secondary: {
					main: '#DBAC50'
				}
			}
		}
	}
});

export default theme;