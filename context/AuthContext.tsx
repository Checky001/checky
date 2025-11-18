import React, { createContext, useState, useContext, ReactNode } from 'react';

export type UserRole = 'customer' | 'store_admin' | 'super_admin';

export interface User {
  id: string;
  email?: string;
  name?: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  created_at?: Date;
}

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: User[] = [
  {
    id: "USER_001",
    email: "demo@checky.app",
    name: "Demo User",
    phone: "+234 801 234 5678",
    role: "customer",
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: "ADMIN_001",
    email: "admin@megamart.com",
    name: "MegaMart Admin",
    phone: "+234 802 345 6789",
    role: "store_admin",
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find((u) => u.email === email);
        
        if (foundUser) {
          setUserState(foundUser);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const signup = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = mockUsers.find((u) => u.email === email);
        
        if (existingUser) {
          resolve(false);
        } else {
          const newUser: User = {
            id: `USER_${Date.now()}`,
            email,
            name,
            phone,
            role: "customer",
            created_at: new Date(),
          };
          
          mockUsers.push(newUser);
          setUserState(newUser);
          resolve(true);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUserState(null);
  };

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUserState({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        setUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
