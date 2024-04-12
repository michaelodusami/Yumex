import React from 'react';

export const ForumSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-8 w-full rounded bg-gray-200 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="rounded-lg bg-white p-4 shadow">
            <div className="mb-4 h-48 md:h-[20rem] lg:h-[30rem] rounded bg-gray-200 animate-pulse"></div>
            <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 animate-pulse"></div>
            <div className="mb-4 h-4 w-1/2 rounded bg-gray-200 animate-pulse"></div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="h-4 w-24 rounded bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

