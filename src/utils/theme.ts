'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: '#444444',
					contrastText: '#FCF7F1'

				},
				secondary: {
					main: '#DBAC50'
				}
			}
		}
	}
});

export default theme;