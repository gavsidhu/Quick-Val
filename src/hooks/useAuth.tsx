import { supabase } from "@/lib/supabaseClient";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface IAuth {
  user: User | null;
  error: string | null;
  loading: boolean;
  initialLoading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  error: null,
  loading: false,
  initialLoading: true,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

// eslint-disable-next-line unused-imports/no-unused-vars
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const supabaseAuth = createBrowserSupabaseClient();

  useEffect(() => {
    supabaseAuth.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        setUser(session?.user as User);
      } else {
        // router.replace("");
      }
    });
  }, []);

  const memoedValue = useMemo(
    () => ({
      user,
      error,
      loading,
      initialLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, error, loading]
  );
  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
