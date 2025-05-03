export interface ILoginRequest {
  email: string;
  pass: string;
}
export interface ILoginResponse {
  status: number;
  message: string;
  data: null;
}

export interface ILoginData {
  user_id: number;
  name: string;
  pasien_id?: number;
}

export interface IAuthData {
  isLogin: boolean;
}
