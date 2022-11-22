import { useEffect } from 'react';
import { UserContext, useNetlifyAuth } from '../hooks';

function MyApp({ Component, pageProps }) {
  const netlifyAuth = useNetlifyAuth();

  const { isAuthenticated, initialize } = netlifyAuth;

  useEffect(() => {
    initialize();
  }, [isAuthenticated, initialize]);

  return (
    <UserContext.Provider value={netlifyAuth}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
