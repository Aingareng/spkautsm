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
import { StatusCodes } from "@/shared/types/statusCodes";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { logiSuccess } from "@/features/login/store/loginStore";
import { useEffect } from "react";
import localStorageUtils from "@/shared/utils/storage";

export default function Login() {
  const { loginApi } = useLogin();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleFormSubmit(payload: ILoginRequest) {
    const response = await loginApi(payload);
    if (
      response.status === StatusCodes.BAD_REQUEST ||
      response.status === StatusCodes.NOT_FOUND
    ) {
      return;
    }
    navigate("/");
    dispatch(logiSuccess(response.data));
    localStorageUtils.set("isLoggedIn", true);
    localStorageUtils.set("user", response.data);
  }

  useEffect(() => {
    localStorageUtils.set("isLoggedIn", false);
    localStorageUtils.remove("tabValue");
    localStorageUtils.remove("PATIENT_STATE");
    localStorageUtils.remove("PATIENT");
    localStorageUtils.remove("user");
  }, []);

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
