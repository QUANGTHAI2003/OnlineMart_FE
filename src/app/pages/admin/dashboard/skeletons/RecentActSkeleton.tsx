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
        <div key={index} className="w-full h-full animate-pulse">
          <div className="w-full flex flex-col items-center gap-4">
            <div className="w-full flex justify-between items-center">
              <div className="bg-slate-200 h-8 w-3/5 rounded-md"></div>
              <div className="bg-slate-200 h-8 w-1/4 rounded-md"></div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="bg-slate-200 h-16 w-full rounded-md"></div>
              <div className="bg-slate-200 h-16 w-full rounded-md"></div>
              <div className="bg-slate-200 h-16 w-full rounded-md"></div>
              <div className="bg-slate-200 h-16 w-full rounded-md"></div>
              <div className="bg-slate-200 h-16 w-full rounded-md"></div>
              <div className="bg-slate-200 h-16 w-full rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BreadcrumbSkeleton;
