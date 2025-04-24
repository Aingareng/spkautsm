import { useAppSelector } from "@/shared/hooks/reduxHooks";

export default function Home() {
  const { tabValue } = useAppSelector((select) => select.tab);
  console.log("🚀 ~ Home ~ tabValue:", tabValue);
  return <div>Home</div>;
}
