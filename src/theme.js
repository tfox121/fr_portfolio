import { createTheme } from '@mui/material/styles';
import { IBM_Plex_Serif as IbmPlexSerif } from '@next/font/google';

export const ibmPlexSerif = IbmPlexSerif({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'auto',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const theme = createTheme({
  palette: {
    primary: {
      light: '#596843',
      main: '#2f3d1b',
      dark: '#0a1700',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff893f',
      main: '#d6590b',
      dark: '#9e2900',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: ibmPlexSerif.style.fontFamily,
  },
});

export default theme;
