'use client';

export function WeatherCardSkeleton() {
  // This component renders a skeleton loader for a weather card
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
      <div className="bg-gray-200 h-48"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-10 bg-gray-200 rounded-full w-10 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}