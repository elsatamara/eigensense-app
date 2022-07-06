import axios from "axios";

enum URLS {
  DEV = "http://localhost:3003/",
}

export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const instance = axios.create({
  baseURL: URLS.DEV,
  timeout: 300000,
});

export interface ServerResponse<D> {
  code: number;
  success: boolean;
  data: D;
  stack?: any;
}

export async function axiosServerRequest<D>(
  method: Methods,
  url: string,
  data?: any
): Promise<ServerResponse<D>> {
  const res = await instance({ url, data });
  return res.data;
}
