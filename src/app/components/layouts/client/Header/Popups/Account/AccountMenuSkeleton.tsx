import { Skeleton } from "antd";

const AccountMenuSkeleton = () => {
  return (
    <div>
      <div className="flex items-center max-w-[160px]">
        <Skeleton.Avatar size="small" shape="circle" active style={{ marginRight: 11 }} />
        <Skeleton.Input active size="small" style={{ height: 15 }} block />
      </div>
    </div>
  );
};

export default AccountMenuSkeleton;
