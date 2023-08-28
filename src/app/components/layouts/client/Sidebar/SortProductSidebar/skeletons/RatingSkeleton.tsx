type RatingSkeletonProps = {
  count: number;
};

const RatingSkeleton = ({ count }: RatingSkeletonProps) => {
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
          <div className="name">
            <div className="flex gap-x-2">
              <div className="bg-slate-200 h-4 w-3/5 rounded-md"></div>
              <div className="bg-slate-200 h-4 w-2/5 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingSkeleton;
