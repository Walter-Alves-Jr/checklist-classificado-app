export type SessaoUsuario = {
  accessToken: string;
  expiresIn: number;
  refreshToken: {
    username: string;
    token: string;
    expirationDate: string;
  };
};
