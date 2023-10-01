type FilterSkeletonProps = {
  count: number;
};

const FilterSkeleton = ({ count }: FilterSkeletonProps) => {
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
          <div className="w-full flex items-center justify-between">
            <div className="w-1/2 flex gap-2">
              <div className="bg-slate-200 h-8 w-1/2 rounded-md"></div>
              <div className="bg-slate-200 h-8 w-1/2 rounded-md"></div>
            </div>
            <div className="bg-slate-200 h-8 w-1/6 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterSkeleton;
