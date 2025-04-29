import { TypePatientStatus } from "@/features/dashboard/store/bioPatientStore";
import { setTabValue } from "@/features/dashboard/store/tabStore";
import { Toaster } from "@/shared/components/ui/sonner";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import localStorageUtils from "@/shared/utils/storage";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
export default function DashboardLayout() {
  const dispatch = useAppDispatch();
  const { tabValue } = useAppSelector((s) => s.tab);
  const { patientStatus } = useAppSelector((s) => s.bioPatient);
  const [isCheckUpSession, setIsCheckUpSession] = useState<TypePatientStatus>();

  const handleTabChange = (value: string) => {
    dispatch(setTabValue(value as "bio" | "quiz" | "result"));
  };

  useEffect(() => {
    const state =
      (localStorageUtils.get("PATIENT_STATE") as TypePatientStatus) ||
      patientStatus;
    setIsCheckUpSession(state);
    console.log("🚀 ~ useEffect ~ isCheckUpSession:", isCheckUpSession);

    if (isCheckUpSession === "INPUT_BIO") {
      dispatch(setTabValue("bio"));
    } else if (isCheckUpSession === "CHEKUP") {
      dispatch(setTabValue("quiz"));
    }
  }, [dispatch, isCheckUpSession, patientStatus]);

  return (
    <div className=" flex flex-col min-h-screen">
      <header className="h-16 flex items-center justify-center ">
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
            <TabsTrigger disabled className="cursor-pointer" value="result">
              Hasil
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>

      <Toaster />
    </div>
  );
}
