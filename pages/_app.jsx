import { useState, useEffect } from 'react';
import Router from 'next/router';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import LinearProgress from '@mui/material/LinearProgress';
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });

    Router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });

    Router.events.on('routeChangeError', () => {
      setIsLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={components}>
        <HistoryProvider>
          <UserProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <GlobalStyles styles={{ body: { backgroundColor: '#f2f0e1' } }} />

            {isLoading && (
              <LinearProgress
                sx={{ position: 'absolute', width: '100%', height: '0.2em' }}
              />
            )}
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
