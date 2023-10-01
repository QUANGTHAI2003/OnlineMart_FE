type MainTitleSkeletonProps = {
  count: number;
};

const MainTitleSkeleton = ({ count }: MainTitleSkeletonProps) => {
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
        <div key={index} className="w-1/3 h-full animate-pulse">
          <div className="w-full flex items-center gap-4">
            <div className="bg-slate-200 h-8 w-full rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainTitleSkeleton;
