import { createContext, useContext } from "react";
import { IClientResponse, IClientThemeResponse } from "../app/(auth)/IClient";
import { useAuth } from "../auth/AuthProvider";

type ThemeContextProps = {
  theme: IClientThemeResponse | null;
  client: IClientResponse | undefined;
};

const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeProvider({ children }: any) {
  const { client } = useAuth();
  const theme = client?.theme ?? null;

  return (
    <ThemeContext.Provider value={{ theme, client }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
