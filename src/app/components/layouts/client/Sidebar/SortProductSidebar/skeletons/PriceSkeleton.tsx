type PriceSkeletonProps = {
  count: number;
};

const PriceSkeleton = ({ count }: PriceSkeletonProps) => {
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
          <div className="rounded-xl bg-slate-200 h-4 w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default PriceSkeleton;
