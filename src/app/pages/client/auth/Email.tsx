import { Button, Input } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "./Login.style";

const Email = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  return (
    <S.ChangePass>
      <div className="flex flex-col mt-36 items-center">
        <div className="w-1/4 change-form  p-4 rounded-lg  text-center">
          <h1 className="p-3">{t("user.account.forgot.forgot_pass")}</h1>
          <p>{t("user.account.forgot.plz")}</p>
          <p className="pb-3">{t("user.account.forgot.box")}</p>
          <Input placeholder="Email" className="mb-4 rounded-xl h-10" />
          <Link to="/auth/forgot">
            <Button type="primary" className="w-full h-12 rounded-4xl">
              {t("user.account.forgot.cf")}
            </Button>
          </Link>
        </div>
        <span className="text-xs p-2  text-gray-500">ONLINE MART | &copy; 2018-2022. All Rights Reserved</span>
      </div>
    </S.ChangePass>
  );
};

export default Email;
