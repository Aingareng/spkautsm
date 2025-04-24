export interface ILoginRequest {
  email: string;
  pass: string;
}
export interface ILoginResponse {
  status: number;
  message: string;
  data: null;
}
