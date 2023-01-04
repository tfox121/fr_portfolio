import { createContext, useContext } from 'react';
import { useEffectOnceWhen } from 'rooks';

import useNetlifyAuth from './useNetlifyAuth';

const UserContext = createContext();

export function UserProvider({ children }) {
  const netlifyAuth = useNetlifyAuth();

  const { initialize } = netlifyAuth;

  useEffectOnceWhen(() => {
    initialize();
  });

  return (
    <UserContext.Provider value={netlifyAuth}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
