const SpecialCategorySkeleton = () => {
  return (
    <div className="animate-pulse w-full">
      <div className="h-48 p-2 flex items-start flex-col">
        <div className="w-full h-full rounded">
          <div className="bg-slate-200 w-full h-full rounded-md"></div>
        </div>
        <div className="mt-2 bg-slate-200 w-full h-6 rounded-md items-start"></div>
      </div>
    </div>
  );
};

export default SpecialCategorySkeleton;
