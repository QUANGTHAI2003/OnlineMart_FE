type SortPaginateSkeletonProps = {
  count: number;
};

const SortPaginateSkeleton = ({ count }: SortPaginateSkeletonProps) => {
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
          <div className="w-full flex justify-around py-3">
            <div className="w-1/2 flex flex-row gap-2 px-6">
              <div className="bg-slate-200 h-5 w-1/12 rounded-md"></div>
              <div className="bg-slate-200 h-5 w-1/6 rounded-md"></div>
              <div className="bg-slate-200 h-5 w-2/6 rounded-md"></div>
            </div>
            <div className="w-1/2 flex flex-row justify-end gap-2 px-6">
              <div className="bg-slate-200 h-5 w-1/6 rounded-md"></div>
              <div className="bg-slate-200 h-5 w-1/6 rounded-md"></div>
            </div>
          </div>
          <div className="w-full flex pb-3">
            <div className="w-1/2 flex flex-row gap-2 px-6">
              <div className="bg-slate-200 h-7 w-1/6 rounded-md"></div>
              <div className="bg-slate-200 h-7 w-2/6 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SortPaginateSkeleton;
