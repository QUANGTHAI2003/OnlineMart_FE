type TableSkeletonProps = {
  count: number;
};

const TableSkeleton = ({ count }: TableSkeletonProps) => {
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
        <div key={index} className="w-full h-full animate-pulse px-6 py-3">
          <div className="w-full">
            <div className="w-1/3 flex items-center">
              <div className="bg-slate-200 h-5 w-1/3 rounded-md"></div>
            </div>
            <div className="bg-slate-200 h-48 w-full rounded-md mt-3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
