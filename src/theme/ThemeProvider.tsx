import { createContext, useContext } from "react";
import { useSession } from "../features/clientes/hooks/storage/queries/use-session-query";

type ThemeContextProps = {
  theme: {
    backgroundPrimary?: string | null;
    textPrimary?: string | null;
    logo?: string | null;
    nome?: string | null;
  } | null;
};

const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeProvider({ children }: any) {
  const { data: cliente, isLoading } = useSession();

  if (isLoading) return null;

  if (!cliente) {
    return (
      <ThemeContext.Provider value={{ theme: null }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  const theme = {
    backgroundPrimary: cliente.background_primary,
    textPrimary: cliente.text_color,
    logo: cliente.logo,
    nome: cliente.nome,
  };

  return (
    <ThemeContext.Provider value={{ theme }} key={cliente?.id ?? "guest"}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
