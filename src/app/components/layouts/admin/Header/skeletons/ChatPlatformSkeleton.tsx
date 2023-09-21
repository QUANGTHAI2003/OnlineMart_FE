type ChatPlatformSkeletonProps = {
  count: number;
};

const ChatPlatformSkeleton = ({ count }: ChatPlatformSkeletonProps) => {
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
          <div className="w-8 h-8 flex justify-center items-center gap-1.5 p-1">
            <div className="w-full h-6 rounded-full bg-slate-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatPlatformSkeleton;
