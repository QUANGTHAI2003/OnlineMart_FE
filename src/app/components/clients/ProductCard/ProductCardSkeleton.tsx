type ProductCardSkeletonProps = {
  count: number;
};

const ProductCardSkeleton = ({ count }: ProductCardSkeletonProps) => {
  return (
    <div
      style={{
        display: "grid",
        alignItems: "stretch",
        gap: "8px",
        gridTemplateColumns: "repeat(6, 1fr)",
        backgroundColor: "#f5f5f5",
        padding: "8px",
      }}
    >
      {[...Array(count)].map((_, index) => (
        <div key={index} className="w-full h-full animate-pulse">
          <div className="rounded-xl bg-slate-200 h-40 w-full"></div>
          <div className="info py-3 w-full">
            <div className="name">
              <div className="bg-slate-200 h-4 w-full rounded-md"></div>
              <div className="flex mt-2 gap-x-4">
                <div className="bg-slate-200 h-4 w-1/2 rounded-md"></div>
                <div className="bg-slate-200 h-4 w-1/2 rounded-md"></div>
              </div>
              <div className="bg-slate-200 h-4 w-full rounded-md mt-2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
