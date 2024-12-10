'use client'

import React, {
  createContext,
  useState,
  ReactNode,
  use,
  useEffect,
} from "react";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void
  setRememberMe: (rememberMe: boolean) => void
  rememberMe: boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useUser = () => {
  const context = use(AuthContext)

  if (!context) throw new Error("Must be use inside AuthProvider")

  return context
}

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setStateUser] = useState<User | null>(null);
  const [rememberMe, setStateRememberMe] = useState(false);

  const setUser = (user: User) => {
    setStateUser(user);
    persistUserToLocalStorage(user);
  };

  const persistUserToLocalStorage = (user: User | null) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  };

  const setRememberMe = (rememberMe: boolean) => {
    setStateRememberMe(rememberMe);
    persistRememberMeToLocalStorage(rememberMe);
  };

  const persistRememberMeToLocalStorage = (rememberMe: boolean) => {
    localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
  };

  const logout = () => {
    localStorage.removeItem('user')
  }
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedRememberMe = localStorage.getItem('rememberMe');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }

    if (savedRememberMe) {
      const parsedRememberMe = JSON.parse(savedRememberMe);
      setRememberMe(parsedRememberMe)
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, rememberMe, setRememberMe, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
