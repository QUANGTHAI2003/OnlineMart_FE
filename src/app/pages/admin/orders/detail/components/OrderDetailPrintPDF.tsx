import { PrinterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";

import ComponentDetailPrintPDF from "./ComponentDetailPrintPDF";

const OrderDetailPrintPDF = () => {
  const componentRef = useRef<any>();
  const handlePrint = useReactToPrint({
    suppressErrors: true,
    removeAfterPrint: true,
    content: () => componentRef.current,
    documentTitle: "ĐINH CHÍ NGUYỆN",
  });

  const { t } = useTranslation();
  return (
    <>
      <ComponentDetailPrintPDF innerRef={componentRef} />
      <Button onClick={handlePrint} type="primary" ghost className="mt-4">
        <PrinterOutlined />
        {t("admin_shop.orders.detail.print_order")}
      </Button>
    </>
  );
};

export default OrderDetailPrintPDF;
