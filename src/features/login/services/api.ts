import { api } from "@/shared/utils/api";
import { ILoginData, ILoginRequest } from "../types/login";
import IApiResponse from "@/shared/types/apiResponse";

const post = async (payload: ILoginRequest) =>
  await api.post<IApiResponse<ILoginData>>("/postLogin", payload);

export default post;
