import { Skeleton } from "../ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 border ">
      <Skeleton className="h-[125px] w-[250px] rounded-xl bg-neutral-800" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-neutral-800" />
        <Skeleton className="h-4 w-[200px] bg-neutral-800" />
      </div>
    </div>
  );
}
