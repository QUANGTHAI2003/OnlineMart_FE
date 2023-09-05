const PaymentSkeleton = () => {
  return (
    <div className=" w-full flex flex-wrap">
      <div className="w-full xl:w-[900px] xl:mr-5 left xl:bg-white">
        <div className="rounded relative p-4 mb-4 bg-white animate-pulse">
          <div className="w-full xl:w-[200px] h-5 bg-slate-200 rounded-xl mb-4"></div>
          <div className="w-full xl:w-[450px] h-[120px] bg-slate-200 rounded-md"></div>
          <div className="w-full xl:grid gap-5">
            <div className="w-full rounded-xl border-solid border border-[#dddde3] mt-5 px-4 pt-5 pb-4 relative flex xl:flex-row flex-col z-0">
              <div className="left-content mr-[46px] xl:max-w-[482px]">
                <div className="mt-2 w-full xl:w-[482px] flex justify-between">
                  <div className="w-[100px] h-[20px] bg-slate-200 rounded-lg"></div>
                  <div className="w-[70px] h-[20px] bg-slate-200 rounded-lg"></div>
                </div>
                <div className="block">
                  <div>
                    <div className="flex py-3 items-center">
                      <div className="w-[50px] h-[50px] bg-slate-200 rounded-lg mr-2"></div>
                      <div className="text-sm leading-4 text-gray-600 flex-grow flex-shrink basis-0 ">
                        <div className="w-[200px] h-[10px] bg-slate-200 rounded-md mb-1"></div>
                        <div className="w-[150px] h-[10px] bg-slate-200 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block">
                  <div>
                    <div className="flex py-3 items-center">
                      <div className="w-[50px] h-[50px] bg-slate-200 rounded-lg mr-2"></div>
                      <div className="text-sm leading-4 text-gray-600 flex-grow flex-shrink basis-0 ">
                        <div className="w-[200px] h-[10px] bg-slate-200 rounded-md mb-1"></div>
                        <div className="w-[150px] h-[10px] bg-slate-200 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block">
                  <div>
                    <div className="flex py-3 items-center">
                      <div className="w-[50px] h-[50px] bg-slate-200 rounded-lg mr-2"></div>
                      <div className="text-sm leading-4 text-gray-600 flex-grow flex-shrink basis-0 ">
                        <div className="w-[200px] h-[10px] bg-slate-200 rounded-md mb-1"></div>
                        <div className="w-[150px] h-[10px] bg-slate-200 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-content flex-grow flex-shrink basis-0">
                <div className="flex w-full items-start bg-slate-200 h-[70px] rounded-lg "></div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded relative p-4 mb-4 bg-white animate-pulse">
          <div className="w-full xl:w-[200px] h-5 bg-slate-200 rounded-xl mb-4"></div>
          <div>
            <div className="w-full xl:w-[450px] h-6 bg-slate-200 rounded-md mb-3"></div>
            <div className="w-full xl:w-[450px] h-6 bg-slate-200 rounded-md mb-3"></div>
            <div className="w-full xl:w-[450px] h-6 bg-slate-200 rounded-md mb-3"></div>
            <div className="w-full xl:w-[450px] h-6 bg-slate-200 rounded-md mb-3"></div>
          </div>
        </div>
      </div>
      <div className="flex-grow flex-shrink basis-0 h-fit right bg-white animate-pulse">
        <div>
          <div className="bg-white rounded mb-3 text-sm leading-5 p-4 animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="w-32 h-4 rounded bg-slate-200"></div>
            </div>
            <div className="w-full h-3 rounded bg-slate-200  mb-[4px]"></div>
            <div className="w-32 h-4 rounded bg-slate-200"></div>
          </div>
          <div className="bg-white rounded mb-3 p-4">
            <div className="w-32 h-4 rounded bg-slate-200 mb-2"></div>
            <div className="w-full h-10 rounded bg-slate-200 mb-2"></div>
            <div className="w-full h-10 rounded bg-slate-200"></div>
            <div className="w-32 h-4 mt-2 rounded bg-slate-200"></div>
          </div>
        </div>
        <div className="bg-white rounded mb-3 p-0 relative">
          <div className="text-sm leading-5 p-4 border-t-0 border-l-0 border-r-0 border-b border-solid border-[#ebebf0]">
            <div className="flex justify-between mb-1">
              <div className="w-[60px] h-5 bg-slate-200 rounded-md"></div>
              <div className="w-[150px] h-5 bg-slate-200 rounded-md"></div>
            </div>
            <div className="flex items-center">
              <div className="w-[200px] h-5 bg-slate-200 rounded-md"></div>
            </div>
          </div>
          <div className="py-2 px-4 grid gap-1 text-sm leading-5">
            <div className="flex justify-between">
              <div className="w-[100px] h-5 bg-slate-200 rounded-md"></div>
              <div className="w-[150px] h-5 bg-slate-200 rounded-md"></div>
            </div>
            <div className="flex justify-between">
              <div className="w-[100px] h-5 bg-slate-200 rounded-md"></div>
              <div className="w-[150px] h-5 bg-slate-200 rounded-md"></div>
            </div>
            <div className="flex justify-between">
              <div className="w-[100px] h-5 bg-slate-200 rounded-md"></div>
              <div className="w-[150px] h-5 bg-slate-200 rounded-md"></div>
            </div>
          </div>
          <div className="w-[calc(100%_-_32px)] h-[1px] bg-[#ebebf0] mx-auto"></div>
          <div className="flex justify-between px-4 py-2">
            <div className="w-[100px] h-5 bg-slate-200 rounded-md"></div>
            <div className="w-[150px] h-5 bg-slate-200 rounded-md"></div>
          </div>
          <div className="px-4 pb-3 font-semibold"></div>
          <div className="flex justify-between">
            <button className="w-full h-11 outline-0 cursor-pointer font-semibold text-base leading-6 rounded mx-4 mb-4 text-white bg-slate-200 border-none"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSkeleton;
