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
        <div key={index} className="w-full h-full animate-pulse px-6 pb-6">
          <div className="w-full flex gap-4">
            <div className="bg-slate-200 h-32 w-1/3 rounded-md mt-3"></div>
            <div className="bg-slate-200 h-32 w-1/3 rounded-md mt-3"></div>
            <div className="bg-slate-200 h-32 w-1/3 rounded-md mt-3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BreadcrumbSkeleton;
