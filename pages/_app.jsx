import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { MDXProvider } from '@mdx-js/react';
import { AnimatePresence } from 'framer-motion';

import { HistoryProvider, UserProvider } from '../src/hooks';
import { AdminToolbar } from '../src/components';

import theme from '../src/theme';

const components = {
  p: (props) => (
    <Typography gutterBottom variant="p" component="p">
      {props.children}
    </Typography>
  ),
};

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
      // styles={{ body: { height: '100vh' }, '#__next': { height: '100%' } }}
      />
      <MDXProvider components={components}>
        <HistoryProvider>
          <UserProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <AdminToolbar />
            <AnimatePresence mode="wait" initial={false}>
              <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
          </UserProvider>
        </HistoryProvider>
      </MDXProvider>
    </ThemeProvider>
  );
}

export default MyApp;
