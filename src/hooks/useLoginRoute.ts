import { useCallback, useEffect, useState } from 'react';

const LOGIN_ROUTE = 'login';

function readIsLoginRoute(): boolean {
  return window.location.hash.replace(/^#\/?/, '') === LOGIN_ROUTE;
}

/**
 * Tracks whether the sign-in screen ("#/login") is showing. It is separate from
 * `useActiveModule` because sign-in is a full-page screen, not a sidebar module.
 */
export function useLoginRoute(): [boolean, () => void] {
  const [isLoginRoute, setIsLoginRoute] = useState<boolean>(readIsLoginRoute);

  useEffect(() => {
    const handleHashChange = () => setIsLoginRoute(readIsLoginRoute());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openLogin = useCallback(() => {
    window.location.hash = `/${LOGIN_ROUTE}`;
  }, []);

  return [isLoginRoute, openLogin];
}
