import { useUpdateStatusPaymentMutation } from "@app/store/slices/api/user/checkoutApi";
import { handleApiError } from "@app/utils/helper";
import { Button, Result } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const ReturnPayment = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const status = params.get("vnp_ResponseCode");
  const code = params.get("vnp_OrderInfo");
  const code_cod = params.get("code");

  const [updateStatusPayment] = useUpdateStatusPaymentMutation();

  const handleUpdate = async () => {
    if (status && code) {
      try {
        const colonIndex = code?.indexOf(":");
        const substring = colonIndex !== -1 ? code?.substring(colonIndex + 1) : "";
        const data = {
          order_code: substring && substring,
          status_code: status === "00" ? "1" : "2",
        };
        await updateStatusPayment(data).unwrap;
      } catch (err) {
        handleApiError(err);
      }
    } else {
      console.log("insert cai khac");
    }
  };

  const show_code = code ? code : code_cod;

  const handleBack = () => {
    navigate("/");
  };

  const handleRedirect = () => {
    navigate("/account/orders");
  };

  useEffect(() => {
    handleUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="h-screen">
      <Result
        status="success"
        title={t("user.payment_page.thank_pre_order")}
        subTitle={`${t("user.payment_page.thank_subtitle")} ${show_code}`}
        extra={[
          <Button type="primary" onClick={handleRedirect} key="console">
            {t("user.payment_page.thank_btn_view_detail")}
          </Button>,
          <Button key="buy" onClick={handleBack}>
            {t("user.payment_page.thank_btn_continue")}
          </Button>,
        ]}
      />
    </div>
  );
};

export default ReturnPayment;
