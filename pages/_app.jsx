import { useEffectOnceWhen } from 'rooks';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { MDXProvider } from '@mdx-js/react';

import { UserContext, useNetlifyAuth } from '../src/hooks';
import { AdminToolbar } from '../src/components';

import theme from '../src/theme';

const components = {
  p: (props) => (
    <Typography gutterBottom variant="p" component="p">
      {props.children}
    </Typography>
  ),
};

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
      <MDXProvider components={components}>
        <UserContext.Provider value={netlifyAuth}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AdminToolbar />
          <Component {...pageProps} />
        </UserContext.Provider>
      </MDXProvider>
    </ThemeProvider>
  );
}

export default MyApp;
