import { api } from "@/shared/utils/api";
import { ILoginRequest } from "../types/login";
import IApiResponse from "@/shared/types/apiResponse";

const post = async (payload: ILoginRequest) =>
  await api.post<IApiResponse<null>>("/postLogin", payload);

export default post;
