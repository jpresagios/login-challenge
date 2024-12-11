"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  use,
  useEffect,
  useCallback,
  useMemo,
} from "react";

interface User {
  email: string;
}

interface LastSuccessfulLogin {
  email?: string | null;
  rememberMe?: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  setSuccessLogin: (successLogin: LastSuccessfulLogin) => void;
  successLoginState: LastSuccessfulLogin;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useUser = () => {
  const context = use(AuthContext);
  if (!context) throw new Error("Must be used inside AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setStateUser] = useState<User | null>(null);
  const [successLoginState, setStateSuccessLogin] =
    useState<LastSuccessfulLogin>({
      email: null,
      rememberMe: false,
    });
  const [loading, setLoading] = useState(true);

  const persistToLocalStorage = useCallback((key: string, value: unknown) => {
    if (value !== undefined && value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }, []);

  const setUser = useCallback(
    (user: User | null) => {
      setStateUser(user);
      persistToLocalStorage("user", user);
    },
    [persistToLocalStorage]
  );

  const setSuccessLogin = useCallback(
    (newLastSuccessLoginData: LastSuccessfulLogin) => {
      const updatedSuccessLogin = {
        ...successLoginState,
        ...newLastSuccessLoginData,
      };
      setStateSuccessLogin(updatedSuccessLogin);
      persistToLocalStorage("rememberMe", updatedSuccessLogin);
    },
    [successLoginState, persistToLocalStorage]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, [setUser]);

  const initializeAuthData = useCallback(() => {
    const savedUser = localStorage.getItem("user");
    const savedRememberMe = localStorage.getItem("rememberMe");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }

    if (savedRememberMe) {
      const parsedRememberMe = JSON.parse(savedRememberMe);

      if (!parsedRememberMe.rememberMe) {
        persistToLocalStorage('rememberMe', null)
      } else {
        setSuccessLogin(parsedRememberMe);
      }
    }
  }, [setUser, setSuccessLogin, persistToLocalStorage]);

  useEffect(() => {
    initializeAuthData();
    setLoading(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      successLoginState,
      setSuccessLogin,
      logout,
      loading,
    }),
    [user, successLoginState, loading, setUser, setSuccessLogin, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
