import { DownloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";

import { ReturnData } from "../data";

import ChartOperationalEfficiency from "./ChartOperationalEfficiency";

const ReturnOrderCard = () => {
  const { t } = useTranslation();
  const [dataExport, setDataExport] = useState<string[][]>([]);
  const getQRsExport = (done: any) => {
    const result = [];
    if (ReturnData && ReturnData.length > 0) {
      result.push(["Số đơn đổi trả", "Tổng số đơn", "Tỉ lệ"]);
      ReturnData.map((item) => {
        const arr = [];
        arr[0] = item.returnOrder;
        arr[1] = item.totalOrder;
        arr[2] = `${(item.returnOrder / item.totalOrder) * 100} %`;
        result.push(arr);
      });

      setDataExport(result);
      console.log(result);

      done();
    }
  };
  return (
    <div>
      <Card bordered={false}>
        <Row justify="space-between" align="middle">
          <Col span={12}>
            <span className="font-semibold text-base">
              {t("admin_shop.dev_center.operational_efficiency.card_return_orders")}
            </span>
          </Col>
          <Col span={12} className="text-right">
            <CSVLink
              data={dataExport}
              separator={";"}
              filename={"return-order.csv"}
              asyncOnClick={true}
              onClick={getQRsExport}
            >
              <Button type="default">
                {t("admin_shop.dev_center.operational_efficiency.export_cancel_orders")}
                <DownloadOutlined />
              </Button>
            </CSVLink>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} className="px-6">
            <ChartOperationalEfficiency percent={0.02} rangeRate={5} />
          </Col>
          <Col span={24}>
            <div className="w-full flex flex-col">
              <div className="p-2 flex justify-between">
                <div>{t("admin_shop.dev_center.operational_efficiency.product_return")}</div>
                <div>0</div>
              </div>
              <div className="p-2 font-semibold flex justify-between bg-[#fafafa]">
                <div>{t("admin_shop.dev_center.operational_efficiency.product_sold")}</div>
                <div>0</div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ReturnOrderCard;
