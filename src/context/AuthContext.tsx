import { createContext, useState, useEffect } from 'react';
import { setAccessToken, setRefreshToken, clearTokens, getAccessToken } from '../utils/token';
import { login as apiLogin, signup as apiSignup, getUserProfile } from '../api/auth';

interface User {
  name: string;
  email: string;
  phone?: string;
  id?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (name: string, email: string, password: string, phone: string) => Promise<any>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      getUserProfile()
        .then((response: any) => {
          setUser(response.data);
        })
        .catch((err: any) => {
          console.error(err);
          clearTokens();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await apiLogin(email, password) as any;
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    setUser(response.data.user);
    return response;
  };

  const signup = async (name: string, email: string, password: string, phone: string) => {
    const response = await apiSignup(name, email, password, phone) as any;
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    setUser(response.data.user);
    return response;
  };

  const logout = () => {
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
