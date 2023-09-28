type TabRatingSkeletonProps = {
  count: number;
};

const TabRatingSkeleton = ({ count }: TabRatingSkeletonProps) => {
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
        <div key={index} className="w-full h-full animate-pulse px-5 mt-5">
          <div className="w-1/2 flex items-center gap-4">
            <div className="bg-slate-200 h-10 w-1/6 rounded-md"></div>
            <div className="bg-slate-200 h-10 w-1/6 rounded-md"></div>
            <div className="bg-slate-200 h-10 w-1/6 rounded-md"></div>
            <div className="bg-slate-200 h-10 w-1/6 rounded-md"></div>
            <div className="bg-slate-200 h-10 w-1/6 rounded-md"></div>
            <div className="bg-slate-200 h-10 w-1/6 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabRatingSkeleton;
