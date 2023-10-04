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
        <div key={index} className="w-full h-full animate-pulse bg-white p-4">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-4">
              <div className="bg-slate-200 h-10 w-2/6 rounded-md"></div>
              <div className="bg-slate-200 h-40 w-full rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
