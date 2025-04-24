import { setTabValue } from "@/features/dashboard/store/tabStore";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { Outlet } from "react-router-dom";
export default function DashboardLayout() {
  const dispatch = useAppDispatch();

  const handleTabChange = (value: string) => {
    dispatch(setTabValue(value as "bio" | "quiz"));
  };

  return (
    <div className=" flex flex-col min-h-screen">
      <header className="h-16  flex items-center justify-center px-6">
        <Tabs
          defaultValue="bio"
          className="w-[400px]"
          onValueChange={handleTabChange}
        >
          <TabsList>
            <TabsTrigger value="bio">Bio Pasien</TabsTrigger>
            <TabsTrigger value="quiz">Kuisoner</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
