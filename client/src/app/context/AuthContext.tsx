"use client";

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

interface LastSuccessfulLogin {
  email?: string | null;
  rememberMe?: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
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

  if (!context) throw new Error("Must be use inside AuthProvider");

  return context;
};

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
  const [successLoginState, setStateSuccessLogin] =
    useState<LastSuccessfulLogin>({ email: null, rememberMe: false });
  const [loading, setLoading] = useState(true);

  const setUser = (user: User | null) => {
    setStateUser(user);
    persistUserToLocalStorage(user);
  };

  const persistUserToLocalStorage = (user: User | null) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  const setSuccessLogin = (newLastSuccessLoginData: LastSuccessfulLogin) => {
    const metaDataToRemember = { ...successLoginState, ...newLastSuccessLoginData }
    setStateSuccessLogin(metaDataToRemember);
    persistRememberMetaData({ ...metaDataToRemember });
  };

  const persistRememberMetaData = (successLoginState: LastSuccessfulLogin) => {
    localStorage.setItem("rememberMe", JSON.stringify(successLoginState));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedRememberMe = localStorage.getItem("rememberMe");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }

    if (savedRememberMe) {
      const parsedRememberMe = JSON.parse(savedRememberMe);

      if (!parsedRememberMe.rememberMe) {
        setSuccessLogin({ ...parsedRememberMe, email: null});
      } else {
        setSuccessLogin(parsedRememberMe);
      }
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        successLoginState,
        setSuccessLogin,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
