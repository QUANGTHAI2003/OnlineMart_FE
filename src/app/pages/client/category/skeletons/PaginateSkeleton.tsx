type PaginateSkeletonProps = {
  count: number;
};

const PaginateSkeleton = ({ count }: PaginateSkeletonProps) => {
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
          <div className="w-full flex pb-3">
            <div className="w-full px-6">
              <div className="bg-slate-200 h-7 w-64 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaginateSkeleton;