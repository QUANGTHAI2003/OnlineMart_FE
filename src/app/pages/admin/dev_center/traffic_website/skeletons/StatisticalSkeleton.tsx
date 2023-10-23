type StatisticalSkeletonProps = {
  count: number;
};

const StatisticalSkeleton = ({ count }: StatisticalSkeletonProps) => {
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
        <div key={index} className="w-full h-full animate-pulse p-6">
          <div className="w-full flex flex-col gap-4">
            <div className="w-2/5 flex gap-4">
              <div className="bg-slate-200 h-5 w-2/12 rounded-md"></div>
              <div className="bg-slate-200 h-5 w-10/12 rounded-md"></div>
            </div>

            <div className="w-full flex justify-between">
              <div className="w-2/5 flex gap-4">
                <div className="bg-slate-200 h-20 w-1/2 rounded-md"></div>
                <div className="bg-slate-200 h-20 w-1/2 rounded-md"></div>
              </div>
              <div className="w-1/6 flex items-end">
                <div className="bg-slate-200 h-8 w-full rounded-md"></div>
              </div>
            </div>

            <div className="w-full flex gap-4">
              <div className="bg-slate-200 h-28 w-1/4 rounded-md"></div>
              <div className="bg-slate-200 h-28 w-1/4 rounded-md"></div>
              <div className="bg-slate-200 h-28 w-1/4 rounded-md"></div>
              <div className="bg-slate-200 h-28 w-1/4 rounded-md"></div>
            </div>

            <div className="w-full">
              <div className="bg-slate-200 h-80 w-full rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticalSkeleton;
