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
        padding: "0px",
      }}
    >
      {[...Array(count)].map((_, index) => (
        <div key={index} className="w-full h-full animate-pulse mr-14 pt-5 flex justify-center items-end">
          <div className="w-24 gap-8">
            <div className="bg-slate-200 h-8 w-full rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandSkeleton;
