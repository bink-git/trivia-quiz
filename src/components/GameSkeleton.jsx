import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const GameSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 mb-10">
      <h2>
        <Skeleton count={1} className="h-[60px] mb-5 rounded-[16px]" />
      </h2>
      <ul className="p-0">
        <li className="p-4 border-2 rounded-[16px] mb-3">
          <Skeleton count={1} />
        </li>
        <li className="p-4 border-2 rounded-[16px] mb-3">
          <Skeleton count={1} />
        </li>
        <li className="p-4 border-2 rounded-[16px] mb-3">
          <Skeleton count={1} />
        </li>
        <li className="p-4 border-2 rounded-[16px] mb-3">
          <Skeleton count={1} />
        </li>
      </ul>
    </div>
  );
};

export default GameSkeleton;
