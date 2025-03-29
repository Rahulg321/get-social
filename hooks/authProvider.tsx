import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

export const AuthContext = createContext<{
  token: string;
  isLoading: boolean;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  token: "",
  isLoading: true,
  setToken: () => {},
  setIsLoading: () => {},
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <AuthContext.Provider value={{ token, isLoading, setToken, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
