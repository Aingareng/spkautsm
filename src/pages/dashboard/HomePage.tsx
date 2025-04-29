import BioPatient from "@/features/dashboard/components/BioPatient";
import Quiz from "@/features/dashboard/components/Quiz";
import Result from "@/features/dashboard/components/Result";
import { useAppSelector } from "@/shared/hooks/reduxHooks";

export default function Home() {
  const { tabValue } = useAppSelector((select) => select.tab);

  let content = <BioPatient />;

  if (tabValue === "quiz") {
    content = <Quiz />;
  }
  if (tabValue === "result") {
    content = <Result />;
  }
  return <div className="flex items-center justify-center ">{content}</div>;
}
