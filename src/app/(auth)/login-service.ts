import { api } from "@/src/lib/axios";
import { IClientRequest, IClientResponse } from "./IClient";

export async function postLogin({
  username,
  password,
}: IClientRequest): Promise<IClientResponse> {
  const { data } = await api.get<IClientResponse[]>(
    `/users?username=${username}&password=${password}`,
  );

  return data[0];
}
