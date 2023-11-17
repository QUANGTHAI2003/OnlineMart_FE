import { useAppSelector } from "@app/store/store";
import { IActivity } from "@app/types/activity.types";

const ModalLog = ({ id }: { id: number }) => {
  const activities = useAppSelector((state) => state.activitiesLogs.activities) || [];

  const activity = activities.find((activity: IActivity) => activity.id === id);

  return (
    <>
      <div className="px-6 py-4">
        <div className="border-solid p-6 rounded bg-[#F2F9FF] border-[#E8EAEB]">
          <div className="flex justify-between">
            <div className="w-1/2">
              <div className="flex justify-start">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fontSize="24"
                  color="primary"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 3h18c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-4v-2h4V5H3v12h4v2H3c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2Zm9 13 6 6H6l6-6Z"
                    fill="#0088FF"
                  ></path>
                </svg>
                <p className="font-medium text-[#0f1824] pl-2 pb-1">Thiết bị</p>
              </div>
              <div>
                <p className="text-[#46515f]"></p>
                <p className="text-[#46515f]">{`IP: ${activity?.ip}`}</p>
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex justify-start">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fontSize="24"
                  color="primary"
                >
                  <path
                    d="M19.002 3h-14c-1.103 0-2 .897-2 2v4h2V5h14v14h-14v-4h-2v4c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.898-2-2-2Z"
                    fill="#0088FF"
                  ></path>
                  <path d="m11 16 5-4-5-4v3.001H3v2h8V16Z" fill="#0088FF"></path>
                </svg>
                <p className="font-medium text-[#0f1824] pl-2 pb-1">User - Agent</p>
              </div>
              <div>
                <p className="text-[#46515f]">{activity?.userAgent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="">
          <div>
            <span className="text-sm font-medium leading-5">- Nhân viên: </span>
            <span className="text-sm leading-[17px]">{activity?.author}</span>
          </div>
          <div>
            <span className="text-sm font-medium leading-5">- Chức năng: </span>
            <span className="text-sm leading-[17px]">{activity?.action}</span>
          </div>
          <div>
            <span className="text-sm font-medium leading-5">- Thao tác: </span>
            <span className="text-sm leading-[17px]">{activity?.content}</span>
          </div>
          <div>
            <span className="text-sm font-medium leading-5">- Thời gian: </span>
            <span className="text-sm leading-[17px]">{activity?.action_date}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalLog;
