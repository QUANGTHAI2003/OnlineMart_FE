type SpreadPriceSkeletonProps = {
  count: number;
};

const SpreadPriceSkeleton = ({ count }: SpreadPriceSkeletonProps) => {
  return (
    <div
      style={{
        display: "grid",
        alignItems: "stretch",
        gap: "8px",
        gridTemplateColumns: "repeat(1, 1fr)",
        backgroundColor: "#f5f5f5",
        padding: "8px",
      }}
    >
      {[...Array(count)].map((_, index) => (
        <div key={index} className="w-full h-full animate-pulse">
          <div className="flex gap-x-1">
            <div className="bg-slate-200 h-7 w-1/2 rounded-md"></div>
            <div className="bg-slate-200 h-7 w-1/2 rounded-md"></div>
          </div>
          <div className="bg-slate-200 h-7 w-full rounded-md mt-2"></div>
        </div>
      ))}
    </div>
  );
};

export default SpreadPriceSkeleton;
