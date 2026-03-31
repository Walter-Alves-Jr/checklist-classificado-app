export type AuthResponse = {
  token: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    refreshToken: {
      username: string;
      token: string;
      expirationDate: string;
    };
  };
  notifications: {
    title: string;
    message: string;
    level: string;
  }[];
};
