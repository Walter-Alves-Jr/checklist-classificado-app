export interface IClientResponse {
  id: number;
  name: string;
  logo: string;
  theme: IClientThemeResponse;
}

export interface IClientRequest {
  username: string;
  password: string;
}

export interface IClientThemeResponse {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}
