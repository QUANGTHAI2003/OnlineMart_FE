const SpecialCategorySkeleton = () => {
  return (
    <div className=" animate-pulse p-1">
      <div className="w-[160px] h-[180px] p-2 flex items-start flex-col ">
        <div className="w-[125px] h-[125px] rounded ">
          <div className="bg-slate-200  w-[125px] h-[125px] rounded-md"></div>
        </div>
        <div className=" mt-2  bg-slate-200 w-[125px] h-[25px] rounded-md items-start "></div>
      </div>
    </div>
  );
};

export default SpecialCategorySkeleton;
