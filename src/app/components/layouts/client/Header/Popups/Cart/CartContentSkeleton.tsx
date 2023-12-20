import { Skeleton } from "antd";

function CartContentSkeleton({ count }: { count: any }) {
  const skeletons = Array(count).fill(null);

  return (
    <div className="w-[370px] p-2">
      <h3 className="text-sm font-normal">
        <Skeleton.Input active style={{ width: 200, height: 10 }} block />
        {/* <h3 className="text-sm font-normal">Sản phẩm thêm vào gần đây</h3> */}
      </h3>
      {skeletons.map((_, index) => (
        <div className="flex w-full items-center cursor-pointer p-2 hover:bg-[#f5f5f5]" key={index}>
          <Skeleton.Avatar size="large" active />
          <div className="flex w-full flex-row justify-between ml-2">
            <div className="font-bold">
              <Skeleton.Input active size="small" style={{ height: 15 }} block />
            </div>
            <div className="text-red-600 font-semibold">
              <Skeleton.Input active size="small" style={{ height: 15 }} block />
            </div>
          </div>
        </div>
      ))}
      <div className="mt-4 ">
        <Skeleton.Button active block />
        {/* <Button type="primary" block>
          View My Shopping Cart
        </Button> */}
      </div>
    </div>
  );
}

export default CartContentSkeleton;
