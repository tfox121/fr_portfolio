import { useRouter } from 'next/router';
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';

const HistoryContext = createContext({});

export function HistoryProvider({ children }) {
  const { asPath } = useRouter();
  const [history, setHistory] = useState([]);

  const initialValue = useMemo(
    () => ({
      history,
    }),
    [history],
  );

  useEffect(() => {
    setHistory((previous) => [...previous, asPath]);
  }, [asPath]);

  return (
    <HistoryContext.Provider value={initialValue}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  return useContext(HistoryContext);
}
