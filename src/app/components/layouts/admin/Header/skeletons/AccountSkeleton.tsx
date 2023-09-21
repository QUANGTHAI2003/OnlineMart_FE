type AccountSkeletonProps = {
  count: number;
};

const AccountSkeleton = ({ count }: AccountSkeletonProps) => {
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
          <div className="w-32 h-8 flex justify-center items-center gap-1.5 p-1">
            <div className="w-6 h-6 rounded-full bg-slate-200"></div>
            <div className="w-3/4 h-6 rounded-md bg-slate-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountSkeleton;
