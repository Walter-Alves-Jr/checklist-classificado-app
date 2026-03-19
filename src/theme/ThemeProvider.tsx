import { ClientConfig } from "@/src/config/clientConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextProps = {
  client: ClientConfig | null;
  setClient: (client: ClientConfig) => void;
};

const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeProvider({ children }: any) {
  const [client, setClient] = useState<ClientConfig | null>(null);

  async function loadClient() {
    const saved = await AsyncStorage.getItem("client");
    if (saved && saved !== undefined) setClient(JSON.parse(saved));
  }

  useEffect(() => {
    loadClient();
  }, []);

  return (
    <ThemeContext.Provider value={{ client, setClient }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
