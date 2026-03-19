export type ClientConfig = {
  id: string;
  name: string;
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  logo: string;
};

//simula retorno da API
export const clients: Record<string, ClientConfig> = {
  verde: {
    id: "verde",
    name: "Empresa Verde",
    theme: {
      primary: "#22c55e",
      secondary: "#15803d",
      background: "#aaa",
      text: "#fff",
    },
    logo: "https://img.freepik.com/vetores-gratis/vetor-de-design-de-gradiente-colorido-de-passaro_343694-2506.jpg?semt=ais_rp_progressive&w=740&q=80",
  },

  laranja: {
    id: "laranja",
    name: "Empresa Laranja",
    theme: {
      primary: "#f97316",
      secondary: "#c2410c",
      background: "#ffffff",
      text: "#fff",
    },
    logo: "https://img.freepik.com/vetores-gratis/vetor-de-design-de-gradiente-colorido-de-passaro_343694-2506.jpg?semt=ais_rp_progressive&w=740&q=80",
  },

  system: {
    id: "system",
    name: "Empresa Azul",
    theme: {
      primary: "#3b82f6",
      secondary: "#1d4ed8",
      background: "#ffffff",
      text: "#fff",
    },
    logo: "https://img.freepik.com/vetores-gratis/vetor-de-design-de-gradiente-colorido-de-passaro_343694-2506.jpg?semt=ais_rp_progressive&w=740&q=80",
  },
};
