export function ClientTableSkeleton() {
    return (
      <div className="grid grid-cols-5 gap-4 border-b border-gray-100 py-3 animate-pulse">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-40 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
    );
  }
  