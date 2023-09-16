type BrandSkeletonProps = {
  count: number;
};

const BrandSkeleton = ({ count }: BrandSkeletonProps) => {
  return (
    <div
      style={{
        display: "grid",
        alignItems: "stretch",
        gap: "8px",
        gridTemplateColumns: "repeat(2, 1fr)",
        backgroundColor: "#f5f5f5",
        padding: "0px",
      }}
    >
      {[...Array(count)].map((_, index) => (
        <div key={index} className="w-full h-full animate-pulse">
          <div className="w-full flex items-center gap-6">
            <div className="w-1/2 flex flex-col gap-2 p-5">
              <div className="bg-slate-200 h-5 w-1/2 rounded-md"></div>
              <div className="w-full flex gap-2">
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-2 p-5">
              <div className="bg-slate-200 h-5 w-1/2 rounded-md"></div>
              <div className="w-full flex gap-2">
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-2 p-5">
              <div className="bg-slate-200 h-5 w-1/2 rounded-md"></div>
              <div className="w-full flex gap-2">
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-2 p-5">
              <div className="bg-slate-200 h-5 w-1/2 rounded-md"></div>
              <div className="w-full flex gap-2">
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
                <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandSkeleton;
