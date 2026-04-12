import { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user';
  default_address?: any;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (name: string, email: string, password: string, phone: string) => Promise<any>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching profile:', err);
      return null;
    }
  };

  const refreshProfile = async () => {
    try {
      setLoading(true);
      // Refresh session to pick up metadata changes
      const { data: { session } } = await supabase.auth.refreshSession();

      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        if (profile) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: profile.full_name || '',
            phone: profile.phone || '',
            role: profile.role || 'user',
            default_address: profile.default_address,
          });
        }
      }
    } catch (err) {
      console.error('Error refreshing profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    // 1. Initialize session explicitly so the Supabase client hydrates its auth headers
    // before the rest of the application fires database requests.
    const initializeSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Session initialization error:', error);
          if (mounted) setLoading(false);
          return;
        }

        if (session?.user && mounted) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: (session.user.user_metadata as any)?.full_name || 'User',
            phone: (session.user.user_metadata as any)?.phone || '',
            role: (session.user.user_metadata as any)?.role || 'user',
            createdAt: session.user.created_at,
          });

          // *CRITICAL*: Unblock UI instantly so the user is never trapped loading
          setLoading(false);

          // Silently enrich in the background
          const profile = await fetchProfile(session.user.id);
          if (mounted && profile) {
            setUser(prev => prev ? ({
              ...prev,
              name: profile.full_name || prev.name,
              phone: profile.phone || prev.phone,
              role: profile.role || prev.role,
              default_address: profile.default_address,
            }) : null);
          }
        } else {
          if (mounted) setLoading(false);
        }
      } catch (err) {
        console.error('Unexpected auth init error:', err);
        if (mounted) setLoading(false);
      }
    };

    initializeSession();

    // 2. Listen for subsequent login/logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Auth event [${event}]:`, session?.user?.id || 'No user');
      if (!mounted) return;

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (session?.user) {
          setUser(prev => ({
            id: session.user.id,
            email: session.user.email || '',
            name: prev?.name || (session.user.user_metadata as any)?.full_name || 'User',
            phone: prev?.phone || (session.user.user_metadata as any)?.phone || '',
            role: prev?.role || (session.user.user_metadata as any)?.role || 'user',
            createdAt: session.user.created_at,
          }));
          setLoading(false);

          const profile = await fetchProfile(session.user.id);
          if (mounted && profile) {
            setUser(prev => prev ? ({
              ...prev,
              name: profile.full_name || prev.name,
              phone: profile.phone || prev.phone,
              role: profile.role || prev.role,
              default_address: profile.default_address,
            }) : null);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
        localStorage.clear();
        sessionStorage.clear();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signup = async (name: string, email: string, password: string, phone: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          phone: phone,
        },
      },
    });

    if (error) throw error;
    return data;
  };

  const logout = async () => {
    try {
      setLoading(true);
      // Attempt clean sign out
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Error during logout API call:', err);
    } finally {
      // DEFINITIVE CLEANUP: Clear state regardless of API success
      setUser(null);

      // Specifically target Supabase keys to ensure tokens are purged
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sb-')) {
          localStorage.removeItem(key);
        }
      });
      localStorage.clear();
      sessionStorage.clear();

      setLoading(false);
      // Nuclear redirect to root to force app re-initialization
      window.location.href = '/';
    }
  };

  // Failsafe Timeout: If the app gets stuck loading for > 5 seconds, force logout
  useEffect(() => {
    if (!loading) return;

    const timeoutId = setTimeout(() => {
      console.warn('Failsafe triggered: Loading state exceeded 5000ms. Forcing logout to break loop.');
      logout();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [loading]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
