import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PageNotification = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="h-[56px] px-4 flex items-center justify-between bg-transparent">
      <button className="min-w-[40px] h-[40px] p-0 border-0 outline-0 text-white flex justify-center items-center z-10 bg-transparent"></button>
      <div className="text-black text-[17px] text-center w-full ">{t("user.header.navigation_notifications")}</div>
      <div className="w-[40px] h-[40px] flex items-center justify-center ">
        <FontAwesomeIcon
          onClick={() => {
            navigate(-1);
          }}
          aria-hidden="true"
          icon={faXmark}
          className="text-base text-black cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PageNotification;
