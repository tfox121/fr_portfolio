import { useEffectOnceWhen } from 'rooks';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

import { UserContext, useNetlifyAuth } from '../src/hooks';
import { AdminToolbar } from '../src/components';

import theme from '../src/theme';

function MyApp({ Component, pageProps }) {
  const netlifyAuth = useNetlifyAuth();

  const { initialize } = netlifyAuth;

  useEffectOnceWhen(() => {
    initialize();
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{ body: { height: '100vh' }, '#__next': { height: '100%' } }}
      />
      <UserContext.Provider value={netlifyAuth}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AdminToolbar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
