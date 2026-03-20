import { createContext, useContext, useEffect, useState } from "react";
import { IClientRequest, IClientResponse } from "../app/(auth)/IClient";
import { postLogin } from "../app/(auth)/login-service";
import {
  getClientLocalStorage,
  getTokenLocalStorage,
  removeClientLocalStorage,
  saveClientLocalStorage,
  saveTokenLocalStorage,
} from "../app/(auth)/login-service-local-storage";

type AuthContextType = {
  client: IClientResponse | undefined;
  token: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: IClientRequest) => Promise<IClientResponse | undefined>;
  logout: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [client, setUser] = useState<IClientResponse | undefined>();
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    const stored = await getTokenLocalStorage();
    const user = await getClientLocalStorage();
    setToken(stored);
    setUser(user);
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function login({
    username,
    password,
  }: IClientRequest): Promise<IClientResponse | undefined> {
    const clientResult = await postLogin({
      username,
      password,
    });

    if (!clientResult) return;

    setUser(clientResult);
    await saveClientLocalStorage(clientResult);
    await saveTokenLocalStorage(clientResult);
    return clientResult;
  }

  async function logout() {
    await removeClientLocalStorage();
    setUser(undefined);
  }

  return (
    <AuthContext.Provider
      value={{
        client,
        token,
        isAuthenticated: !!client,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
