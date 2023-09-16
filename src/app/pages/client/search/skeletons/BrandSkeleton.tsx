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
        gridTemplateColumns: "repeat(1, 1fr)",
        backgroundColor: "#f5f5f5",
        padding: "0px",
      }}
    >
      {[...Array(count)].map((_, index) => (
        <div key={index} className="w-full h-full animate-pulse mb-4">
          <div className="w-full flex items-center gap-8">
            <div className="w-1/2 flex gap-2">
              <div className="bg-slate-200 h-28 w-1/4 rounded-md"></div>
              <div className="w-3/4 flex flex-col gap-2">
                <div className="bg-slate-200 h-14 w-full rounded-md"></div>
                <div className="w-full flex gap-2">
                  <div className="bg-slate-200 h-12 w-1/4 rounded-md"></div>
                  <div className="bg-slate-200 h-12 w-1/4 rounded-md"></div>
                  <div className="bg-slate-200 h-12 w-1/4 rounded-md"></div>
                  <div className="bg-slate-200 h-12 w-1/4 rounded-md"></div>
                </div>
              </div>
            </div>

            <div className="w-1/2 flex gap-4">
              <div className="w-2/3 flex gap-2">
                <div className="bg-slate-200 h-28 w-full rounded-md"></div>
                <div className="bg-slate-200 h-28 w-full rounded-md"></div>
                <div className="bg-slate-200 h-28 w-full rounded-md"></div>
              </div>

              <div className="w-1/3 flex flex-col gap-4">
                <div className="bg-slate-200 h-12 w-full rounded-md"></div>
                <div className="bg-slate-200 h-12 w-full rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandSkeleton;
