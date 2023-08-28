type CheckboxSortSkeletonProps = {
  count: number;
};

const CheckboxSortSkeleton = ({ count }: CheckboxSortSkeletonProps) => {
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
          <div className="rounded-xl bg-slate-200 h-8 w-1/2 mb-2"></div>
          <div className="bg-slate-200 h-4 w-full rounded-md mt-2"></div>
          <div className="bg-slate-200 h-4 w-full rounded-md mt-2"></div>
          <div className="bg-slate-200 h-4 w-full rounded-md mt-2"></div>
          <div className="bg-slate-200 h-7 w-3/5 rounded-md mt-2"></div>
        </div>
      ))}
    </div>
  );
};

export default CheckboxSortSkeleton;
