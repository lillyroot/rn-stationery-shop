import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { clearSession, readSession, writeSession } from './sessionStorage';
import { useCartStore } from '../stores/cartStore';

interface AuthContextValue {
  token: string | null;
  loading: boolean;
  signIn: (value: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readSession()
      .then(setToken)
      .catch(() => setToken(null))
      .finally(() => setLoading(false));
  }, []);

  const signIn = useCallback(async (value: string) => {
    await writeSession(value);
    setToken(value);
  }, []);

  const signOut = useCallback(async () => {
    await clearSession();
    useCartStore.getState().clear();
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('useAuth должен использоваться внутри AuthProvider');
  return auth;
}
