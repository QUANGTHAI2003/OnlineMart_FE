type NotificationSkeletonProps = {
  count: number;
};

const NotificationSkeleton = ({ count }: NotificationSkeletonProps) => {
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
          <div className="w-full flex items-center gap-4">
            <div className="bg-slate-200 h-14 w-full rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;
