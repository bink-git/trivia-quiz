import { Skeleton } from "@/components/ui/skeleton";

const GameSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col">
      <h2>
        <Skeleton className="mb-5 h-[80px] rounded-[16px]" />
      </h2>
      <ul className="space-y-4">
        <li className="flex h-[60px] w-full items-center justify-center rounded-[16px] border-2 p-4">
          <Skeleton className="h-[30px] w-full rounded-[10px]" />
        </li>
        <li className="flex h-[60px] w-full items-center justify-center rounded-[16px] border-2 p-4">
          <Skeleton className="h-[30px] w-full rounded-[10px]" />
        </li>
        <li className="flex h-[60px] w-full items-center justify-center rounded-[16px] border-2 p-4">
          <Skeleton className="h-[30px] w-full rounded-[10px]" />
        </li>
        <li className="flex h-[60px] w-full items-center justify-center rounded-[16px] border-2 p-4">
          <Skeleton className="h-[30px] w-full rounded-[10px]" />
        </li>
      </ul>
    </div>
  );
};

export default GameSkeleton;
