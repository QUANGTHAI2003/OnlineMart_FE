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
        <div key={index} className="w-full h-full animate-pulse px-6">
          <div className="w-full flex gap-4">
            <div className="bg-slate-200 h-10 w-2/3 rounded-md"></div>
            <div className="bg-slate-200 h-10 w-2/3 rounded-md"></div>
            <div className="bg-slate-200 h-10 w-2/3 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BreadcrumbSkeleton;
