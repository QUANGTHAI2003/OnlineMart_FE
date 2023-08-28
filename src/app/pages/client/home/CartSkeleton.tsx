import * as S from "./Cart.styles";

const CartSkeleton = () => {
  return (
    <div className="flex flex-nowrap justify-between basis-[100%]">
      <div className="flex flex-col grow shrink basis-[910px]">
        <S.CartFirst>
          <div
            className="rounded bg-white py-[9px] px-4 mb-3 flex items-center
          animate-pulse"
          >
            <div className="w-5 h-5 rounded-md bg-slate-200 mr-2"></div>
            <div className="w-32 h-5 rounded-md bg-slate-200"></div>
          </div>
        </S.CartFirst>
        <div>
          <div className="h-auto overflow-auto">
            <div className="bg-white mb-[10px] rounded">
              <div className="px-4 pt-[19px] pb-0">
                <div className="block mb-[10px]">
                  <div className="flex animate-pulse">
                    <div className="w-5 h-5 rounded-md bg-slate-200 mr-3"></div>
                    <div className="w-32 h-5 rounded-md bg-slate-200"></div>
                  </div>
                </div>
              </div>
              <div className="mt-8 mx-0 bg-white pt-0 px-[16px] pb-[3px] ">
                <div className="mb-8">
                  <S.CartItem>
                    <div className="col-1 flex items-center">
                      <div className="w-5 h-5 rounded-md bg-slate-200 mr-3"></div>
                      <div className="w-[75px] h-[75px] rounded-md bg-slate-200"></div>
                      <div className="relative pl-[10px] w-[calc(100%_-_100px)]">
                        <div className="w-36 h-5 rounded-md bg-slate-200 absolute top-[-35px]"></div>
                      </div>
                    </div>
                  </S.CartItem>
                </div>
                <div className="mb-8">
                  <S.CartItem>
                    <div className="col-1 flex items-center">
                      <div className="w-5 h-5 rounded-md bg-slate-200 mr-3"></div>
                      <div className="w-[75px] h-[75px] rounded-md bg-slate-200"></div>
                      <div className="relative pl-[10px] w-[calc(100%_-_100px)]">
                        <div className="w-36 h-5 rounded-md bg-slate-200 absolute top-[-35px]"></div>
                      </div>
                    </div>
                  </S.CartItem>
                </div>
                <div className="mb-8">
                  <S.CartItem>
                    <div className="col-1 flex items-center">
                      <div className="w-5 h-5 rounded-md bg-slate-200 mr-3"></div>
                      <div className="w-[75px] h-[75px] rounded-md bg-slate-200"></div>
                      <div className="relative pl-[10px] w-[calc(100%_-_100px)]">
                        <div className="w-36 h-5 rounded-md bg-slate-200 absolute top-[-35px]"></div>
                      </div>
                    </div>
                  </S.CartItem>
                </div>
                <div className="mb-8">
                  <S.CartItem>
                    <div className="col-1 flex items-center">
                      <div className="w-5 h-5 rounded-md bg-slate-200 mr-3"></div>
                      <div className="w-[75px] h-[75px] rounded-md bg-slate-200"></div>
                      <div className="relative pl-[10px] w-[calc(100%_-_100px)]">
                        <div className="w-36 h-5 rounded-md bg-slate-200 absolute top-[-35px]"></div>
                      </div>
                    </div>
                  </S.CartItem>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex grow shrink basis-[calc(100%_-_925px)] ml-5">
        <div className="sticky top-[-270.2px] w-full">
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
          <div className="bg-white rounded mb-3 p-4">
            <div className="w-32 h-4 rounded bg-slate-200 mb-2"></div>
            <div className="w-full h-10 rounded bg-slate-200 mb-2"></div>
            <div className="w-full h-10 rounded bg-slate-200"></div>
          </div>
          <button className="w-full bg-[#ff424e] text-center block cursor-pointer mt-[15px] border-none rounded px-[10px] py-[13px] text-white font-normal text-sm">
            Mua ngay (1)
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartSkeleton;
