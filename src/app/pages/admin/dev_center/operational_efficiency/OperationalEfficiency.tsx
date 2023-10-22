import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { Col, DatePicker, DatePickerProps, Row, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useTranslation } from "react-i18next";

import { CancelOrderCard, CustomerInteraction, FullfillOrderCard, ProductRating, ReturnOrderCard } from "./components";
import { operationQualify } from "./data";
import * as S from "./OperationalEfficiency.styles";

dayjs.extend(customParseFormat);

const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
  `${dayjs(value).startOf("week").format("DD/MM/YYYY")} ~ ${dayjs(value).endOf("week").format("DD/MM/YYYY")}`;

const OperationalEfficiency = () => {
  const { t } = useTranslation();

  return (
    <div>
      <section className="p-5 mt-3 bg-white">
        <AdminBreadcrumb />
        <section className="header mt-3">
          <Row justify="space-between">
            <Col>
              <Typography.Title level={3}>{t("admin_shop.dev_center.operational_efficiency.name")}</Typography.Title>
            </Col>
          </Row>
        </section>
      </section>
      <section className="px-3 mt-3 bg-[#f5f5f5]">
        <div className="p-5 bg-white">
          <Row justify="space-between">
            <Col>
              <Typography.Title level={4}>
                {t("admin_shop.dev_center.operational_efficiency.title_card")}
              </Typography.Title>
            </Col>
            <Col>
              <DatePicker defaultValue={dayjs()} format={customWeekStartEndFormat} picker="week" />
            </Col>
          </Row>
          <S.SpaceLine />
          <Row gutter={16}>
            <Col className="sm:mb-6" sm={{ span: 24 }} lg={{ span: 12 }}>
              <div className="text-[#bfbfbf] font-bold text-lg mb-3">
                <span className="text-3xl text-[rgb(48_191_120)]">5</span>
                <span> / 5</span>
              </div>
              <div>
                <S.Progress className="flex gap-1">
                  {operationQualify.map((item) => {
                    return (
                      <div
                        key={item.id}
                        color={item.color}
                        className="w-full flex flex-col justify-center gap-2 items-center"
                      >
                        <div className=" w-full h-4 flex flex-col justify-end items-center">
                          {item.checked && (
                            <svg className="mb-1" width="11" height="6" viewBox="0 0 11 6" fill="none">
                              <path
                                d="M9.08579 0H1.91421C1.02331 0 0.577143 1.07714 1.20711 1.70711L4.79289 5.29289C5.18342 5.68342 5.81658 5.68342 6.20711 5.29289L9.79289 1.70711C10.4229 1.07714 9.97669 0 9.08579 0Z"
                                fill={item.color}
                              ></path>
                            </svg>
                          )}
                          <Tooltip color={item.color} placement="bottom" title={item.desc}>
                            <div className={`rounded w-full h-2 bg-[${item.color}] indicator`}></div>
                          </Tooltip>
                        </div>
                        <span className={item.checked ? "activeLabel" : ""}>{item.point}</span>
                      </div>
                    );
                  })}
                </S.Progress>
                {/* <S.DescProgress className="styles__ScoreBarDesc-sc-36gxmz-12 jZaaCA">
                    <S.ArrowProgress className="arrow"></S.ArrowProgress>
                    <div>
                      <span className="font-bold">
                        Bạn đang xử lý đơn hàng
                        <span> xuất sắc </span>
                        trong tuần vừa qua!
                      </span>
                      &nbsp;Hãy giữ vững phong độ để có thêm thật nhiều đánh giá 5 sao và nhận thêm nhiều đặc quyền từ
                      chúng tôi nhé!
                    </div>
                  </S.DescProgress> */}
              </div>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <div className="flex justify-between">
                <span>{t("admin_shop.dev_center.operational_efficiency.num_late_orders")}</span>
                <span>0</span>
              </div>
              <S.SpaceLine />
              <div className="flex justify-between">
                <span>{t("admin_shop.dev_center.operational_efficiency.num_ontime_orders")}</span>
                <span>0</span>
              </div>
              <S.SpaceLine />
              <div className="flex justify-between">
                <span>{t("admin_shop.dev_center.operational_efficiency.num_canceled_orders")}</span>
                <span>0</span>
              </div>
              <S.SpaceLine />
              <div className="flex justify-between">
                <span>{t("admin_shop.dev_center.operational_efficiency.num_awaiting_orders")}</span>
                <span>0</span>
              </div>
              <S.SpaceLine />
              <div className="flex justify-between font-bold">
                <span>{t("admin_shop.dev_center.operational_efficiency.total_num_orders")}</span>
                <span>0</span>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <section className="px-3 mt-3 bg-[#f5f5f5]">
        <div className="p-5 bg-white">
          <Row justify="space-between">
            <Typography.Title level={4}>
              {t("admin_shop.dev_center.operational_efficiency.operational_metrics")}
            </Typography.Title>
          </Row>
          <S.SpaceLine />
          <Row gutter={16}>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <CancelOrderCard />
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <FullfillOrderCard />
            </Col>
          </Row>
          <S.SpaceLine />
          <Row gutter={16}>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <ReturnOrderCard />
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <ProductRating />
            </Col>
          </Row>
        </div>
      </section>
      <section className="px-3 mt-3 bg-[#f5f5f5]">
        <CustomerInteraction />
      </section>
    </div>
  );
};

export default OperationalEfficiency;
