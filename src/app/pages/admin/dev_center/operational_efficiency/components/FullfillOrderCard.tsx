import { DownloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";

import { FulfillmentData } from "../data";

import { ChartOperationalEfficiency } from ".";

const FullfillOrderCard = () => {
  const { t } = useTranslation();

  const [dataExport, setDataExport] = useState<string[][]>([]);

  const getQRsExport = (done: any) => {
    const result = [];
    if (FulfillmentData && FulfillmentData.length > 0) {
      result.push(["Số đơn xử lý đúng hạn", "Tổng số đơn", "Tỉ lệ"]);
      FulfillmentData.map((item) => {
        const arr = [];
        arr[0] = item.fullfillOrder;
        arr[1] = item.totalOrder;
        arr[2] = `${(item.fullfillOrder / item.totalOrder) * 100} %`;
        result.push(arr);
      });

      setDataExport(result);

      done();
    }
  };

  return (
    <div>
      <Card bordered={false}>
        <Row>
          <Col span={12}>
            <span className=" font-semibold text-base">
              {t("admin_shop.dev_center.operational_efficiency.card_fullfill_orders")}
            </span>
          </Col>
          <Col span={12} className="text-right">
            <CSVLink
              data={dataExport}
              separator={";"}
              filename={"fullfill-order.csv"}
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
            <ChartOperationalEfficiency percent={0.97} rangeRate={100} />
          </Col>
          <Col span={24}>
            <div className="w-full flex flex-col">
              <div className="p-2 flex justify-between">
                <div>{t("admin_shop.dev_center.operational_efficiency.card_fullfill_orders")}</div>
                <div>0</div>
              </div>
              <div className="p-2 font-semibold flex justify-between bg-[#fafafa]">
                <div>{t("admin_shop.dev_center.operational_efficiency.total_num_orders")}</div>
                <div>0</div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default FullfillOrderCard;
