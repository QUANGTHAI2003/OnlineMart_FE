type BreadcrumbSkeletonProps = {
  count: number;
};

const BreadcrumbSkeleton = ({ count }: BreadcrumbSkeletonProps) => {
  return (
    <div
      style={{
        display: "grid",
        alignItems: "stretch",
        gap: "8px",
        gridTemplateColumns: "repeat(1, 1fr)",
        backgroundColor: "#f5f5f5",
        padding: "0px",
      }}
    >
      {[...Array(count)].map((_, index) => (
        <div key={index} className="w-full h-full animate-pulse p-6">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex items-center justify-between gap-4">
              <div className="bg-slate-200 h-8 w-2/4 rounded-md"></div>
              <div className="bg-slate-200 h-8 w-1/6 rounded-md"></div>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <div className="bg-slate-200 h-28 w-1/4 rounded-md"></div>
              <div className="bg-slate-200 h-28 w-1/4 rounded-md"></div>
              <div className="bg-slate-200 h-28 w-1/4 rounded-md"></div>
              <div className="bg-slate-200 h-28 w-1/4 rounded-md"></div>
            </div>
            <div className="w-full flex items-center gap-4">
              <div className="bg-slate-200 h-60 w-full rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BreadcrumbSkeleton;
