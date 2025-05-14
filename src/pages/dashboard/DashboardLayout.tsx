import { TypePatientStatus } from "@/features/dashboard/store/bioPatientStore";
import { setTabValue } from "@/features/dashboard/store/tabStore";
import { logout } from "@/features/login/store/loginStore";
import { Button } from "@/shared/components/ui/button";
import { Toaster } from "@/shared/components/ui/sonner";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import localStorageUtils from "@/shared/utils/storage";
import { LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const dispatch = useAppDispatch();
  const { tabValue } = useAppSelector((s) => s.tab);
  const { patientStatus } = useAppSelector((s) => s.bioPatient);
  const { user } = useAppSelector((s) => s.login);
  const [isCheckUpSession, setIsCheckUpSession] = useState<TypePatientStatus>();
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    dispatch(setTabValue(value as "bio" | "quiz" | "result"));
  };

  useEffect(() => {
    const state =
      (localStorageUtils.get("PATIENT_STATE") as TypePatientStatus) ||
      patientStatus;
    setIsCheckUpSession(state);

    if (isCheckUpSession === "INPUT_BIO") {
      dispatch(setTabValue("bio"));
    }
    if (isCheckUpSession === "CHEKUP") {
      dispatch(setTabValue("quiz"));
    }
    if (isCheckUpSession === "RESULT") {
      dispatch(setTabValue("result"));
    }
  }, [dispatch, isCheckUpSession, patientStatus, user]);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div className=" flex flex-col min-h-screen">
      <header className="grid grid-cols-4">
        <section className=" flex items-center justify-start pl-2.5 ">
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={handleLogout}
          >
            <LogOutIcon />
            Keluar
          </Button>
        </section>
        <section className="h-16 flex items-center justify-center col-span-2 ">
          <Tabs
            defaultValue="bio"
            className="w-[400px]"
            value={tabValue}
            onValueChange={handleTabChange}
          >
            <TabsList className="w-full">
              <TabsTrigger
                disabled={isCheckUpSession !== "INPUT_BIO"}
                className="cursor-pointer"
                value="bio"
              >
                Bio Pasien
              </TabsTrigger>
              <TabsTrigger
                disabled={isCheckUpSession !== "CHEKUP"}
                className="cursor-pointer"
                value="quiz"
              >
                Kuisoner
              </TabsTrigger>
              <TabsTrigger
                disabled={isCheckUpSession !== "RESULT"}
                className="cursor-pointer"
                value="result"
              >
                Hasil
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </section>
      </header>
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>

      <Toaster />
    </div>
  );
}
