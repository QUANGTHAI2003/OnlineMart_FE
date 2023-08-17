import { Skeleton } from "antd";

const AccountMenuSkeleton = () => {
  return (
    <div className="w-fit h-[32px] py-1">
      <div className="flex items-center">
        <Skeleton.Avatar size="small" shape="circle" active style={{ marginRight: 11 }} />
        <Skeleton.Input active size="small" block />
      </div>
    </div>
  );
};

export default AccountMenuSkeleton;
