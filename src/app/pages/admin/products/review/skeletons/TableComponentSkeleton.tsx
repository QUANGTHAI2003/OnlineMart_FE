type TableComponentSkeletonProps = {
  count: number;
};

const TableComponentSkeleton = ({ count }: TableComponentSkeletonProps) => {
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
        <div key={index} className="w-full h-full animate-pulse px-4">
          <div className="w-full flex flex-col gap-4 bg-white p-5">
            <div className="bg-slate-200 h-8 w-1/6 rounded-md"></div>
            <div className="bg-slate-200 h-44 w-full rounded-md"></div>

            <div className="w-1/4 flex gap-2">
              <div className="bg-slate-200 h-7 w-1/3 rounded-md"></div>
              <div className="bg-slate-200 h-7 w-1/3 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableComponentSkeleton;
