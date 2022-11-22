import { useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const useNetlifyAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const initialize = () => {
    window.netlifyIdentity = netlifyIdentity;
    netlifyIdentity.on('init', (cbUser) => {
      setIsAuthenticated(!!cbUser);
      setUser(cbUser);
    });
    netlifyIdentity.init();
  };

  const authenticate = (callback) => {
    netlifyIdentity.open();
    netlifyIdentity.on('login', (cbUser) => {
      setIsAuthenticated(true);
      setUser(cbUser);
      callback(cbUser);
      netlifyIdentity.close();
    });
  };

  const signout = (callback) => {
    setIsAuthenticated(false);
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      setUser(null);
      callback();
    });
  };

  return {
    isAuthenticated,
    user,
    initialize,
    authenticate,
    signout,
  };
};

export default useNetlifyAuth;
