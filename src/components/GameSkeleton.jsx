import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const GameSkeleton = () => {
  return (
    <div className="game-skeleton">
      <h2>
        <Skeleton count={1} className="skeleton-title" />
      </h2>
      <ul>
        <li>
          <Skeleton count={1} />
        </li>
        <li>
          <Skeleton count={1} />
        </li>
        <li>
          <Skeleton count={1} />
        </li>
        <li>
          <Skeleton count={1} />
        </li>
      </ul>
    </div>
  );
};

export default GameSkeleton;
