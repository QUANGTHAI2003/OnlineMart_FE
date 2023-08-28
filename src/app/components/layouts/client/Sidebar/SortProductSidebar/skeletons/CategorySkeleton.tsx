type CategorySkeletonProps = {
  count: number;
};

const CategorySkeleton = ({ count }: CategorySkeletonProps) => {
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
          <div className="bg-slate-200 h-5 w-full rounded-md mb-2"></div>
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
