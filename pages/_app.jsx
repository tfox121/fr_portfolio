import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { UserContext, useNetlifyAuth } from '../src/hooks';
import theme from '../src/theme';

function MyApp({ Component, pageProps }) {
  const netlifyAuth = useNetlifyAuth();

  const { isAuthenticated, initialize } = netlifyAuth;

  useEffect(() => {
    initialize();
  }, [isAuthenticated, initialize]);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={netlifyAuth}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
