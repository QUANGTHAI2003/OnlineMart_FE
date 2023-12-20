import { useAppSelector } from "@app/store/store";
import { JsonToTable } from "react-json-to-table";

const ModalData = ({ id }: { id: number }) => {
  const activities = useAppSelector((state) => state.activitiesLogs.activities) || [];

  const activity = activities.find((activity: any) => activity.id === id);

  return (
    <div className="px-6 py-4">
      <div className="border-solid p-6 rounded bg-[#F2F9FF] border-[#E8EAEB]">
        <div className="flex justify-between">
          <div className="w-full">
            <div className="flex justify-center">
              <p className="font-medium text-[#0f1824] pb-1 text-xl">Dữ liệu</p>
            </div>
            <div className="w-fit flex items-center">
              {activity?.data === null ? (
                <span className="font-medium text-center text-base">Không có dữ liệu</span>
              ) : (
                // /* @ts-expect-error Server Component */
                <JsonToTable json={activity?.data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalData;
