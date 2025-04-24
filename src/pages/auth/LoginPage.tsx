import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import LoginForm from "@/features/login/components/LoginForm";
import { ILoginRequest } from "@/features/login/types/login";
import useLogin from "@/features/login/hooks/useLogin";
import { useNavigate } from "react-router-dom";
import localStorageUtils from "@/shared/utils/storage";
import { StatusCodes } from "@/shared/types/statusCodes";

export default function Login() {
  const { loginApi } = useLogin();
  const navigate = useNavigate();

  async function handleFormSubmit(payload: ILoginRequest) {
    const response = await loginApi(payload);
    if (response.status !== StatusCodes.CREATED) {
      return;
    }
    navigate("/");
    localStorageUtils.set("isLoggedIn", true);
  }

  return (
    <div className="">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>
            <h1>Login</h1>
          </CardTitle>
          <CardDescription>
            Silakan masukkan email dan kata sandi Anda untuk melanjutkan
          </CardDescription>
        </CardHeader>
        <LoginForm onSending={handleFormSubmit} />
      </Card>
    </div>
  );
}
