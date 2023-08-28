type AdvertiseSkeletonProps = {
  count: number;
};

const AdvertiseSkeleton = ({ count }: AdvertiseSkeletonProps) => {
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
          <div className="rounded-xl bg-slate-200 h-40 w-full"></div>
          <div className="info py-3 w-full">
            <div className="name flex justify-center mb-1">
              <div className="bg-slate-200 h-7 w-4/5 rounded-md"></div>
            </div>
            <div className="name flex justify-center mb-5">
              <div className="bg-slate-200 h-7 w-4/5 rounded-md"></div>
            </div>
            <div className="flex justify-center mb-1">
              <div className="bg-slate-200 h-7 w-2/5 rounded-md"></div>
            </div>
            <div className="flex justify-center mb-5">
              <div className="bg-slate-200 h-5 w-3/5 rounded-md"></div>
            </div>
            <div className="flex justify-center mb-2">
              <div className="bg-slate-200 h-5 w-2/5 rounded-md"></div>
            </div>
            <div className="flex justify-center">
              <div className="bg-slate-200 h-7 w-3/5 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdvertiseSkeleton;
