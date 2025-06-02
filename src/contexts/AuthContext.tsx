import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  startGoogleAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ログイン状態の確認
    const checkAuth = async () => {
      try {
        // Check if user data exists in localStorage first
        const savedUser = localStorage.getItem('recrm-user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setIsLoading(false);
          return;
        }
        
        // Only try API call if no local storage data
        try {
          const response = await fetch('/api/auth/me');
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        } catch (error) {
          // Silently handle API error - we'll just treat as logged out
          console.log('API not available, using mock authentication');
        }
      } catch (error) {
        console.error('認証チェックエラー:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // 実際の実装ではAPIリクエストを行う
      // モックのため、ハードコードされたユーザーでログイン
      if (email === 'demo@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'デモユーザー',
          email: 'demo@example.com',
          avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user1',
          role: 'admin'
        };
        setUser(mockUser);
        localStorage.setItem('recrm-user', JSON.stringify(mockUser));
      } else {
        throw new Error('メールアドレスまたはパスワードが正しくありません');
      }
    } catch (error) {
      console.error('ログインエラー:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('recrm-user');
  };

  const startGoogleAuth = () => {
    // 実際の実装ではOAuthフローを開始
    window.location.href = '/api/auth/google';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        startGoogleAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};