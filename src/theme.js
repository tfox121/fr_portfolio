import { createTheme } from '@mui/material/styles';
import { IBM_Plex_Serif as IbmPlexSerif } from '@next/font/google';
import NextLink from 'next/link';
import { forwardRef } from 'react';

const LinkBehaviour = forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <NextLink ref={ref} {...props} />
));

export const ibmPlexSerif = IbmPlexSerif({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'auto',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const theme = createTheme({
  palette: {
    primary: {
      light: '#94375d',
      main: '#630034',
      dark: '#36000d',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffffff',
      main: '#f4f6f5',
      dark: '#c1c3c2',
      contrastText: '#000000',
    },
    background: {
      default: '#f4f6f5',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
  },
  typography: {
    fontFamily: ibmPlexSerif.style.fontFamily,
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour,
      },
    },
  },
});

export default theme;
